import Localization from './localization.class';

class Main {
	constructor () {
		this._localization = new Localization();
	}

	initialize () {
		$('.js-welcome-title').text(this._localization.translate('start_message', 'en'));
	}
}

$(document).ready(() => {
	new Main().initialize();
})
