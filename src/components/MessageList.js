'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ChatMessage from 'components/ChatMessage'
import SystemMessage from 'components/SystemMessage'
import Avatar from 'components/Avatar'
import OfflineForm from 'components/OfflineForm'
import PrechatForm from 'components/PrechatForm'
import ChatRating from 'components/ChatRating'

class MessageList extends Component {
  constructor(props) {
    super(props)
    this.renderTyping = this.renderTyping.bind(this)
    this.renderByType = this.renderByType.bind(this)
  }

  componentDidUpdate() {
    // Scroll to bottom
    let node = ReactDOM.findDOMNode(this)
    if (node.children.length > 0) {
      node = node.children[0]
      if (node.children.length > 0) {
        setTimeout(() => {
          node.children[node.children.length - 1].scrollIntoView()
        })
      }
    }
  }

  renderByType(msg, addClass) {
    switch (msg.type) {
      case 'chat.file':
      case 'chat.msg':
        return (
          <ChatMessage
            key={msg.type + msg.timestamp}
            message={msg}
            addClass={addClass}
            agent={this.props.agents[msg.nick]}
          />
        )
      case 'chat.memberjoin':
      case 'chat.memberleave':
      case 'chat.wait_queue':
      case 'typing':
        return <SystemMessage key={msg.type + msg.timestamp} message={msg} />
      case 'chat.rating':
        return <ChatRating key={msg.type + msg.timestamp} />
      case 'offline':
        return <OfflineForm title={msg.msg} key={`offline-${msg.timestamp}`} />
      case 'prechat':
        return <PrechatForm title={msg.msg} key={`prechat-${msg.timestamp}`} />
      default:
        return (
          <div key={+new Date()}>Unhandled message: {JSON.stringify(msg)}</div>
        )
    }
  }

  renderTyping(agents) {
    const agent_names = Object.values(agents).filter(agent => agent.typing)
    return agent_names.map(agent => {
      return (
        <div key={agent.nick} className="chat-msg-container agent">
          <div className="avatar-container">
            <Avatar entity={this.props.agents[agent.nick]} />
          </div>
          <div className="chat-msg-wrapper">
            <div className="chat-msg">
              <div className="typing-indicator">
                <div className="typing-indicator-part">•</div>
                <div className="typing-indicator-part">•</div>
                <div className="typing-indicator-part">•</div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  renderAll(isOffline, messages) {
    if (isOffline) {
      if (!messages) {
        messages = []
      }

      messages.splice(0, 0, {
        type: 'chat.msg',
        display_name: 'Hype Bot',
        nick: 'agent:offline',
        timestamp: +new Date(),
        member_type: 'agent',
        msg: 'Ciao sono Hypebot e puoi chiedermi quello che vuoi!'
      })
      // messages.push({
      //   type: 'offline'
      // });
    } else if (!this.props.isChatting) {
      messages = [
        {
          type: 'prechat'
        }
      ]
    }

    let prev = null

    return messages.map(message => {
      let addClass = '',
        currentNick = message.nick,
        prevNick = prev && prev.nick

      if (
        prev &&
        prev.type === message.type &&
        currentNick &&
        currentNick === prevNick
      )
        addClass = 'sibling'

      prev = message

      return this.renderByType(message, addClass)
    })
  }

  render() {
    return (
      <div className="message-list-container">
        <div>{this.renderAll(this.props.isOffline, this.props.messages)}</div>
        {this.renderTyping(this.props.agents)}
      </div>
    )
  }
}

MessageList.displayName = 'MessageList'
MessageList.propTypes = {
  messages: React.PropTypes.array,
  agents: React.PropTypes.object,
  isOffline: React.PropTypes.bool,
  isChatting: React.PropTypes.bool
}
MessageList.defaultProps = {
  messages: [],
  agents: {}
}

export default MessageList
