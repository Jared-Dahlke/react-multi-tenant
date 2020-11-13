import {
	REMOVE_BRAND_PROFILE,
	ADD_BRAND_PROFILE,
	BRAND_PROFILES_IS_LOADING,
	HAS_BRAND_PROFILES,
	SET_BRAND_SCENARIOS,
	SET_BRAND_INDUSTRY_VERTICALS,
	SET_BRAND_TOPICS,
	SET_BRAND_CATEGORIES,
	BRAND_PROFILE_CREATED,
	BRAND_PROFILE_CREATING,
	BRAND_PROFILE_DELETED,
	BRAND_PROFILE_DELETING,
	SET_BRAND_PROFILE_BASIC_INFO,
	SET_BRAND_PROFILE_COMPETITORS,
	SET_BRAND_PROFILES,
	SET_BRAND_PROFILE_LOADING,
	SET_BRAND_PROFILE_SAVING,
	SET_BRAND_PROFILE_SAVED,
	SCENARIOS_IS_LOADING,
	SCENARIO_TO_ARCHIVE,
	ADD_SCENARIO,
	SCENARIO_SAVING,
	SCENARIO_CREATED,
	SCENARIO_ARCHIVING,
	SCENARIO_ARCHIVED,
} from '../action-types/brandProfiles'
//import configureStore from '../store/index'
//const store = configureStore()

export function brandProfiles(state = [], action) {
	switch (action.type) {
		case SET_BRAND_PROFILES:
			return action.brandProfiles
		case REMOVE_BRAND_PROFILE:
			let newState = [
				...state.filter(
					({ brandProfileId }) => brandProfileId !== action.brandProfileId
				)
			]
			return newState
		case ADD_BRAND_PROFILE:
			let stateData = []
			if (state && state.length > 0) {
				stateData = JSON.parse(JSON.stringify(state))
			}
			stateData.push(action.brandProfile)

			return stateData
		default:
			return state
	}
}

export function brandProfilesIsLoading(state = true, action) {
	switch (action.type) {
		case BRAND_PROFILES_IS_LOADING:
			return action.brandProfilesIsLoading
		default:
			return state
	}
}
export function brandProfileSaving(state = false, action) {
	switch (action.type) {
		case SET_BRAND_PROFILE_SAVING:
			return action.brandProfileSaving
		default:
			return state
	}
}
export function brandProfileSaved(state = false, action) {
	switch (action.type) {
		case SET_BRAND_PROFILE_SAVED:
			return action.brandProfileSaved
		default:
			return state
	}
}

export function brandProfileCreated(state = false, action) {
	switch (action.type) {
		case BRAND_PROFILE_CREATED:
			return action.brandProfileCreated
		default:
			return state
	}
}

export function brandProfileCreating(state = false, action) {
	switch (action.type) {
		case BRAND_PROFILE_CREATING:
			return action.brandProfileCreating
		default:
			return state
	}
}

export function brandProfileLoading(state = true, action) {
	switch (action.type) {
		case SET_BRAND_PROFILE_LOADING:
			return action.brandProfileLoading
		default:
			return state
	}
}

export function brandProfileDeleted(state = false, action) {
	switch (action.type) {
		case BRAND_PROFILE_DELETED:
			return action.brandProfileDeleted
		default:
			return state
	}
}

export function brandProfileDeleting(state = false, action) {
	switch (action.type) {
		case BRAND_PROFILE_DELETING:
			return action.brandProfileDeleting
		default:
			return state
	}
}

export function hasBrandProfiles(state = true, action) {
	switch (action.type) {
		case HAS_BRAND_PROFILES:
			return action.hasBrandProfiles
		default:
			return state
	}
}

export function scenarios(state = [], action) {
	switch (action.type) {
		case SET_BRAND_SCENARIOS:
			return action.scenarios
		case SCENARIO_TO_ARCHIVE:
			let newState = [
				...state.map(scenario =>
					(scenario.scenarioId === action.scenarioId) ?
						{ ...scenario, archived: true } : scenario
				)
			]
			return newState
		case ADD_SCENARIO:
			let stateData = []
			if (state && state.length > 0) {
				stateData = JSON.parse(JSON.stringify(state))
			}
			stateData.push(action.scenario)

			return stateData
		default:
			return state
	}
}

export function scenariosIsLoading(state = true, action) {
	switch (action.type) {
		case SCENARIOS_IS_LOADING:
			return action.scenariosIsLoading
		default:
			return state
	}
}

export function scenarioSaving(state = false, action) {
	switch (action.type) {
		case SCENARIO_SAVING:
			return action.scenarioSaving
		default:
			return state
	}
}

export function scenarioCreated(state = false, action) {
	switch (action.type) {
		case SCENARIO_CREATED:
			return action.scenarioCreated
		default:
			return state
	}
}

export function scenarioArchiving(state = '', action) {
	switch (action.type) {
		case SCENARIO_ARCHIVING:
			return action.scenarioArchiving
		default:
			return state
	}
}

export function scenarioArchived(state = false, action) {
	switch (action.type) {
		case SCENARIO_ARCHIVED:
			return action.scenarioArchived
		default:
			return state
	}
}

export function industryVerticals(state = [], action) {
	switch (action.type) {
		case SET_BRAND_INDUSTRY_VERTICALS:
			return action.industryVerticals
		default:
			return state
	}
}

export function brandProfileBasicInfo(
	state = {
		twitterProfileUrl: '',
		websiteUrl: '',
		brandName: '',
		industryVerticalId: ''
	},
	action
) {
	switch (action.type) {
		case SET_BRAND_PROFILE_BASIC_INFO:
			return action.brandProfileBasicInfo
		default:
			return state
	}
}

export function brandProfileCompetitors(state = [], action) {
	switch (action.type) {
		case SET_BRAND_PROFILE_COMPETITORS:
			return action.brandProfileCompetitors
		default:
			return state
	}
}

export function brandCategories(state = [], action) {
	switch (action.type) {
		case SET_BRAND_CATEGORIES:
			return action.brandCategories
		default:
			return state
	}
}

export function topics(state = [], action) {
	switch (action.type) {
		case SET_BRAND_TOPICS:
			return action.topics
		default:
			return state
	}
}
