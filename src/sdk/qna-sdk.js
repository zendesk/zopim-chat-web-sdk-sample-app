import 'isomorphic-fetch'

export default {
  init({ account_key, endpoint, services_check_url }) {
    this._endpoint = endpoint
    this._account_key = account_key
    this._services_check_url = services_check_url
  },

  getServicesStatus() {
    return fetch(this._services_check_url).then(res => res.json())
  },

  sendChatMsg(message) {
    return fetch(this._endpoint, {
      method: 'POST',
      body: JSON.stringify({ question: message }),
      headers: {
        Authorization: `EndpointKey ${this._account_key}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }
}
