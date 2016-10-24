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
      case 'chat.wait_queue':
        return `Please wait. There are currently ${msg.wait_queue} people(s) in the queue.`;
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
