import '@babel/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Widget from 'components/Widget'
import { Provider } from 'react-redux'
import ChatStore from 'stores/ChatStore'

export default class ChatWidget extends Component {
  static init = () => {
    let widget = document.getElementById('widget')

    if (!widget) {
      widget = document.createElement('div')
      widget.id = 'widget'
      document.body.appendChild(widget)
    }

    // Render the main component into the dom
    ReactDOM.render(
      <Provider store={ChatStore}>
        <Widget />
      </Provider>,
      widget
    )
  }

  render() {
    return <Widget />
  }
}

window.onload = ChatWidget.init
