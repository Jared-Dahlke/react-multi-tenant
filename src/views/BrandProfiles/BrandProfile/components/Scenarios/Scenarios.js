import React from 'react'
import CustomRadio from './CustomRadio'
import { connect } from 'react-redux'
import {
	patchBrandProfileScenarios,
	fetchBrandProfileScenarios,
	setBrandProfileScenarios
} from '../../../../../redux/actions/brandProfiles'
import Panel from '../../../../../components/CustomPanel'
import Grid from '@material-ui/core/Grid'
import { Divider } from 'rsuite'

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
		for (const scenFromArray of scenario.scenarios) {
			if (scenFromArray.scenarioId === scenarioId) {
				scenFromArray.scenarioResponseId = value
			}
		}
	}
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

		let params = {
			scenarios: [data],
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileScenarios(params)
	}

	return (
		<Panel bordered header='Scenarios'>
			<div>
				{props.brandProfile.scenarios &&
					props.brandProfile.scenarios.length > 0 &&
					props.brandProfile.scenarios.map((scenarioType, index) => {
						return (
							<div key={index}>
								<Grid item xs={12} align='left'>
									<p style={{ color: 'grey' }}>
										{scenarioType.scenarioTypeName}
									</p>
								</Grid>
								<br />
								{scenarioType.scenarios.map((scenario, scenIndex) => {
									return (
										<CustomRadio
											key={scenIndex}
											handleScenarioSelect={handleScenarioSelect}
											scenario={scenario}
										/>
									)
								})}
								<Divider />
							</div>
						)
					})}
			</div>
		</Panel>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Scenarios)
