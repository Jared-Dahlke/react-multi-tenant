import React from 'react'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardFooter from '../../components/Card/CardFooter'
import CardBody from '../../components/Card/CardBody.js'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import {
	primaryColor,
	blackColor,
	whiteColor,
	grayColor
} from '../../assets/jss/material-dashboard-react'
import BasicInfo from './components/BasicInfo'
import TopCompetitors from './components/TopCompetitors'
import { Formik } from 'formik'
import * as Yup from 'yup'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import GridList from '@material-ui/core/GridList'
import Scenarios from './components/Scenarios'
import {
	createBrandProfile,
	fetchBrandScenariosProperties,
	fetchBrandIndustryVerticals
} from '../../redux/actions/brandProfiles'
import { connect } from 'react-redux'
import { Debug } from '../Debug'
//import Joyride from 'react-joyride'
//import {getTours} from '../../Tour'
/** <Joyride
          steps={getTours('takeToDiscover')}
          run={showTour}
        />
 */

const useStyles = makeStyles((theme) => ({
	stepper: {
		backgroundColor: blackColor
	},
	fixBottom: {
		position: 'fixed',
		bottom: 0
	},
	backButton: {
		marginRight: theme.spacing(2)
	},
	color: {
		color: primaryColor[0]
	},
	step: {
		'&$completed': {
			color: primaryColor[0]
		},
		'&$active': {
			color: primaryColor[0]
		},
		color: grayColor[3]
	},
	active: {}, //needed so that the &$active tag works
	completed: {},
	disabled: {},
	instructions: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
}))

const mapDispatchToProps = (dispatch) => {
	return {
		createBrandProfile: (brandProfile) =>
			dispatch(createBrandProfile(brandProfile)),
		fetchBrandScenariosProperties: () =>
			dispatch(fetchBrandScenariosProperties()),
		fetchBrandIndustryVerticals: () => dispatch(fetchBrandIndustryVerticals())
	}
}

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		scenarioProperties: state.scenarioProperties
	}
}

const formatScenario = (scenarioProps) => {
	if (!scenarioProps || !scenarioProps.scenario) return []

	let formattedScenarios = []

	scenarioProps.scenario.forEach((scen, index) => {
		formattedScenarios.push({
			scenName: `scenario${index + 1}`,
			scenLabel: scen.scenarioName,
			scenId: scen.scenarioId
		})
	})

	return formattedScenarios
}

const schemaValidation = Yup.object().shape({
	basicInfoIndustry: Yup.array()
		.typeError('Wrong type')
		.min(1, 'Select at least one field')
		.of(
			Yup.object()
				.shape({
					label: Yup.string(),
					value: Yup.string()
				})
				.transform((v) => (v === '' ? null : v))
		),
	basicInfoProfileName: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters')
		.required('Required'),
	basicInfoWebsiteUrl: Yup.string()
		.matches(
			/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
			'Enter correct url!'
		)
		.required('Required'),

	basicInfoTwitterProfile: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 30 characters')
		.required('Required'),
	topCompetitors: Yup.array()
		.typeError('Wrong type')
		.min(1, 'You have to create at least one competitor')
		.of(
			Yup.object()
				.shape({
					label: Yup.string(),
					value: Yup.string()
				})
				.transform((v) => (v === '' ? null : v))
		)
})

function getSteps() {
	return ['Basic Info', 'Top Competitors', 'Scenarios']
}

