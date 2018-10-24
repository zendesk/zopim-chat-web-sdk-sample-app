'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isAgent } from 'utils'

class SystemMessage extends Component {
  constructor(props) {
    super(props)
  }

  _parseMessage(msg, verb, period) {
    return isAgent(msg.nick)
      ? `${msg.display_name} ${verb === 1 ? 'è' : 'ha'} ${period}`
      : `${verb === 1 ? 'sei' : 'hai'} ${period}`
  }

  getMessageByType(msg) {
    switch (msg.type) {
      case 'chat.memberjoin':
        return this._parseMessage(msg, 1, 'entrato nella chat')
      case 'chat.memberleave':
        return this._parseMessage(msg, 1, 'uscito dalla chat')
      case 'chat.wait_queue':
        return `Attendere prego. Attualmente ${
          msg.wait_queue > 1 ? 'ci sono' : "c'è"
        } ${msg.wait_queue} person${msg.wait_queue > 1 ? 'e' : 'a'} in coda.`
      case 'chat.rating':
        return this._parseMessage(
          msg,
          2,
          `valutato la chat ${
            this.props.message.new_rating === 'good' ? '👍' : '👎'
          }`
        )
      case 'chat.comment':
        return this._parseMessage(
          msg,
          2,
          `commentato la chat: "${this.props.message.new_comment}"`
        )
      default:
        return JSON.stringify(msg)
    }
  }

  render() {
    return (
      <div className="system-msg-container">
        <span className="system-msg">
          {this.getMessageByType(this.props.message)}
        </span>
      </div>
    )
  }
}

SystemMessage.displayName = 'SystemMessage'
SystemMessage.propTypes = {
  message: PropTypes.object
}
SystemMessage.defaultProps = {
  message: {
    msg: ''
  }
}

export default SystemMessage
