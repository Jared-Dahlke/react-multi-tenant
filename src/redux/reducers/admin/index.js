import { combineReducers } from 'redux'
import {
	scenarios,
	scenariosIsLoading,
	scenarioLabels,
	scenariosLabelsIsLoading,
	scenarioTypes,
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
	questions,
	questionArchiving,
	questionsIsLoading,
	questionSaving,
	initQuestionAdd
} from './questions'


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
	scenarioTypes,
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
	questions,
	questionArchiving,
	questionsIsLoading,
	questionSaving,
	initQuestionAdd,
	permissions,
	permissions_list,
	permissionsIsLoading,
	permissionsUpdating,
	permissionSureToRemove
})
