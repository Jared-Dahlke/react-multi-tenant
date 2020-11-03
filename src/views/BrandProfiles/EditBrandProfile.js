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
import { schemaValidation, stepValidated } from './brandProfileValidation'
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
import { UserCan, perms, userCan } from '../../Can'
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
	return ['Basic Info', 'Content Settings', 'Topics']
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
					<Loader size='sm' content='Loading...' />
				</div>
			</div>
		)
	} else {
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
									<div style={{ flex: 1 }}>
										<Topics
											formikTopics={values.topics}
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
													title={
														userCan(perms.BRAND_PROFILE_UPDATE) ? 'Success' : ''
													}
													description={
														<p>
															{userCan(perms.BRAND_PROFILE_UPDATE)
																? 'Your brand profile was saved. Now you can '
																: ' Complete.'}
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
						</div>

						<div style={{ position: 'fixed', bottom: 30, left: 70 }}>
							<UserCan i={perms.BRAND_PROFILE_UPDATE}>
								<Button
									loading={props.brandProfileSaving}
									type='submit'
									disabled={!dirty || !isValid}
								>
									Save
								</Button>
							</UserCan>
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
					</GridItem>
				</GridContainer>
			</Form>
		)
	}
}

const FormikForm = withFormik({
	mapPropsToValues: (props) => {
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
