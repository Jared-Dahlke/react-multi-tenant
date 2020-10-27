import * as Yup from 'yup'
const urlRegex = require('url-regex')

export const schemaValidation = Yup.object().shape({
	basicInfoIndustryVerticalId: Yup.number()
		.typeError('Required')
		.required('Required'),
	basicInfoProfileName: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters')
		.required('Required'),
	basicInfoWebsiteUrl: Yup.string()
		.test(
			'urlTest',
			'Valid URL required (e.g. google.com)',
			(basicInfoWebsiteUrl) => {
				return urlRegex({ exact: true, strict: false }).test(
					basicInfoWebsiteUrl
				)
			}
		)
		.required('Required'),

	basicInfoTwitterProfile: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 30 characters')
		.required('Required'),
	topCompetitors: Yup.array()
		.typeError('Wrong type')
		.min(1, 'You have to create at least one competitor')
		.of(
			Yup.object()
				.shape({
					label: Yup.string(),
					value: Yup.string()
				})
				.transform((v) => (v === '' ? null : v))
		),
	topics: Yup.array()
		.typeError('Wrong type')
		.test('topicsTest', 'You must include at least one topic', (topics) => {
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
	if (categories.length < 1) return false
	for (const category of categories) {
		if (category.contentCategoryResponseId !== 3) return true
	}
	return false
}

function topicsHasResponse(topics) {
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
	if (scenarios.length < 1) return false
	for (const scenario of scenarios) {
		if (!scenario.scenarioResponseId || scenario.scenarioResponseId.length < 1)
			return false
	}
	return true
}
