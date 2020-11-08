import { SET_LISTS } from '../../action-types/engage/lists'

const mockLists = [
	{
		smartListId: 1,
		smartListName: 'TestList',
		archived: false,
		objectiveId: 1,
		objectiveName: 'Reach',
		versions: [
			{
				objectiveId: 1,
				objectiveName: 'Reach',
				smartListId: 1,
				smartListName: 'TestList',
				versionId: 1,
				createdBy: 'Eric D',
				createdDate: '202010010930',
				subscriberCount: 234,
				videoCount: 456,
				channelCount: 1,
				active: true
			},
			{
				objectiveId: 1,
				objectiveName: 'Reach',
				smartListId: 1,
				smartListName: 'TestList',
				versionId: 1,
				createdBy: 'Rob C',
				createdDate: '202010011030',
				subscriberCount: 56,
				videoCount: 5675,
				channelCount: 3,
				active: false
			}
		]
	},
	{
		smartListId: 2,
		smartListName: 'TestList2',
		archived: false,
		objectiveId: 1,
		objectiveName: 'Reach',
		versions: [
			{
				objectiveId: 1,
				objectiveName: 'Reach',
				smartListId: 2,
				smartListName: 'TestList2',
				versionId: 2,
				createdBy: 'Rob C',
				createdDate: '202010011030',
				subscriberCount: 34563,
				videoCount: 34563,
				channelCount: 356,
				active: true
			},
			{
				objectiveId: 1,
				objectiveName: 'Reach',
				smartListId: 2,
				smartListName: 'TestList2',
				versionId: 2,
				createdBy: 'Suzan F',
				createdDate: '202010011030',
				subscriberCount: 56,
				videoCount: 34563,
				channelCount: 5,
				active: false
			}
		]
	}
]

export function fetchLists(accountId) {
	//let url = apiBase + `/account/${accountId}/users`
	return async (dispatch) => {
		try {
			let result = []

			try {
				//result = await axios.get(url)
			} catch (error) {
				//console.log(error)
			}

			dispatch(setLists(mockLists))

			//if (result.status === 200) {
			//}
		} catch (error) {
			alert('Error on fetch account users: ' + JSON.stringify(error, null, 2))
		}
	}
}

export function setLists(lists) {
	return {
		type: SET_LISTS,
		lists
	}
}
