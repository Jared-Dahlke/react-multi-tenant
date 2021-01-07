import { combineReducers } from 'redux'
import {
	lists,
	uploadedList,
	isPostingList,
	isPostingListVersionId,
	postListSuccess,
	isFetchingLists,
	fetchListsSuccess,
	isDownloadingExcel,
	isDownloadingExcelVersionId,
	createdListVersion,
	deleteAllVersionDataSuccess
} from './lists'

import { videos, channels, hasNextPage, videosHasNextPage } from './listBuilder'

import { filterCountries, filterCategories, filterLanguages } from './filters'

export default combineReducers({
	lists,
	uploadedList,
	isPostingList,
	isPostingListVersionId,
	postListSuccess,
	isFetchingLists,
	fetchListsSuccess,
	isDownloadingExcel,
	isDownloadingExcelVersionId,
	createdListVersion,
	filterCountries,
	filterCategories,
	filterLanguages,
	videos,
	channels,
	hasNextPage,
	videosHasNextPage,
	deleteAllVersionDataSuccess
})
