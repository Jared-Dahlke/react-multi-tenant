import React from 'react'
import CustomRadio from './CustomRadio'
import { connect } from 'react-redux'
import {
	brandScenariosActionSelect,
	brandCategoriesActionSelect
} from '../../../../redux/actions/brandProfiles'
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor } from '../../../../assets/jss/material-dashboard-react'
import Divider from 'rsuite/lib/Divider'
import CategoryButtonGroup from './CategoryButtonGroup'

const mapDispatchToProps = (dispatch) => {
	return {
		brandScenariosActionSelect: (data) =>
			dispatch(brandScenariosActionSelect(data)),
		brandCategoriesActionSelect: (data) =>
			dispatch(brandCategoriesActionSelect(data))
	}
}

function ContentSettings(props) {
	const handleScenarioSelect = (scenarioId, scenarioResponseId) => {
		let data = {
			scenarioId: scenarioId,
			scenarioResponseId: scenarioResponseId
		}
		props.brandScenariosActionSelect(data)
	}

	const handleCategorySelect = (
		contentCategoryId,
		contentCategoryResponseId
	) => {
		let data = {
			contentCategoryId: contentCategoryId,
			contentCategoryResponseId: contentCategoryResponseId
		}
		props.brandCategoriesActionSelect(data)
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

export default connect(null, mapDispatchToProps)(ContentSettings)
