'use strict';

import React, { Component } from 'react';
import CardContainer from 'components/CardContainer';
import ActionButton from 'components/ActionButton';

class ChatRating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <CardContainer title="Chat Rating" addClass="chat-rating-card">
          {this.props.agent.display_name} has requested you to rate the chat service.
          <div className="buttons-container">
            <ActionButton
              addClass="button button-rate-down"
              label="Rate down"
            />
            <ActionButton
              addClass="button button-rate-up"
              label="Rate up"
            />
          </div>
        </CardContainer>
      );
    }
  }


ChatRating.displayName = 'ChatRating';
ChatRating.propTypes = {
  agent: React.PropTypes.object
};
ChatRating.defaultProps = {
};

export default ChatRating;
