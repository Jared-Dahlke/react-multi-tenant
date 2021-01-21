/*eslint-disable no-restricted-globals*/
import React, { useState } from 'react'
import GridItem from '../../../components/Grid/GridItem.js'
import GridContainer from '../../../components/Grid/GridContainer.js'
import Button from 'rsuite/lib/Button'
import TagPicker from 'rsuite/lib/TagPicker'
import Loader from 'rsuite/lib/Loader'
import Card from '../../../components/Card/Card.js'
import CardBody from '../../../components/Card/CardBody.js'
import CardFooter from '../../../components/Card/CardFooter.js'
import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'
import * as Yup from 'yup'
import debounce from 'just-debounce-it'
import {
	createScenario,
	fetchAdminBrandScenarioLabels
} from '../../../redux/actions/admin/scenarios'

const mapStateToProps = (state) => {
	return {
		scenarioSaving: state.admin.scenarioSaving,
		scenarioLabels: state.admin.scenarioLabels,
		scenariosLabelsIsLoading: state.admin.scenariosLabelsIsLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createScenario: (scenario) => dispatch(createScenario(scenario)),
		fetchAdminBrandScenarioLabels: (text) =>
			dispatch(fetchAdminBrandScenarioLabels(text))
	}
}

const schemaValidation = Yup.object().shape({
	scenarioName: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(120, 'Must be less than 120 characters')
})

function Scenario(props) {
	const { values, isValid, dirty } = props

	const { fetchAdminBrandScenarioLabels, scenarioLabels } = props
	const handleKeyPress = debounce((text) => {
		if (text !== '') {
			fetchAdminBrandScenarioLabels(text)
		}
	}, 700)

	const [cachedData, setCacheData] = useState([])
	const handleSelect = (value, item) => {
		var cdata = [...cachedData]
		cdata.push(item)
		setCacheData(cdata)
	}

	return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={6}>
				<Card>
					<Form>
						<CardBody>
							<GridContainer>
								<GridItem xs={12} sm={12} md={12}>
									<FormikInput
										name='scenarioName'
										formikValue={values.scenarioName}
										labelText='Scenario Name'
										id='scenarioName'
									/>
									<div
										style={{
											height: '20px',
											width: '100%',
											float: 'right',
											color: 'white'
										}}
									>
										<Loader
											size='sm'
											style={{
												float: 'right',
												display: props.scenariosLabelsIsLoading
													? 'block'
													: 'none'
											}}
										/>
									</div>

									<TagPicker
										id={'scenario category'}
										block
										cleanable={false}
										data={scenarioLabels}
										cacheData={cachedData}
										labelKey='labelName'
										valueKey='labelId'
										placeholder='Scenario label'
										onChange={(v) => (values.scenarioLabelsSelected = v)}
										onSelect={(v, i) => handleSelect(v, i)}
										onSearch={(text) => handleKeyPress(text)}
										style={{
											marginTop: 25
										}}
									/>
								</GridItem>
							</GridContainer>
						</CardBody>

						<CardFooter>
							<Button
								loading={props.scenarioSaving}
								disabled={!isValid || !dirty || props.scenarioSaving}
								type='submit'
							>
								Save
							</Button>
						</CardFooter>
					</Form>
				</Card>
			</GridItem>
		</GridContainer>
	)
}

const FormikForm = withFormik({
	mapPropsToValues: (props) => {
		return {
			scenarioName: '',
			scenarioLabelsSelected: []
		}
	},
	enableReinitialize: true,
	validateOnMount: true,
	validateOnChange: true,
	validateOnBlur: true,
	validationSchema: schemaValidation,
	handleSubmit: (values, { props }) => {
		let scenario = {
			scenarioName: values.scenarioName,
			scenarioLabelIds: values.scenarioLabelsSelected
		}
		props.createScenario(scenario)
	}
})(Scenario)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
