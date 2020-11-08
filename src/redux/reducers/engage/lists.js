import { SET_LISTS } from '../../action-types/engage/lists'

export function lists(state = [], action) {
	switch (action.type) {
		case SET_LISTS:
			return action.lists
		default:
			return state
	}
}
