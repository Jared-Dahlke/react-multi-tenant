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
	deleteAllVersionDataSuccess,
	smartListStats,
	smartListStatsLoading,
	postVersionBulkActionLoading
} from './lists'

import {
	videos,
	channels,
	channelsHasNextPage,
	videosHasNextPage,
	videosIsLoading,
	channelsIsLoading,
	visibleChannelColumns,
	visibleVideoColumns,
	channelVideosHasNextPage,
	channelVideos
} from './listBuilder'

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
	videos,
	channels,
	channelsHasNextPage,
	videosHasNextPage,
	deleteAllVersionDataSuccess,
	videosIsLoading,
	channelsIsLoading,
	smartListStats,
	smartListStatsLoading,
	postVersionBulkActionLoading,
	visibleChannelColumns,
	visibleVideoColumns,
	channelVideosHasNextPage,
	channelVideos
})
