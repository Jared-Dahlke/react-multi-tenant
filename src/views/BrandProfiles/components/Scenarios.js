import React from 'react'
import CustomRadio from '../../../components/CustomRadio/CustomRadio'

export default function Scenarios(props) {
	return (
		<div>
			{props.scenarios &&
				props.scenarios.length > 0 &&
				props.scenarios.map((scenario, index) => {
					let scenIndex = index + 1
					return (
						<CustomRadio
							key={scenIndex}
							labelText={scenario.scenLabel}
							validateField={props.validateField}
							values={props.values}
							touched={props.touched}
							setFieldValue={props.setFieldValue}
							errors={props.errors}
							index={scenIndex}
							fieldName={'scenarios.scenario' + scenIndex}
						/>
					)
				})}
		</div>
	)
}
