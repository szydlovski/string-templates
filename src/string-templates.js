const StringTemplateError = require('./StringTemplateError.js');
const { extractDeepProperty } = require('@szydlovski/deep-property');

function getSlotsFromTemplate(template) {
	return (template.match(/(\${.+?})/g) || []).reduce(
		(unique, slot) => (!unique.includes(slot) ? [...unique, slot] : unique),
		[]
	);
}

function interpolateStringTemplate(template, values) {

	if (typeof template !== 'string') {
		throw new TypeError('Template must be a string.');
	}

	if (typeof values !== 'object' || values === null) {
		throw new TypeError('Values must be an object.');
	}

	const slots = getSlotsFromTemplate(template);

	for (const slot of slots) {
		const prop = slot.substring(2, slot.length - 1).trim();
		const [exists, value] = extractDeepProperty(values, prop);
		if (exists) {
			const regex = new RegExp(slot.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'g');
			template = template.replace(regex, value);
		} else {
			throw new StringTemplateError(`No value found for ${slot}.`);
		}
	}
	
	return template;
}

function isStringTemplate(value) {
	return typeof value !== 'string' ? false : getSlotsFromTemplate(string).length !== 0;
}

function stringTemplateFactory(template) {
	return function (values, options) {
		return interpolateStringTemplate(template, values, options);
	};
}

module.exports = {
	interpolateStringTemplate,
	stringTemplateFactory,
	isStringTemplate,
	StringTemplateError
};
