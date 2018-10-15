'use strict'

import React, { Component } from 'react'
import CardContainer from 'components/CardContainer'
import ActionButton from 'components/ActionButton'
import zChat from 'vendor/web-sdk'
import { log } from 'utils'
import PropTypes from 'prop-types'

class ChatRating extends Component {
  constructor(props) {
    super(props)
  }

  rateDown(event) {
    event.preventDefault()
    zChat.sendChatRating('bad', err => {
      if (err) {
        log('Error occured >>>', err)
        return
      }
    })
  }

  rateUp(event) {
    event.preventDefault()
    zChat.sendChatRating('good', err => {
      if (err) {
        log('Error occured >>>', err)
        return
      }
    })
  }

  render() {
    return (
      <CardContainer title="Valutazione Chat" addClass="chat-rating-card">
        {this.props.agent.display_name} ha richiesto una valutazione per questa
        chat.
        <div className="buttons-container">
          <ActionButton
            addClass="button button-rate-down"
            label="👎"
            onClick={this.rateDown}
          />
          <ActionButton
            addClass="button button-rate-up"
            label="👍"
            onClick={this.rateUp}
          />
        </div>
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
