import React from 'react'
import Button from 'rsuite/lib/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Steps from 'rsuite/lib/Steps'
import {
	primaryColor,
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
import Loader from 'rsuite/lib/Loader'

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
		brandProfiles: state.brandProfiles
	}
}

function getSteps() {
	return ['Basic Info', 'Content Settings', 'Topics']
}

function CreateBrandProfile(props) {
	const classes = useStyles()
	const [activeStep, setActiveStep] = React.useState(1)
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
			delete scenario.archived
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

	const nextButtonLabel = React.useMemo(() => {
		let label = ''
		let onLastStep = activeStep === steps.length - 1

		if (onLastStep) {
			label = 'Save'
		} else {
			label = 'Next'
		}

		return label
	}, [activeStep, steps.length])

	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		dirty
	} = props

	return (
		<Form>
			<Steps current={activeStep}>
				<Steps.Item title='Brand' />
				<Steps.Item title='Content Settings' />
				<Steps.Item title='Topics' />
			</Steps>

			<GridContainer justify='center' style={{ paddingTop: 20 }}>
				<GridItem xs={12} sm={12} md={11} style={{ position: 'relative' }}>
					<div style={{ padding: 10 }}>
						<GridList
							cols={1}
							cellHeight={550}
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
											formikTopics={values.topics}
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
											<Loader
												size='sm'
												content='Creating your brand profile...'
											/>
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
														<Link to='/app/engage/listBuilder'>
															{'go to the list builder '}
														</Link>
														or
														<Link to='/app/settings/brandProfiles'>
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
				</GridItem>
			</GridContainer>
		</Form>
	)
}

const getUnarchivedScenarios = (scenarios) => {
	let scenariosCopy = JSON.parse(JSON.stringify(scenarios))
	return scenariosCopy.filter((scenario) => !scenario.archived)
}

const FormikForm = withFormik({
	mapPropsToValues: (props) => {
		let currentBrandProfile = JSON.parse(JSON.stringify(brandProfileModel))
		currentBrandProfile.categories = props.categories
		currentBrandProfile.scenarios = getUnarchivedScenarios(props.scenarios)
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
	validateOnBlur: true,
	validateOnMount: false,
	validationSchema: schemaValidation
})(CreateBrandProfile)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
