import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Widget from 'components/Widget'
import { Provider } from 'react-redux'
import ChatStore from 'stores/ChatStore'
import PropTypes from 'prop-types'
import config from 'config'

class ChatWidget extends Component {
  constructor(props) {
    super(props)
  }

  static init = ({
    selector = 'widget',
    theme = 'hype',
    chatAccountKey,
    botAccountKey,
    botEndpoint,
    emailAddress = 'hello@hype.it',
    servicesCheckUrl = 'https://www.pp-hype.it/api/rest/FREE/services',
    keywords = ['operatore']
  } = {}) => {
    let widget = document.getElementById(selector)

    if (!widget) {
      widget = document.createElement('div')
      widget.id = selector
      document.body.appendChild(widget)
    }

    // Render the main component into the dom
    return ReactDOM.render(
      <ChatWidget
        theme={theme}
        chatAccountKey={chatAccountKey}
        botAccountKey={botAccountKey}
        botEndpoint={botEndpoint}
        emailAddress={emailAddress}
        servicesCheckUrl={servicesCheckUrl}
        keywords={keywords}
      />,
      widget
    )
  }

  setVisible(visible) {
    this.child.setVisible(visible)
  }

  setVisitorInfo(info) {
    this.child.setVisitorInfo(info)
  }

  render() {
    return (
      <Provider store={ChatStore}>
        <Widget
          onRef={ref => (this.child = ref)}
          theme={this.props.theme}
          chatAccountKey={this.props.chatAccountKey}
          botAccountKey={this.props.botAccountKey}
          botEndpoint={this.props.botEndpoint}
          emailAddress={this.props.emailAddress}
          servicesCheckUrl={this.props.servicesCheckUrl}
          keywords={this.props.keywords}
        />
      </Provider>
    )
  }
}

ChatWidget.displayName = 'ChatWidget'
ChatWidget.propTypes = {
  theme: PropTypes.string,
  chatAccountKey: PropTypes.string,
  botAccountKey: PropTypes.string,
  botEndpoint: PropTypes.string,
  emailAddress: PropTypes.string,
  servicesCheckUrl: PropTypes.string,
  keywords: PropTypes.array
}

export default ChatWidget

if (process.env.SCOPE === 'demo') {
  window.onload = () => {
    const {
      ACCOUNT_KEY: chatAccountKey,
      BOT_ACCOUNT_KEY: botAccountKey,
      BOT_ENDPOINT: botEndpoint,
      EMAIL_ADDRESS: emailAddress,
      SERVICES_CHECK_URL: servicesCheckUrl,
      KEYWORDS: keywords
    } = config

    ChatWidget.init({
      selector: 'widget',
      theme: 'hype',
      chatAccountKey,
      botAccountKey,
      botEndpoint,
      emailAddress,
      servicesCheckUrl,
      keywords
    })
  }
}
