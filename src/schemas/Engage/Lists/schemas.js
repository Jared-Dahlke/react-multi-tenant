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

export const uploadedListObjValidation = Yup.array().of(
	Yup.object().shape({
		action: Yup.string().required(
			'The first column in your excel must be called "action"'
		),
		id: Yup.string()
			.required('The second column in your excel must be called "id"')
			.test(
				'idTest',
				'Channel ID lengths should be 24 characters, Video ID lengths should be 11 characters. You attempted to upload a file with IDs that are neither 11 or 24 characters long.',
				(id) => {
					return id.length === 24 || id.length === 11
				}
			)
	})
)
