'use strict';

import React, { Component } from 'react';

class ChatImage extends Component {
  render() {
    return (
      <a href={this.props.message.attachment.url} target="_blank" className="chat-img-container">
        <div
          className="chat-img"
          style={{
            backgroundImage: `url(${this.props.message.attachment.url})`
          }}
        />
      </a>
    );
  }
}


ChatImage.displayName = 'ChatImage';
ChatImage.propTypes = {
  message: React.PropTypes.object
};
ChatImage.defaultProps = {
  message: {
    url: ''
  }
};

export default ChatImage;
