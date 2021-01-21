import { combineReducers } from 'redux'
import {
	scenarios,
	scenariosIsLoading,
	scenarioLabels,
	scenariosLabelsIsLoading,
	scenarioSaving,
	scenarioCreated,
	scenarioArchiving,
	scenarioArchived,
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
	opinionCreated,
	opinionArchiving,
	opinionArchived
} from './opinions'
// import { brandProfileAdminOpinions } from './opinions'


import {
	permissions,
	permissions_list,
	permissionsIsLoading,
	permissionsUpdating,
	permissionsAdded,
	permissionSureToRemove,
	permissionsRemoved
} from './permissions'
// import { brandProfileAdminPermissions } from './permissions'

export default combineReducers({
	scenarios,
	scenariosIsLoading,
	scenarioLabels,
	scenariosLabelsIsLoading,
	scenarioSaving,
	scenarioCreated,
	scenarioArchiving,
	scenarioArchived,
	labels,
	labelDeleting,
	labelsIsLoading,
	labelSaving,
	initLabelAdd,
	opinions,
	opinionsIsLoading,
	opinionSaving,
	opinionCreated,
	opinionArchiving,
	opinionArchived,
	// brandProfileAdminOpinions
	permissions,
	permissions_list,
	permissionsIsLoading,
	permissionsUpdating,
	permissionsAdded,
	permissionSureToRemove,
	permissionsRemoved
})
