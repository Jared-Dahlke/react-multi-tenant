import {
	SET_BRAND_PROFILES,
	REMOVE_BRAND_PROFILE,
	ADD_BRAND_PROFILE,
	BRAND_PROFILES_IS_LOADING,
	HAS_BRAND_PROFILES,
	SET_BRAND_INDUSTRY_VERTICALS,
	BRAND_PROFILE_CREATED,
	BRAND_PROFILE_DELETED,
	BRAND_PROFILE_DELETING,
	BRAND_PROFILE_CREATING,
	SET_BRAND_PROFILE_LOADING,
	SET_BRAND_PROFILE_SAVING,
	SET_BRAND_PROFILE_SAVED,
	SCENARIOS_IS_LOADING,
	SET_BRAND_PROFILE_UNDER_EDIT
} from '../action-types/brandProfiles'
import axios from '../../axiosConfig'
import config from '../../config.js'

var cwait = require('cwait')
var categoriesQueue = new cwait.TaskQueue(Promise, 1)
var topicsQueue = new cwait.TaskQueue(Promise, 1)
var scenariosQueue = new cwait.TaskQueue(Promise, 1)
var opinionsQueue = new cwait.TaskQueue(Promise, 1)

const apiBase = config.api.userAccountUrl

export function setBrandProfiles(brandProfiles) {
	return {
		type: SET_BRAND_PROFILES,
		brandProfiles
	}
}

