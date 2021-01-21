import { combineReducers } from 'redux'
import {
	scenarios,
	scenariosIsLoading,
	scenarioLabels,
	scenariosLabelsIsLoading,
	scenarioSaving,
	scenarioArchiving,
	labels,
	labelDeleting,
	labelsIsLoading,
	labelSaving,
	initLabelAdd
} from './scenarios'

import {
	opinions,
	opinionsIsLoading,
	opinionSaving,
	opinionArchiving
} from './opinions'

import {
	permissions,
	permissions_list,
	permissionsIsLoading,
	permissionsUpdating,
	permissionSureToRemove
} from './permissions'

export default combineReducers({
	scenarios,
	scenariosIsLoading,
	scenarioLabels,
	scenariosLabelsIsLoading,
	scenarioSaving,
	scenarioArchiving,
	labels,
	labelDeleting,
	labelsIsLoading,
	labelSaving,
	initLabelAdd,
	opinions,
	opinionsIsLoading,
	opinionSaving,
	opinionArchiving,

	permissions,
	permissions_list,
	permissionsIsLoading,
	permissionsUpdating,
	permissionSureToRemove
})
