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
	labelArchiving,
	labelsIsLoading,
	labelSaving,
	initLabelAdd,
	types,
	typeArchiving,
	typesIsLoading,
	typeSaving,
	initTypeAdd
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
	labelArchiving,
	labelsIsLoading,
	labelSaving,
	initLabelAdd,
	types,
	typeArchiving,
	typesIsLoading,
	typeSaving,
	initTypeAdd,
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
