'use strict';

import React, { Component } from 'react';
import CardContainer from 'components/CardContainer';
import ActionButton from 'components/ActionButton';
import zChat from 'vendor/web-sdk';

class ChatRating extends Component {
  constructor(props) {
    super(props);

    this.rateBadButtonOnClick = this.rateBadButtonOnClick.bind(this);
    this.rateGoodButtonOnClick = this.rateGoodButtonOnClick.bind(this);
    this.rateAgainButtonOnClick = this.rateAgainButtonOnClick.bind(this);
  }

  rateBadButtonOnClick() {
    zChat.sendChatRating('bad');
  }

  rateGoodButtonOnClick() {
    zChat.sendChatRating('good');
  }

  rateAgainButtonOnClick() {
    zChat.sendChatRating(null);
  }

  render() {
    if (this.props.shouldDisplay === false) {
      return null;
    }
    if (!this.props.hasRating) {
      return (
        <CardContainer title="Chat Rating" addClass="chat-rating-card">
          {this.props.agent.display_name} has requested you to rate the chat service.
          <div className="buttons-container">
            <ActionButton
              addClass="button button-rate-bad"
              label="Rate Bad"
              onClick={this.rateBadButtonOnClick}
            />
            <ActionButton
              addClass="button button-rate-good"
              label="Rate Good"
              onClick={this.rateGoodButtonOnClick}
            />
          </div>
        </CardContainer>
      );
    } else {
      return (
        <CardContainer title="Chat Rating" addClass="chat-rating-card">
          You have rated the chat service.
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
  agent: React.PropTypes.object,
  hasRating: React.PropTypes.bool,
  shouldDisplay: React.PropTypes.bool
};
ChatRating.defaultProps = {
  hasRating: null,
  shouldDisplay: true
};

export default ChatRating;
