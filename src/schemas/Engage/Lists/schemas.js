import * as Yup from 'yup'

export const listsObjValidation = Yup.array()
	.of(
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
	.test(
		'idTest',
		'The api sent smartlists that have duplicate smartListIds. Please address in api or database as this breaks the UI.',
		(lists) => {
			let seen = new Set()
			var hasDuplicates = lists.some(function(currentObject) {
				return seen.size === seen.add(currentObject.smartListId).size
			})

			return !hasDuplicates
		}
	)

export const uploadedListObjValidation = Yup.array()
	.of(
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
	.test(
		'idTest',
		'You attempted to upload a file that has a mixture of video and channelIds, a list can either be Channels or videos but not both.',
		(listData) => {
			let VideoCount = 0
			let ChannelCount = 0
			for (const item of listData) {
				if (item.id.length === 24) {
					++VideoCount
				}
				if (item.id.length === 11) {
					++ChannelCount
				}
			}
			if (VideoCount > 0 && ChannelCount > 0) {
				return false
			} else {
				return true
			}
		}
	)

export const postListObjValidation = Yup.object().shape({
	objectiveId: Yup.number().required(),
	brandProfileId: Yup.number().required(),
	smartListName: Yup.string()
		.required()
		.min(2)
		.max(50)
})
