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
	opinionArchived
	// brandProfileAdminOpinions
})
