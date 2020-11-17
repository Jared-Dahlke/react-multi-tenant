import { combineReducers } from 'redux'
import {
	scenarios,
	scenariosIsLoading,
	scenarioSaving,
	scenarioCreated,
	scenarioArchiving,
	scenarioArchived,
	adminOpinions,
	adminOpinionsIsLoading,
	opinionSaving,
	opinionCreated,
	opinionArchiving,
	opinionArchived
} from './scenarios'
// import { brandProfileAdminOpinions } from './opinions'

export default combineReducers({
	scenarios,
	scenariosIsLoading,
	scenarioSaving,
	scenarioCreated,
	scenarioArchiving,
	scenarioArchived,
	adminOpinions,
	adminOpinionsIsLoading,
	opinionSaving,
	opinionCreated,
	opinionArchiving,
	opinionArchived
	// brandProfileAdminOpinions
})
