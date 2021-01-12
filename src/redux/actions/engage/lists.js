import {
	SET_LISTS,
	SET_LIST_ARCHIVED,
	SET_UPLOADED_LIST,
	SET_POST_LIST_SUCCESS,
	SET_IS_POSTING_LIST,
	SET_IS_POSTING_LIST_VERSION_ID,
	SET_IS_FETCHING_LISTS,
	SET_FETCH_LISTS_SUCCESS,
	SET_IS_DOWNLOADING_EXCEL,
	SET_IS_DOWNLOADING_EXCEL_VERSION_ID,
	SET_LIST_VERSION_ACTIVE,
	SET_SMARTLIST_VERSION_UNDER_EDIT,
	SET_DELETE_ALL_VERSION_DATA_SUCCESS
} from '../../action-types/engage/lists'
import config from '../../../config.js'
import axios from '../../../axiosConfig'
import {
	listsObjValidation,
	uploadedListObjValidation,
	postListVersionResult
} from '../../../schemas/Engage/Lists/schemas'
import numeral from 'numeral'
var fileDownload = require('js-file-download')
var cwait = require('cwait')

var queue = new cwait.TaskQueue(Promise, 1)
var deleteQueue = new cwait.TaskQueue(Promise, 1)

const apiBase = config.api.listBuilderUrl

export function fetchLists(accountId) {
	let url = apiBase + `/account/${accountId}/smart-list`
	return async (dispatch) => {
		dispatch(setIsFetchingLists(true))

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

			let versions = []
			for (const version of result.data) {
				//	for (const version of list.versions) {
				if (version.active) {
					version.activeText = 'Active'
				} else {
					version.activeText = 'Not Active'
				}

				if (version.archived) {
					version.archivedText = 'True'
				} else {
					version.archivedText = 'False'
				}

				if (Number(version.subscriberCount) < 1000) {
					version.subscriberCountFormatted = version.subscriberCount
				} else {
					version.subscriberCountFormatted = numeral(
						version.subscriberCount
					).format('0.0a')
				}

				if (Number(version.channelCount) < 1000) {
					version.channelCountFormatted = version.channelCount
				} else {
					version.channelCountFormatted = numeral(version.channelCount).format(
						'0.0a'
					)
				}

				if (Number(version.videoCount) < 1000) {
					version.videoCountFormatted = version.videoCount
				} else {
					version.videoCountFormatted = numeral(version.videoCount).format(
						'0.0a'
					)
				}

				versions.push(version)
			}
			dispatch(setLists(versions))
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
	let url = apiBase + `/brand-profile/${brandProfileId}/smart-list`
	return (dispatch) => {
		dispatch(setIsPostingList(true))
		axios
			.post(url, list)
			.then((response) => {
				if (response.status === 200) {
					postListVersionResult.validate(response.data).catch(function(err) {
						console.log(err.name, err.errors)
						alert(
							'after posting this list version, we received different data from the api than expected, see console log for more details'
						)
					})

					response.data.smartListName = list.smartListName
					dispatch(setSmartListVersionUnderEdit(response.data))
					dispatch(setIsPostingList(false))
					dispatch(setPostListSuccess(true))
				}
			})
			.catch((error) => {
				dispatch(setIsPostingList(false))
				console.error('create smartlist error', error)
			})
	}
}

export const cloneListVersion = (args) => {
	let versionId = args.versionId
	let smartListName = args.smartListName
	let url = apiBase + `/smart-list/version/${versionId}/clone`
	return (dispatch) => {
		dispatch(setIsPostingList(true))
		dispatch(setIsPostingListVersionId(versionId))
		axios
			.post(url)
			.then((response) => {
				if (response.status === 200) {
					postListVersionResult.validate(response.data).catch(function(err) {
						console.log(err.name, err.errors)
						alert(
							'after posting this list version, we received different data from the api than expected, see console log for more details'
						)
					})

					response.data.smartListName = smartListName
					dispatch(setSmartListVersionUnderEdit(response.data))
					dispatch(setIsPostingList(false))
					dispatch(setPostListSuccess(true))
				}
			})
			.catch((error) => {
				dispatch(setIsPostingList(false))
				console.error('create smartlist error', error)
			})
	}
}

export const patchVersionData = (args) => {
	let url = `${apiBase}/smart-list/version/${args.versionId}/data`
	return queue.wrap(async (dispatch) => {
		try {
			let params = args.data
			const result = await axios.patch(url, params)
			if (result.status === 200) {
			}
		} catch (error) {
			alert(error)
		}
	})
}

export const deleteAllVersionData = (versionId) => {
	let url = `${apiBase}/smart-list/version/${versionId}/data`
	return (dispatch) => {
		axios
			.delete(url)
			.then((response) => {
				if (response.status === 200) {
					dispatch(setDeleteAllVersionDataSuccess(true))
				}
			})
			.catch((error) => {
				console.error('delete all version error', error)
			})
	}
}

export function setDeleteAllVersionDataSuccess(deleteAllVersionDataSuccess) {
	return {
		type: SET_DELETE_ALL_VERSION_DATA_SUCCESS,
		deleteAllVersionDataSuccess
	}
}

export const deleteVersionDataItem = (args) => {
	let versionId = args.versionId
	let id = args.id
	let url = `${apiBase}/smart-list/version/${versionId}/data/${id}`
	return deleteQueue.wrap(async (dispatch) => {
		const result = await axios.delete(url)
	})
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

export function setSmartListVersionUnderEdit(smartListVersionUnderEdit) {
	return {
		type: SET_SMARTLIST_VERSION_UNDER_EDIT,
		smartListVersionUnderEdit
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

export function setIsPostingListVersionId(isPostingListVersionId) {
	return {
		type: SET_IS_POSTING_LIST_VERSION_ID,
		isPostingListVersionId
	}
}
