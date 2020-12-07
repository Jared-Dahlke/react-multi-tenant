import {
	REMOVE_BRAND_PROFILE,
	ADD_BRAND_PROFILE,
	BRAND_PROFILES_IS_LOADING,
	HAS_BRAND_PROFILES,
	SET_BRAND_INDUSTRY_VERTICALS,
	BRAND_PROFILE_CREATED,
	BRAND_PROFILE_CREATING,
	BRAND_PROFILE_DELETED,
	BRAND_PROFILE_DELETING,
	SET_BRAND_PROFILES,
	SET_BRAND_PROFILE_LOADING,
	SET_BRAND_PROFILE_SAVING,
	SET_BRAND_PROFILE_SAVED,
	SCENARIOS_IS_LOADING,
	SET_BRAND_PROFILE_UNDER_EDIT,
	SET_BRAND_PROFILE_CATEGORIES,
	SET_BRAND_PROFILE_COMPETITORS,
	SET_BRAND_PROFILE_TOPICS,
	SET_BRAND_PROFILE_SCENARIOS,
	SET_BRAND_PROFILE_OPINIONS
} from '../action-types/brandProfiles'

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

export function brandProfileUnderEdit(
	state = {
		brandName: '',
		websiteUrl: '',
		industryVerticalId: -1,
		twitterProfileUrl: '',
		//competitors: [],
		//categories: [],
		//	topics: [],
		//	scenarios: [],
		//	opinions: [],
		brandProfileId: ''
	},
	action
) {
	switch (action.type) {
		case SET_BRAND_PROFILE_UNDER_EDIT:
			return action.brandProfileUnderEdit
		case SET_BRAND_PROFILE_COMPETITORS:
			return {
				...state,
				competitors: action.competitors
			}
		case SET_BRAND_PROFILE_CATEGORIES:
			return {
				...state,
				categories: action.categories
			}
		case SET_BRAND_PROFILE_TOPICS:
			return {
				...state,
				topics: action.topics
			}
		case SET_BRAND_PROFILE_SCENARIOS:
			return {
				...state,
				scenarios: action.scenarios
			}
		case SET_BRAND_PROFILE_OPINIONS:
			return {
				...state,
				opinions: action.opinions
			}
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

export function scenariosIsLoading(state = true, action) {
	switch (action.type) {
		case SCENARIOS_IS_LOADING:
			return action.scenariosIsLoading
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
