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
import BasicInfo from './components/BasicInfo/BasicInfo'
import { Form, withFormik } from 'formik'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import GridList from '@material-ui/core/GridList'
import ContentSettings from './components/ContentSettings/ContentSettings'
import Topics from './components/Topics/Topics'
import {
	createBrandProfile,
	setBrandProfileCreated,
	removeBrandProfile
} from '../../redux/actions/brandProfiles'
import { connect } from 'react-redux'
import { neutralColor } from '../../assets/jss/colorContants.js'
import { Link } from 'react-router-dom'
import Message from 'rsuite/lib/Message'
import { brandProfileModel } from './Model'
import { schemaValidation, stepValidated } from './brandProfileValidation'

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
		setBrandProfileCreated: (bool) => dispatch(setBrandProfileCreated(bool)),
		removeBrandProfile: (brandProfileId) =>
			dispatch(removeBrandProfile(brandProfileId))
	}
}

const mapStateToProps = (state) => {
	return {
		industryVerticals: state.industryVerticals,
		topics: state.topics,
		categories: state.brandCategories,
		scenarios: state.scenarios,
		currentAccountId: state.currentAccountId,
		brandProfileCreated: state.brandProfileCreated,
		brandProfileCreating: state.brandProfileCreating,
		brandProfileLoading: state.brandProfileLoading,
		brandProfileSaving: state.brandProfileSaving,
		brandProfileSaved: state.brandProfileSaved,
		brandProfiles: state.brandProfiles
	}
}

function getSteps() {
	return ['Basic Info', 'Content Settings', 'Topics']
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

function getSelectedTopics(topics) {
	if (!topics || topics.length < 1) return []
	let tab = []

	for (const topic of topics) {
		if (topic.topicResponseId != 3) {
			tab.push(topic.topicId)
		}

		if (topic.children && topic.children.length > 0) {
			tab = tab.concat(getSelectedTopics(topic.children))
		}
	}

	return tab.filter(onlyUnique)
}

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index
}

function CreateBrandProfile(props) {
	const classes = useStyles()
	const [activeStep, setActiveStep] = React.useState(0)
	const steps = getSteps()
	const handleNext = (values) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
		if (activeStep === steps.length - 1) {
			cleanScenariosForApi(values.scenarios)
			cleanCategoriesForApi(values.categories)
			let brandProfile = {
				brandProfileId: values.brandProfileId,
				accountId: values.accountId,
				brandName: values.basicInfoProfileName,
				websiteUrl: values.basicInfoWebsiteUrl,
				industryVerticalId: values.basicInfoIndustryVerticalId,
				twitterProfileUrl: values.basicInfoTwitterProfile,
				topics: values.topics,
				competitors: values.topCompetitors,
				scenarios: values.scenarios,
				categories: values.categories
			}

			props.createBrandProfile(brandProfile)
		}
	}

	const cleanScenariosForApi = (scenarios) => {
		for (const scenario of scenarios) {
			delete scenario.scenarioName
		}
	}

	const cleanCategoriesForApi = (categories) => {
		for (const category of categories) {
			delete category.contentCategoryName
		}
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const allTopicValues = React.useMemo(() => {
		return getTopicValues(props.topics)
	}, [props.topics])

	const selectedTopics = React.useMemo(() => {
		return getSelectedTopics(props.values.topics)
	}, [props.values.topics])

	const [expandedTopicKeys, setExpandedTopicKeys] = React.useState([])
	const updateEpandedTopicKeys = (expandedKeys) => {
		setExpandedTopicKeys(expandedKeys)
	}

	const nextButtonLabel = React.useMemo(() => {
		let label = ''
		let onLastStep = activeStep === steps.length - 1

		if (onLastStep) {
			label = 'Save'
		} else {
			label = 'Next'
		}

		return label
	}, [activeStep])

	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		isValid,
		dirty
	} = props

	return (
		<Form>
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
				<GridItem xs={12} sm={12} md={11} style={{ position: 'relative' }}>
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
										<ContentSettings
											scenarios={values.scenarios}
											categories={values.categories}
											setFieldValue={setFieldValue}
											errors={errors}
											values={values}
										/>
									</div>
								) : activeStep === 2 ? (
									<div>
										<div style={{ flex: 1 }}>
											<Topics
												formikValues={values}
												allValues={allTopicValues}
												selectedTopics={selectedTopics}
												updateExpandedKeys={updateEpandedTopicKeys}
												expandedTopicKeys={expandedTopicKeys}
												setFieldValue={setFieldValue}
												errors={errors}
											/>
										</div>
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
											{props.brandProfileCreating ? (
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
													!stepValidated(activeStep, errors, values) || !dirty
												}
												loading={props.brandProfileCreating}
											>
												{nextButtonLabel}
											</Button>
										</div>
									</div>
								)}
							</div>
						</CardFooter>
					</Card>
				</GridItem>
			</GridContainer>
		</Form>
	)
}

const FormikForm = withFormik({
	mapPropsToValues: (props) => {
		let currentBrandProfile = JSON.parse(JSON.stringify(brandProfileModel))
		currentBrandProfile.categories = props.categories
		currentBrandProfile.scenarios = props.scenarios
		currentBrandProfile.topics = props.topics
		return {
			brandProfileId: currentBrandProfile.brandProfileId,
			accountId: props.currentAccountId,
			basicInfoProfileName: currentBrandProfile.brandName,
			basicInfoWebsiteUrl: currentBrandProfile.websiteUrl,
			basicInfoTwitterProfile: currentBrandProfile.twitterProfileUrl,
			basicInfoIndustryVerticalId: currentBrandProfile.industryVerticalId,
			topCompetitors: currentBrandProfile.competitors,
			topics: currentBrandProfile.topics,
			scenarios: currentBrandProfile.scenarios,
			categories: currentBrandProfile.categories
		}
	},
	enableReinitialize: true,
	validateOnChange: true,
	validateOnMount: true,
	validationSchema: schemaValidation
})(CreateBrandProfile)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
