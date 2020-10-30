/* eslint-disable semi, indent, no-mixed-operators, no-underscore-dangle */
import React from 'react'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Button from 'rsuite/lib/Button'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import { connect } from 'react-redux'
import {
	createUser,
	setUserAdded,
	setUserAddError
} from '../../redux/actions/users'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import SuiteTree from '../../components/Tree/SuiteTree.js'
import { Formik } from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import FormikSelect from '../../components/CustomSelect/FormikSelect'
import * as Yup from 'yup'
import { default as UUID } from 'node-uuid'
import Icon from 'rsuite/lib/Icon'
import IconButton from 'rsuite/lib/IconButton'
import Tooltip from 'rsuite/lib/Tooltip'
import Whisper from 'rsuite/lib/Whisper'
import RolesInfo from './RolesInfo.js'

const schemaValidation = Yup.object().shape({
	roleId: Yup.number()
		.typeError('Required')
		.required('Required'),
	accounts: Yup.array().min(1, 'Select at least one account'),
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

const mapStateToProps = (state) => {
	return {
		roles: state.roles.data,
		hasErrored: state.rolesHasErrored,
		isLoading: state.rolesIsLoading,
		accounts: state.accounts,
		currentAccountId: state.currentAccountId,
		userAdded: state.userAdded,
		userAdding: state.userAdding,
		userAddError: state.userAddError,
		rolesPermissions: state.rolesPermissions,
		userProfile: state.user.userProfile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNewUser: (user) => dispatch(createUser(user)),
		setUserAdded: (bool) => dispatch(setUserAdded(bool)),
		setUserAddError: (bool) => dispatch(setUserAddError(bool))
	}
}

function CreateUser(props) {
	const [openDialog, setOpenDialog] = React.useState(false)
	const handleDialog = (value) => {
		setOpenDialog(value)
	}

	const filteredRolesPermissions = (userType) => {
		if (userType === 'External')
			return Array.from(props.rolesPermissions.data).filter(
				(role) => role.userType === 'External'
			)
		return (
			props.rolesPermissions &&
			props.rolesPermissions.data &&
			Array.from(props.rolesPermissions.data)
		)
	}

	const handleInviteUserClick = (values) => {
		let accountsToLink = []
		for (const account of values.accounts) {
			accountsToLink.push({ accountId: account })
		}

		let type = values.email.toLowerCase().includes('sightly.com')
			? 'Internal'
			: 'External'

		let newUser = {
			userId: UUID.v4(),
			firstName: values.firstName,
			lastName: values.lastName,
			company: values.company,
			email: values.email,
			userType: type,
			roleId: values.roleId,
			accounts: accountsToLink
		}
		props.addNewUser(newUser)
	}

	return (
		<>
			<Formik
				enableReinitialize={true}
				validateOnMount={false}
				validateOnChange={true}
				validateOnBlur={true}
				validationSchema={() => schemaValidation}
				initialValues={{
					company: '',
					firstName: '',
					lastName: '',
					email: '',
					roleId: '',
					accounts: []
				}}
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
					dirty
				}) => (
					<div>
						<GridContainer>
							<GridItem xs={12} sm={12} md={8}>
								<Card>
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
											<GridItem xs={12} sm={12} md={7}>
												<FormikInput
													name='email'
													formikValue={values.email}
													labelText='Email'
													id='email'
												/>
											</GridItem>
											<GridItem xs={12} sm={12} md={5}>
												<FormikInput
													name='firstName'
													formikValue={values.firstName}
													labelText='First Name'
													id='firstName'
												/>
											</GridItem>
											<GridItem xs={12} sm={12} md={7}>
												<FormikInput
													name='lastName'
													formikValue={values.lastName}
													labelText='Last Name'
													id='lastName'
												/>
											</GridItem>

											<GridItem xs={12} sm={12} md={12}>
												<SuiteTree
													label='Account Access'
													name='accounts'
													data={props.accounts.data}
													labelKey='accountName'
													valueKey='accountId'
													value={values.accounts}
													onChange={setFieldValue}
													cascade={true}
													error={errors.accounts}
													touched={touched.accounts}
												/>
											</GridItem>

											<GridItem xs={10} sm={10} md={12}>
												<div
													style={{
														display: 'flex',
														alignItems: 'flex-end'
													}}
												>
													<FormikSelect
														id='role'
														name='roleId'
														label='Role'
														placeholder='Role'
														optionLabel='roleName'
														optionValue='roleId'
														options={props.roles}
														value={values.roleId}
														onChange={setFieldValue}
														onBlur={setFieldTouched}
														validateField={validateField}
														validateForm={validateForm}
														touched={touched.roleId}
														error={errors.roleId}
													/>
													<Whisper
														placement='right'
														trigger='hover'
														speaker={
															<Tooltip>More about Roles/Permissions</Tooltip>
														}
													>
														<IconButton
															icon={<Icon icon='info' />}
															circle
															size='md'
															appearance='ghost'
															onClick={() => {
																handleDialog(true)
															}}
															style={{ margin: '10px' }}
														/>
													</Whisper>
												</div>
											</GridItem>
										</GridContainer>
									</CardBody>
									<CardFooter>
										<Button
											disabled={!isValid || !dirty}
											onClick={() => handleInviteUserClick(values)}
											loading={props.userAdding}
										>
											Invite User
										</Button>
									</CardFooter>
								</Card>
							</GridItem>
						</GridContainer>

						<Snackbar
							autoHideDuration={2000}
							place='bc'
							open={props.userAdded}
							onClose={() => props.setUserAdded(false)}
						>
							<Alert
								onClose={() => props.setUserAdded(false)}
								severity='success'
							>
								User invite sent
							</Alert>
						</Snackbar>

						<Snackbar
							autoHideDuration={2000}
							place='bc'
							open={props.userAddError}
							onClose={() => props.setUserAddError(false)}
						>
							<Alert
								onClose={() => props.setUserAddError(false)}
								severity='error'
							>
								Error inviting user.
							</Alert>
							{/**TODO: this message can be more descriptive once api returns a better error response: https://sightly.atlassian.net/browse/EN-4452 */}
						</Snackbar>
					</div>
				)}
			/>
			{/* Info Modal for Roles help */}
			{openDialog && (
				<RolesInfo
					show={openDialog}
					title='Roles and Permissions'
					handleDialog={(value) => {
						handleDialog(value)
					}}
					data={filteredRolesPermissions(
						props.userProfile && props.userProfile.userType
					)}
					userType={props.userProfile && props.userProfile.userType}
				/>
			)}
		</>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
