import {
	SET_ADMIN_SCENARIOS_IS_LOADING,
	SET_ADMIN_BRAND_SCENARIOS,
	SET_SCENARIO_LABELS,
	SET_SCENARIO_LABELS_IS_LOADING,
	SET_SCENARIO_ARCHIVING,
	SET_SCENARIO_ARCHIVED,
	SET_SCENARIO_TO_ARCHIVE,
	SET_SCENARIO_CREATED,
	SET_SCENARIO_SAVING,
	SET_ADD_SCENARIO,
	SET_ADMIN_LABELS,
	SET_LABELS_IS_LOADING,
	SET_LABEL_DELETING,
	SET_LABEL_TO_DELETE,
	SET_LABEL_SAVING,
	SET_ADD_LABEL,
	SET_LABEL_TO_CREATE
} from '../../action-types/admin/scenarios'
import axios from '../../../axiosConfig'
import config from '../../../config.js'
import { brandScenarioObjValidation } from '../../../schemas/schemas'
import toast from 'react-hot-toast'

const apiBase = config.api.userAccountUrl

export function setAdminScenariosIsLoading(bool) {
	return {
		type: SET_ADMIN_SCENARIOS_IS_LOADING,
		adminScenariosIsLoading: bool
	}
}

export function setScenariosLabelsIsLoading(bool) {
	return {
		type: SET_SCENARIO_LABELS_IS_LOADING,
		scenariosLabelsIsLoading: bool
	}
}

export function setAdminBrandScenarios(scenarios) {
	return {
		type: SET_ADMIN_BRAND_SCENARIOS,
		scenarios
	}
}

export function setScenarioLabels(scenarioLabels) {
	return {
		type: SET_SCENARIO_LABELS,
		scenarioLabels
	}
}

export function setScenarioArchiving(scenarioId) {
	return {
		type: SET_SCENARIO_ARCHIVING,
		scenarioArchiving: scenarioId
	}
}

export function setScenarioToArchived(scenarioId) {
	return {
		type: SET_SCENARIO_TO_ARCHIVE,
		scenarioId
	}
}

export function setScenarioCreated(bool) {
	return {
		type: SET_SCENARIO_CREATED,
		scenarioCreated: bool
	}
}

export function setScenarioSaving(bool) {
	return {
		type: SET_SCENARIO_SAVING,
		scenarioSaving: bool
	}
}

export function addScenario(scenario) {
	return {
		type: SET_ADD_SCENARIO,
		scenario
	}
}

export const archiveScenario = (scenarioId) => {
	let url = apiBase + `/scenarios/${scenarioId}`
	return (dispatch) => {
		dispatch(setScenarioArchiving(scenarioId))
		axios
			.patch(url)
			.then((response) => {
				dispatch(setScenarioToArchived(scenarioId))
				dispatch(setScenarioArchiving(''))
				toast.success('Scenario archived!')
			})
			.catch((error) => {
				console.error(error)
			})
	}
}

export const createScenario = (scenario) => {
	let url = apiBase + `/scenarios`
	return (dispatch, getState) => {
		dispatch(setScenarioSaving(true))
		axios
			.post(url, scenario)
			.then((response) => {
				dispatch(addScenario(response.data[0]))
				dispatch(setScenarioSaving(false))
				dispatch(setScenarioCreated(true))
			})
			.catch((error) => {
				//error
			})
	}
}

export function fetchAdminBrandScenarios() {
	let url = apiBase + `/scenarios`
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

				dispatch(setAdminBrandScenarios(scenarios))
				dispatch(setAdminScenariosIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchAdminBrandScenarioLabels(text) {
	let url = apiBase + `/scenarios/labels?name=${text}`
	return async (dispatch) => {
		dispatch(setScenariosLabelsIsLoading(true))
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let scenarioLabels = result.data
				dispatch(setScenarioLabels(scenarioLabels))
				dispatch(setScenariosLabelsIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function setAdminLabels(labels) {
	return {
		type: SET_ADMIN_LABELS,
		labels
	}
}

export function setLabelDeleting(labelId) {
	return {
		type: SET_LABEL_DELETING,
		labelDeleting: labelId
	}
}

export function setLabelToDeleted(labelId) {
	return {
		type: SET_LABEL_TO_DELETE,
		labelId
	}
}

export function setInitLabelAdd(bool) {
	return {
		type: SET_LABEL_TO_CREATE,
		initLabelAdd: bool
	}
}

export function setLabelSaving(bool) {
	return {
		type: SET_LABEL_SAVING,
		labelSaving: bool
	}
}

export function addLabel(label) {
	return {
		type: SET_ADD_LABEL,
		label
	}
}

export function setLabelsIsLoading(bool) {
	return {
		type: SET_LABELS_IS_LOADING,
		labelsIsLoading: bool
	}
}

export function setLabels(labels) {
	return {
		type: SET_ADMIN_LABELS,
		labels
	}
}

export function fetchAdminLabels() {
	let url = apiBase + `/scenarios/labels`
	return async (dispatch) => {
		dispatch(setLabelsIsLoading(true))
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let labels = result.data
				dispatch(setLabels(labels))
				dispatch(setLabelsIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export const createLabel = (label) => {
	let url = apiBase + `/scenarios/labels`
	return (dispatch, getState) => {
		dispatch(setLabelSaving(true))
		axios
			.post(url, label)
			.then((response) => {
				dispatch(addLabel(response.data[0]))
				dispatch(setLabelSaving(false))
				toast.success('Label Created')
				dispatch(setInitLabelAdd(false))
			})
			.catch((error) => {
				toast.error(error.response.data.message)
			})
	}
}

export const deleteLabel = (labelId) => {
	let url = apiBase + `/scenarios/labels/${labelId}`
	return (dispatch) => {
		dispatch(setLabelDeleting(labelId))
		axios
			.delete(url)
			.then((response) => {
				dispatch(setLabelToDeleted(labelId))
				dispatch(setLabelDeleting(''))
				toast.success('Label Deleted')
			})
			.catch((error) => {
				toast.error(error.response.data.message)
				console.error(error)
			})
	}
}
