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
	SET_DELETE_ALL_VERSION_DATA_SUCCESS,
	SET_SMARTLIST_STATS,
	SET_SMARTLIST_STATS_LOADING,
	SET_POST_VERSION_BULK_ACTION_LOADING
} from '../../action-types/engage/lists'
import React from 'react'
import config from '../../../config.js'
import axios from '../../../axiosConfig'
import defaultAxios from 'axios'
import {
	listsObjValidation,
	uploadedListObjValidation,
	postListVersionResult
} from '../../../schemas/Engage/Lists/schemas'
import toast from 'react-hot-toast'
import numeral from 'numeral'
var fileDownload = require('js-file-download')
var cwait = require('cwait')

var queue = new cwait.TaskQueue(Promise, 1)
var deleteQueue = new cwait.TaskQueue(Promise, 1)

const apiBase = config.api.listBuilderUrl
let fetchListsRequest = null

const getBrandProfileNameById = (brandProfiles, brandProfileId) => {
	let bps = JSON.parse(JSON.stringify(brandProfiles))
	let bp = bps.filter((p) => p.brandProfileId === brandProfileId)
	return bp[0].brandName
}

export function fetchLists(accountId) {
	if (fetchListsRequest) {
		fetchListsRequest.cancel()
	}
	fetchListsRequest = axios.CancelToken.source()

	let url = apiBase + `/account/${accountId}/smart-list`
	return async (dispatch, getState) => {
		let result = []
		let brandProfiles = getState().brandProfiles.map(
			(brandProfile) => brandProfile.brandProfileId
		)
		if (brandProfiles.length < 1) {
			dispatch(setIsFetchingLists(false))
			return
		}

		dispatch(setIsFetchingLists(true))

		try {
			result = await defaultAxios({
				method: 'POST',
				url: url,
				data: brandProfiles,
				cancelToken: fetchListsRequest.token
			})
		} catch (error) {
			console.log(error)
		}

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
				version.brandProfileName = getBrandProfileNameById(
					getState().brandProfiles,
					version.brandProfileId
				)
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
			dispatch(setIsFetchingLists(false))
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
	return (dispatch, getState) => {
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
					response.data.brandName = data.brandProfileName
					response.data.brandProfileName = data.brandProfileName
					let listsCopy = JSON.parse(JSON.stringify(getState().engage.lists))
					listsCopy.push(response.data)
					dispatch(setSmartListVersionUnderEdit(response.data))
					dispatch(setLists(listsCopy))
					dispatch(setIsPostingList(false))
					dispatch(setPostListSuccess(true))
					setTimeout(() => {
						dispatch(setPostListSuccess(false))
					}, 100)
					toast.success('List created!')
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
	return (dispatch, getState) => {
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
					response.data.brandProfileName = args.brandProfileName
					dispatch(setSmartListVersionUnderEdit(response.data))

					let listsCopy = JSON.parse(JSON.stringify(getState().engage.lists))
					listsCopy.push(response.data)
					dispatch(setLists(listsCopy))

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
			dispatch(fetchVersionStats(args.versionId))
		} catch (error) {
			alert(error)
		}
	})
}

const Counts = ({ counts }) => {
	return (
		<>
			{counts.videosTargeted && (
				<>
					Videos targeted: {numeral(counts.videosTargeted).format('0,0')}
					<br />
				</>
			)}
			{counts.videosBlocked && (
				<>
					Videos blocked: {numeral(counts.videosBlocked).format('0,0')}
					<br />
				</>
			)}
			{counts.videosWatched && (
				<>
					Videos watched: {numeral(counts.videosWatched).format('0,0')}
					<br />
				</>
			)}
			{counts.channelsTargeted && (
				<>
					Channels targeted: {numeral(counts.channelsTargeted).format('0,0')}
					<br />
				</>
			)}
			{counts.channelsBlocked && (
				<>
					Channels blocked: {numeral(counts.channelsBlocked).format('0,0')}
					<br />
				</>
			)}
			{counts.channelsWatched && (
				<>
					Channels watched: {numeral(counts.channelsWatched).format('0,0')}{' '}
					<br />
				</>
			)}
		</>
	)
}

export const postVersionBulkAction = (args) => {
	let url = `${apiBase}/smart-list/version/${args.versionId}/action`
	return async (dispatch) => {
		dispatch(setPostVersionBulkActionLoading(true))
		let params = { iabCategoriesActions: args.iabCategoriesActions }
		const promise = axios.patch(url, params)

		toast.promise(
			promise,
			{
				loading: 'Saving...',
				success: (data) => {
					let counts = data.data
					return <Counts counts={counts} />
				},
				error: 'error'
			},
			{
				success: {
					duration: 6000
				},
				loading: {
					duration: 60000
				}
			}
		)

		const result = await promise
		dispatch(fetchVersionStats(args.versionId))
		dispatch(setPostVersionBulkActionLoading(false))
	}
}

let fetchStatsRequest = null

export const fetchVersionStats = (versionId) => {
	if (fetchStatsRequest) {
		fetchStatsRequest.cancel()
	}
	fetchStatsRequest = axios.CancelToken.source()
	let url = `${apiBase}/smart-list/version/${versionId}/stats`
	return async (dispatch) => {
		dispatch(setSmartListStatsLoading(true))

		const result = await defaultAxios({
			method: 'GET',
			url: url,
			cancelToken: fetchStatsRequest.token
		})

		if (result.status === 200) {
			dispatch(setSmartListStats(result.data))
		}

		dispatch(setSmartListStatsLoading(false))
	}
}

export function setSmartListStats(smartListStats) {
	return {
		type: SET_SMARTLIST_STATS,
		smartListStats
	}
}

export function setPostVersionBulkActionLoading(postVersionBulkActionLoading) {
	return {
		type: SET_POST_VERSION_BULK_ACTION_LOADING,
		postVersionBulkActionLoading
	}
}

export function setSmartListStatsLoading(smartListStatsLoading) {
	return {
		type: SET_SMARTLIST_STATS_LOADING,
		smartListStatsLoading
	}
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
		dispatch(fetchVersionStats(versionId))
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
	let url = apiBase + `/smart-list/${payload.smartListId}`
	return async (dispatch) => {
		dispatch(setListArchived(payload))
		try {
			const result = await axios.patch(url, { archive: payload.archive })
			if (result.status === 200) {
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function patchListName(payload) {
	let url = apiBase + `/smart-list/${payload.smartListId}`
	return async (dispatch) => {
		try {
			const result = await axios.patch(url, {
				smartListName: payload.smartListName
			})
			if (result.status === 200) {
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
