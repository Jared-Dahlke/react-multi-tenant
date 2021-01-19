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
	smartListVersionUnderEdit,
	deleteAllVersionDataSuccess
} from './lists'

import {
	videos,
	channels,
	hasNextPage,
	videosHasNextPage,
	videosIsLoading,
	channelsIsLoading
} from './listBuilder'

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
	smartListVersionUnderEdit,
	filterCountries,
	filterCategories,
	filterLanguages,
	videos,
	channels,
	hasNextPage,
	videosHasNextPage,
	deleteAllVersionDataSuccess,
	videosIsLoading,
	channelsIsLoading
})
