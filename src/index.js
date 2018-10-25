import '@babel/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Widget from 'components/Widget'
import { Provider } from 'react-redux'
import ChatStore from 'stores/ChatStore'

export default class ChatWidget extends Component {
  constructor(props) {
    super(props)
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

  setVisible(visible) {
    this.child.setVisible(visible)
  }

  setVisitorInfo(info) {
    this.child.setVisitorInfo(info)
  }

  render() {
    return (
      <Provider store={ChatStore}>
        <Widget onRef={ref => (this.child = ref)} />
      </Provider>
    )
  }
}

if (process.env.SCOPE === 'demo') {
  window.onload = ChatWidget.init
}
