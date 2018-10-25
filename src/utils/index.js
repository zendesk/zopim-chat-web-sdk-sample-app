import config from 'config'
const { ENV } = config

export function log() {
  if (ENV === 'dev') {
    console.log.apply(console, arguments) // eslint-disable-line no-console
  }
}

export function isAgent(nick) {
  return nick.startsWith('agent:')
}

export function isTrigger(nick) {
  return nick.startsWith('agent:trigger')
}

export function anyHumanAgent(agents) {
  return Object.keys(agents).filter(k => !isTrigger(agents[k].nick)).length > 0
}

export * from './PersistentStorage'
