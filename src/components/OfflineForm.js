'use strict'

import React, { Component } from 'react'
import CardContainer from 'components/CardContainer'
import MessageSvg from 'components/MessageSvg'
import ActionButton from 'components/ActionButton'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import zChat from 'vendor/web-sdk'

class OfflineForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sent: false
    }
    this.send = this.send.bind(this)
    this.sendAnother = this.sendAnother.bind(this)
    this.renderChild = this.renderChild.bind(this)
  }

  send(event) {
    event.preventDefault()
    zChat.sendOfflineMsg(
      {
        name: this.refs.name.value,
        email: this.refs.email.value,
        message: this.refs.message.value
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
          Your message has been sent. We will get back to you as soon as
          possible.
          <ActionButton
            addClass="button-resend"
            label="Send another"
            onClick={this.sendAnother}
          />
        </div>
      )
    } else {
      return (
        <form key="not-sent" className="offline-form">
          <div className="content">
            <div className="section">
              <label className="label">Nome</label>
              <input ref="name" />
            </div>
            <div className="section">
              <label className="label">Email</label>
              <input ref="email" />
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
  onClick: React.PropTypes.func,
  addClass: React.PropTypes.string,
  title: React.PropTypes.string
}

export default OfflineForm
