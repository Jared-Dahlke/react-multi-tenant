export function brandProfileAdminScenarios(state = [], action) {
	switch (action.type) {
		case SET_BRAND_PROFILE_ADMIN_SCENARIOS:
			return action.brandProfileAdminScenarios
		case ARCHIVE_BRAND_PROFILE_ADMIN_SCENARIO:
			let newState = [
				...state.map((scenario) =>
					scenario.scenarioId === action.scenarioId
						? { ...scenario, archived: true }
						: scenario
				)
			]
			return newState
		case ADD_BRAND_PROFILE_ADMIN_SCENARIO:
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
