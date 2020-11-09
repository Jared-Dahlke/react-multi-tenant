import * as Yup from 'yup'

export const listsObjValidation = Yup.array().of(
	Yup.object().shape({
		archived: Yup.bool().required(),
		objectiveId: Yup.number().required(),
		objectiveName: Yup.string().required(),
		smartListId: Yup.number().required(),
		smartListName: Yup.string().required(),
		versions: Yup.array()
			.min(1, 'each smartlist should have at least one version')
			.of(
				Yup.object().shape({
					createdBy: Yup.number().required(),
					createdDate: Yup.date().required(),
					objectiveId: Yup.number().required(),
					objectiveName: Yup.string().required(),
					smartListId: Yup.number().required(),
					smartListName: Yup.string().required(),
					subscriberCount: Yup.number().required(),
					channelCount: Yup.number().required(),
					videoCount: Yup.number().required(),
					versionId: Yup.number().required(),
					createdBy: Yup.object().shape({
						email: Yup.string().required(),
						firstName: Yup.string().required(),
						lastName: Yup.string().required(),
						userId: Yup.number().required()
					})
				})
			)
			.required()
	})
)
