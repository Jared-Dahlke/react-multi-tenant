import { SET_FILTER_IAB_CATEGORIES } from '../../action-types/engage/filters'
import { iabCategoriesObjValidation } from '../../../schemas/Engage/Lists/filtersSchemas'
import config from '../../../config.js'
import axios from '../../../axiosConfig'
const apiBase = config.api.listBuilderUrl

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
