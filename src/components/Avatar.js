'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isAgent, isTrigger } from 'utils'

class Avatar extends Component {
  getVisitorSvg() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
      >
        <title>single 01</title>
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
            d="M12,12L12,12 c-2.761,0-5-2.239-5-5V6c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C17,9.761,14.761,12,12,12z"
          />{' '}
          <path
            data-color="color-2"
            fill="none"
            strokeMiterlimit="10"
            d="M22,20.908 c0-1.8-1.197-3.383-2.934-3.856C17.172,16.535,14.586,16,12,16s-5.172,0.535-7.066,1.052C3.197,17.525,2,19.108,2,20.908V23h20 V20.908z"
          />
        </g>
      </svg>
    )
  }

  getBotSvg() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
      >
        <title>robot</title>
        <g
          className="nc-icon-wrapper"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fill="#ffffff"
          stroke="#ffffff"
        >
          <line
            data-cap="butt"
            data-color="color-2"
            x1="5"
            y1="1"
            x2="5"
            y2="6"
            fill="none"
            strokeMiterlimit="10"
          />{' '}
          <line
            data-color="color-2"
            x1="3"
            y1="1"
            x2="7"
            y2="1"
            fill="none"
            strokeMiterlimit="10"
          />{' '}
          <line
            data-cap="butt"
            data-color="color-2"
            x1="19"
            y1="1"
            x2="19"
            y2="6"
            fill="none"
            strokeMiterlimit="10"
          />{' '}
          <line
            data-color="color-2"
            x1="17"
            y1="1"
            x2="21"
            y2="1"
            fill="none"
            strokeMiterlimit="10"
          />{' '}
          <rect
            data-color="color-2"
            x="6"
            y="15"
            width="12"
            height="4"
            fill="none"
            strokeMiterlimit="10"
          />{' '}
          <line
            data-cap="butt"
            data-color="color-2"
            x1="10"
            y1="19"
            x2="10"
            y2="15"
            fill="none"
            strokeMiterlimit="10"
          />{' '}
          <line
            data-cap="butt"
            data-color="color-2"
            x1="14"
            y1="19"
            x2="14"
            y2="15"
            fill="none"
            strokeMiterlimit="10"
          />{' '}
          <line
            data-color="color-2"
            x1="6"
            y1="11"
            x2="8"
            y2="11"
            fill="none"
            strokeMiterlimit="10"
          />{' '}
          <line
            data-color="color-2"
            x1="16"
            y1="11"
            x2="18"
            y2="11"
            fill="none"
            strokeMiterlimit="10"
          />{' '}
          <polygon
            points="23 6 5 6 1 6 1 23 23 23 23 6"
            fill="none"
            stroke="#ffffff"
            strokeMiterlimit="10"
          />
        </g>
      </svg>
    )
  }

  renderAvatar(entity) {
    const style = {}
    let child
    if (entity && isAgent(entity.nick) && entity.avatar_path) {
      style.backgroundImage = `url('${entity.avatar_path}')`
      style.backgroundColor = 'none'
    } else {
      if (!!entity && isTrigger(entity.nick)) {
        child = this.getBotSvg()
      } else {
        child = this.getVisitorSvg()
      }
    }

    return (
      <div
        className="avatar"
        style={style}
        title={entity ? entity.display_name : 'Agent'}
      >
        {child}
      </div>
    )
  }

  render() {
    return this.renderAvatar(this.props.entity)
  }
}

Avatar.displayName = 'Avatar'
Avatar.propTypes = {
  entity: PropTypes.object
}

export default Avatar
