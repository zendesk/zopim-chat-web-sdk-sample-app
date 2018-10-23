'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UploadButton extends Component {
  constructor(props) {
    super(props)

    this.onUploadClick = this.onUploadClick.bind(this)

    this.fileUploadInput = React.createRef()
  }

  onUploadClick(/*event*/) {
    // event.preventDefault()
    this.fileUploadInput.current.click()
  }

  render() {
    return !this.props.isOffline ? (
      <div
        className={`upload-button ${this.props.addClass || ''}`}
        onClick={this.onUploadClick}
      >
        <input
          ref={this.fileUploadInput}
          type="file"
          style={{ visibility: 'hidden', width: 1 }}
          onChange={e => {
            this.props.onFileUpload(e)
            this.fileUploadInput.current.value = ''
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 2 24 24"
          width="18"
          height="18"
        >
          <title>attach 87</title>
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
              d="M22,11.4l-8.8,8.8 c-2.5,2.5-6.7,2.5-9.2,0l0,0c-2.5-2.5-2.5-6.7,0-9.2l7.8-7.8c1.8-1.8,4.6-1.8,6.4,0l0,0c1.8,1.8,1.8,4.6,0,6.4L11,16.7 c-1,1-2.6,1-3.5,0l0,0c-1-1-1-2.6,0-3.5l6-6"
            />
          </g>
        </svg>
      </div>
    ) : null
  }
}

UploadButton.displayName = 'UploadButton'
UploadButton.propTypes = {
  onClick: PropTypes.func,
  addClass: PropTypes.string,
  isOffline: PropTypes.bool
}

export default UploadButton
