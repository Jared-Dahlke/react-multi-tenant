import {
	BRAND_PROFILES_FETCH_DATA_SUCCESS,
	REMOVE_BRAND_PROFILE,
	ADD_BRAND_PROFILE,
	BRAND_PROFILES_IS_LOADING,
	HAS_BRAND_PROFILES,
	SCENARIOS_FETCH,
	BRAND_INDUSTRY_VERTICALS_FETCH_DATA_SUCCESS,
	BRAND_PROFILE_SAVED,
	BRAND_PROFILE_DELETED,
	BRAND_PROFILE_DELETING,
	BRAND_PROFILE_SAVING,
	BRAND_TOPICS_FETCH_DATA_SUCCESS,
	BRAND_TOPICS_ACTION_SELECT,
	BRAND_SCENARIOS_ACTION_SELECT,
	BRAND_CATEGORIES_ACTION_SELECT,
	BRAND_CATEGORIES_FETCH_DATA_SUCCESS
} from '../action-types/brandProfiles'
import axios from '../../axiosConfig'
import config from '../../config.js'
import { brandProfilesObjValidation } from '../../schemas'

const apiBase = config.apiGateway.URL

export function brandProfilesFetchDataSuccess(brandProfiles) {
	return {
		type: BRAND_PROFILES_FETCH_DATA_SUCCESS,
		brandProfiles
	}
}

export const createBrandProfile = (brandProfile) => {
	let url = apiBase + `/brand-profile`
	return (dispatch) => {
		dispatch(setBrandProfileSaving(true))
		dispatch(addBrandProfile(brandProfile))
		axios
			.post(url, brandProfile)
			.then((response) => {
				dispatch(setBrandProfileSaving(false))
				dispatch(setBrandProfileSaved(true))
			})
			.catch((error) => {
				//error
			})
	}
}

export function addBrandProfile(brandProfile) {
	return {
		type: ADD_BRAND_PROFILE,
		brandProfile
	}
}

export function removeBrandProfile(brandProfileId) {
	return {
		type: REMOVE_BRAND_PROFILE,
		brandProfileId
	}
}

export const deleteBrandProfile = (brandProfileId) => {
	let url = apiBase + `/brand-profile/${brandProfileId}`
	return (dispatch) => {
		dispatch(setBrandProfileDeleting(true))
		dispatch(removeBrandProfile(brandProfileId))
		axios
			.delete(url)
			.then((response) => {
				dispatch(setBrandProfileDeleting(false))
				dispatch(setBrandProfileDeleted(true))
			})
			.catch((error) => {
				console.error(error)
			})
	}
}

export function fetchBrandProfiles(accountId) {
	let url = apiBase + `/account/${accountId}/brand-profiles`
	return async (dispatch) => {
		dispatch(brandProfilesIsLoading(true))
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				let brandProfiles = result.data
				if (brandProfiles.length < 1) {
					dispatch(hasBrandProfiles(false))
				}
				brandProfilesObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert("Could not validate account's brand profiles data")
				})
				dispatch(brandProfilesFetchDataSuccess(brandProfiles))
				dispatch(brandProfilesIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function brandProfilesIsLoading(bool) {
	return {
		type: BRAND_PROFILES_IS_LOADING,
		brandProfilesIsLoading: bool
	}
}

export function setBrandProfileSaved(bool) {
	return {
		type: BRAND_PROFILE_SAVED,
		brandProfileSaved: bool
	}
}
export function setBrandProfileSaving(bool) {
	return {
		type: BRAND_PROFILE_SAVING,
		brandProfileSaving: bool
	}
}
export function setBrandProfileDeleted(bool) {
	return {
		type: BRAND_PROFILE_DELETED,
		brandProfileDeleted: bool
	}
}
export function setBrandProfileDeleting(bool) {
	return {
		type: BRAND_PROFILE_DELETING,
		brandProfileDeleting: bool
	}
}

export function hasBrandProfiles(bool) {
	return {
		type: HAS_BRAND_PROFILES,
		hasBrandProfiles: bool
	}
}

export function scenariosFetch(scenarios) {
	return {
		type: SCENARIOS_FETCH,
		scenarios
	}
}

export function fetchBrandScenarios() {
	let url = apiBase + `/brand-profile/scenarios/properties`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				console.log('result from fetch')
				console.log(result)
				let scenarios = result.data.scenario
				dispatch(scenariosFetch(scenarios))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandIndustryVerticals() {
	let url = apiBase + `/brand-profile/industry-verticals`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				dispatch(brandIndustryVerticalsFetchDataSuccess(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function brandIndustryVerticalsFetchDataSuccess(industryVerticals) {
	return {
		type: BRAND_INDUSTRY_VERTICALS_FETCH_DATA_SUCCESS,
		industryVerticals
	}
}

export function fetchBrandTopics() {
	let url = apiBase + `/brand-profile/topic`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				dispatch(brandTopicsFetchDataSuccess(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function brandTopicsFetchDataSuccess(topics) {
	return {
		type: BRAND_TOPICS_FETCH_DATA_SUCCESS,
		topics
	}
}

export function fetchBrandCategories() {
	let url = apiBase + `/brand-profile/categories`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				dispatch(brandCategoriesFetchDataSuccess(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function brandCategoriesFetchDataSuccess(brandCategories) {
	return {
		type: BRAND_CATEGORIES_FETCH_DATA_SUCCESS,
		brandCategories
	}
}

export function brandTopicsActionSelect(data) {
	return {
		type: BRAND_TOPICS_ACTION_SELECT,
		data
	}
}

export function brandCategoriesActionSelect(data) {
	return {
		type: BRAND_CATEGORIES_ACTION_SELECT,
		data
	}
}

export function brandScenariosActionSelect(data) {
	return {
		type: BRAND_SCENARIOS_ACTION_SELECT,
		data
	}
}