function CreateBrandProfiles(props) {
	let fetchBrandScenariosProperties = props.fetchBrandScenariosProperties
	let fetchBrandIndustryVerticals = props.fetchBrandIndustryVerticals
	React.useEffect(() => {
		fetchBrandScenariosProperties()
		fetchBrandIndustryVerticals()
	}, [fetchBrandScenariosProperties, fetchBrandIndustryVerticals])

	const scenarios = React.useMemo(
		() => formatScenario(props.scenarioProperties),
		[props.scenarioProperties]
	)

	const classes = useStyles()
	const [activeStep, setActiveStep] = React.useState(0)

	const steps = getSteps()

	const handleNext = (values) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)

		if (activeStep === steps.length - 1) {
			let brandProfile = {
				accountId: props.currentAccountId,
				brandName: values.basicInfoProfileName,
				websiteUrl: values.basicInfoWebsiteUrl,
				twitterProfileUrl: values.basicInfoTwitterProfile
			}
			props.createBrandProfile(brandProfile)
		}
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleReset = () => {
		setActiveStep(0)
	}

	const isScenarioValid = (values) => {
		for (var key in values.scenarios) {
			// check also if property is not inherited from prototype
			if (values.scenarios.hasOwnProperty(key)) {
				var value = values.scenarios[key]
				if (value.length < 1) {
					return false
				}
			}
		}
		return true
	}

	const isValid = (errors, formName) => {
		for (var prop in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, prop)) {
				if (prop.includes(formName)) {
					return false
				}
			}
		}
		return true
	}

	const stepValidated = (index, errors, values) => {
		if (!errors || errors.length < 1) {
			//return false
		}
		if (index === 0) {
			return isValid(errors, 'basicInfo')
		}
		if (index === 1) {
			return isValid(errors, 'topCompetitors')
		}

		if (index === 2) {
			return isScenarioValid(values)
		}
		return true
	}

	const getInitialValues = () => {
		//	let inputs = getScenarioPair(scenarios)

		const initialValues = {
			basicInfoProfileName: '',
			basicInfoWebsiteUrl: '',
			basicInfoTwitterProfile: '',
			//basicInfoIndustry: [],
			topCompetitors: []
		}

		let scenariosWithValue = {}
		scenarios.forEach((field) => {
			scenariosWithValue[field.scenName] = ''
		})

		initialValues.scenarios = scenariosWithValue

		return initialValues
	}

	return (
		<Formik
			//	enableReinitialize
			validateOnMount={true}
			// validateOnChange={true}
			validationSchema={() => schemaValidation}
			initialValues={getInitialValues()}
			render={({
				values,
				errors,
				touched,
				setFieldValue,
				setFieldTouched,
				validateField,
				validateForm,
				isSubmitting,
				isValid,
				arrayHelpers
			}) => (
				<div>
					<Stepper
						classes={{ root: classes.stepper }}
						activeStep={activeStep}
						alternativeLabel
					>
						{steps.map((label, index) => {
							let labelColor = whiteColor
							if (stepValidated(index, errors, values)) {
								// labelColor = 'green'
							}

							return (
								<Step key={label}>
									<StepLabel
										StepIconProps={{
											classes: {
												root: classes.step,
												completed: classes.completed,
												active: classes.active
											}
										}}
									>
										<div style={{ color: labelColor }}>{label}</div>
									</StepLabel>
								</Step>
							)
						})}
					</Stepper>

					<GridContainer justify='center'>
						<GridItem xs={12} sm={12} md={11}>
							<Card style={{ backgroundColor: blackColor }}>
								<CardBody>
									<GridList
										cols={1}
										cellHeight={400}
										style={{ overflowX: 'hidden' }}
									>
										{activeStep === 0 ? (
											<div>
												<BasicInfo
													setFieldValue={setFieldValue}
													errors={errors}
												/>
											</div>
										) : activeStep === 1 ? (
											<div>
												<TopCompetitors
													setFieldValue={setFieldValue}
													errors={errors}
												/>
											</div>
										) : activeStep === 2 ? (
											<div>
												<Scenarios
													scenarios={scenarios}
													validateField={validateField}
													setFieldValue={setFieldValue}
													errors={errors}
													arrayHelpers={arrayHelpers}
													values={values}
													touched={touched}
												/>
											</div>
										) : (
											<div></div>
										)}
									</GridList>
								</CardBody>
								<CardFooter>
									<div style={{ position: 'fixed', bottom: 30, right: 70 }}>
										{activeStep === steps.length ? (
											<div>
												<Typography
													className={classes.instructions}
												></Typography>
												<Button onClick={handleReset}>Reset</Button>
											</div>
										) : (
											<div>
												<div>
													<Button
														disabled={activeStep === 0}
														onClick={handleBack}
														className={classes.backButton}
													>
														Back
													</Button>
													<Button
														variant='contained'
														color='primary'
														onClick={() => handleNext(values)}
														disabled={
															!stepValidated(activeStep, errors, values)
														}
													>
														{activeStep === steps.length - 1 ? 'Save' : 'Next'}
													</Button>
												</div>
											</div>
										)}
									</div>
								</CardFooter>
							</Card>
						</GridItem>
					</GridContainer>
				</div>
			)}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBrandProfiles)
