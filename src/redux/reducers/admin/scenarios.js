import {
	SET_ADMIN_SCENARIOS_IS_LOADING,
	SET_ADMIN_BRAND_SCENARIOS,
	SET_SCENARIO_LABELS,
	SET_SCENARIO_LABELS_IS_LOADING,
	SET_SCENARIO_TYPES,
	SET_SCENARIO_TO_ARCHIVE,
	SET_ADD_SCENARIO,
	SET_SCENARIO_SAVING,
	SET_SCENARIO_ARCHIVING,
	SET_ADMIN_LABELS,
	SET_LABELS_IS_LOADING,
	SET_LABEL_DELETING,
	SET_LABEL_TO_DELETE,
	SET_ADD_LABEL,
	SET_LABEL_SAVING,
	SET_LABEL_TO_CREATE,
	SET_ADMIN_TYPES,
	SET_TYPES_IS_LOADING,
	SET_TYPE_ARCHIVING,
	SET_TYPE_TO_ARCHIVE,
	SET_ADD_TYPE,
	SET_TYPE_SAVING,
	SET_TYPE_TO_CREATE
} from '../../action-types/admin/scenarios'

export function scenarios(state = [], action) {
	switch (action.type) {
		case SET_ADMIN_BRAND_SCENARIOS:
			return action.scenarios
		case SET_SCENARIO_TO_ARCHIVE:
			let newState = [
				...state.map((scenario) =>
					scenario.scenarioId === action.scenarioId
						? { ...scenario, archived: true }
						: scenario
				)
			]
			return newState
		case SET_ADD_SCENARIO:
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

export function scenarioTypes(state = [], action) {
	switch (action.type) {
		case SET_SCENARIO_TYPES:
			return action.scenarioTypes
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
		case SET_ADMIN_SCENARIOS_IS_LOADING:
			return action.adminScenariosIsLoading
		default:
			return state
	}
}

export function scenariosLabelsIsLoading(state = false, action) {
	switch (action.type) {
		case SET_SCENARIO_LABELS_IS_LOADING:
			return action.scenariosLabelsIsLoading
		default:
			return state
	}
}

export function scenarioSaving(state = false, action) {
	switch (action.type) {
		case SET_SCENARIO_SAVING:
			return action.scenarioSaving
		default:
			return state
	}
}

export function scenarioArchiving(state = '', action) {
	switch (action.type) {
		case SET_SCENARIO_ARCHIVING:
			return action.scenarioArchiving
		default:
			return state
	}
}

export function labels(state = [], action) {
	switch (action.type) {
		case SET_ADMIN_LABELS:
			return action.labels
		case SET_LABEL_TO_DELETE:
			let newState = [
				...state.filter(({ labelId }) => labelId !== action.labelId)
			]
			return newState
		case SET_ADD_LABEL:
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
		case SET_LABEL_DELETING:
			return action.labelDeleting
		default:
			return state
	}
}

export function labelsIsLoading(state = false, action) {
	switch (action.type) {
		case SET_LABELS_IS_LOADING:
			return action.labelsIsLoading
		default:
			return state
	}
}

export function labelSaving(state = false, action) {
	switch (action.type) {
		case SET_LABEL_SAVING:
			return action.labelSaving
		default:
			return state
	}
}

export function initLabelAdd(state = false, action) {
	switch (action.type) {
		case SET_LABEL_TO_CREATE:
			return action.initLabelAdd
		default:
			return state
	}
}

export function types(state = [], action) {
	switch (action.type) {
		case SET_ADMIN_TYPES:
			return action.types
		case SET_TYPE_TO_ARCHIVE:
			let newState = [
				...state.map((type) =>
					type.typeId === action.typeId
						? { ...type, archived: true }
						: type
				)
			]
			return newState
		case SET_ADD_TYPE:
			let stateData = []
			if (state && state.length > 0) {
				stateData = JSON.parse(JSON.stringify(state))
			}
			stateData.push(action.scenarioType)

			return stateData
		default:
			return state
	}
}

export function typeArchiving(state = '', action) {
	switch (action.type) {
		case SET_TYPE_ARCHIVING:
			return action.typeArchiving
		default:
			return state
	}
}

export function typesIsLoading(state = false, action) {
	switch (action.type) {
		case SET_TYPES_IS_LOADING:
			return action.typesIsLoading
		default:
			return state
	}
}

export function typeSaving(state = false, action) {
	switch (action.type) {
		case SET_TYPE_SAVING:
			return action.typeSaving
		default:
			return state
	}
}

export function initTypeAdd(state = false, action) {
	switch (action.type) {
		case SET_TYPE_TO_CREATE:
			return action.initTypeAdd
		default:
			return state
	}
}
