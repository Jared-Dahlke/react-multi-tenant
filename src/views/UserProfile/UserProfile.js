import React from 'react'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import FormikInput from '../../components/CustomInput/FormikInput.js'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { Form, withFormik } from 'formik'
import Button from 'rsuite/lib/Button'
import * as Yup from 'yup'

// Redux
import { userProfileFetchData } from '../../redux/actions/auth.js'
import { connect } from 'react-redux'
import { updateUserData, userProfileSaved } from '../../redux/actions/users.js'
import { FormLoader } from '../../components/SkeletonLoader'

const mapStateToProps = (state) => {
	return {
		user: state.user,
		token: state.authToken,
		userProfileIsLoading: state.userProfileIsLoading,
		userProfileSaving: state.userProfileSaving,
		userProfileSaved: state.userProfileSaved
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserProfile: () => dispatch(userProfileFetchData()),
		updateUserData: (userData) => dispatch(updateUserData(userData)),

		setUserProfileSaved: (bool) => dispatch(userProfileSaved(bool))
	}
}

const schemaValidation = Yup.object().shape({
	firstName: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters'),
	lastName: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters'),
	company: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters'),
	email: Yup.string()
		.required('Required')
		.email('Invalid email')
})

function UserProfile(props) {
	const { isValid, dirty, values } = props

	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={8}>
					<Card>
						{!props.userProfileIsLoading ? (
							<div>
								<Form>
									<CardBody>
										<GridContainer>
											<GridItem xs={12} sm={12} md={5}>
												<FormikInput
													name='company'
													formikValue={values.company}
													labelText='Company'
													id='company'
												/>
											</GridItem>
											<GridItem xs={12} sm={12} md={4}>
												<FormikInput
													name='email'
													formikValue={values.email}
													labelText='Email'
													id='email'
												/>
											</GridItem>
										</GridContainer>
										<GridContainer>
											<GridItem xs={12} sm={12} md={6}>
												<FormikInput
													name='firstName'
													formikValue={values.firstName}
													labelText='First Name'
													id='firstName'
												/>
											</GridItem>
											<GridItem xs={12} sm={12} md={6}>
												<FormikInput
													name='lastName'
													formikValue={values.lastName}
													labelText='Last Name'
													id='lastName'
												/>
											</GridItem>
										</GridContainer>
									</CardBody>

									<CardFooter>
										<Button
											//	color='primary'
											//	loading={props.userProfileSaving}
											disabled={!isValid || !dirty || props.userProfileSaving}
											type='submit'
										>
											Save
										</Button>

										<Snackbar
											open={props.userProfileSaved}
											autoHideDuration={6000}
											onClose={() => props.setUserProfileSaved(false)}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'center'
											}}
										>
											<Alert
												color='success'
												severity='success'
												onClose={() => props.setUserProfileSaved(false)}
											>
												User Profile Saved
											</Alert>
										</Snackbar>
									</CardFooter>
								</Form>
							</div>
						) : (
							<FormLoader />
						)}
					</Card>
				</GridItem>
			</GridContainer>
		</div>
	)
}

const MyEnhancedForm = withFormik({
	mapPropsToValues: (props) => {
		return {
			userId: props.user.userProfile.userId,
			company: props.user.userProfile.company,
			firstName: props.user.userProfile.firstName,
			lastName: props.user.userProfile.lastName,
			email: props.user.userProfile.email,
			userType: props.user.userProfile.userType
		}
	},
	enableReinitialize: true,
	validateOnChange: true,
	validateOnBlur: true,
	validationSchema: schemaValidation,
	handleSubmit: (values, { props }) => {
		props.updateUserData(values)
	}
})(UserProfile)

export default connect(mapStateToProps, mapDispatchToProps)(MyEnhancedForm)
