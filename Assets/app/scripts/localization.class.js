const translations = {
	'start_message': {
		'en': 'Album example',
		'sv': 'Album exempel'
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
		console.log(translations[string][culture]);
		return translations[string][culture];
	}
}
