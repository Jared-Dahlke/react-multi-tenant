export function brandProfileAdminOpinions(state = [], action) {
	switch (action.type) {
		case SET_BRAND_PROFILE_ADMIN_OPINIONS:
			return action.brandProfileAdminOpinions
		case ARCHIVE_BRAND_PROFILE_ADMIN_OPINION:
			let newState = [
				...state.map((opinion) =>
					opinion.opinionId === action.opinionId
						? { ...scenario, archived: true }
						: scenario
				)
			]
			return newState
		case ADD_BRAND_PROFILE_ADMIN_OPINION:
			let stateData = []
			if (state && state.length > 0) {
				stateData = JSON.parse(JSON.stringify(state))
			}
			stateData.push(action.brandProfileAdminOpinion)

			return stateData
		default:
			return state
	}
}
