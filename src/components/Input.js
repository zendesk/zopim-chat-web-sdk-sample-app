'use strict';

import React, { Component } from 'react';
import SendButton from 'components/SendButton';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
  }

  getRawInput() {
    return this.refs.input;
  }

  onDragOver(event) {
    this.setState({dragover: true});
    event.preventDefault();

    event.dataTransfer.dropEffect = 'copy';
  }

  onDrop(event) {
    this.setState({dragover: false});
    this.props.onFileUpload(event);
  }

  onDragLeave() {
    this.setState({dragover: false});
  }

  render() {
    const class_name = [
        'input-container',
        this.props.addClass,
        this.state.dragover ? 'drag-drop-zone' : ''
      ].join(' ');

    return (
      <div className={class_name}
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave} >
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
  onFocus: React.PropTypes.func,
  onFileUpload: React.PropTypes.func
};

export default Input;
