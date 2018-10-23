'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SendButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className={`send-button ${this.props.addClass || ''}`}
        onClick={this.props.onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="2 0 24 24"
          width="18"
          height="18"
        >
          <title>send</title>
          <g
            className="nc-icon-wrapper"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            fill="#ffffff"
            stroke="#ffffff"
          >
            <polyline
              data-cap="butt"
              fill="none"
              stroke="#ffffff"
              strokeMiterlimit="10"
              points="22,2 7,14 7,21 10.6,16.7 "
            />{' '}
            <polygon
              fill="none"
              stroke="#ffffff"
              strokeMiterlimit="10"
              points="2,10 22,2 18,22 "
            />
          </g>
        </svg>
      </div>
    )
  }
}

SendButton.displayName = 'SendButton'
SendButton.propTypes = {
  onClick: PropTypes.func,
  addClass: PropTypes.string
}

export default SendButton
