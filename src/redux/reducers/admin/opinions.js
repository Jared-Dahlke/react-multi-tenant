import {
	ADMIN_OPINIONS_IS_LOADING,
	SET_ADMIN_BRAND_OPINIONS,
	OPINION_TO_ARCHIVE,
	ADD_OPINION,
	OPINION_SAVING,
	OPINION_CREATED,
	OPINION_ARCHIVING,
	OPINION_ARCHIVED
} from '../../action-types/admin/opinions'

export function opinions(state = [], action) {
	switch (action.type) {
		case SET_ADMIN_BRAND_OPINIONS:
			return action.opinions
		case OPINION_TO_ARCHIVE:
			let newState = [
				...state.map((opinion) =>
					opinion.opinionId === action.opinionId
						? { ...opinion, archived: true }
						: opinion
				)
			]
			return newState
		case ADD_OPINION:
			let stateData = []
			if (state && state.length > 0) {
				stateData = JSON.parse(JSON.stringify(state))
			}
			stateData.push(action.opinion)

			return stateData
		default:
			return state
	}
}

export function opinionsIsLoading(state = true, action) {
	switch (action.type) {
		case ADMIN_OPINIONS_IS_LOADING:
			return action.adminOpinionsIsLoading
		default:
			return state
	}
}

export function opinionSaving(state = false, action) {
	switch (action.type) {
		case OPINION_SAVING:
			return action.opinionSaving
		default:
			return state
	}
}

export function opinionArchiving(state = '', action) {
	switch (action.type) {
		case OPINION_ARCHIVING:
			return action.opinionArchiving
		default:
			return state
	}
}
