import {
	SET_BRAND_PROFILES,
	REMOVE_BRAND_PROFILE,
	ADD_BRAND_PROFILE,
	BRAND_PROFILES_IS_LOADING,
	HAS_BRAND_PROFILES,
	SET_SCENARIOS,
	SET_BRAND_INDUSTRY_VERTICALS,
	BRAND_PROFILE_SAVED,
	BRAND_PROFILE_DELETED,
	BRAND_PROFILE_DELETING,
	BRAND_PROFILE_SAVING,
	SET_BRAND_TOPICS,
	SET_BRAND_CATEGORIES,
	SET_BRAND_PROFILE_BASIC_INFO,
	SET_BRAND_PROFILE_COMPETITORS
} from '../action-types/brandProfiles'
import axios from '../../axiosConfig'
import config from '../../config.js'
import {
	brandProfilesObjValidation,
	brandProfileObjValidation
} from '../../schemas'

const apiBase = config.apiGateway.URL

export function setBrandProfiles(brandProfiles) {
	return {
		type: SET_BRAND_PROFILES,
		brandProfiles
	}
}

export function setBrandProfileBasicInfo(brandProfileBasicInfo) {
	return {
		type: SET_BRAND_PROFILE_BASIC_INFO,
		brandProfileBasicInfo
	}
}

export function setBrandProfileCompetitors(brandProfileCompetitors) {
	return {
		type: SET_BRAND_PROFILE_COMPETITORS,
		brandProfileCompetitors
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

export function fetchBrandProfile(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}`
	return async (dispatch) => {
		//dispatch(brandProfilesIsLoading(true))
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				result.data.industryVerticalId = 47 //TODO: delete this line once API returns industryVerticalId
				brandProfileObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert('Could not validate brand profile data')
				})

				dispatch(
					setBrandProfileBasicInfo({
						twitterProfileUrl: result.data.twitterProfileUrl,
						websiteUrl: result.data.websiteUrl,
						brandName: result.data.brandName,
						industryVerticalId: result.data.industryVerticalId
					})
				)
				dispatch(setBrandProfileCompetitors(result.data.competitors))
				dispatch(setScenarios(result.data.scenarios))
				dispatch(setBrandCategories(result.data.categories))
				dispatch(setBrandTopics(result.data.topics))
			}
		} catch (error) {
			alert(error)
		}
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
				dispatch(setBrandProfiles(brandProfiles))
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

export function setScenarios(scenarios) {
	return {
		type: SET_SCENARIOS,
		scenarios
	}
}

function addDefaultResponseIdToScenarios(scenarios) {
	for (const scenario of scenarios) {
		scenario.scenarioResponseId = ''
	}
}

export function fetchBrandScenarios() {
	let url = apiBase + `/brand-profile/scenarios/properties`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let scenarios = result.data.scenario
				addDefaultResponseIdToScenarios(scenarios) //TODO: can delete this function once api gives a default response
				dispatch(setScenarios(scenarios))
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
				dispatch(setBrandIndustryVerticals(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function setBrandIndustryVerticals(industryVerticals) {
	return {
		type: SET_BRAND_INDUSTRY_VERTICALS,
		industryVerticals
	}
}

export function fetchBrandTopics() {
	let url = apiBase + `/brand-profile/topic`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				dispatch(setBrandTopics(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function setBrandTopics(topics) {
	return {
		type: SET_BRAND_TOPICS,
		topics
	}
}

export function fetchBrandCategories() {
	let url = apiBase + `/brand-profile/categories`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				dispatch(setBrandCategories(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function setBrandCategories(brandCategories) {
	return {
		type: SET_BRAND_CATEGORIES,
		brandCategories
	}
}
