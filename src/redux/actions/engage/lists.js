import {
	SET_LISTS,
	SET_LIST_ARCHIVED,
	SET_UPLOADED_LIST,
	SET_POST_LIST_SUCCESS,
	SET_IS_POSTING_LIST,
	SET_IS_FETCHING_LISTS,
	SET_FETCH_LISTS_SUCCESS,
	SET_IS_DOWNLOADING_EXCEL,
	SET_IS_DOWNLOADING_EXCEL_VERSION_ID,
	SET_LIST_VERSION_ACTIVE
} from '../../action-types/engage/lists'
import config from '../../../config.js'
import axios from '../../../axiosConfig'
import {
	listsObjValidation,
	uploadedListObjValidation
} from '../../../schemas/Engage/Lists/schemas'
var fileDownload = require('js-file-download')
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
	const brandProfileId = data.brandProfileId
	const accountId = data.accountId
	let url = apiBase + `/brand-profile/${brandProfileId}/smart-list`
	return (dispatch) => {
		dispatch(setIsPostingList(true))
		axios
			.post(url, list)
			.then((response) => {
				if (response.status === 200) {
					dispatch(setIsPostingList(false))
					dispatch(setPostListSuccess(true))
				}
				dispatch(fetchLists(accountId))
			})
			.catch((error) => {
				dispatch(setIsPostingList(false))
				console.error('create smartlist error', error)
			})
	}
}

export function setIsDownloadingExcel(isDownloadingExcel) {
	return {
		type: SET_IS_DOWNLOADING_EXCEL,
		isDownloadingExcel
	}
}

export function setIsDownloadingExcelVersionId(isDownloadingExcelVersionId) {
	return {
		type: SET_IS_DOWNLOADING_EXCEL_VERSION_ID,
		isDownloadingExcelVersionId
	}
}

export function downloadExcelList(payload) {
	let versionId = payload.versionId
	let smartListName = payload.smartListName
	let url = apiBase + `/smart-list/version/${versionId}/download`
	return (dispatch) => {
		dispatch(setIsDownloadingExcel(true))
		dispatch(setIsDownloadingExcelVersionId(versionId))
		axios
			.get(url, { responseType: 'blob' })
			.then((response) => {
				fileDownload(response.data, `${smartListName}.xlsx`)
				dispatch(setIsDownloadingExcel(false))
				dispatch(setIsDownloadingExcelVersionId(null))
			})
			.catch((error) => {
				dispatch(setIsDownloadingExcel(false))
				dispatch(setIsDownloadingExcelVersionId(null))
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
		alert(`Whoops! Your file is in the wrong format.`)
		return {
			type: SET_UPLOADED_LIST,
			uploadedList: []
		}
	})
	return {
		type: SET_UPLOADED_LIST,
		uploadedList
	}
}

export function archiveList(payload) {
	//	let accountId = account.accountId
	let url =
		apiBase + `/smart-list/${payload.smartListId}?archive=${payload.archive}`
	return async (dispatch) => {
		dispatch(setListArchived(payload))
		try {
			const result = await axios.patch(url)
			if (result.status === 200) {
				//	dispatch(setAccountSaving(false))
				//	dispatch(setAccountSaved(true))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function activateListVersion(payload) {
	let versionId = payload.versionId

	//	let accountId = account.accountId
	let url = apiBase + `/smart-list/version/${versionId}/active`
	return async (dispatch) => {
		dispatch(setListVersionActive(payload))
		try {
			const result = await axios.patch(url)
			if (result.status === 200) {
				//	dispatch(setAccountSaving(false))
				//	dispatch(setAccountSaved(true))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function setListVersionActive(payload) {
	return {
		type: SET_LIST_VERSION_ACTIVE,
		payload
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
