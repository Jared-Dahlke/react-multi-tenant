import {
	BRAND_PROFILES_FETCH_DATA_SUCCESS,
	REMOVE_BRAND_PROFILE,
	ADD_BRAND_PROFILE,
	BRAND_PROFILES_IS_LOADING,
	HAS_BRAND_PROFILES,
	SCENARIO_PROPERTIES_FETCH,
	BRAND_INDUSTRY_VERTICALS_FETCH_DATA_SUCCESS,
	BRAND_TOPICS_FETCH_DATA_SUCCESS,
	BRAND_PROFILE_SAVED,
	BRAND_PROFILE_SAVING,
	BRAND_PROFILE_DELETED,
	BRAND_PROFILE_DELETING,
	BRAND_TOPICS_ACTION_SELECT
} from '../action-types/brandProfiles'

export function brandProfiles(state = [], action) {
	switch (action.type) {
		case BRAND_PROFILES_FETCH_DATA_SUCCESS:
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

export function brandProfileSaved(state = false, action) {
	switch (action.type) {
		case BRAND_PROFILE_SAVED:
			return action.brandProfileSaved
		default:
			return state
	}
}

export function brandProfileSaving(state = false, action) {
	switch (action.type) {
		case BRAND_PROFILE_SAVING:
			return action.brandProfileSaving
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

export function scenarioProperties(state = [], action) {
	switch (action.type) {
		case SCENARIO_PROPERTIES_FETCH:
			return action.scenarioProperties
		default:
			return state
	}
}

export function industryVerticals(state = [], action) {
	switch (action.type) {
		case BRAND_INDUSTRY_VERTICALS_FETCH_DATA_SUCCESS:
			return action.industryVerticals
		default:
			return state
	}
}

//brand topics functions:
function markAllChildren(topic, value) {
	for (const child of topic.children) {
		child.responseId = value
		if (child.children && child.children.length > 0) {
			markAllChildren(child, value)
		}
	}
}

function markSelected(topicId, value, topic) {
	if (topic.topicId === topicId) {
		topic.responseId = value
		if (topic.children && topic.children.length > 0)
			markAllChildren(topic, value)
	} else {
		if (topic.children && topic.children.length > 0) {
			for (const child of topic.children) {
				markSelected(topicId, value, child)
			}
		}
	}
}

function setTopicAction(data, topics) {
	const topicId = data.data.topicId
	const value = data.data.value

	for (const topic of topics) {
		markSelected(topicId, value, topic)
	}
}

export function topics(state = [], action) {
	switch (action.type) {
		case BRAND_TOPICS_FETCH_DATA_SUCCESS:
			return action.topics
		case BRAND_TOPICS_ACTION_SELECT:
			let newTopics = JSON.parse(JSON.stringify(state))
			setTopicAction(action, newTopics)
			return newTopics
		default:
			return state
	}
}

//end brand topics functions
