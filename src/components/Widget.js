require('styles/Widget.scss');

import config from 'config';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import StatusContainer from 'components/StatusContainer';
import MessageList from 'components/MessageList';
import ChatButton from 'components/ChatButton';
import Input from 'components/Input';
import { log, get, set } from 'utils';
import { debounce } from 'lodash';
import zChat from 'vendor/web-sdk';

const { ENV, ACCOUNT_KEY, THEME } = config;

if (ENV === 'dev') {
  window.zChat = zChat;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      theme: THEME,
      typing: false,
      visible: false
    };
    this.timer = null;
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.getVisibilityClass = this.getVisibilityClass.bind(this);
    this.minimizeOnClick = this.minimizeOnClick.bind(this);
    this.chatButtonOnClick = this.chatButtonOnClick.bind(this);
    this.mapToEntities = this.mapToEntities.bind(this);
    this.isOffline = this.isOffline.bind(this);
    this.stopTyping = debounce(this.stopTyping.bind(this), 1000);
    this.setVisible = this.setVisible.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount() {
    zChat.init({
      account_key: ACCOUNT_KEY
    });

    const events = [
      'account_status',
      'connection_update',
      'department_update',
      'visitor_update',
      'agent_update',
      'chat',
      'error'
    ];

    events.forEach((evt) => {
      zChat.on(evt, (data) => {
        this.props.dispatch({
          type: evt,
          detail: data
        });
      });
    });

    // Expose onThemeChange to allow dynamic change of theme
    if (ENV === 'dev') {
      window.onThemeChange = this.onThemeChange.bind(this);
    }

    this.setState({
      visible: get('visible') || this.state.visible,
      theme: get('theme') || this.state.theme
    });
  }

  handleOnChange() {
    if (!this.state.typing) {
      zChat.sendTyping(true);
      this.setState({ typing: true });
    }
    this.stopTyping();
  }

  stopTyping() {
    if (!this.state.typing) return;

    zChat.sendTyping(false);
    this.setState({ typing: false });
  }

  handleOnSubmit(event) {
    event && event.preventDefault();

    // Don't allow visitor to send msg if not chatting
    if (this.isOffline()) return;

    const msg = this.refs.input.getRawInput().value;

    // Don't send empty messages
    if (!msg) return;

    // Immediately stop typing
    this.stopTyping.flush();
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
    this.refs.input.getRawInput().value = '';
  }

  handleFileUpload(event) {
    event.preventDefault();

    // Don't allow visitor to send file if offline
    if (this.isOffline()) return;

    // Only send the first file dropped on input
    const file = event.dataTransfer.files[0];

    // Generate attachment object for local echo
    const attachment = {
      mime_type: file.type,
      name: file.name,
      size: file.size,
      url: window.URL.createObjectURL(file)
    }

    zChat.sendFile(file, (err) => {
      if (err) {
        log('Error occured >>>', err);
        return;
      }
    });

    this.props.dispatch({
      type: 'synthetic',
      detail: {
        type: 'visitor_send_file',
        attachment
      }
    });
  }

  getVisibilityClass() {
    return this.state.visible ? 'visible' : '';
  }

  minimizeOnClick() {
    this.setVisible(false);
  }

  chatButtonOnClick() {
    this.setVisible(true);
  }

  setVisible(visible) {
    this.setState({
      visible
    });
    set('visible', visible);
  }

  mapToEntities(visitor, agents) {
    const entities = {};
    if (visitor) {
      entities[visitor.nick] = {
        ...visitor,
        type: 'visitor'
      };
    }

    if (agents && Object.keys(agents).length) {
      Object.values(agents).forEach((agent) => {
        if (!agent.nick) return;

        entities[agent.nick] = {
          ...agent,
          type: 'agent'
        };
      });
    }

    if (this.props.data.account_status === 'offline' && !this.props.data.is_chatting) {
      entities['agent:offline'] = {
        type: 'agent',
        nick: 'agent:offline'
      }
    }

    return entities;
  }

  setTheme(theme) {
    this.setState({
      theme
    });
    set('theme', theme);
  }

  onThemeChange(theme) {
    if (theme !== 'docked' && theme !== 'normal') {
      theme = 'docked';
    }

    this.setTheme(theme);
  }

  getTheme() {
    return this.state.theme;
  }

  isOffline() {
    return this.props.data.account_status === 'offline' && !this.props.data.is_chatting;
  }

  render() {
    if (!ACCOUNT_KEY) {
      if (ENV === 'dev') {
        return (
          <div className="warning-container">
            <div className="warning">
              🚨🚨🚨&nbsp;&nbsp;&nbsp;You might have forgotten to configure the widget with your own account key.&nbsp;&nbsp;&nbsp;🚨🚨🚨
              <br/><br/>
              Check the README for more details.
            </div>
          </div>
        );
      }
      else {
        return <div/>;
      }
    }

    const entities = this.mapToEntities(this.props.data.visitor, this.props.data.agents);
    const isOffline = this.isOffline();

    return (
      <div className="index">
        <div className={`widget-container ${this.getTheme()} ${this.getVisibilityClass()}`}>
          <StatusContainer
            accountStatus={this.props.data.account_status}
            minimizeOnClick={this.minimizeOnClick}
          />
          <MessageList
            visible={this.state.visible}
            queuePosition={this.props.data.queue_position}
            isChatting={this.props.data.is_chatting}
            isOffline={isOffline}
            messages={this.props.data && this.props.data.chats.toArray()}
            agents={this.props.data.agents}
            entities={entities}
            lastRatingRequestTimestamp={this.props.data.last_rating_request_timestamp}
            hasRating={this.props.data.has_rating}
          />
          <div className={`spinner-container ${this.state.visible && this.props.data.connection !== 'connected' ? 'visible' : ''}`}>
            <div className="spinner"></div>
          </div>
          <Input
            addClass={this.props.data.is_chatting ? 'visible' : ''}
            ref="input"
            onSubmit={this.handleOnSubmit}
            onChange={this.handleOnChange}
            onFocus={this.inputOnFocus}
            onFileUpload={this.handleFileUpload}
          />
        </div>
        <ChatButton addClass={this.getVisibilityClass()} onClick={this.chatButtonOnClick} />
      </div>
    );
  }
}

App.displayName = 'App';

const mapStateToProps = (state) => {
  return {
    data: state
  }
}

const WrappedApp = connect(
  mapStateToProps
)(App);

export default WrappedApp;
