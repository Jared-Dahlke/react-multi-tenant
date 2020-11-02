import * as Yup from 'yup'
const urlRegex = require('url-regex')

export const schemaValidation = Yup.object().shape({
	basicInfoIndustryVerticalId: Yup.number()
		.typeError('Required')
		.required('Required'),
	basicInfoProfileName: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters'),
	basicInfoWebsiteUrl: Yup.string()
		.required('Required')
		.test('urlTest', 'Valid URL required', (basicInfoWebsiteUrl) => {
			return urlRegex({ exact: true, strict: false }).test(basicInfoWebsiteUrl)
		}),
	basicInfoTwitterProfile: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 30 characters'),

	topCompetitors: Yup.array()
		.typeError('Wrong type')
		.min(1, 'At least one competitor is required'),
	topics: Yup.array()
		.typeError('Wrong type')
		.test('topicsTest', 'Please include at least one topic', (topics) => {
			return topicsHasResponse(topics)
		}),
	scenarios: Yup.array()
		.typeError('Wrong type')
		.test(
			'scenariosTest',
			'Please select a response for each scenario',
			(scenarios) => {
				return scenariosAllHaveAResponse(scenarios)
			}
		),
	categories: Yup.array()
		.typeError('Wrong type')
		.test(
			'categoriesTest',
			'Please take action on at least one category',
			(categories) => {
				return categoriesHasResponse(categories)
			}
		)
})

function categoriesHasResponse(categories) {
	if (!categories || categories.length < 1) return false
	for (const category of categories) {
		if (category.contentCategoryResponseId !== 3) return true
	}
	return false
}

function topicsHasResponse(topics) {
	if (!topics || topics.length < 1) return false
	for (const topic of topics) {
		if (topic.topicResponseId == 1) return true
		if (topic.children && topic.children.length > 0) {
			const childHasResponse = topicsHasResponse(topic.children)
			if (childHasResponse) return childHasResponse
		}
	}
	return false
}

function scenariosAllHaveAResponse(scenarios) {
	if (!scenarios || scenarios.length < 1) return false
	for (const scenario of scenarios) {
		if (!scenario.scenarioResponseId || scenario.scenarioResponseId.length < 1)
			return false
	}
	return true
}

export const stepValidated = (index, errors, values) => {
	if (!errors || Object.keys(errors).length < 1) {
		return true
	}
	if (index === 0) {
		return (
			customIsValid(errors, 'basicInfo') &&
			customIsValid(errors, 'topCompetitors')
		)
	}
	if (index === 1) {
		return (
			customIsValid(errors, 'scenarios') && customIsValid(errors, 'categories')
		)
	}

	if (index === 2) {
		return customIsValid(errors, 'topics')
	}
	return true
}

const customIsValid = (errors, formName) => {
	for (var prop in errors) {
		if (Object.prototype.hasOwnProperty.call(errors, prop)) {
			if (prop.includes(formName)) {
				return false
			}
		}
	}

	return true
}
