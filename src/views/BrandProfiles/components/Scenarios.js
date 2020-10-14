import React from 'react'
import CustomRadio from '../../../components/CustomRadio/CustomRadio'

export default function Scenarios(props) {
	return (
		<div>
			{props.scenarios.map((scenario, index) => {
				return (
					<CustomRadio
						key={index}
						labelText={scenario}
						validateField={props.validateField}
						values={props.values}
						touched={props.touched}
						setFieldValue={props.setFieldValue}
						errors={props.errors}
						index={index}
						fieldName={'scenarios.scenario' + index}
					/>
				)
			})}
		</div>
	)
}
