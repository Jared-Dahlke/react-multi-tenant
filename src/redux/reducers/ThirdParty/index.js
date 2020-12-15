import { combineReducers } from 'redux'
import {
	googleLoginUrl,
	accountHasValidGoogleRefreshToken,
	googleAccountCampaigns
} from './Google/google'

export default combineReducers({
	googleLoginUrl,
	accountHasValidGoogleRefreshToken,
	googleAccountCampaigns
})
