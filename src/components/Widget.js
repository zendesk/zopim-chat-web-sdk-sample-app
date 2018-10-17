import 'styles/Widget.scss'

import config from 'config'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import StatusContainer from 'components/StatusContainer'
import MessageList from 'components/MessageList'
import ChatButton from 'components/ChatButton'
import Input from 'components/Input'
import { log, get, set } from 'utils'
import { debounce } from 'lodash'
import zChat from 'vendor/web-sdk'
import qnaChat from '../sdk/qna-sdk'
import moment from 'moment'
// import Holidays from 'date-holidays'

const {
  ENV,
  ACCOUNT_KEY,
  BOT_ACCOUNT_KEY,
  BOT_ENDPOINT,
  // EMAIL_ADDRESS,
  SERVICES_CHECK_URL,
  KEYWORDS,
  THEME
} = config

if (ENV === 'dev') {
  window.zChat = zChat
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      theme: THEME,
      typing: false,
      visible: false
    }
    this.timer = null
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.getVisibilityClass = this.getVisibilityClass.bind(this)
    this.minimizeOnClick = this.minimizeOnClick.bind(this)
    this.chatButtonOnClick = this.chatButtonOnClick.bind(this)
    this.mapToEntities = this.mapToEntities.bind(this)
    this.isOffline = this.isOffline.bind(this)
    this.stopTyping = debounce(this.stopTyping.bind(this), 1000)
    this.setVisible = this.setVisible.bind(this)
    this.setTheme = this.setTheme.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)

    this.textInput = React.createRef()
  }

  componentDidMount() {
    qnaChat.init({
      account_key: BOT_ACCOUNT_KEY,
      endpoint: BOT_ENDPOINT,
      services_check_url: SERVICES_CHECK_URL
    })
    zChat.init({
      account_key: ACCOUNT_KEY
    })

    const events = [
      'account_status',
      'connection_update',
      'department_update',
      'visitor_update',
      'agent_update',
      'chat',
      'error'
    ]

    events.forEach(evt => {
      zChat.on(evt, data => {
        this.props.dispatch({
          type: evt,
          detail: data
        })
      })
    })

    // Expose onThemeChange to allow dynamic change of theme
    if (ENV === 'dev') {
      window.onThemeChange = this.onThemeChange.bind(this)
    }

    this.setState({
      visible: get('visible') || this.state.visible,
      theme: get('theme') || this.state.theme
    })
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.props.data.chatOperatorSettings &&
      this.props.data.connection !== 'connected' &&
      nextProps.data.connection === 'connected'
    ) {
      this.getServicesStatus()
    }
  }

  handleOnChange() {
    if (!this.state.typing) {
      zChat.sendTyping(true)
      this.setState({ typing: true })
    }
    this.stopTyping()
  }

  stopTyping() {
    if (!this.state.typing) return

    zChat.sendTyping(false)
    this.setState({ typing: false })
  }

  handleOnSubmit(event) {
    event && event.preventDefault()

    const msg = this.textInput.current.getRawInput().value

    // Don't send empty messages
    if (!msg) return

    // Don't allow visitor to send msg if not chatting
    if (this.isOffline()) {
      this.textInput.current.getRawInput().value = ''

      if (this.checkKeyword(msg)) {
        this.handleRequestOperator(true)
        return
      }

      this.props.dispatch({
        type: 'chat',
        detail: {
          type: 'chat.msg',
          nick: 'visitor:Hype Bot',
          display_name: 'Hype Bot',
          member_type: 'agent',
          timestamp: +new Date(),
          msg
        }
      })

      const { minConfidence } = this.props.data.chatbot

      qnaChat
        .sendChatMsg(msg)
        .then(json => {
          if (!json.answers) {
            this.props.dispatch({
              type: 'chat',
              detail: {
                type: 'chat.msg',
                nick: 'agent:trigger:Hype Bot',
                display_name: 'Hype Bot',
                member_type: 'agent',
                timestamp: +new Date(),
                msg:
                  'Si è verificato un errore imprevisto. Riprova tra qualche minuto!'
              }
            })
          } else if (json.answers[0].score >= minConfidence) {
            this.props.dispatch({
              type: 'chat',
              detail: {
                type: 'chat.msg',
                nick: 'agent:trigger:Hype Bot',
                display_name: 'Hype Bot',
                member_type: 'agent',
                timestamp: +new Date(),
                msg: json.answers[0].answer
              }
            })
          } else {
            this.handleRequestOperator()
          }
        })
        .catch(err => {
          this.textInput.current.getRawInput().value = ''
          if (err) {
            log('Error occured >>>', err)
            return
          }
        })

      return
    }

    // Immediately stop typing
    this.stopTyping.flush()
    zChat.sendChatMsg(msg, err => {
      if (err) {
        log('Error occured >>>', err)
        return
      }
    })

    this.props.dispatch({
      type: 'synthetic',
      detail: {
        type: 'visitor_send_msg',
        msg
      }
    })
    this.textInput.current.getRawInput().value = ''
  }

  handleFileUpload(event) {
    event.preventDefault()

    // Don't allow visitor to send file if offline
    if (this.isOffline()) return

    // Only send the first file dropped on input
    const file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0]

    // Generate attachment object for local echo
    const attachment = {
      mime_type: file.type,
      name: file.name,
      size: file.size,
      url: window.URL.createObjectURL(file)
    }

    zChat.sendFile(file, err => {
      if (err) {
        log('Error occured >>>', err)
        return
      }
    })

    this.props.dispatch({
      type: 'synthetic',
      detail: {
        type: 'visitor_send_file',
        attachment
      }
    })
  }

  checkKeyword(word) {
    const { keywords } = this.props.data.chatbot

    const cleanWord = word.trim().toLowerCase()

    return (
      keywords &&
      keywords.reduce((res, k) => {
        const lk = k.toLowerCase()

        return res || cleanWord.includes(lk)
      }, false)
    )
  }

  handleRequestOperator(intentional) {
    if (!!this.areOperatorsAvaliable()) {
      this.props.dispatch({
        type: 'chat',
        detail: {
          type: 'prechat',
          nick: 'agent:trigger:Hype Bot',
          display_name: 'Hype Bot',
          member_type: 'agent',
          timestamp: +new Date(),
          msg: `${
            !intentional
              ? 'Non riesco a rispondere alla tua domanda. Vuoi essere messo in contatto con un operatore?'
              : ''
          }
                    Presentati!`
        }
      })
    } else {
      this.props.dispatch({
        type: 'chat',
        detail: {
          type: 'offline',
          nick: 'agent:trigger:Hype Bot',
          display_name: 'Hype Bot',
          member_type: 'agent',
          timestamp: +new Date(),
          msg: `Non riesco a rispondere alla tua domanda e al momento non ci sono operatori disponibili.
                   Puoi chattare con un operatore dal Lunedì al Venerdì, esclusi i festivi,
                   ${this.getOperatorAvailabilityString()}. Se vuoi contattarci in orari e giorni diversi scrivi qui sotto i tuoi dati e il tuo messaggio, un operatore ti risponderà al più presto via email quando tornerà online.`
        }
      })
    }
  }

  getServicesStatus() {
    return qnaChat.getServicesStatus().then(json => {
      if (json.hypeNoAuthServiceList) {
        const chatBotSettings = json.hypeNoAuthServiceList.find(
          x => x.service === 'CHATBOT'
        )

        const chatOperatorSettingTemplate = json.hypeNoAuthServiceList.find(
          x => x.service === 'CHAT'
        )

        const zChatOperatorSettings = zChat.getOperatingHours()

        const chatOperatorSettings = Object.keys(
          zChatOperatorSettings.department_schedule
        ).map(k => {
          const startT = new Date()
          const endT = new Date()

          const currDaySettings =
            zChatOperatorSettings.department_schedule[k][startT.getDay()]

          startT.setHours(0, currDaySettings[0].start, 0, 0)
          endT.setHours(0, currDaySettings[0].end, 0, 0)

          return {
            ...chatOperatorSettingTemplate,
            startTime: startT.toLocaleTimeString().replace(/\:\d\d$/, ''),
            endTime: endT.toLocaleTimeString().replace(/\:\d\d$/, ''),
            status: zChatOperatorSettings.enabled ? 'ACTIVE' : 'INACTIVE'
          }
        })

        const keywords = chatOperatorSettings
          .reduce((res, next) => {
            //@hack this merges any local and remote keywords into an unique object
            //refactor it if it doesn't satisfies the requirements anymore

            let remoteKeywords

            try {
              remoteKeywords = JSON.parse(next.addtInfo).keywords
            } catch (e) {
              remoteKeywords = []
            }

            return [...new Set([...res, ...remoteKeywords])]
          }, KEYWORDS)
          .filter(k => !!k)

        const clientTime = new Date()

        this.props.dispatch({
          type: 'chat',
          detail: {
            type: 'chat.bot.settings',
            chatOperatorSettings,
            serverToClientTimeSpan:
              moment(json.serverTime).valueOf() - clientTime.getTime(),
            active: this.isServiceActive(chatBotSettings),
            minConfidence: Number(chatBotSettings.addtInfo),
            keywords
          }
        })
      }
    })
  }

  isServiceActive(settings) {
    return settings && settings.status === 'ACTIVE'
  }

  getOperatorAvailabilityString() {
    return this.props.data.chatbot.chatOperatorSettings.reduce((res, next) => {
      return `${res}${res.length > 0 ? ' o ' : ' '}dalle ${
        next.startTime
      } alle ${next.endTime}`
    }, '')
  }

  checkOperatorChatState() {
    const processItem = settings => {
      if (!settings)
        return {
          available: false,
          availableNow: false
        }

      try {
        // const hd = new Holidays('IT')
        const time = this.getServerTime()
        const startTime = moment(settings.startTime, 'HH:mm').toDate()
        const endTime = moment(settings.endTime, 'HH:mm').toDate()

        const available = this.isServiceActive(settings)

        const availableNow =
          available &&
          time.isAfter(startTime) &&
          time.isBefore(endTime) &&
          time.day() !== 6 &&
          time.day() !== 0 //&&
        // check if date is a holiday while respecting timezones
        // !hd.isHoliday(time.toDate())

        const availableUntil = endTime

        return {
          available,
          availableNow,
          availableUntil
        }
      } catch (err) {
        log('Error occured >>>', err)
        return {
          available: false,
          availableNow: false
        }
      }
    }

    return this.props.data.chatbot.chatOperatorSettings.reduce((res, next) => {
      if (!res.available || !res.availableNow) {
        res = processItem(next)
      }

      return res
    }, {})
  }

  getServerTime() {
    const clientTime = new Date()
    return moment(
      clientTime.getTime() + this.props.data.chatbot.serverToClientTimeSpan
    )
  }

  areOperatorsAvaliable() {
    const {
      available,
      availableNow,
      availableUntil
    } = this.checkOperatorChatState()

    if (!available) return false

    const operatorChatStillAvailable = this.getServerTime().isBefore(
      availableUntil
    )

    return availableNow && operatorChatStillAvailable
  }

  getVisibilityClass() {
    return this.state.visible ? 'visible' : ''
  }

  minimizeOnClick() {
    this.setVisible(false)
  }

  chatButtonOnClick() {
    this.setVisible(true)
  }

  setVisible(visible) {
    this.setState({
      visible
    })
    set('visible', visible)
  }

  mapToEntities(visitor, agents) {
    const entities = {}
    if (visitor) {
      entities[visitor.nick] = {
        ...visitor,
        type: 'visitor'
      }
    }

    if (agents && Object.keys(agents).length) {
      Object.values(agents).forEach(agent => {
        if (!agent.nick) return

        entities[agent.nick] = {
          ...agent,
          type: 'agent'
        }
      })
    }

    if (
      this.props.data.account_status === 'offline' &&
      !this.props.data.is_chatting
    ) {
      entities['agent:offline'] = {
        type: 'agent',
        nick: 'agent:offline'
      }
    }

    return entities
  }

  setTheme(theme) {
    this.setState({
      theme
    })
    set('theme', theme)
  }

  onThemeChange(theme) {
    if (theme !== 'docked' && theme !== 'normal') {
      theme = 'docked'
    }

    this.setTheme(theme)
  }

  getTheme() {
    return this.state.theme
  }

  isOffline() {
    return (
      (this.props.data.account_status === 'offline' &&
        !this.props.data.is_chatting) ||
      !!this.props.data.chatbot.active
    )
  }

  render() {
    if (!ACCOUNT_KEY) {
      if (ENV === 'dev') {
        return (
          <div className="warning-container">
            <div className="warning">
              🚨🚨🚨&nbsp;&nbsp;&nbsp;You might have forgotten to configure the
              widget with your own account key.&nbsp;&nbsp;&nbsp;🚨🚨🚨
              <br />
              <br />
              Check the README for more details.
            </div>
          </div>
        )
      } else {
        return <div />
      }
    }

    const entities = this.mapToEntities(
      this.props.data.visitor,
      this.props.data.agents
    )
    const isOffline = this.isOffline()

    return (
      <div className="index">
        <div
          className={`widget-container ${this.getTheme()} ${this.getVisibilityClass()}`}
        >
          <StatusContainer
            accountStatus={this.props.data.account_status}
            minimizeOnClick={this.minimizeOnClick}
            onFileUpload={this.handleFileUpload}
            isOffline={isOffline}
          />
          <MessageList
            isChatting={this.props.data.is_chatting}
            isOffline={isOffline}
            messages={this.props.data && this.props.data.chats.toArray()}
            agents={this.props.data.agents}
            entities={entities}
          />
          <div
            className={`spinner-container ${
              this.state.visible && this.props.data.connection !== 'connected'
                ? 'visible'
                : ''
            }`}
          >
            <div className="spinner" />
          </div>
          <Input
            addClass={/*this.props.data.is_chatting ?*/ 'visible' /*: ''*/}
            ref={this.textInput}
            onSubmit={this.handleOnSubmit}
            onChange={this.handleOnChange}
            onFocus={this.inputOnFocus}
            onFileUpload={this.handleFileUpload}
          />
        </div>
        <ChatButton
          addClass={this.getVisibilityClass()}
          onClick={this.chatButtonOnClick}
        />
      </div>
    )
  }
}

App.displayName = 'App'

const mapStateToProps = state => {
  return {
    data: state
  }
}

const WrappedApp = connect(mapStateToProps)(App)

export default WrappedApp
