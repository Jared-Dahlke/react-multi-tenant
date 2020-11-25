import { combineReducers } from 'redux'
import {
	lists,
	uploadedList,
	isPostingList,
	postListSuccess,
	isFetchingLists,
	fetchListsSuccess,
	isDownloadingExcel,
	isDownloadingExcelVersionId,
	createdListVersion
} from './lists'

import { filterCountries, filterCategories, filterLanguages } from './filters'

export default combineReducers({
	lists,
	uploadedList,
	isPostingList,
	postListSuccess,
	isFetchingLists,
	fetchListsSuccess,
	isDownloadingExcel,
	isDownloadingExcelVersionId,
	createdListVersion,
	filterCountries,
	filterCategories,
	filterLanguages
})
