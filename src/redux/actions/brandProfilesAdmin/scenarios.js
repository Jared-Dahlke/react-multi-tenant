import axios from '../../axiosConfig'
import config from '../../config.js'

export const archiveScenario = (scenarioId) => {
	let url = apiBase + `/brand-profile/scenario/${scenarioId}`
	return (dispatch) => {
		dispatch(setScenarioArchiving(scenarioId))
		axios
			.patch(url)
			.then((response) => {
				dispatch(setScenarioToArchived(scenarioId))
				dispatch(setScenarioArchiving(''))
				dispatch(setScenarioArchived(true))
			})
			.catch((error) => {
				console.error(error)
			})
	}
}

export const createScenario = (scenario) => {
	let url = apiBase + `/brand-profile/scenario`
	return (dispatch, getState) => {
		dispatch(setScenarioSaving(true))
		axios
			.post(url, scenario)
			.then((response) => {
				dispatch(addScenario(scenario))
				dispatch(setScenarioSaving(false))
				dispatch(setScenarioCreated(true))
			})
			.catch((error) => {
				//error
			})
	}
}

export function fetchAdminBrandScenarios() {
	let url = apiBase + `/brand-profile/scenario`
	return async (dispatch) => {
		dispatch(setAdminScenariosIsLoading(true))
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let scenarios = result.data

				brandScenarioObjValidation.validate(scenarios).catch(function(err) {
					console.log(err.name, err.errors)
					alert(
						'We received different API data than expected, see the console log for more details.'
					)
				})

				//	addDefaultResponseIdToScenarios(scenarios) //TODO: can delete this function once api gives a default response
				dispatch(setAdminBrandScenarios(scenarios))
				dispatch(setAdminScenariosIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}
