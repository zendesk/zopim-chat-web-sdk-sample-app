import '@babel/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Widget from 'components/Widget'
import { Provider } from 'react-redux'
import ChatStore from 'stores/ChatStore'

export default class ChatWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: null
    }
  }

  static init = ({ selector = 'widget' } = {}) => {
    let widget = document.getElementById(selector)

    if (!widget) {
      widget = document.createElement('div')
      widget.id = selector
      document.body.appendChild(widget)
    }

    // Render the main component into the dom
    return ReactDOM.render(<ChatWidget />, widget)
  }

  toggle(visible) {
    this.setState({
      visible
    })
  }

  render() {
    return (
      <Provider store={ChatStore}>
        <Widget visible={this.state.visible} />
      </Provider>
    )
  }
}

if (process.env.NODE_ENV === 'development') {
  window.onload = ChatWidget.init
}
