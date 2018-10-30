'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'components/Avatar'
import ChatMedia from 'components/ChatMedia'
import { log, isAgent } from 'utils'
import zChat from 'vendor/web-sdk'
import ReactMarkdown from 'react-markdown/with-html'
import PropTypes from 'prop-types'

class ChatMessage extends Component {
  constructor(props) {
    super(props)
    this.getClassName = this.getClassName.bind(this)
    this.renderMessagePart = this.renderMessagePart.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
    this.optionOnChange = this.optionOnChange.bind(this)
  }

  getClassName(msg) {
    return msg.member_type
  }

  optionOnChange(e) {
    const index = e.currentTarget.value,
      msg = this.props.message.options[index]
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
  }

  renderOptions(options) {
    if (!options || options.length <= 0) return

    return (
      <div>
        {options.map((option, i) => {
          return (
            <div>
              <input
                type="radio"
                name="option"
                value={i}
                onChange={this.optionOnChange}
              />{' '}
              {option}
            </div>
          )
        })}
      </div>
    )
  }

  parseMessage(msg) {
    return msg.replace(
      /(?:<a[^"']+href=["']|\[[^\]]+\]\()?((https?:\/\/|s?ftp:\/\/)?([a-z0-9]+(?:[\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/[^\s]*)?))(?:["'>][^<]+<\/a>|\))?/gi,
      this.replaceLinksInMessage
    )
  }

  replaceLinksInMessage(match, fullUrl, protocol, url) {
    const plainTextRegex = /^\w/gi
    const htmlAnchorRegex = /<[^>]+href=["']([^"']+)["'][^>]+>([^>]+)<\/[^>]+>/gi
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/gi

    let linkText = ''

    if (plainTextRegex.test(match)) {
      linkText = fullUrl
    }

    if (!linkText || linkText === match) {
      linkText = match.replace(htmlAnchorRegex, '$2')
    }

    if (!linkText || linkText === match) {
      linkText = match.replace(markdownLinkRegex, '$1')
    }

    return `<b><a href="${protocol ||
      '//'}${url}" target="_blank">${linkText}</a></b>`
  }

  renderMessagePart(msg) {
    switch (msg.type) {
      case 'chat.file':
        return <ChatMedia message={msg} />
      default:
        return (
          <div className="chat-msg">
            {isAgent(msg.nick) && <b>{msg.display_name}</b>}

            <span>
              <ReactMarkdown
                source={this.parseMessage(this.props.message.msg)}
                escapeHtml={false}
              />
            </span>
            {this.renderOptions(this.props.message.options)}
          </div>
        )
    }
  }

  render() {
    return (
      <div
        className={`chat-msg-container ${this.getClassName(
          this.props.message
        )} ${this.props.addClass}`}
      >
        <div className="avatar-container">
          <Avatar entity={this.props.agent} />
        </div>
        <span className="chat-msg-arrow" />
        <div className="chat-msg-wrapper">
          {this.renderMessagePart(this.props.message)}
        </div>
      </div>
    )
  }
}

ChatMessage.displayName = 'ChatMessage'
ChatMessage.propTypes = {
  message: PropTypes.object,
  agent: PropTypes.object,
  addClass: PropTypes.string
}
ChatMessage.defaultProps = {
  message: {
    msg: ''
  }
}

export default connect()(ChatMessage)
