'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CardContainer extends Component {
  constructor(props) {
    super(props)
    this.renderIcon = this.renderIcon.bind(this)
  }

  renderIcon() {
    const isString = typeof this.props.icon === 'string'
    return <div className="card-icon">{!isString && this.props.icon}</div>
  }

  render() {
    return (
      <div className={`card-container ${this.props.addClass}`}>
        {this.renderIcon()}
        <div className={`card-content ${this.props.contentAddClass}`}>
          <div className="card-title">{this.props.title}</div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

CardContainer.displayName = 'CardContainer'
CardContainer.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.string,
  addClass: PropTypes.string,
  contentAddClass: PropTypes.string
}
export default CardContainer
