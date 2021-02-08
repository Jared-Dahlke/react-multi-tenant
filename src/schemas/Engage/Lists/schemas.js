import * as Yup from 'yup'

export const listsObjValidation = Yup.array()
	.of(
		Yup.object().shape({
			targetType: Yup.string().nullable(),
			targetTypeId: Yup.number().nullable(),
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
			}),
			archived: Yup.bool().required(),
			active: Yup.bool().required()
		})
	)
	.test(
		'idTest',
		'The api sent smartlists that have duplicate versionIds. Please address in api or database as this breaks the UI.',
		(lists) => {
			let seen = new Set()
			var hasDuplicates = lists.some(function(currentObject) {
				return seen.size === seen.add(currentObject.versionId).size
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
		.required('Please enter a name for this SmartList')
		.min(2, 'Min 2 characters')
		.max(50, 'Max 50 characters')
		.test({
			name: 'duplication',
			exclusive: false,
			params: {},
			message: 'Sorry, this name is already taken. Please try another.',
			test: function(value) {
				for (const version of this.parent.smartLists) {
					if (version.smartListName.toLowerCase() === value?.toLowerCase()) {
						return false
					}
				}
				return true
			}
		})
})

export const postListVersionResult = Yup.object().shape({
	active: Yup.bool()
		.strict(true)
		.required(),
	createdBy: Yup.number()
		.strict(true)
		.required(),
	createdDate: Yup.date().required(),
	smartListId: Yup.number()
		.strict(true)
		.required(),
	versionId: Yup.number()
		.strict(true)
		.required(),
	smartListName: Yup.string(),
	objectiveName: Yup.string().required(),
	brandProfileName: Yup.string().required()
})

export const channelsSchema = Yup.array().of(
	Yup.object().shape({
		iabCategoryId: Yup.mixed().nullable(),
		iabCategoryName: Yup.string().nullable(),
		iabSubCategoryId: Yup.mixed().nullable(),
		iabSubCategoryName: Yup.string().nullable(),
		iabSubTopicId: Yup.mixed().nullable(),
		iabSubTopicName: Yup.mixed().nullable(),
		iabTopicId: Yup.mixed().nullable(),
		iabTopicName: Yup.string().nullable(),

		actionId: Yup.number()
			.strict(true)
			.nullable(),
		categoryName: Yup.string()
			.strict(true)
			.nullable(),
		countryName: Yup.string()
			.strict(true)
			.nullable(),
		created: Yup.string()
			.strict(true)
			.required(),
		description: Yup.string()
			.strict(true)
			.nullable(),
		id: Yup.string()
			.strict(true)
			.required(),
		name: Yup.string()
			.strict(true)
			.required(),
		subscribers: Yup.number()
			.strict(true)
			.nullable(),
		allVideoCount: Yup.number()
			.strict(true)
			.required(),
		filteredVideoCount: Yup.number()
			.strict(true)
			.required(),
		thumbnail: Yup.string()
			.strict(true)
			.nullable(),
		views: Yup.number()
			.strict(true)
			.required()
	})
)

export const videosSchema = Yup.array().of(
	Yup.object().shape({
		iabCategoryId: Yup.mixed()
		.nullable(),
		iabCategoryName: Yup.string().nullable(),
		iabSubCategoryId: Yup.mixed().nullable(),
		iabSubCategoryName: Yup.string().nullable(),
		iabSubTopicId: Yup.mixed().nullable(),
		iabSubTopicName: Yup.mixed().nullable(),
		iabTopicId: Yup.mixed().nullable(),
		iabTopicName: Yup.string().nullable(),

		actionId: Yup.number()
			.strict(true)
			.nullable(),
		categoryName: Yup.string()
			.strict(true)
			.nullable(),
		channelName: Yup.string()
			.strict(true)
			.nullable(),
		countryName: Yup.string()
			.strict(true)
			.nullable(),
		published: Yup.string()
			.strict(true)
			.required(),
		description: Yup.string()
			.strict(true)
			.nullable(),
		id: Yup.string()
			.strict(true)
			.required(),
		name: Yup.string()
			.strict(true)
			.required(),
		thumbnail: Yup.string()
			.strict(true)
			.nullable(),
		subscribers: Yup.number()
			.strict(true)
			.nullable(),
		kids: Yup.boolean()
			.strict(true)
			.required(),
		views: Yup.number()
			.strict(true)
			.nullable()
	})
)
