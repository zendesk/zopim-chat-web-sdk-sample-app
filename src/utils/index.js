import config from 'config';
const { ENV } = config;

export function mapMessageToEntity(msg) {
	return {
		nick: msg.nick,
		display_name: msg.display_name,
		avatar_path: msg.avatar_path
	}
}

export function log() {
	if (ENV === 'dev') {
		console.log.apply(console, arguments); // eslint-disable-line no-console
	}
}

export * from'./PersistentStorage';
