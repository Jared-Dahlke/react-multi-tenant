import {
	SET_LISTS,
	SET_LIST_ARCHIVED,
	SET_UPLOADED_LIST,
	SET_IS_POSTING_LIST,
	SET_POST_LIST_SUCCESS,
	SET_IS_FETCHING_LISTS,
	SET_FETCH_LISTS_SUCCESS
} from '../../action-types/engage/lists'

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

export function uploadedList(state = [], action) {
	switch (action.type) {
		case SET_UPLOADED_LIST:
			return action.uploadedList
		default:
			return state
	}
}

export function isPostingList(state = false, action) {
	switch (action.type) {
		case SET_IS_POSTING_LIST:
			return action.isPostingList
		default:
			return state
	}
}

export function postListSuccess(state = false, action) {
	switch (action.type) {
		case SET_POST_LIST_SUCCESS:
			return action.postListSuccess
		default:
			return state
	}
}

export function fetchListsSuccess(state = false, action) {
	switch (action.type) {
		case SET_FETCH_LISTS_SUCCESS:
			return action.fetchListsSuccess
		default:
			return state
	}
}

export function isFetchingLists(state = true, action) {
	switch (action.type) {
		case SET_IS_FETCHING_LISTS:
			return action.isFetchingLists
		default:
			return state
	}
}
