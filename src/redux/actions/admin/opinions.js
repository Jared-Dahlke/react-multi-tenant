import {
	ADMIN_OPINIONS_IS_LOADING,
	SET_ADMIN_BRAND_OPINIONS,
	OPINION_ARCHIVING,
	OPINION_TO_ARCHIVE,
	OPINION_CREATED,
	OPINION_SAVING,
	ADD_OPINION
} from '../../action-types/admin/opinions'
import axios from '../../../axiosConfig'
import config from '../../../config.js'
import { brandOpinionObjValidation } from '../../../schemas/schemas'
import toast from 'react-hot-toast'

const apiBase = config.api.userAccountUrl

export function setAdminOpinionsIsLoading(bool) {
	return {
		type: ADMIN_OPINIONS_IS_LOADING,
		adminOpinionsIsLoading: bool
	}
}

export function setAdminBrandOpinions(opinions) {
	return {
		type: SET_ADMIN_BRAND_OPINIONS,
		opinions
	}
}

export function setOpinionArchiving(opinionId) {
	return {
		type: OPINION_ARCHIVING,
		opinionArchiving: opinionId
	}
}

export function setOpinionToArchived(opinionId) {
	return {
		type: OPINION_TO_ARCHIVE,
		opinionId
	}
}

export function setOpinionSaving(bool) {
	return {
		type: OPINION_SAVING,
		opinionSaving: bool
	}
}

export function addOpinion(opinion) {
	return {
		type: ADD_OPINION,
		opinion
	}
}

export const archiveOpinion = (opinionId) => {
	let url = apiBase + `/brand-profile/opinions/${opinionId}`
	return (dispatch) => {
		dispatch(setOpinionArchiving(opinionId))
		axios
			.patch(url)
			.then((response) => {
				dispatch(setOpinionToArchived(opinionId))
				dispatch(setOpinionArchiving(''))
				toast.success('Opinion archived!')
			})
			.catch((error) => {
				console.error(error)
			})
	}
}

export const createOpinion = (opinion) => {
	let url = apiBase + `/brand-profile/opinions`
	return (dispatch, getState) => {
		dispatch(setOpinionSaving(true))
		axios
			.post(url, opinion)
			.then((response) => {
				dispatch(addOpinion(response.data[0]))
				dispatch(setOpinionSaving(false))
				toast.success('Opinion created!')
			})
			.catch((error) => {
				//error
			})
	}
}

export function fetchAdminBrandOpinions() {
	let url = apiBase + `/brand-profile/opinions`
	return async (dispatch) => {
		dispatch(setAdminOpinionsIsLoading(true))
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let opinions = result.data

				brandOpinionObjValidation.validate(opinions).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						'We received different API data than expected, see the console log for more details.'
					)
				})

				dispatch(setAdminBrandOpinions(opinions))
				dispatch(setAdminOpinionsIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}
