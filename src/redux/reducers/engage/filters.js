import {
	SET_FILTER_COUNTRIES,
	SET_FILTER_CATEGORIES,
	SET_FILTER_LANGUAGES
} from '../../action-types/engage/filters'

export function filterCategories(state = [], action) {
	switch (action.type) {
		case SET_FILTER_CATEGORIES:
			return action.filterCategories
		default:
			return state
	}
}
export function filterCountries(state = [], action) {
	switch (action.type) {
		case SET_FILTER_COUNTRIES:
			return action.filterCountries
		default:
			return state
	}
}
export function filterLanguages(state = [], action) {
	switch (action.type) {
		case SET_FILTER_LANGUAGES:
			return action.filterLanguages
		default:
			return state
	}
}
