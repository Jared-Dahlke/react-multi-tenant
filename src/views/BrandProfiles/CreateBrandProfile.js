import React from 'react'
import Button from 'rsuite/lib/Button'
import Card from '../../components/Card/Card.js'
import CardFooter from '../../components/Card/CardFooter'
import CardBody from '../../components/Card/CardBody.js'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import {
	primaryColor,
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
import Scenarios from './components/Scenarios/Scenarios'
import Topics from './components/Topics/Topics'
import {
	createBrandProfile,
	fetchBrandScenarios,
	fetchBrandIndustryVerticals,
	fetchBrandTopics,
	fetchBrandCategories,
	setBrandProfileSaved
} from '../../redux/actions/brandProfiles'
import { connect } from 'react-redux'
import { neutralColor } from '../../assets/jss/colorContants.js'
import { Link } from 'react-router-dom'
import Message from 'rsuite/lib/Message'
import { Debug } from '../Debug'

const useStyles = makeStyles((theme) => ({
	stepper: {
		backgroundColor: neutralColor
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
		fetchBrandScenarios: () => dispatch(fetchBrandScenarios()),
		fetchBrandIndustryVerticals: () => dispatch(fetchBrandIndustryVerticals()),
		fetchBrandTopics: () => dispatch(fetchBrandTopics()),
		fetchBrandCategories: () => dispatch(fetchBrandCategories()),
		setBrandProfileSaved: (bool) => dispatch(setBrandProfileSaved(bool))
	}
}

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		scenarios: state.scenarios,
		industryVerticals: state.industryVerticals,
		brandProfileSaved: state.brandProfileSaved,
		brandProfileSaving: state.brandProfileSaving,
		topics: state.topics,
		categories: state.brandCategories
	}
}

const schemaValidation = Yup.object().shape({
	basicInfoIndustryVerticalId: Yup.number()
		.typeError('Required')
		.required('Required'),
	basicInfoProfileName: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters')
		.required('Required'),
	basicInfoWebsiteUrl: Yup.string()
		.matches(
			/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
			'Valid URL required, (e.g. google.com)'
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
		),
	topics: Yup.array()
		.typeError('Wrong type')
		.test('topicsTest', 'You must include at least one topic', (topics) => {
			return topicsHasResponse(topics)
		}),
	scenarios: Yup.array()
		.typeError('Wrong type')
		.test(
			'scenariosTest',
			'Please select a response for each scenario',
			(scenarios) => {
				return scenariosAllHaveAResponse(scenarios)
			}
		)
})

function topicsHasResponse(topics) {
	for (const topic of topics) {
		if (topic.topicResponseId == 1) return true
		if (topic.children && topic.children.length > 0) {
			const childHasResponse = topicsHasResponse(topic.children)
			if (childHasResponse) return childHasResponse
		}
	}
	return false
}

function scenariosAllHaveAResponse(scenarios) {
	if (scenarios.length < 1) return false
	for (const scenario of scenarios) {
		if (!scenario.responseId || scenario.responseId.length < 1) return false
	}
	return true
}

function getSteps() {
	return ['Basic Info', 'Scenarios', 'Competitors', 'Topics']
}

function getTopicValues(topics) {
	let tab = []
	for (const topic of topics) {
		tab.push(topic.topicId)
		if (topic.children && topic.children.length > 0) {
			tab = tab.concat(getTopicValues(topic.children))
		}
	}
	return tab
}

function CreateBrandProfiles(props) {
	let fetchBrandScenarios = props.fetchBrandScenarios
	let fetchBrandIndustryVerticals = props.fetchBrandIndustryVerticals
	let fetchBrandTopics = props.fetchBrandTopics
	let fetchBrandCategories = props.fetchBrandCategories
	React.useEffect(() => {
		fetchBrandScenarios()
		fetchBrandIndustryVerticals()
		fetchBrandTopics()
		fetchBrandCategories()
	}, [
		fetchBrandScenarios,
		fetchBrandIndustryVerticals,
		fetchBrandTopics,
		fetchBrandCategories
	])

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
				twitterProfileUrl: values.basicInfoTwitterProfile,
				topics: values.topics
			}
			props.createBrandProfile(brandProfile)
		}
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
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
		}
		if (index === 0) {
			return isValid(errors, 'basicInfo')
		}
		if (index === 1) {
			return isValid(errors, 'scenarios')
		}

		if (index === 2) {
			return isValid(errors, 'topCompetitors')
		}

		if (index === 3) {
			return isValid(errors, 'topics')
		}
		return true
	}

	const [
		basicInfoProfileNameInitial,
		setBasicInfoProfileNameInitial
	] = React.useState('')
	const [
		basicInfoWebsiteUrlInitial,
		setBasicInfoWebsiteUrlInitial
	] = React.useState('')
	const [
		basicInfoTwitterProfileInitial,
		setBasicInfoTwitterProfileInitial
	] = React.useState('')
	const [
		basicInfoIndustryVerticalIdInitial,
		setBasicInfoIndustryVerticalIdInitial
	] = React.useState('')
	const [topCompetitorsInitial, setTopCompetitorsInitial] = React.useState([])
	const [topicsInitial, setTopicsInitial] = React.useState([])
	const [scenariosInitial, setScenariosInitial] = React.useState([])

	//React useEffect to update initial value states
	React.useEffect(() => {
		setTopicsInitial(props.topics)
		setScenariosInitial(props.scenarios)
	}, [props.topics, props.scenarios])

	const allTopicValues = React.useMemo(() => {
		return getTopicValues(props.topics)
	}, [props.topics])

	const [expandedTopicKeys, setExpandedTopicKeys] = React.useState([])
	const updateEpandedTopicKeys = (expandedKeys) => {
		setExpandedTopicKeys(expandedKeys)
	}

	return (
		<Formik
			//	enableReinitialize
			validateOnMount={true}
			validateOnChange={true}
			validationSchema={() => schemaValidation}
			initialValues={{
				basicInfoProfileName: basicInfoProfileNameInitial,
				basicInfoWebsiteUrl: basicInfoWebsiteUrlInitial,
				basicInfoTwitterProfile: basicInfoTwitterProfileInitial,
				basicInfoIndustryVerticalId: basicInfoIndustryVerticalIdInitial,
				topCompetitors: topCompetitorsInitial,
				topics: topicsInitial,
				scenarios: scenariosInitial
			}}
			render={({
				values,
				errors,
				touched,
				setFieldValue,
				setFieldTouched,
				dirty
			}) => (
				<div>
					<Stepper
						classes={{ root: classes.stepper }}
						activeStep={activeStep}
						alternativeLabel
					>
						{steps.map((label, index) => {
							let labelColor = whiteColor

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
							<Card style={{ backgroundColor: neutralColor, display: 'flex' }}>
								<CardBody>
									<GridList
										cols={1}
										cellHeight={400}
										style={{ overflowX: 'hidden', flex: 1 }}
									>
										{activeStep === 0 ? (
											<div>
												<BasicInfo
													setFieldValue={setFieldValue}
													values={values}
													touched={touched}
													industryVerticals={props.industryVerticals}
													errors={errors}
													setFieldTouched={setFieldTouched}
												/>
											</div>
										) : activeStep === 1 ? (
											<div>
												<Scenarios
													scenarios={props.scenarios}
													setFieldValue={setFieldValue}
													errors={errors}
												/>
											</div>
										) : activeStep === 2 ? (
											<div>
												<TopCompetitors
													setFieldValue={setFieldValue}
													errors={errors}
												/>
											</div>
										) : activeStep === 3 ? (
											<div style={{ flex: 1 }}>
												<Topics
													topics={props.topics}
													allValues={allTopicValues}
													updateExpandedKeys={updateEpandedTopicKeys}
													expandedTopicKeys={expandedTopicKeys}
													setFieldValue={setFieldValue}
													errors={errors}
												/>
											</div>
										) : (
											<div style={{ color: 'white' }}>
												<div
													style={{
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
														backgroundColor: neutralColor,
														height: '100%',
														color: 'white'
													}}
												>
													{props.brandProfileSaving ? (
														'Saving...'
													) : (
														<Message
															showIcon
															type='success'
															title='Success'
															description={
																<p>
																	{
																		'Your brand profile was succesfully created. Now you can '
																	}
																	<Link to='/admin/engage/listBuilder'>
																		{'go to the list builder '}
																	</Link>
																	or
																	<Link to='/admin/settings/brandProfiles'>
																		{' view your brand profiles'}
																	</Link>
																</p>
															}
														/>
													)}
												</div>
											</div>
										)}
									</GridList>
								</CardBody>
								<CardFooter>
									<div style={{ position: 'fixed', bottom: 30, right: 70 }}>
										{activeStep === steps.length ? null : (
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
														onClick={() => handleNext(values)}
														disabled={
															!stepValidated(activeStep, errors, values) ||
															!dirty
														}
														loading={props.brandProfileSaving}
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
