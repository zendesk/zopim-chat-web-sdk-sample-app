'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ActionButton extends Component {
  render() {
    return (
      <button
        className={`action-button ${this.props.addClass}`}
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    )
  }
}

ActionButton.displayName = 'ActionButton'
ActionButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  addClass: PropTypes.string
}

export default ActionButton
