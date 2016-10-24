'use strict';

import React, { Component } from 'react';

class SendButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`send-button ${ this.props.addClass || ''}`}
        onClick={this.props.onClick}>
        <svg width="12" height="13" viewBox="0 0 12 13">
          <path d="M3 6L0 0c-.056.14 12 6 12 6L0 13c.053.083 3-7 3-7z" fill="#FFF" fillRule="evenodd"/>
        </svg>
      </div>
    );
  }
}


SendButton.displayName = 'SendButton';
SendButton.propTypes = {
  onClick: React.PropTypes.func,
  addClass: React.PropTypes.string
};

export default SendButton;
