'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux'
import Avatar from 'components/Avatar';
import ChatMedia from 'components/ChatMedia';
import { log } from 'utils';
import zChat from 'vendor/web-sdk';

class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.getClassName = this.getClassName.bind(this);
    this.renderMessagePart = this.renderMessagePart.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.optionOnChange = this.optionOnChange.bind(this);
  }

  getClassName(msg) {
    return msg.member_type;
  }

  optionOnChange(e) {
    const index = e.currentTarget.value,
          msg = this.props.message.options[index];
    zChat.sendChatMsg(msg, (err) => {
      if (err) {
        log('Error occured >>>', err);
        return;
      }
    });
    this.props.dispatch({
      type: 'synthetic',
      detail: {
        type: 'visitor_send_msg',
        msg
      }
    });
  }

  renderOptions(options) {
    if (!options || options.length <= 0) return;

    return (
      <div>
      {
        options.map((option, i) => {
          return <div><input type="radio" name="option" value={i} onChange={this.optionOnChange}/> {option}</div>;
        })
      }
      </div>
    )
  }

  renderMessagePart(msg) {
    switch (msg.type) {
      case 'chat.file':
        return <ChatMedia message={msg} />;
      default:
        return (
          <div className="chat-msg">
            <span>{this.props.message.msg}</span>
            {this.renderOptions(this.props.message.options)}
          </div>
        );
    }
  }

  render() {
    return (
      <div className={`chat-msg-container ${this.getClassName(this.props.message)} ${this.props.addClass}`}>
        <div className="avatar-container">
          <Avatar entity={this.props.agent} />
        </div>
        <div className="chat-msg-wrapper">
          {this.renderMessagePart(this.props.message)}
        </div>
      </div>
    );
  }
}

ChatMessage.displayName = 'ChatMessage';
ChatMessage.propTypes = {
  message: React.PropTypes.object,
  agent: React.PropTypes.object,
  addClass: React.PropTypes.string
};
ChatMessage.defaultProps = {
  message: {
    msg: ''
  }
}

export default connect()(ChatMessage);
