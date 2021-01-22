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

import { filterIabCategories } from './filters'

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
	filterIabCategories,
	videos,
	channels,
	channelsHasNextPage,
	videosHasNextPage,
	deleteAllVersionDataSuccess,
	videosIsLoading,
	channelsIsLoading
})
