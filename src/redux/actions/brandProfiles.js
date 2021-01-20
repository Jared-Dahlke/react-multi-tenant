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
	SET_BRAND_PROFILE_UNDER_EDIT,
	SET_BRAND_PROFILE_CATEGORIES,
	SET_BRAND_PROFILE_COMPETITORS,
	SET_BRAND_PROFILE_TOPICS,
	SET_BRAND_PROFILE_SCENARIOS,
	SET_BRAND_PROFILE_OPINIONS,
	SET_BRAND_PROFILE_BASIC_INFO,
	SET_BRAND_PROFILE_QUESTIONS
} from '../action-types/brandProfiles'
import axios from '../../axiosConfig'
import config from '../../config.js'

import {
	brandProfilesObjValidation,
	basicInfoObjValidation,
	competitorsObjValidation,
	categoriesObjValidation,
	topicsObjValidation,
	scenariosObjValidation,
	opinionsObjValidation,
	questionsObjValidation
} from '../../schemas/brandProfiles'

var cwait = require('cwait')
var categoriesQueue = new cwait.TaskQueue(Promise, 1)
var topicsQueue = new cwait.TaskQueue(Promise, 1)
var scenariosQueue = new cwait.TaskQueue(Promise, 1)
var opinionsQueue = new cwait.TaskQueue(Promise, 1)
var questionsQueue = new cwait.TaskQueue(Promise, 1)

const apiBase = config.api.userAccountUrl

export function setBrandProfiles(brandProfiles) {
	return {
		type: SET_BRAND_PROFILES,
		brandProfiles
	}
}

export function fetchBrandProfileBasic(brandProfileId) {
	return async (dispatch, getState) => {
		let url = apiBase + `/brand-profile/${brandProfileId}/basic`
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				basicInfoObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						' we received different data from the api than expected while fetching brand profile basic info, see console log for more details'
					)
				})

				let brandProfile = getState().brandProfileUnderEdit
				brandProfile.brandProfileId = result.data.brandProfileId
				brandProfile.brandName = result.data.brandName
				brandProfile.websiteUrl = result.data.websiteUrl
				brandProfile.industryVerticalId = result.data.industryVerticalId
				brandProfile.twitterProfileUrl = result.data.twitterProfileUrl
				brandProfile.primaryKPI = result.data.primaryKPI
					? result.data.primaryKPI
					: ''
				brandProfile.secondaryKPI = result.data.secondaryKPI
					? result.data.secondaryKPI
					: ''
				brandProfile.tertiaryKPI = result.data.tertiaryKPI
					? result.data.tertiaryKPI
					: ''
				dispatch(setBrandProfileUnderEdit(brandProfile))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileCompetitors(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/competitors`
	return async (dispatch, getState) => {
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				if (result.data.length > 0) {
					competitorsObjValidation.validate(result.data).catch(function(err) {
						console.log(err.name, err.errors)
						alert(
							' we received different data from the api than expected while fetching brand profile competitors, see console log for more details'
						)
					})
				}
				dispatch(setBrandProfileCompetitors(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileCategories(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/categories`
	return async (dispatch, getState) => {
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				categoriesObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						' we received different data from the api than expected while fetching brand profile categories, see console log for more details'
					)
				})
				dispatch(setBrandProfileCategories(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileTopics(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/topics`
	return async (dispatch, getState) => {
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				topicsObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						' we received different data from the api than expected while fetching brand profile topics, see console log for more details'
					)
				})
				dispatch(setBrandProfileTopics(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileScenarios(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/scenarios`
	return async (dispatch, getState) => {
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				scenariosObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						' we received different data from the api than expected while fetching brand profile scenarios, see console log for more details'
					)
				})
				dispatch(setBrandProfileScenarios(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileOpinions(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/opinions`
	return async (dispatch, getState) => {
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				opinionsObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						' we received different data from the api than expected while fetching brand profile opinions, see console log for more details'
					)
				})
				dispatch(setBrandProfileOpinions(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchBrandProfileQuestions(brandProfileId) {
	let url = apiBase + `/brand-profile/${brandProfileId}/questions`
	return async (dispatch, getState) => {
		try {
			const result = await axios.get(url)

			if (result.status === 200) {
				questionsObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						' we received different data from the api than expected while fetching brand profile questions, see console log for more details'
					)
				})
				dispatch(setBrandProfileQuestions(result.data))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export const createBrandProfile = () => {
	let url = apiBase + `/brand-profile`
	return (dispatch, getState) => {
		let initialName =
			getState().brandProfiles.length > 0
				? 'UNTITLED_BRAND_PROFILE'
				: 'My first brand profile'
		dispatch(setBrandProfileCreating(true))
		let brandProfile = {
			accountId: getState().currentAccountId,
			brandName: initialName
		}

		axios
			.post(url, brandProfile)
			.then((response) => {
				if (response.status === 200) {
					basicInfoObjValidation.validate(response.data).catch(function(err) {
						console.log(err.name, err.errors)
						alert(
							' we received different data from the api than expected after creating a  brand profile, see console log for more details'
						)
					})

					response.data.industryVerticalId = -1
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

export function setBrandProfileBasicInfo(basicInfo) {
	return {
		type: SET_BRAND_PROFILE_BASIC_INFO,
		basicInfo
	}
}

export function setBrandProfileCategories(categories) {
	return {
		type: SET_BRAND_PROFILE_CATEGORIES,
		categories
	}
}

export function setBrandProfileCompetitors(competitors) {
	return {
		type: SET_BRAND_PROFILE_COMPETITORS,
		competitors
	}
}

export function setBrandProfileTopics(topics) {
	return {
		type: SET_BRAND_PROFILE_TOPICS,
		topics
	}
}

export function setBrandProfileScenarios(scenarios) {
	return {
		type: SET_BRAND_PROFILE_SCENARIOS,
		scenarios
	}
}

export function setBrandProfileOpinions(opinions) {
	return {
		type: SET_BRAND_PROFILE_OPINIONS,
		opinions
	}
}

export function setBrandProfileQuestions(questions) {
	return {
		type: SET_BRAND_PROFILE_QUESTIONS,
		questions
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
				profile.primaryKPI = brandProfile.primaryKPI
				profile.secondaryKPI = brandProfile.secondaryKPI
				profile.tertiaryKPI = brandProfile.tertiaryKPI
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

export const patchBrandProfileQuestions = (data) => {
	let brandProfileId = data.brandProfileId
	let questions = data.questions

	let url = apiBase + `/brand-profile/${brandProfileId}/questions`

	return questionsQueue.wrap(async (dispatch) => {
		dispatch(setBrandProfileSaving(true))
		const result = await axios.patch(url, questions)
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
				brandProfilesObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						' we received different data from the api than expected while fetching all brand profiles, see console log for more details'
					)
				})

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
