'use strict';

import React, { Component } from 'react';
import SendButton from 'components/SendButton';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  getRawInput() {
    return this.refs.input;
  }

  render() {
    return (
      <div className={`input-container ${this.props.addClass}`}>
        <form
          className="input-form"
          onSubmit={this.props.onSubmit}>
            <input
              className="input"
              ref="input"
              placeholder="Enter message here"
              onChange={this.props.onChange}
              onFocus={this.props.onFocus} />
            <SendButton onClick={this.props.onSubmit} />
        </form>
      </div>
    );
  }
}


Input.displayName = 'Input';
Input.propTypes = {
  addClass: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func
};

export default Input;
