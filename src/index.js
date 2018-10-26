import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Widget from 'components/Widget'
import { Provider } from 'react-redux'
import ChatStore from 'stores/ChatStore'
import PropTypes from 'prop-types'

class ChatWidget extends Component {
  constructor(props) {
    super(props)
  }

  static init = ({ selector = 'widget', theme = 'hype' } = {}) => {
    let widget = document.getElementById(selector)

    if (!widget) {
      widget = document.createElement('div')
      widget.id = selector
      document.body.appendChild(widget)
    }

    // Render the main component into the dom
    return ReactDOM.render(<ChatWidget theme={theme} />, widget)
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
        <Widget onRef={ref => (this.child = ref)} theme={this.props.theme} />
      </Provider>
    )
  }
}

ChatWidget.displayName = 'ChatWidget'
ChatWidget.propTypes = {
  theme: PropTypes.string
}

export default ChatWidget

if (process.env.SCOPE === 'demo') {
  window.onload = ChatWidget.init
}
