import React from 'react'
import CustomRadio from './CustomRadio'
import { connect } from 'react-redux'
import { brandScenariosActionSelect } from '../../../../redux/actions/brandProfiles'
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor } from '../../../../assets/jss/material-dashboard-react'

const mapDispatchToProps = (dispatch) => {
	return {
		brandScenariosActionSelect: (data) =>
			dispatch(brandScenariosActionSelect(data))
	}
}

function Scenarios(props) {
	const handleScenarioSelect = (scenarioId, responseId) => {
		let data = { scenarioId: scenarioId, responseId: responseId }
		props.brandScenariosActionSelect(data)
	}

	React.useEffect(() => {
		console.log('inside scenarios useEffect')
		props.setFieldValue('scenarios', props.scenarios)
	}, [props.scenarios])
	return (
		<div>
			{props.scenarios &&
				props.scenarios.length > 0 &&
				props.scenarios.map((scenario, index) => {
					return (
						<CustomRadio
							key={index}
							handleScenarioSelect={handleScenarioSelect}
							scenario={scenario}
						/>
					)
				})}
			<div>
				{props.errors.scenarios ? (
					<FormHelperText
						id='component-helper-text'
						style={{
							color: dangerColor[0],
							fontSize: '16px',
							position: 'absolute',
							bottom: -20
						}}
					>
						{props.errors.scenarios}
					</FormHelperText>
				) : null}
			</div>
		</div>
	)
}

export default connect(null, mapDispatchToProps)(Scenarios)
