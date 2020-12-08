import React from 'react'
import CustomRadio from './CustomRadio'
import { connect } from 'react-redux'
import {
	patchBrandProfileScenarios,
	fetchBrandProfileScenarios,
	setBrandProfileScenarios
} from '../../../../../redux/actions/brandProfiles'
import Panel from '../../../../../components/CustomPanel'

const mapStateToProps = (state) => {
	return {
		brandProfile: state.brandProfileUnderEdit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileScenarios: (data) =>
			dispatch(patchBrandProfileScenarios(data)),
		fetchBrandProfileScenarios: (data) =>
			dispatch(fetchBrandProfileScenarios(data)),
		setBrandProfileScenarios: (scenarios) =>
			dispatch(setBrandProfileScenarios(scenarios))
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
			props.fetchBrandProfileScenarios(props.brandProfileId)
			setFetched(true)
		}
	}, [])

	React.useEffect(() => {
		return () => {
			setFetched(false)
		}
	}, [])

	const handleSetBrandProfiles = (scenarios) => {
		let scenariosCopy = JSON.parse(JSON.stringify(scenarios))
		props.setBrandProfileScenarios(scenariosCopy)
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
