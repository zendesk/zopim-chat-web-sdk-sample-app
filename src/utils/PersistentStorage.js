import store from 'store';

const PREFIX = 'z.wdgt.';

export function get(key) {
	return store.get(PREFIX + key);
}

export function set(key, value) {
	return store.set(PREFIX + key, value);
}

function init() {
	if (!store.enabled) {
		get = function() {};
		set = function() {};
	}
}

init();
