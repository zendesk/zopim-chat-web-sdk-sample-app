'use strict'

import React, { Component } from 'react'
import CardContainer from 'components/CardContainer'
import MessageSvg from 'components/MessageSvg'
import ActionButton from 'components/ActionButton'
import { log } from 'utils'
import { connect } from 'react-redux'
import zChat from 'vendor/web-sdk'
import PropTypes from 'prop-types'

class PrechatForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sent: false
    }
    this.send = this.send.bind(this)
    this.renderChild = this.renderChild.bind(this)
  }

  send(event) {
    event.preventDefault()
    const msg = this.refs.message.value

    // Don't send empty messages
    if (!msg) return

    zChat.setVisitorInfo(
      {
        display_name: this.refs.name.value,
        email: this.refs.email.value,
        phone: this.refs.phone.value
      },
      err => {
        if (err) return

        this.props.dispatch({
          type: 'chat',
          detail: {
            type: 'chat.bot.settings',
            active: false
          }
        })

        zChat.sendChatMsg(msg, err => {
          if (err) log('Error sending message')
        })
      }
    )

    this.props.dispatch({
      type: 'synthetic',
      detail: {
        type: 'visitor_send_msg',
        msg: msg
      }
    })
  }

  renderChild() {
    return (
      <form key="not-sent" className="offline-form">
        <div className="content">
          <div className="section">
            <label className="label">Nome e Cognome</label>
            <input ref="name" />
          </div>
          <div className="section">
            <label className="label">Email</label>
            <input ref="email" />
          </div>
          <div className="section">
            <label className="label">Telefono</label>
            <input ref="phone" />
          </div>
          <div className="section">
            <label className="label">Messaggio</label>
            <textarea ref="message" />
          </div>
        </div>
        <div className="button-container">
          <ActionButton
            addClass="button-send"
            label="Invia"
            onClick={this.send}
          />
        </div>
      </form>
    )
  }

  render() {
    return (
      <CardContainer
        title={this.props.title}
        addClass="offline-card"
        contentAddClass={this.state.sent ? 'sent' : ''}
        icon={<MessageSvg />}
      >
        {this.renderChild()}
      </CardContainer>
    )
  }
}

PrechatForm.displayName = 'PrechatForm'
PrechatForm.propTypes = {
  onClick: PropTypes.func,
  addClass: PropTypes.string,
  title: PropTypes.string
}

export default connect()(PrechatForm)
