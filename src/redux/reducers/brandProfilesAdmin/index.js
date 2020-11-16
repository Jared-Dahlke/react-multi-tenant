import { combineReducers } from 'redux'
import {
	scenarios,
	scenariosIsLoading,
	scenarioSaving,
	scenarioCreated,
	scenarioArchiving,
	scenarioArchived
} from './scenarios'
// import { brandProfileAdminOpinions } from './opinions'

export default combineReducers({
	scenarios,
	scenariosIsLoading,
	scenarioSaving,
	scenarioCreated,
	scenarioArchiving,
	scenarioArchived
	// brandProfileAdminOpinions
})
