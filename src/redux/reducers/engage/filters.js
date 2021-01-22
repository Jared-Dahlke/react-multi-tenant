import { SET_FILTER_IAB_CATEGORIES } from '../../action-types/engage/filters'

export function filterIabCategories(state = [], action) {
	switch (action.type) {
		case SET_FILTER_IAB_CATEGORIES:
			return action.filterIabCategories
		default:
			return state
	}
}
