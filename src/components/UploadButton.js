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
        📎
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
