'use strict';

import React, { Component } from 'react';

class ChatButton extends Component {
  render() {
    return (
      <div
        className={`chat-button ${this.props.addClass}`}
        onClick={this.props.onClick}>
        <svg width="22" height="22" viewBox="0 0 22 22">
          <path d="M13 22l-4-6H2c-1.11-.043-2-.935-2-2V2C0 .89.89 0 2 0h18c1.11 0 2 .892 2 2v12c0 1.067-.89 1.957-2 2h-3l-4 6zm3-8h4c-.005.3-.01-12 0-12-.01.004-18 .006-18 0 .005.006 0 12 0 12h8l3 5 3-5z" fill="#FFF" fillRule="evenodd"/>
        </svg>
      </div>
    );
  }
}


ChatButton.displayName = 'ChatButton';
ChatButton.propTypes = {
  onClick: React.PropTypes.func,
  addClass: React.PropTypes.string
};

export default ChatButton;