export function fetchBrandProfileBasic(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/basic`
	return async (dispatch, getState) => {
		//	dispatch(setBrandProfileLoading(true))
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let currBrandProfiles = JSON.parse(
					JSON.stringify(getState().brandProfiles)
				)

				for (const [index, p] of currBrandProfiles.entries()) {
					if (p.brandProfileId === brandProfileId) {
						currBrandProfiles[index].brandName = result.data.brandName
					}
				}
				dispatch(setBrandProfiles(currBrandProfiles))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileCompetitors(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/competitors`
	return async (dispatch, getState) => {
		//	dispatch(setBrandProfileLoading(true))
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				let currBrandProfiles = JSON.parse(
					JSON.stringify(getState().brandProfiles)
				)

				for (const [index, p] of currBrandProfiles.entries()) {
					if (p.brandProfileId === brandProfileId) {
						currBrandProfiles[index].competitors = result.data
					}
				}
				dispatch(setBrandProfiles(currBrandProfiles))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileCategories(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/categories`
	return async (dispatch, getState) => {
		//	dispatch(setBrandProfileLoading(true))
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				let currBrandProfiles = JSON.parse(
					JSON.stringify(getState().brandProfiles)
				)

				for (const [index, p] of currBrandProfiles.entries()) {
					if (p.brandProfileId === brandProfileId) {
						currBrandProfiles[index].categories = result.data
					}
				}
				dispatch(setBrandProfiles(currBrandProfiles))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileTopics(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/topics`
	return async (dispatch, getState) => {
		//	dispatch(setBrandProfileLoading(true))
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				let currBrandProfiles = JSON.parse(
					JSON.stringify(getState().brandProfiles)
				)

				for (const [index, p] of currBrandProfiles.entries()) {
					if (p.brandProfileId === brandProfileId) {
						currBrandProfiles[index].topics = result.data
					}
				}
				dispatch(setBrandProfiles(currBrandProfiles))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileScenarios(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/scenarios`
	return async (dispatch, getState) => {
		//	dispatch(setBrandProfileLoading(true))
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				let currBrandProfiles = JSON.parse(
					JSON.stringify(getState().brandProfiles)
				)

				for (const [index, p] of currBrandProfiles.entries()) {
					if (p.brandProfileId === brandProfileId) {
						currBrandProfiles[index].scenarios = result.data
					}
				}
				dispatch(setBrandProfiles(currBrandProfiles))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileOpinions(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/opinions`
	return async (dispatch, getState) => {
		//	dispatch(setBrandProfileLoading(true))
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				let currBrandProfiles = JSON.parse(
					JSON.stringify(getState().brandProfiles)
				)

				for (const [index, p] of currBrandProfiles.entries()) {
					if (p.brandProfileId === brandProfileId) {
						currBrandProfiles[index].opinions = result.data
					}
				}
				dispatch(setBrandProfiles(currBrandProfiles))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export const createBrandProfile = () => {
	let url = apiBase + `/brand-profile`
	return (dispatch, getState) => {
		dispatch(setBrandProfileCreating(true))
		let brandProfile = {
			accountId: getState().currentAccountId,
			brandName: 'My first brand profile'
		}

		axios
			.post(url, brandProfile)
			.then((response) => {
				if (response.status === 200) {
					response.data.industryVerticalId = ''
					let copy = JSON.parse(JSON.stringify(response.data))
					dispatch(addBrandProfile(copy))
					dispatch(setBrandProfileCreating(false))
					dispatch(setBrandProfileCreated(true))
					dispatch(setBrandProfileUnderEdit(response.data))
				}
			})
			.catch((error) => {
				//error
			})
	}
}

export function setBrandProfileUnderEdit(brandProfileUnderEdit) {
	return {
		type: SET_BRAND_PROFILE_UNDER_EDIT,
		brandProfileUnderEdit
	}
}

export const patchBrandProfileBasicInfo = (brandProfile) => {
	return async (dispatch, getState) => {
		dispatch(setBrandProfileSaving(true))

		let profiles = JSON.parse(JSON.stringify(getState().brandProfiles))
		for (const profile of profiles) {
			if (profile.brandProfileId === brandProfile.brandProfileId) {
				profile.brandName = brandProfile.brandName
				profile.twitterProfileUrl = brandProfile.twitterProfileUrl
				profile.industryVerticalId = brandProfile.industryVerticalId
				profile.websiteUrl = brandProfile.websiteUrl
			}
		}
		dispatch(setBrandProfiles(profiles))

		brandProfile.accountId = getState().currentAccountId
		let url = apiBase + `/brand-profile/${brandProfile.brandProfileId}`
		const result = await axios.patch(url, brandProfile)
		if (result.status === 200) {
			dispatch(setBrandProfileSaving(false))
			dispatch(setBrandProfileSaved(true))
		}
	}
}

export const patchBrandProfileCompetitors = (data) => {
	let brandProfileId = data.brandProfileId
	let competitors = data.competitors

	return async (dispatch, getState) => {
		dispatch(setBrandProfileSaving(true))

		let url = apiBase + `/brand-profile/${brandProfileId}/competitors`
		const result = await axios.patch(url, competitors)
		if (result.status === 200) {
			dispatch(setBrandProfileSaving(false))
			dispatch(setBrandProfileSaved(true))
		}
	}
}

export const patchBrandProfileCategories = (data) => {
	let brandProfileId = data.brandProfileId
	let categories = data.categories

	for (const category of categories) {
		delete category.contentCategoryName
		delete category.contentCategory
		delete category.contentCategoryResponseName
		delete category.brandProfileId
		if (!category.contentCategoryResponseId) {
			category.contentCategoryResponseId = -1
		}
	}

	let url = apiBase + `/brand-profile/${brandProfileId}/categories`
	return categoriesQueue.wrap(async (dispatch) => {
		dispatch(setBrandProfileSaving(true))
		const result = await axios.patch(url, categories)
		if (result.status === 201 || result.status === 200) {
			dispatch(setBrandProfileSaving(false))
			dispatch(setBrandProfileSaved(true))
		}
	})
}

export const patchBrandProfileTopics = (data) => {
	let brandProfileId = data.brandProfileId
	let topics = data.topics
	let url = apiBase + `/brand-profile/${brandProfileId}/topics`
	return topicsQueue.wrap(async (dispatch) => {
		dispatch(setBrandProfileSaving(true))
		const result = await axios.patch(url, topics)
		if (result.status === 201 || result.status === 200) {
			dispatch(setBrandProfileSaving(false))
			dispatch(setBrandProfileSaved(true))
		}
	})
}

export const patchBrandProfileScenarios = (data) => {
	let brandProfileId = data.brandProfileId
	let scenarios = data.scenarios

	let datas = {
		scenarios: scenarios,
		scenarioResponseId: Math.floor(Math.random() * 3) + 1
	}

	let url = apiBase + `/brand-profile/${brandProfileId}/scenarios`

	return scenariosQueue.wrap(async (dispatch) => {
		dispatch(setBrandProfileSaving(true))
		const result = await axios.patch(url, scenarios)
		if (result.status === 201 || result.status === 200) {
			dispatch(setBrandProfileSaving(false))
			dispatch(setBrandProfileSaved(true))
		}
	})
}

export const patchBrandProfileOpinions = (data) => {
	let brandProfileId = data.brandProfileId
	let opinions = data.opinions

	let url = apiBase + `/brand-profile/${brandProfileId}/opinions`

	return opinionsQueue.wrap(async (dispatch) => {
		dispatch(setBrandProfileSaving(true))
		const result = await axios.patch(url, opinions)
		if (result.status === 201 || result.status === 200) {
			dispatch(setBrandProfileSaving(false))
			dispatch(setBrandProfileSaved(true))
		}
	})
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

				dispatch(setBrandProfiles(brandProfiles))
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

export function setScenariosIsLoading(bool) {
	return {
		type: SCENARIOS_IS_LOADING,
		scenariosIsLoading: bool
	}
}

export function hasBrandProfiles(bool) {
	return {
		type: HAS_BRAND_PROFILES,
		hasBrandProfiles: bool
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
