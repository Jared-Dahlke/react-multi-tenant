import {
	SET_GOOGLE_LOGIN_URL,
	SET_ACCOUNT_HAS_VALID_GOOGLE_REFRESH_TOKEN,
	SET_GOOGLE_ACCOUNT_CAMPAIGNS,
	SET_FROM_GOOGLE_AUTH_CALLBACK
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

export function fromGoogleAuthCallback(state = false, action) {
	switch (action.type) {
		case SET_FROM_GOOGLE_AUTH_CALLBACK:
			return action.fromGoogleAuthCallback
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
