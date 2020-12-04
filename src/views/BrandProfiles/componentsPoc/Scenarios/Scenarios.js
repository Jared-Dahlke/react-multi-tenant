import React from 'react'
import CustomRadio from './CustomRadio'
import { connect } from 'react-redux'
import {
	patchBrandProfileScenarios,
	fetchBrandProfileScenarios,
	setBrandProfiles
} from '../../../../redux/actions/brandProfiles'
import Panel from 'rsuite/lib/Panel'

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		brandProfileIdUnderEdit: state.brandProfileIdUnderEdit,
		categories: state.brandCategories,
		scenarios: state.scenarios,
		brandProfiles: state.brandProfiles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileScenarios: (data) =>
			dispatch(patchBrandProfileScenarios(data)),
		fetchBrandProfileScenarios: (data) =>
			dispatch(fetchBrandProfileScenarios(data)),
		setBrandProfiles: (brandProfiles) =>
			dispatch(setBrandProfiles(brandProfiles))
	}
}

function setScenarioAction(data, scenarios) {
	const scenarioId = data.scenarioId
	const value = Number(data.scenarioResponseId)

	for (const scenario of scenarios) {
		if (scenario.scenarioId === scenarioId) {
			scenario.scenarioResponseId = value
		}
	}
}

function checkResponse(scenario) {
	return scenario.scenarioResponseId > 0
}

function Scenarios(props) {
	const [fetched, setFetched] = React.useState(false)
	React.useEffect(() => {
		if (!fetched) {
			if (props.brandProfile && props.brandProfile.brandProfileId) {
				props.fetchBrandProfileScenarios(props.brandProfile.brandProfileId)
				setFetched(true)
			}
		}
	}, [props.brandProfile])

	React.useEffect(() => {
		return () => {
			//clean up on unmount
			setFetched(false)
		}
	}, [])

	const handleSetBrandProfiles = (scenarios) => {
		let brandProfilesCopy = JSON.parse(JSON.stringify(props.brandProfiles))
		for (const brandProfile of brandProfilesCopy) {
			if (brandProfile.brandProfileId === props.brandProfile.brandProfileId) {
				brandProfile.scenarios = scenarios
			}
		}
		props.setBrandProfiles(brandProfilesCopy)
	}

	const handleScenarioSelect = (scenarioId, scenarioResponseId) => {
		let data = {
			scenarioId: scenarioId,
			scenarioResponseId: scenarioResponseId
		}
		let newScenarios = JSON.parse(JSON.stringify(props.brandProfile.scenarios))
		setScenarioAction(data, newScenarios)
		handleSetBrandProfiles(newScenarios)

		let scenToSave = JSON.parse(JSON.stringify(newScenarios))
		for (const [index, scen] of scenToSave.entries()) {
			delete scen.scenarioName
			delete scen.archived
			delete scen.brandProfileId
			delete scen.scenarioResponseName
		}

		let params = {
			scenarios: scenToSave.filter(checkResponse),
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileScenarios(params)

		let valid = true
		for (const scen of props.brandProfile.scenarios) {
			if (scen.scenarioResponseId === '') {
				valid = false
			}
		}
		props.setScenariosValid(valid)
	}

	const getUnarchivedScenarios = (scenarios) => {
		let scenariosCopy = JSON.parse(JSON.stringify(scenarios))
		return scenariosCopy.filter((scenario) => !scenario.archived)
	}

	React.useEffect(() => {
		handleSetBrandProfiles(getUnarchivedScenarios(props.scenarios))
	}, [props.scenarios])

	return (
		<Panel bordered header='Scenarios'>
			<div>
				{props.brandProfile.scenarios &&
					props.brandProfile.scenarios.length > 0 &&
					props.brandProfile.scenarios.map((scenario, index) => {
						return (
							<CustomRadio
								key={index}
								handleScenarioSelect={handleScenarioSelect}
								scenario={scenario}
							/>
						)
					})}
			</div>
		</Panel>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Scenarios)
