import {
	ADMIN_SCENARIOS_IS_LOADING,
	SET_ADMIN_BRAND_SCENARIOS,
	SET_SCENARIO_LABELS,
	SCENARIO_LABELS_IS_LOADING,
	SCENARIO_TO_ARCHIVE,
	ADD_SCENARIO,
	SCENARIO_SAVING,
	SCENARIO_CREATED,
	SCENARIO_ARCHIVING,
	SCENARIO_ARCHIVED
} from '../../action-types/admin/scenarios'

export function scenarios(state = [], action) {
	switch (action.type) {
		case SET_ADMIN_BRAND_SCENARIOS:
			return action.scenarios
		case SCENARIO_TO_ARCHIVE:
			let newState = [
				...state.map((scenario) =>
					scenario.scenarioId === action.scenarioId
						? { ...scenario, archived: true }
						: scenario
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

export function scenarioLabels(state = [], action) {
	switch (action.type) {
		case SET_SCENARIO_LABELS:
			return action.scenarioLabels
		default:
			return state
	}
}

export function scenariosIsLoading(state = true, action) {
	switch (action.type) {
		case ADMIN_SCENARIOS_IS_LOADING:
			return action.adminScenariosIsLoading
		default:
			return state
	}
}

export function scenariosLabelsIsLoading(state = false, action) {
	switch (action.type) {
		case SCENARIO_LABELS_IS_LOADING:
			return action.scenariosLabelsIsLoading
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
