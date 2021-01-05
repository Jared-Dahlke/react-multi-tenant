import {
	ADMIN_SCENARIOS_IS_LOADING,
	SET_ADMIN_BRAND_SCENARIOS,
	SET_SCENARIO_LABELS,
	SCENARIO_LABELS_IS_LOADING,
	SCENARIO_ARCHIVING,
	SCENARIO_ARCHIVED,
	SCENARIO_TO_ARCHIVE,
	SCENARIO_CREATED,
	SCENARIO_SAVING,
	ADD_SCENARIO,
	SET_ADMIN_LABELS,
	LABELS_IS_LOADING,
	LABEL_DELETING,
	LABEL_DELETED,
	LABEL_TO_DELETE,
	LABEL_CREATED,
	LABEL_SAVING,
	ADD_LABEL,
	LABEL_TO_CREATE
} from '../../action-types/admin/scenarios'
import axios from '../../../axiosConfig'
import config from '../../../config.js'
import { brandScenarioObjValidation } from '../../../schemas/schemas'

const apiBase = config.api.userAccountUrl

export function setAdminScenariosIsLoading(bool) {
	return {
		type: ADMIN_SCENARIOS_IS_LOADING,
		adminScenariosIsLoading: bool
	}
}

export function setScenariosLabelsIsLoading(bool) {
	return {
		type: SCENARIO_LABELS_IS_LOADING,
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
		type: SCENARIO_ARCHIVING,
		scenarioArchiving: scenarioId
	}
}

export function setScenarioArchived(bool) {
	return {
		type: SCENARIO_ARCHIVED,
		scenarioArchived: bool
	}
}

export function setScenarioToArchived(scenarioId) {
	return {
		type: SCENARIO_TO_ARCHIVE,
		scenarioId
	}
}

export function setScenarioCreated(bool) {
	return {
		type: SCENARIO_CREATED,
		scenarioCreated: bool
	}
}

export function setScenarioSaving(bool) {
	return {
		type: SCENARIO_SAVING,
		scenarioSaving: bool
	}
}

export function addScenario(scenario) {
	return {
		type: ADD_SCENARIO,
		scenario
	}
}

export const archiveScenario = (scenarioId) => {
	let url = apiBase + `/brand-profile/scenarios/${scenarioId}`
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
	let url = apiBase + `/brand-profile/scenarios`
	return async (dispatch) => {
		dispatch(setAdminScenariosIsLoading(true))
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let scenarios = result.data

				brandScenarioObjValidation.validate(scenarios).catch(function (err) {
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
	let url = apiBase + `/brand-profile/scenario-labels?name=${text}`
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
		type: LABEL_DELETING,
		labelDeleting: labelId
	}
}

export function setLabelDeleted(bool) {
	return {
		type: LABEL_DELETED,
		labelDeleted: bool
	}
}

export function setLabelToDeleted(labelId) {
	return {
		type: LABEL_TO_DELETE,
		labelId
	}
}

export function setInitLabelAdd(bool) {
	return {
		type: LABEL_TO_CREATE,
		initLabelAdd: bool
	}
}

export function setLabelCreated(bool) {
	return {
		type: LABEL_CREATED,
		labelCreated: bool
	}
}

export function setLabelSaving(bool) {
	return {
		type: LABEL_SAVING,
		labelSaving: bool
	}
}

export function addLabel(label) {
	return {
		type: ADD_LABEL,
		label
	}
}

export function setLabelsIsLoading(bool) {
	return {
		type: LABELS_IS_LOADING,
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
				dispatch(setLabelCreated(true))
				dispatch(setInitLabelAdd(false))
			})
			.catch((error) => {
				//error
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
				dispatch(setLabelDeleted(true))
			})
			.catch((error) => {
				console.error(error)
			})
	}
}
