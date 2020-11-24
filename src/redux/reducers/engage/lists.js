import {
	SET_LISTS,
	SET_LIST_ARCHIVED,
	SET_UPLOADED_LIST,
	SET_IS_POSTING_LIST,
	SET_POST_LIST_SUCCESS,
	SET_IS_FETCHING_LISTS,
	SET_FETCH_LISTS_SUCCESS,
	SET_IS_DOWNLOADING_EXCEL,
	SET_IS_DOWNLOADING_EXCEL_VERSION_ID,
	SET_LIST_VERSION_ACTIVE,
	SET_CREATED_LIST_VERSION
} from '../../action-types/engage/lists'

export function lists(state = [], action) {
	let newLists
	let smartListId
	switch (action.type) {
		case SET_LISTS:
			return action.lists
		case SET_LIST_ARCHIVED:
			newLists = JSON.parse(JSON.stringify(state))
			smartListId = action.payload.smartListId
			for (const list of newLists) {
				if (list.smartListId === smartListId) {
					list.archived = action.payload.archive
				}
			}
			return newLists
		case SET_LIST_VERSION_ACTIVE:
			newLists = JSON.parse(JSON.stringify(state))
			smartListId = action.payload.smartListId
			let versionId = action.payload.versionId
			for (const list of newLists) {
				if (list.smartListId === smartListId) {
					for (const version of list.versions) {
						version.active = false
						if (version.versionId === versionId) {
							version.active = true
						}
					}
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

export function createdListVersion(state = {}, action) {
	switch (action.type) {
		case SET_CREATED_LIST_VERSION:
			return action.createdListVersion
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

export function isDownloadingExcel(state = false, action) {
	switch (action.type) {
		case SET_IS_DOWNLOADING_EXCEL:
			return action.isDownloadingExcel
		default:
			return state
	}
}

export function isDownloadingExcelVersionId(state = null, action) {
	switch (action.type) {
		case SET_IS_DOWNLOADING_EXCEL_VERSION_ID:
			return action.isDownloadingExcelVersionId
		default:
			return state
	}
}
