'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SystemMessage extends Component {
  constructor(props) {
    super(props)
  }

  getMessageByType(msg) {
    switch (msg.type) {
      case 'chat.memberjoin':
        return `${this.props.message.display_name} è entrato nella chat`
      case 'chat.memberleave':
        return `${this.props.message.display_name} è uscito dalla chat`
      case 'chat.wait_queue':
        return `Attendere prego. Attualmente ${
          msg.wait_queue > 1 ? 'ci sono' : "c'è"
        } ${msg.wait_queue} person${msg.wait_queue > 1 ? 'e' : 'a'} in coda.`
      case 'chat.rating':
        return `${this.props.message.display_name} ha valutato la chat ${
          this.props.message.new_rating === 'good' ? '👍' : '👎'
        }`
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
