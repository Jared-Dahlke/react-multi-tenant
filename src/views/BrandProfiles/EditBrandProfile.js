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
	grayColor,
	successColor
} from '../../assets/jss/material-dashboard-react'
import BasicInfo from './components/BasicInfo'
import TopCompetitors from './components/TopCompetitors'
import { Form, withFormik } from 'formik'
import { schemaValidation } from './brandProfileValidation'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import GridList from '@material-ui/core/GridList'
import ContentSettings from './components/ContentSettings/ContentSettings'
import Topics from './components/Topics/Topics'
import {
	createBrandProfile,
	setBrandProfileCreated,
	saveBrandProfile,
	removeBrandProfile,
	fetchBrandProfile
} from '../../redux/actions/brandProfiles'
import { connect } from 'react-redux'
import { neutralColor } from '../../assets/jss/colorContants.js'
import { Link } from 'react-router-dom'
import Message from 'rsuite/lib/Message'
import { brandProfileModel } from './Model'

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
		saveBrandProfile: (brandProfile) =>
			dispatch(saveBrandProfile(brandProfile)),
		removeBrandProfile: (brandProfileId) =>
			dispatch(removeBrandProfile(brandProfileId)),
		fetchBrandProfile: (brandProfileId) =>
			dispatch(fetchBrandProfile(brandProfileId))
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

const getCurrent = (brandProfiles, brandProfileIdEditing) => {
	for (const brandProfile of brandProfiles) {
		if (brandProfile.brandProfileId == brandProfileIdEditing) {
			return brandProfile
		}
	}
	return brandProfileModel
}

function getSteps() {
	return ['Basic Info', 'Content Settings', 'Competitors', 'Topics']
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

function EditBrandProfile(props) {
	if (
		!props.match.params.brandProfileId ||
		isNaN(props.match.params.brandProfileId)
	) {
		window.location.href = '/admin/settings/brandProfiles'
	}
	let { fetchBrandProfile } = props
	React.useEffect(() => {
		let current = getCurrent(
			props.brandProfiles,
			Number(props.match.params.brandProfileId)
		)
		if (!current.scenarios) {
			fetchBrandProfile(Number(props.match.params.brandProfileId))
		}
	}, [props.brandProfiles])

	const classes = useStyles()
	const [activeStep, setActiveStep] = React.useState(0)
	const steps = getSteps()
	const handleNext = (values) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)

		if (activeStep === steps.length - 1) {
			cleanScenariosForApi(values.scenarios)
			cleanCategoriesForApi(values.categories)
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

	const customIsValid = (errors, formName) => {
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
		if (!errors || Object.keys(errors).length < 1) {
			return true
		}
		if (index === 0) {
			return customIsValid(errors, 'basicInfo')
		}
		if (index === 1) {
			return (
				customIsValid(errors, 'scenarios') &&
				customIsValid(errors, 'categories')
			)
		}

		if (index === 2) {
			return customIsValid(errors, 'topCompetitors')
		}

		if (index === 3) {
			return customIsValid(errors, 'topics')
		}
		return true
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
			label = 'Done'
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

	if (props.brandProfileLoading) {
		return (
			<div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: 'calc(100vh - 200px)',
						color: 'white'
					}}
				>
					Loading...
				</div>
			</div>
		)
	} else {
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
											<TopCompetitors
												setFieldValue={setFieldValue}
												errors={errors}
												competitors={values.topCompetitors}
												values={values}
											/>
										</div>
									) : activeStep === 3 ? (
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
																{'Your brand profile was saved. Now you can '}
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
								<div style={{ position: 'fixed', bottom: 30, left: 70 }}>
									<Button
										loading={props.brandProfileSaving}
										type='submit'
										disabled={!dirty || !isValid}
									>
										Save
									</Button>
								</div>

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
													disabled={!stepValidated(activeStep, errors, values)}
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
}

const FormikForm = withFormik({
	mapPropsToValues: (props) => {
		console.log('map props to values')
		console.log(props)
		let currentBrandProfile = JSON.parse(
			JSON.stringify(
				getCurrent(props.brandProfiles, props.match.params.brandProfileId)
			)
		)

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
	handleSubmit: (values, { props, setSubmitting, resetForm }) => {
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

		props.saveBrandProfile(brandProfile)
		resetForm(values)
	},
	enableReinitialize: true,
	validateOnChange: true,
	validateOnMount: true,
	validationSchema: schemaValidation
})(EditBrandProfile)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
