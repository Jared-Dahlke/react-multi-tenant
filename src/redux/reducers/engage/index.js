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
	channelsHasNextPage,
	videosHasNextPage,
	videosIsLoading,
	channelsIsLoading
} from './listBuilder'

import {
	filterCountries,
	filterCategories,
	filterIabCategories,
	filterLanguages
} from './filters'

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
	filterIabCategories,
	videos,
	channels,
	channelsHasNextPage,
	videosHasNextPage,
	deleteAllVersionDataSuccess,
	videosIsLoading,
	channelsIsLoading
})
