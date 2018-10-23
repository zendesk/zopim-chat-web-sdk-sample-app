'use strict'

import React, { Component } from 'react'
import CardContainer from 'components/CardContainer'
import ActionButton from 'components/ActionButton'
import RatingButton from 'components/RatingButton'
import zChat from 'vendor/web-sdk'
import { log } from 'utils'
import PropTypes from 'prop-types'

class ChatRating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rating: null
    }

    this.messageInput = React.createRef()

    this.rateDown = this.rateDown.bind(this)
    this.rateUp = this.rateUp.bind(this)
    this.send = this.send.bind(this)
  }

  rateDown(event) {
    event.preventDefault()
    this.setState({ rating: 'bad' })
  }

  rateUp(event) {
    event.preventDefault()
    this.setState({ rating: 'good' })
  }

  send(event) {
    event.preventDefault()
    zChat.sendChatRating(this.state.rating, err => {
      if (err) {
        log('Error occured >>>', err)
        return
      }
    })

    if (!!this.messageInput.current.value) {
      zChat.sendChatComment(this.messageInput.current.value, err => {
        if (err) {
          log('Error occured >>>', err)
          return
        }
      })
    }
  }

  render() {
    return (
      <CardContainer
        title="Valutazione Chat"
        addClass="chat-rating-card"
        icon="none"
      >
        {this.props.agent.display_name} ha richiesto una valutazione per questa
        chat.
        <form key="not-sent" className="offline-form">
          <div className="content">
            <div className="section">
              <div className="buttons-container rating">
                <RatingButton
                  addClass={`button button-rate-down${
                    this.state.rating === 'bad' ? ' selected' : ''
                  }`}
                  type="bad"
                  onClick={this.rateDown}
                />
                <RatingButton
                  addClass={`button button-rate-up${
                    this.state.rating === 'good' ? ' selected' : ''
                  }`}
                  type="good"
                  onClick={this.rateUp}
                />
              </div>
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
      </CardContainer>
    )
  }
}

ChatRating.displayName = 'ChatRating'
ChatRating.propTypes = {
  agent: PropTypes.object
}
ChatRating.defaultProps = {}

export default ChatRating
