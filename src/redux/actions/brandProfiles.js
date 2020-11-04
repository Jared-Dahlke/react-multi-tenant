import {
	SET_BRAND_PROFILES,
	REMOVE_BRAND_PROFILE,
	ADD_BRAND_PROFILE,
	BRAND_PROFILES_IS_LOADING,
	HAS_BRAND_PROFILES,
	SET_BRAND_SCENARIOS,
	SET_BRAND_INDUSTRY_VERTICALS,
	BRAND_PROFILE_CREATED,
	BRAND_PROFILE_DELETED,
	BRAND_PROFILE_DELETING,
	BRAND_PROFILE_CREATING,
	SET_BRAND_TOPICS,
	SET_BRAND_CATEGORIES,
	SET_BRAND_PROFILE_LOADING,
	SET_BRAND_PROFILE_SAVING,
	SET_BRAND_PROFILE_SAVED,
	SCENARIO_ARCHIVING,
	SCENARIO_ARCHIVED,
	SCENARIO_TO_ARCHIVE,
	SCENARIO_CREATED,
	SCENARIO_CREATING,
	ADD_SCENARIO
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

export const createBrandProfile = (brandProfile) => {
	delete brandProfile.brandProfileId
	let url = apiBase + `/brand-profile`
	return (dispatch, getState) => {
		dispatch(removeBrandProfile('placeholder'))
		dispatch(setBrandProfileCreating(true))
		dispatch(addBrandProfile(brandProfile))
		axios
			.post(url, brandProfile)
			.then((response) => {
				let brandProfilesCopy = JSON.parse(
					JSON.stringify(getState().brandProfiles)
				)
				for (const [index, brandProfileCopy] of brandProfilesCopy.entries()) {
					if (brandProfileCopy.brandProfileId === brandProfile.brandProfileId) {
						brandProfilesCopy[index].brandProfileId =
							response.data.brandProfileId
					}
				}
				dispatch(setBrandProfiles(brandProfilesCopy))
				dispatch(setBrandProfileCreating(false))
				dispatch(setBrandProfileCreated(true))
			})
			.catch((error) => {
				//error
			})
	}
}

export const saveBrandProfile = (brandProfile) => {
	let brandProfileId = brandProfile.brandProfileId
	let url = apiBase + `/brand-profile/${brandProfileId}`
	return async (dispatch, getState) => {
		dispatch(setBrandProfileSaving(true))
		let profilesCopy = JSON.parse(JSON.stringify(getState().brandProfiles))
		for (const [index, brandProfileCopy] of profilesCopy.entries()) {
			if (brandProfile.brandProfileId === brandProfileCopy.brandProfileId) {
				profilesCopy[index] = brandProfile
			}
		}

		dispatch(setBrandProfiles(profilesCopy))
		try {
			let brandProfileCopy = JSON.parse(JSON.stringify(brandProfile))
			delete brandProfileCopy.current
			const result = await axios.patch(url, brandProfileCopy)
			if (result.status === 200) {
				dispatch(setBrandProfileSaving(false))
				dispatch(setBrandProfileSaved(true))
				setTimeout(() => {
					dispatch(setBrandProfileSaved(false))
				}, 3000)
			}
		} catch (error) {
			alert(error)
		}
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

export function fetchBrandProfilesInformation() {
	return async (dispatch, getState) => {
		let brandProfilesCopy = JSON.parse(JSON.stringify(getState().brandProfiles))
		for (const [index, brandProfile] of brandProfilesCopy.entries()) {
			let url = apiBase + `/brand-profile/${brandProfile.brandProfileId}`
			try {
				const result = await axios.get(url)
				if (result.status === 200) {
					brandProfilesCopy[index] = result.data
					dispatch(setBrandProfiles(brandProfilesCopy))
				}
			} catch (error) {
				alert(error)
			}
		}
	}
}

export function fetchBrandProfile(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}`
	return async (dispatch, getState) => {
		dispatch(setBrandProfileLoading(true))
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				brandProfileObjValidation.validate(result.data).catch(function (err) {
					console.log(err.name, err.errors)
					alert('Could not validate brand profile data')
				})

				let currBrandProfiles = JSON.parse(
					JSON.stringify(getState().brandProfiles)
				)

				for (const [index, p] of currBrandProfiles.entries()) {
					if (p.brandProfileId === brandProfileId) {
						currBrandProfiles[index] = result.data
					}
				}
				dispatch(setBrandProfiles(currBrandProfiles))
				dispatch(setBrandProfileLoading(false))
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
				brandProfilesObjValidation.validate(result.data).catch(function (err) {
					console.log(err.name, err.errors)
					alert("Could not validate account's brand profiles data")
				})
				dispatch(setBrandProfiles(brandProfiles))
				//dispatch(fetchBrandProfilesInformation())
				dispatch(brandProfilesIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function setBrandProfileLoading(bool) {
	return {
		type: SET_BRAND_PROFILE_LOADING,
		brandProfileLoading: bool
	}
}

export function brandProfilesIsLoading(bool) {
	return {
		type: BRAND_PROFILES_IS_LOADING,
		brandProfilesIsLoading: bool
	}
}

export function setBrandProfileSaving(bool) {
	return {
		type: SET_BRAND_PROFILE_SAVING,
		brandProfileSaving: bool
	}
}
export function setBrandProfileSaved(bool) {
	return {
		type: SET_BRAND_PROFILE_SAVED,
		brandProfileSaved: bool
	}
}

export function setBrandProfileCreated(bool) {
	return {
		type: BRAND_PROFILE_CREATED,
		brandProfileCreated: bool
	}
}
export function setBrandProfileCreating(bool) {
	return {
		type: BRAND_PROFILE_CREATING,
		brandProfileCreating: bool
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

export function setScenarioArchiving(bool) {
	return {
		type: SCENARIO_ARCHIVING,
		scenarioArchiving: bool
	}
}

export function setScenarioArchived(bool) {
	return {
		type: SCENARIO_ARCHIVED,
		scenarionArchived: bool
	}
}

export function setScenarioToArchived(scenarioId) {
	return {
		type: SCENARIO_TO_ARCHIVE,
		scenarioId
	}
}

export function setScenarioCreated(bool) {
	return {
		type: SCENARIO_CREATED,
		scenarioCreated: bool
	}
}

export function setScenarioCreating(bool) {
	return {
		type: SCENARIO_CREATING,
		scenarioCreating: bool
	}
}

export function addScenario(scenario) {
	return {
		type: ADD_SCENARIO,
		scenario
	}
}

export function hasBrandProfiles(bool) {
	return {
		type: HAS_BRAND_PROFILES,
		hasBrandProfiles: bool
	}
}

export function setBrandScenarios(scenarios) {
	return {
		type: SET_BRAND_SCENARIOS,
		scenarios
	}
}

function addDefaultResponseIdToScenarios(scenarios) {
	for (const scenario of scenarios) {
		scenario.scenarioResponseId = ''
	}
}

export function fetchBrandScenarios() {
	let url = apiBase + `/brand-profile/scenario`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let scenarios = result.data
				addDefaultResponseIdToScenarios(scenarios) //TODO: can delete this function once api gives a default response
				dispatch(setBrandScenarios(scenarios))
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

export const archiveScenario = (scenarioId) => {
	let url = apiBase + `/brand-profile/scenario/${scenarioId}`
	return (dispatch) => {
		dispatch(setScenarioArchiving(true))
		axios
			.patch(url)
			.then((response) => {
				dispatch(setScenarioToArchived(scenarioId))
				dispatch(setScenarioArchiving(false))
				dispatch(setScenarioArchived(true))
			})
			.catch((error) => {
				console.error(error)
			})
	}
}

export const createScenario = (scenario) => {
	let url = apiBase + `/brand-profile/scenario`
	return (dispatch, getState) => {
		dispatch(setScenarioCreating(true))
		axios
			.post(url, scenario)
			.then((response) => {
				dispatch(addScenario(scenario))
				dispatch(setScenarioCreating(false))
				dispatch(setScenarioCreated(true))
			})
			.catch((error) => {
				//error
			})
	}
}
