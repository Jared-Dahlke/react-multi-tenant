import {
	SET_FILTER_COUNTRIES,
	SET_FILTER_CATEGORIES,
	SET_FILTER_LANGUAGES,
	SET_FILTER_IAB_CATEGORIES
} from '../../action-types/engage/filters'
import {
	iabCategoriesObjValidation,
	youtubeCategoriesObjValidation,
	countriesObjValidation,
	languagesObjValidation
} from '../../../schemas/Engage/Lists/filtersSchemas'
import config from '../../../config.js'
import axios from '../../../axiosConfig'
const apiBase = config.api.listBuilderUrl

export function fetchFilterCountries() {
	let url = apiBase + `/smart-list/filters/country`
	return async (dispatch) => {
		try {
			let result = []
			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}
			if (result.status === 200) {
				countriesObjValidation.validate(result.data).catch((err) => {
					console.log(err.name, err.errors)
					alert(
						'we received different data from the api than expected from fetch countries, see console log for more details'
					)
				})
				dispatch(setFilterCountries(result.data))
			}
		} catch (error) {
			alert(
				'Error on fetch filter countries: ' + JSON.stringify(error, null, 2)
			)
		}
	}
}

export function setFilterCountries(filterCountries) {
	return {
		type: SET_FILTER_COUNTRIES,
		filterCountries
	}
}

export function fetchFilterIabCategories() {
	let url = apiBase + `/smart-list/filters/iab-category`
	return async (dispatch) => {
		try {
			let result = []
			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}
			if (result.status === 200) {
				iabCategoriesObjValidation.validate(result.data).catch((err) => {
					console.log(err.name, err.errors)
					alert(
						'we received different data from the api than expected from fetch iab categories, see console log for more details'
					)
				})
				dispatch(setFilterIabCategories(result.data))
			}
		} catch (error) {
			alert(
				'Error on fetch filter iab categories: ' +
					JSON.stringify(error, null, 2)
			)
		}
	}
}

export function setFilterIabCategories(filterIabCategories) {
	return {
		type: SET_FILTER_IAB_CATEGORIES,
		filterIabCategories
	}
}

export function fetchFilterCategories() {
	let url = apiBase + `/smart-list/filters/category`
	return async (dispatch) => {
		try {
			let result = []
			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}
			if (result.status === 200) {
				youtubeCategoriesObjValidation.validate(result.data).catch((err) => {
					console.log(err.name, err.errors)
					alert(
						'we received different data from the api than expected from fetch youtube categories, see console log for more details'
					)
				})
				dispatch(setFilterCategories(result.data))
			}
		} catch (error) {
			alert(
				'Error on fetch filter categories: ' + JSON.stringify(error, null, 2)
			)
		}
	}
}

export function setFilterCategories(filterCategories) {
	return {
		type: SET_FILTER_CATEGORIES,
		filterCategories
	}
}

export function fetchFilterLanguages() {
	let url = apiBase + `/smart-list/filters/language`
	return async (dispatch) => {
		try {
			let result = []
			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}
			if (result.status === 200) {
				languagesObjValidation.validate(result.data).catch((err) => {
					console.log(err.name, err.errors)
					alert(
						'we received different data from the api than expected from fetch languages, see console log for more details'
					)
				})
				dispatch(setFilterLanguages(result.data))
			}
		} catch (error) {
			alert(
				'Error on fetch filter languages: ' + JSON.stringify(error, null, 2)
			)
		}
	}
}

export function setFilterLanguages(filterLanguages) {
	return {
		type: SET_FILTER_LANGUAGES,
		filterLanguages
	}
}
