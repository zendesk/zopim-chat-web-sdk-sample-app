'use strict'

import React, { Component } from 'react'
import CardContainer from 'components/CardContainer'
import PropTypes from 'prop-types'

class ChatRatingResult extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CardContainer title="Valutazione Chat" addClass="chat-rating-card">
        Grazie per il feedback!{' '}
        {this.props.agent.new_rating === 'good' ? '👍' : '👎'}
      </CardContainer>
    )
  }
}

ChatRatingResult.displayName = 'ChatRatingResult'
ChatRatingResult.propTypes = {
  agent: PropTypes.object
}
ChatRatingResult.defaultProps = {}

export default ChatRatingResult
