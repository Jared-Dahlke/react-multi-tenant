import { combineReducers } from 'redux'
import {
	lists,
	uploadedList,
	isPostingList,
	postListSuccess,
	isFetchingLists,
	fetchListsSuccess,
	isDownloadingExcel,
	isDownloadingExcelVersionId
} from './lists'

export default combineReducers({
	lists,
	uploadedList,
	isPostingList,
	postListSuccess,
	isFetchingLists,
	fetchListsSuccess,
	isDownloadingExcel,
	isDownloadingExcelVersionId
})
