'use strict';

import React, { Component } from 'react';

class QueuePosition extends Component {
  render() {
    if (this.props.position <= 0) return null;

    return (
      <div className="system-msg-container">
        <span className="system-msg">Queue position: {this.props.position}</span>
      </div>
    );
  }
}

QueuePosition.displayName = 'QueuePosition';
QueuePosition.propTypes = {
  position: React.PropTypes.number
};
QueuePosition.defaultProps = {
  position: 0
};

export default QueuePosition;
