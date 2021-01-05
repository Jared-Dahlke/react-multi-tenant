import * as Yup from 'yup'

export const brandProfilesObjValidation = Yup.array().of(
	Yup.object().shape({
		accountId: Yup.number()
			.strict(true)
			.required(),
		brandName: Yup.string().required(),
		brandProfileId: Yup.number().required(),
		industryVerticalId: Yup.number().required(),
		twitterProfileUrl: Yup.mixed().test(
			'my test',
			'api sent different data than expected for twitterprofileUrl',
			(text) => {
				if (typeof text === 'string') {
					return true
				} else {
					return false
				}
			}
		),
		websiteUrl: Yup.mixed().test(
			'my test',
			'api sent different data than expected for websiteUrl',
			(text) => {
				if (typeof text === 'string') {
					return true
				} else {
					return false
				}
			}
		)
	})
)

export const basicInfoObjValidation = Yup.object().shape({
	accountId: Yup.number()
		.strict(true)
		.required(),
	brandName: Yup.string().required(),
	brandProfileId: Yup.number().required(),
	industryVerticalId: Yup.number().required(),
	twitterProfileUrl: Yup.mixed().test(
		'my test',
		'api sent different data than expected for twitterprofileUrl',
		(text) => {
			if (typeof text === 'string') {
				return true
			} else {
				return false
			}
		}
	),
	websiteUrl: Yup.mixed().test(
		'my test',
		'api sent different data than expected for websiteUrl',
		(text) => {
			if (typeof text === 'string') {
				return true
			} else {
				return false
			}
		}
	)
})

export const competitorsObjValidation = Yup.array().of(
	Yup.object().shape({
		competitorId: Yup.number()
			.strict(true)
			.required(),
		competitorName: Yup.string().required(),
		brandProfileId: Yup.number().required(),
		twitterProfileUrl: Yup.mixed().test(
			'my test',
			'api sent different data than expected for twitterprofileUrl',
			(text) => {
				if (typeof text === 'string') {
					return true
				} else {
					return false
				}
			}
		),
		websiteUrl: Yup.mixed().test(
			'my test',
			'api sent different data than expected for websiteUrl',
			(text) => {
				if (typeof text === 'string') {
					return true
				} else {
					return false
				}
			}
		)
	})
)

export const categoriesObjValidation = Yup.array().of(
	Yup.object().shape({
		contentCategoryId: Yup.number()
			.strict(true)
			.required(),
		contentCategory: Yup.string().required(),
		brandProfileId: Yup.mixed().test(
			'defined',
			'brandProfileId must be defined',
			(value) => value !== undefined
		),
		contentCategoryResponseId: Yup.mixed().test(
			'defined',
			'contentCategoryResponseId must be defined',
			(value) => value !== undefined
		)
	})
)

export const topicsObjValidation = Yup.array()
	.min(1, 'brand profiles should have at least one topics object')
	.of(
		Yup.object().shape({
			children: Yup.array().of(
				Yup.object().shape({
					parentIds: Yup.array().required(),
					topicId: Yup.number().required(),
					topicName: Yup.string().required(),
					topicResponseId: Yup.mixed().test(
						'defined',
						'topicResponseId must be defined',
						(value) => value !== undefined
					)
				})
			),
			parentIds: Yup.array().required(),
			topicId: Yup.number().required(),
			topicName: Yup.string().required(),
			topicResponseId: Yup.mixed().test(
				'defined',
				'topicResponseId must be defined',
				(value) => value !== undefined
			)
		})
	)
	.required()

export const scenariosObjValidation = Yup.array()
	.min(1)
	.of(
		Yup.object().shape({
			scenarioId: Yup.number()
				.strict(true)
				.required(),
			scenarioName: Yup.string().required(),
			brandProfileId: Yup.mixed().test(
				'defined',
				'brandProfileId must be defined',
				(value) => value !== undefined
			),
			scenarioResponseId: Yup.mixed().test(
				'defined',
				'scenarioResponseId must be defined',
				(value) => value !== undefined
			)
		})
	)

export const opinionsObjValidation = Yup.array()
	.min(1)
	.of(
		Yup.object().shape({
			opinionId: Yup.number()
				.strict(true)
				.required(),
			question: Yup.string().required(),
			opinionType: Yup.string().required(),
			brandProfileId: Yup.mixed().test(
				'defined',
				'brandProfileId must be defined',
				(value) => value !== undefined
			),
			opinionResponseId: Yup.mixed().test(
				'defined',
				'opinionResponseId must be defined',
				(value) => value !== undefined
			)
		})
	)

export const questionsObjValidation = Yup.array()
	.min(1)
	.of(
		Yup.object().shape({
			brandProfileId: Yup.mixed().test(
				'my test',
				'api sent different data than expected for brand profile questions brandProfileId',
				(text) => {
					if (typeof text === 'integer' || text == null) {
						return true
					} else {
						return false
					}
				}
			),
			question: Yup.string().required(),
			questionId: Yup.number()
				.strict(true)
				.required(),
			responseText: Yup.mixed().test(
				'my test',
				'api sent different data than expected for brand profile questions responseText',
				(text) => {
					if (typeof text === 'string' || text == null) {
						return true
					} else {
						return false
					}
				}
			)
		})
	)
