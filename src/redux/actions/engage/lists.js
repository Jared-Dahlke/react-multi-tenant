import { SET_LISTS, SET_LIST_ARCHIVED } from '../../action-types/engage/lists'
import config from '../../../config.js'
import axios from '../../../axiosConfig'
import { listsObjValidation } from '../../../schemas/Engage/Lists/schemas'
const apiBase = config.api.listBuilderUrl

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
	console.log('called fetch lists')
	let url = apiBase + `/account/1/smart-list`
	return async (dispatch) => {
		try {
			let result = []

			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}

			if (result.status === 200) {
				console.log(result)
				listsObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						'we received different data from the api than expected, see console log for more details'
					)
				})
				dispatch(setLists(result.data))
			}
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

export function archiveList(payload) {
	//	let accountId = account.accountId
	//	let url = apiBase + `/account/${accountId}`
	return async (dispatch) => {
		dispatch(setListArchived(payload))
		try {
			//const result = await axios.patch(url, account)
			//if (result.status === 200) {
			//	console.log(result)
			//	dispatch(setAccountSaving(false))
			//	dispatch(setAccountSaved(true))
			//}
		} catch (error) {
			alert(error)
		}
	}
}

export function setListArchived(payload) {
	return {
		type: SET_LIST_ARCHIVED,
		payload
	}
}
