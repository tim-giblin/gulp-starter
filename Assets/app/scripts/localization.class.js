const translations = {
	'start_message': {
		'en': 'Welcome to this site',
		'sv': 'Välkommen till denna hemsida'
	}
}

export default class Localization {
	/**
	 * Pass in the translation name and a culture
	 * @param  {String} string
	 * @param  {String} culture
	 * @return {string} translated string
	 */
	translate (string, culture = 'en') {
		console.log("testing...");
		return translations[string][culture];
	}
}
