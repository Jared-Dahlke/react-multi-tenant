import { combineReducers } from 'redux'
import {
	googleLoginUrl,
	accountHasValidGoogleRefreshToken,
	googleAccountCampaigns,
	fromGoogleAuthCallback
} from './Google/google'

export default combineReducers({
	googleLoginUrl,
	accountHasValidGoogleRefreshToken,
	googleAccountCampaigns,
	fromGoogleAuthCallback
})
