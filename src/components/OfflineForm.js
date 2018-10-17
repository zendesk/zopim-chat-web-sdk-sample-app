'use strict'

import React, { Component } from 'react'
import CardContainer from 'components/CardContainer'
import MessageSvg from 'components/MessageSvg'
import ActionButton from 'components/ActionButton'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import zChat from 'vendor/web-sdk'
import PropTypes from 'prop-types'

class OfflineForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sent: false
    }
    this.send = this.send.bind(this)
    this.sendAnother = this.sendAnother.bind(this)
    this.renderChild = this.renderChild.bind(this)

    this.nameInput = React.createRef()
    this.emailInput = React.createRef()
    this.messageInput = React.createRef()
  }

  send(event) {
    event.preventDefault()
    zChat.sendOfflineMsg(
      {
        name: this.nameInput.current.value,
        email: this.emailInput.current.value,
        message: this.messageInput.current.value
      },
      err => {
        if (err) return
        this.setState({
          sent: true
        })
      }
    )
  }

  sendAnother() {
    this.setState({
      sent: false
    })
  }

  renderChild() {
    if (this.state.sent) {
      return (
        <div key="sent" className="offline-sent">
          Il tuo messaggio è stato inviato. Ti risponderemo il prima possibile.
          <ActionButton
            addClass="button-resend"
            label="Inviane un altro"
            onClick={this.sendAnother}
          />
        </div>
      )
    } else {
      return (
        <form key="not-sent" className="offline-form">
          <div className="content">
            <div className="section">
              <label className="label">Nome e Cognome</label>
              <input ref={this.nameInput} />
            </div>
            <div className="section">
              <label className="label">Email</label>
              <input ref={this.emailInput} />
            </div>
            <div className="section">
              <label className="label">Messaggio</label>
              <textarea ref={this.messageInput} />
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
  }

  render() {
    return (
      <CardContainer
        title={this.props.title}
        addClass="offline-card"
        contentAddClass={this.state.sent ? 'sent' : ''}
        icon={<MessageSvg />}
      >
        <ReactCSSTransitionGroup
          className="offline-container"
          transitionName={this.state.sent ? 'offline-shrink' : 'offline-grow'}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          {this.renderChild()}
        </ReactCSSTransitionGroup>
      </CardContainer>
    )
  }
}

OfflineForm.displayName = 'OfflineForm'
OfflineForm.propTypes = {
  onClick: PropTypes.func,
  addClass: PropTypes.string,
  title: PropTypes.string
}

export default OfflineForm
