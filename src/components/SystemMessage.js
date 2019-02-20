'use strict';

import React, { Component } from 'react';

class SystemMessage extends Component {
  constructor(props) {
    super(props);
  }

  getMessageByType(msg) {
    switch (msg.type) {
      case 'chat.memberjoin':
        return `${this.props.message.display_name} has joined the chat`;
      case 'chat.memberleave':
        return `${this.props.message.display_name} has left the chat`;
      case 'chat.rating':
        if (!this.props.message.new_rating) {
          return 'You have removed the chat rating';
        }
        else {
          const rating = convertToSentenceCase(this.props.message.new_rating);
          return `You have rated the chat service ${rating}`
        }
      default:
        return JSON.stringify(msg);
    }
  }

  render() {
    return (
      <div className="system-msg-container">
        <span className="system-msg">{this.getMessageByType(this.props.message)}</span>
      </div>
    );
  }
}

function convertToSentenceCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}

SystemMessage.displayName = 'SystemMessage';
SystemMessage.propTypes = {
  message: React.PropTypes.object
};
SystemMessage.defaultProps = {
  message: {
    msg: ''
  }
};

export default SystemMessage;
