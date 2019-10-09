import config from 'config';
const { ENV } = config;

export function log() {
	if (ENV === 'dev') {
		console.log.apply(console, arguments); // eslint-disable-line no-console
	}
}

export function isAgent(nick){
	return nick.indexOf('agent:') === 0;
}

export function isTrigger(nick) {
	return nick.indexOf('agent:trigger') === 0;
}

export * from'./PersistentStorage';
