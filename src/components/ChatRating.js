'use strict';

import React, { Component } from 'react';
import CardContainer from 'components/CardContainer';
import ActionButton from 'components/ActionButton';
import zChat from 'vendor/web-sdk';

class ChatRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating : zChat.getChatInfo().rating
    }
    this.rateDownButtonOnClick = this.rateDownButtonOnClick.bind(this);
    this.rateUpButtonOnClick = this.rateUpButtonOnClick.bind(this);
    this.rateAgainButtonOnClick = this.rateAgainButtonOnClick.bind(this);
  }

  rateDownButtonOnClick() {
    zChat.sendChatRating('bad');
    this.setState({rating: 'bad'});
  }

  rateUpButtonOnClick() {
    zChat.sendChatRating('good');
    this.setState({rating: 'good'});
  }

  rateAgainButtonOnClick() {
    zChat.sendChatRating(null);
    this.setState({rating: null});
  }

  render() {
    if (this.state.rating === null) {
      return (
        <CardContainer title="Chat Rating" addClass="chat-rating-card">
          {this.props.agent.display_name} has requested you to rate the chat service.
          <div className="buttons-container">
            <ActionButton
              addClass="button button-rate-down"
              label="Rate down"
              onClick={this.rateDownButtonOnClick}
            />
            <ActionButton
              addClass="button button-rate-up"
              label="Rate up"
              onClick={this.rateUpButtonOnClick}
            />
          </div>
        </CardContainer>
      );
    } else {
      return (
        <CardContainer title="Chat Rating" addClass="chat-rating-card">
          You have rated the chat service {this.state.rating}.
          <div className="buttons-container">
            <ActionButton
              addClass="button button-rate-again"
              label="Rate again"
              onClick={this.rateAgainButtonOnClick}
            />
          </div>
        </CardContainer>
      )
    }
  }
}


ChatRating.displayName = 'ChatRating';
ChatRating.propTypes = {
  agent: React.PropTypes.object
};
ChatRating.defaultProps = {
};

export default ChatRating;
