import {
	SET_GOOGLE_LOGIN_URL,
	SET_ACCOUNT_HAS_VALID_GOOGLE_REFRESH_TOKEN,
	SET_GOOGLE_ACCOUNT_CAMPAIGNS
} from '../../../action-types/ThirdParty/Google/google'

import axios from '../../../../axiosConfig'
import config from '../../../../config.js'

const apiBase = config.api.userAccountUrl

export function setGoogleLoginUrl(googleLoginUrl) {
	return {
		type: SET_GOOGLE_LOGIN_URL,
		googleLoginUrl
	}
}

export function setGoogleAccountCampaigns(googleAccountCampaigns) {
	return {
		type: SET_GOOGLE_ACCOUNT_CAMPAIGNS,
		googleAccountCampaigns
	}
}

export function setAccountHasValidGoogleRefreshToken(
	accountHasValidGoogleRefreshToken
) {
	return {
		type: SET_ACCOUNT_HAS_VALID_GOOGLE_REFRESH_TOKEN,
		accountHasValidGoogleRefreshToken
	}
}

export function fetchGoogleAccountCampaigns(refreshToken) {
	console.log('fetchGoogleAccountCampaigns')
	console.log(refreshToken)
	return async (dispatch) => {
		let url = apiBase + `/google/campaigns/${encodeURIComponent(refreshToken)}`
		try {
			let result = await axios.get(url)
			if (result.status === 200) {
				let camps = []
				for (const campaign of result.data) {
					camps.push(campaign.campaign)
				}
				dispatch(setGoogleAccountCampaigns(camps))
			}
		} catch (error) {
			alert('Error on fetch google data: ' + JSON.stringify(error, null, 2))
		}
	}
}

export function fetchGoogleLoginUrl() {
	return async (dispatch) => {
		let url = apiBase + `/google/getLoginUrl`
		try {
			let result = await axios.get(url)
			if (result.status === 200) {
				dispatch(setGoogleLoginUrl(result.data))
			}
		} catch (error) {
			alert('Error on get google login url: ' + JSON.stringify(error, null, 2))
		}
	}
}

export function handleGoogleAdsApiConsent(params) {
	console.log('handle consent params')
	console.log(params)
	let { code, accountId } = params
	return async (dispatch, getState) => {
		let url =
			apiBase +
			`/google/handleGoogleAdsApiConsent/${encodeURIComponent(
				code
			)}/${accountId}`
		//	try {
		let result = await axios.get(url)
		//if (result.status === 200) {
		console.log(result.data)
		//let refreshToken = result.data.refresh_token
		//	if (!refreshToken) {
		//	console.log('settting from env')
		//	console.log(process.env.REACT_APP_DEV_EXAMPLE_REFRESH_TOKEN)
		//	refreshToken = process.env.REACT_APP_DEV_EXAMPLE_REFRESH_TOKEN //received 12/10/20 4pm // TODO: this will be replaced with another backend function call before going live
		//	}
		//dispatch(fetchGoogleAccountCampaigns(refreshToken))
	}
}
