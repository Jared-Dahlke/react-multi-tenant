import React from 'react'
import CustomRadio from './CustomRadio'
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor } from '../../../../assets/jss/material-dashboard-react'
import Divider from 'rsuite/lib/Divider'
import CategoryButtonGroup from './CategoryButtonGroup'

function setCategoryAction(data, categories) {
	const contentCategoryId = data.contentCategoryId
	const value = Number(data.contentCategoryResponseId)
	for (const category of categories) {
		if (category.contentCategoryId === contentCategoryId) {
			category.contentCategoryResponseId = value
		}
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

export default function ContentSettings(props) {
	const handleScenarioSelect = (scenarioId, scenarioResponseId) => {
		let data = {
			scenarioId: scenarioId,
			scenarioResponseId: scenarioResponseId
		}
		let newScenarios = JSON.parse(JSON.stringify(props.values.scenarios))
		setScenarioAction(data, newScenarios)
		props.setFieldValue('scenarios', newScenarios)
	}

	const handleCategorySelect = (
		contentCategoryId,
		contentCategoryResponseId
	) => {
		let data = {
			contentCategoryId: contentCategoryId,
			contentCategoryResponseId: contentCategoryResponseId
		}
		let newCategories = JSON.parse(JSON.stringify(props.values.categories))
		setCategoryAction(data, newCategories)
		props.setFieldValue('categories', newCategories)
	}

	React.useEffect(() => {
		props.setFieldValue('scenarios', props.scenarios)
	}, [props.scenarios])
	React.useEffect(() => {
		props.setFieldValue('categories', props.categories)
	}, [props.categories])
	return (
		<div>
			<Divider style={{ color: 'white' }}>Scenarios</Divider>
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

			<Divider style={{ color: 'white' }}>Categories</Divider>

			<div>
				{props.categories &&
					props.categories.length > 0 &&
					props.categories.map((category, index) => {
						return (
							<CategoryButtonGroup
								category={category}
								key={index}
								handleCategorySelect={handleCategorySelect}
							/>
						)
					})}
				<div>
					{props.errors.categories && !props.errors.scenarios ? (
						<FormHelperText
							id='component-helper-text'
							style={{
								color: dangerColor[0],
								fontSize: '16px',
								position: 'absolute',
								bottom: -20
							}}
						>
							{props.errors.categories}
						</FormHelperText>
					) : null}
				</div>
			</div>
		</div>
	)
}
