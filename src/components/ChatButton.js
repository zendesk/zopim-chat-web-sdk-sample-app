'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChatButton extends Component {
  render() {
    return (
      <div
        className={`chat-button ${this.props.addClass}`}
        onClick={this.props.onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <title>chat round content</title>
          <g
            className="nc-icon-wrapper"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            fill="#ffffff"
            stroke="#ffffff"
          >
            <path
              fill="none"
              stroke="#ffffff"
              strokeMiterlimit="10"
              d="M20.4,16.8 C22,15.2,23,13.2,23,11c0-5-4.9-9-11-9S1,6,1,11c0,5,4.9,9,11,9c1.1,0,2.1-0.1,3.1-0.4L21,22L20.4,16.8z"
            />{' '}
            <line
              data-color="color-2"
              fill="none"
              strokeMiterlimit="10"
              x1="8"
              y1="9"
              x2="16"
              y2="9"
            />{' '}
            <line
              data-color="color-2"
              fill="none"
              strokeMiterlimit="10"
              x1="8"
              y1="13"
              x2="13"
              y2="13"
            />
          </g>
        </svg>
      </div>
    )
  }
}

ChatButton.displayName = 'ChatButton'
ChatButton.propTypes = {
  onClick: PropTypes.func,
  addClass: PropTypes.string
}

export default ChatButton
