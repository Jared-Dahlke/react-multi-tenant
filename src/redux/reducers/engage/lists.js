import { SET_LISTS, SET_LIST_ARCHIVED } from '../../action-types/engage/lists'

export function lists(state = [], action) {
	switch (action.type) {
		case SET_LISTS:
			return action.lists
		case SET_LIST_ARCHIVED:
			let newLists = JSON.parse(JSON.stringify(state))
			let smartListId = action.payload.smartListId
			for (const list of newLists) {
				if (list.smartListId === smartListId) {
					list.archived = action.payload.archive
				}
			}
			return newLists
		default:
			return state
	}
}
