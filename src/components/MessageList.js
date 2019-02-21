'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatMessage from 'components/ChatMessage';
import SystemMessage from 'components/SystemMessage';
import QueuePosition from 'components/QueuePosition';
import Avatar from 'components/Avatar';
import OfflineForm from 'components/OfflineForm';
import PrechatForm from 'components/PrechatForm';
import ChatRating from 'components/ChatRating';
import zChat from 'vendor/web-sdk';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.renderTyping = this.renderTyping.bind(this);
    this.renderByType = this.renderByType.bind(this);
  }

  componentDidUpdate() {
    // Scroll to bottom
    let node = ReactDOM.findDOMNode(this);
    if (node.children.length > 0) {
      node = node.children[0];
      if (node.children.length > 0) {
        setTimeout(() => {
          node.children[node.children.length - 1].scrollIntoView();
          if (this.props.visible) {
            zChat.markAsRead();
          }
        });
      }
    }
  }

  renderByType(msg, addClass) {
    switch (msg.type) {
      case 'chat.file':
      case 'chat.msg':
        return (
          <ChatMessage
            key={msg.type + msg.timestamp}
            message={msg}
            addClass={addClass}
            agent={this.props.agents[msg.nick]}
          />
        );
      case 'chat.memberjoin':
      case 'chat.memberleave':
      case 'chat.rating':
      case 'typing':
        return (
          <SystemMessage
            key={msg.type + msg.timestamp}
            message={msg}
          />
        );
      case 'chat.request.rating':
        return (
          <ChatRating
            key={msg.type + msg.timestamp}
            agent={this.props.agents[msg.nick]}
            hasRating={this.props.hasRating}
            shouldDisplay={msg.timestamp === this.props.lastRatingRequestTimestamp}
          />
        );
      case 'offline':
        return <OfflineForm key="offline" />;
      case 'prechat':
        return <PrechatForm key="prechat" />;
      default:
        return <div key={+new Date()}>Unhandled message: {JSON.stringify(msg)}</div>
    }
  }

  renderTyping(agents) {
    const agent_names = Object.values(agents)
      .filter((agent) => agent.typing);
    return agent_names.map((agent) => {
      return (
        <div key={agent.nick} className="chat-msg-container agent">
          <div className="avatar-container">
            <Avatar entity={this.props.agents[agent.nick]} />
          </div>
          <div className="chat-msg-wrapper">
            <div className="chat-msg">
              <div className="typing-indicator">
                <div className="typing-indicator-part">•</div>
                <div className="typing-indicator-part">•</div>
                <div className="typing-indicator-part">•</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderAll(isOffline, messages) {
    if (isOffline) {
      messages = [];
      messages.push({
        type: 'chat.msg',
        display_name: 'Chat Agent',
        nick: 'agent:offline',
        timestamp: +new Date(),
        member_type: 'agent',
        msg: 'Sorry, we are offline at the moment. Please leave us your contact information and we will get back to you soon!'
      });
      messages.push({
        type: 'offline'
      });
    } else if (!this.props.isChatting) {
      messages = [{
        type: 'prechat'
      }];
    }

    let prev = null;

    return messages.map((message) => {
      let addClass = '',
          currentNick = message.nick,
          prevNick = prev && prev.nick;

      if (prev && prev.type === message.type && currentNick && currentNick === prevNick)
        addClass = 'sibling';

      prev = message;

      return this.renderByType(message, addClass);
    });
  }

  render() {
    const { isOffline, agents, messages, queuePosition } = this.props;
    return (
      <div className="message-list-container">
        <div>{this.renderAll(isOffline, messages)}</div>
        <QueuePosition position={queuePosition} />
        {this.renderTyping(agents)}
      </div>
    );
  }
}

MessageList.displayName = 'MessageList';
MessageList.propTypes = {
  visible: React.PropTypes.bool,
  messages: React.PropTypes.array,
  agents: React.PropTypes.object,
  isOffline: React.PropTypes.bool,
  isChatting: React.PropTypes.bool,
  queuePosition: React.PropTypes.number,
  lastRatingRequestTimestamp: React.PropTypes.number,
  hasRating: React.PropTypes.bool
};
MessageList.defaultProps = {
  messages: [],
  agents: {},
  queuePosition: 0,
  lastRatingRequestTimestamp: 0,
  hasRating: false
};

export default MessageList;
