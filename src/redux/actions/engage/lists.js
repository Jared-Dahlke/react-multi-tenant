import {
	SET_LISTS,
	SET_LIST_ARCHIVED,
	SET_UPLOADED_LIST,
	SET_POST_LIST_SUCCESS,
	SET_IS_POSTING_LIST,
	SET_IS_FETCHING_LISTS,
	SET_FETCH_LISTS_SUCCESS
} from '../../action-types/engage/lists'
import config from '../../../config.js'
import axios from '../../../axiosConfig'
import {
	listsObjValidation,
	uploadedListObjValidation
} from '../../../schemas/Engage/Lists/schemas'
const apiBase = config.api.listBuilderUrl

export function fetchLists(accountId) {
	let url = apiBase + `/account/${accountId}/smart-list`
	return async (dispatch) => {
		dispatch(setIsFetchingLists(true))
		try {
			let result = []

			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}
			dispatch(setIsFetchingLists(false))
			if (result.status === 200) {
				dispatch(setFetchListsSuccess(true))
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

export function setIsFetchingLists(isFetchingLists) {
	return {
		type: SET_IS_FETCHING_LISTS,
		isFetchingLists
	}
}

export function setFetchListsSuccess(fetchListsSuccess) {
	return {
		type: SET_FETCH_LISTS_SUCCESS,
		fetchListsSuccess
	}
}

export const postList = (data) => {
	const list = data.list
	const accountId = data.accountId
	let url = apiBase + `/account/${accountId}/smart-list`
	return (dispatch) => {
		dispatch(setIsPostingList(true))
		axios
			.post(url, list)
			.then((response) => {
				dispatch(setIsPostingList(false))
				dispatch(setPostListSuccess(true))
				dispatch(fetchLists(accountId))
			})
			.catch((error) => {
				dispatch(setIsPostingList(false))
				console.error('create account error', error)
			})
	}
}

export function setLists(lists) {
	return {
		type: SET_LISTS,
		lists
	}
}

export function setUploadedList(uploadedList) {
	uploadedListObjValidation.validate(uploadedList).catch(function(err) {
		console.log(err.name, err.errors)
		alert(`Whoops! Your file is in the wrong format. ${err.name}${err.errors}`)
	})
	return {
		type: SET_UPLOADED_LIST,
		uploadedList
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

export function setPostListSuccess(postListSuccess) {
	return {
		type: SET_POST_LIST_SUCCESS,
		postListSuccess
	}
}

export function setIsPostingList(isPostingList) {
	return {
		type: SET_IS_POSTING_LIST,
		isPostingList
	}
}
