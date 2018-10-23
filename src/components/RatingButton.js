'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RatingButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className={`rating-button ${this.props.addClass || ''}`}
        onClick={this.props.onClick}
      >
        {this.props.type === 'good' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 2 24 24"
            width="18"
            height="18"
          >
            <title>thumb up</title>
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
                data-color="color-2"
                points="6 23 1 23 1 12 6 12"
                fill="none"
                strokeMiterlimit="10"
              />{' '}
              <path
                d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
                fill="none"
                stroke="#ffffff"
                strokeMiterlimit="10"
              />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -2 24 24"
            width="18"
            height="18"
          >
            <title>thumb down</title>
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
                data-color="color-2"
                points="6 1 1 1 1 12 6 12"
                fill="none"
                strokeMiterlimit="10"
              />{' '}
              <path
                d="M6,12,9,23H9a3,3,0,0,0,3-3V14h7.5a3,3,0,0,0,2.965-3.456l-1.077-7A3,3,0,0,0,18.426,1H6Z"
                fill="none"
                stroke="#ffffff"
                strokeMiterlimit="10"
              />
            </g>
          </svg>
        )}
      </div>
    )
  }
}

RatingButton.displayName = 'RatingButton'
RatingButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string
}

export default RatingButton
