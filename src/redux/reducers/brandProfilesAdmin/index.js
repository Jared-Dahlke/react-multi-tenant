import { combineReducers } from 'redux'
import {
	adminScenarios,
	adminScenariosIsLoading,
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
	adminScenarios,
	adminScenariosIsLoading,
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
