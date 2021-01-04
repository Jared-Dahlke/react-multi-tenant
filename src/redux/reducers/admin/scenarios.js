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
	SCENARIO_ARCHIVED,
	SET_ADMIN_LABELS,
	LABELS_IS_LOADING,
	LABEL_DELETING,
	LABEL_DELETED,
	LABEL_TO_DELETE,
	ADD_LABEL,
	LABEL_SAVING,
	LABEL_CREATED,
	LABEL_TO_CREATE
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

export function labels(state = [], action) {
	switch (action.type) {
		case SET_ADMIN_LABELS:
			return action.labels
		case LABEL_TO_DELETE:
			let newState = [
				...state.filter(
					({ labelId }) => labelId !== action.labelId
				)
			]
			return newState
		case ADD_LABEL:
			let stateData = []
			if (state && state.length > 0) {
				stateData = JSON.parse(JSON.stringify(state))
			}
			stateData.push(action.label)

			return stateData
		default:
			return state
	}
}

export function labelDeleting(state = '', action) {
	switch (action.type) {
		case LABEL_DELETING:
			return action.labelDeleting
		default:
			return state
	}
}

export function labelDeleted(state = false, action) {
	switch (action.type) {
		case LABEL_DELETED:
			return action.labelDeleted
		default:
			return state
	}
}

export function labelsIsLoading(state = false, action) {
	switch (action.type) {
		case LABELS_IS_LOADING:
			return action.labelsIsLoading
		default:
			return state
	}
}

export function labelSaving(state = false, action) {
	switch (action.type) {
		case LABEL_SAVING:
			return action.labelSaving
		default:
			return state
	}
}

export function labelCreated(state = false, action) {
	switch (action.type) {
		case LABEL_CREATED:
			return action.labelCreated
		default:
			return state
	}
}

export function initLabelAdd(state = false, action) {
	switch (action.type) {
		case LABEL_TO_CREATE:
			return action.initLabelAdd
		default:
			return state
	}
}
