import {
	BRAND_PROFILES_FETCH_DATA_SUCCESS,
	REMOVE_BRAND_PROFILE,
	ADD_BRAND_PROFILE,
	BRAND_PROFILES_IS_LOADING,
	HAS_BRAND_PROFILES,
	SCENARIO_PROPERTIES_FETCH
} from '../action-types/brandProfiles'
import axios from '../../axiosConfig'
import config from '../../config.js'
import { brandProfilesObjValidation } from '../../schemas'

const apiBase = config.apiGateway.URL

/*let mockBrandProfiles = [
  {brandProfileId: 1, brandProfileName: 'Trendy', website:'www.bruen.com', twitter: 'twitter.com/water', industryVertical: 'Food', industrySubVertical: 'Liquid'},
  {brandProfileId: 2, brandProfileName: 'Conservative', website:'www.pkm.com', twitter: 'twitter.com/you', industryVertical: 'Food', industrySubVertical: 'Liquid'},
  {brandProfileId: 3, brandProfileName: 'Progressive', website:'www.M4A1.com', twitter: 'twitter.com/knowthe', industryVertical: 'Food', industrySubVertical: 'Liquid'},
  {brandProfileId: 4, brandProfileName: 'Emo', website:'www.Origin.com', twitter: 'twitter.com/thing', industryVertical: 'Food', industrySubVertical: 'Liquid'},
]*/

export function brandProfilesFetchDataSuccess(brandProfiles) {
	return {
		type: BRAND_PROFILES_FETCH_DATA_SUCCESS,
		brandProfiles
	}
}

export const createBrandProfile = (brandProfile) => {
	let url = apiBase + `/brand-profile`
	return (dispatch) => {
		dispatch(addBrandProfile(brandProfile))
		axios
			.post(url, brandProfile)
			.then((response) => {
				// dispatch(fetchSiteData(response.data.accountId))
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
		dispatch(removeBrandProfile(brandProfileId))
		axios
			.delete(url)
			.then((response) => {
				//dispatch(userDeleted(true));
			})
			.catch((error) => {
				//dispatch(userDeletedError(true));
			})
	}
}

export function fetchBrandProfiles(accountId) {
	let url = apiBase + `/account/${accountId}/brand-profiles?competitors=true`
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
			//dispatch(usersHasErrored(true))
		}
	}
}

export function brandProfilesIsLoading(bool) {
	return {
		type: BRAND_PROFILES_IS_LOADING,
		brandProfilesIsLoading: bool
	}
}

export function hasBrandProfiles(bool) {
	return {
		type: HAS_BRAND_PROFILES,
		hasBrandProfiles: bool
	}
}

export function scenarioPropertiesFetch(scenarioProperties) {
	return {
		type: SCENARIO_PROPERTIES_FETCH,
		scenarioProperties
	}
}

export function fetchBrandScenariosProperties() {
	let url = apiBase + `/brand-profile/scenarios/properties`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			console.log('RESULT', result)
			if (result.status === 200) {
				let scenarioProperties = result.data
				dispatch(scenarioPropertiesFetch(scenarioProperties))
			}
		} catch (error) {
			alert(error)
		}
	}
}
