import { combineReducers } from 'redux'
import {
	scenarios,
	scenariosIsLoading,
	scenarioSaving,
	scenarioCreated,
	scenarioArchiving,
	scenarioArchived,
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
	permissionsArchiving,
	permissionsArchived,
	permissionsRemoved
} from './permissions'
// import { brandProfileAdminPermissions } from './permissions'

export default combineReducers({
	scenarios,
	scenariosIsLoading,
	scenarioSaving,
	scenarioCreated,
	scenarioArchiving,
	scenarioArchived,
	opinions,
	opinionsIsLoading,
	opinionSaving,
	opinionCreated,
	opinionArchiving,
	opinionArchived,
	// brandProfileAdminOpinions
	permissions,
	permissions_list,
	permissionsArchiving,
	permissionsArchived,
	permissionsRemoved
})
