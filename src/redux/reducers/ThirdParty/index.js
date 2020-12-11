import { combineReducers } from 'redux'
import {
	googleLoginUrl,
	accountHasValidGoogleToken,
	googleAccountCampaigns
} from './Google/google'

export default combineReducers({
	googleLoginUrl,
	accountHasValidGoogleToken,
	googleAccountCampaigns
})
