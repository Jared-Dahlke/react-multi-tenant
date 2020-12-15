import {
	SET_GOOGLE_LOGIN_URL,
	SET_ACCOUNT_HAS_VALID_GOOGLE_REFRESH_TOKEN,
	SET_GOOGLE_ACCOUNT_CAMPAIGNS
} from '../../../action-types/ThirdParty/Google/google'

export function googleLoginUrl(state = null, action) {
	switch (action.type) {
		case SET_GOOGLE_LOGIN_URL:
			return action.googleLoginUrl
		default:
			return state
	}
}

export function accountHasValidGoogleRefreshToken(state = true, action) {
	switch (action.type) {
		case SET_ACCOUNT_HAS_VALID_GOOGLE_REFRESH_TOKEN:
			return action.accountHasValidGoogleRefreshToken
		default:
			return state
	}
}

export function googleAccountCampaigns(state = [], action) {
	switch (action.type) {
		case SET_GOOGLE_ACCOUNT_CAMPAIGNS:
			return action.googleAccountCampaigns
		default:
			return state
	}
}
