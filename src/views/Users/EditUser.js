import React from 'react'
import { connect } from 'react-redux'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Button from 'rsuite/lib/Button'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { 
	updateUserData,
	updateUserAccounts,
	fetchUserAccounts,
	setUserEditSaved
} from '../../redux/actions/users'
import { FormLoader } from '../../components/SkeletonLoader'
import { Formik } from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import FormikSelect from '../../components/CustomSelect/FormikSelect'
import * as Yup from 'yup'
import SuiteTree from '../../components/Tree/SuiteTree.js'
import Icon from 'rsuite/lib/Icon'
import IconButton from 'rsuite/lib/IconButton'
import Tooltip from 'rsuite/lib/Tooltip'
import Whisper from 'rsuite/lib/Whisper'
import RolesInfo from './RolesInfo.js'
import { UserCan, perms, userCan } from '../../Can'

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
		accounts: state.accounts,
		users: state.users,
		editUserUserAccountsLoading: state.editUserUserAccountsLoading,
		userEditSaving: state.userEditSaving,
		userEditSaved: state.userEditSaved,
		userProfile: state.user.userProfile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateUserData: (userData) => dispatch(updateUserData(userData)),
		fetchUserAccounts: (userId) => dispatch(fetchUserAccounts(userId)),
		updateUserAccounts: (user, accounts) =>
			dispatch(updateUserAccounts(user, accounts)),
		setUserEditSaved: (bool) => dispatch(setUserEditSaved(bool))
	}
}

const formatAccountsForTree = (accounts) => {
	if (!accounts) return []
	let accountsCopy = JSON.parse(JSON.stringify(accounts))
	if (accountsCopy && accountsCopy.length > 0) {
		addPropsToAccounts(accountsCopy)
	}
	return accountsCopy
}

const addPropsToAccounts = (accounts) => {
	for (const account of accounts) {
		account.value = account.accountId
		account.label = account.accountName
		if (account.children) {
			addPropsToAccounts(account.children)
		}
	}
}

const getGrantedAccounts = (users, userId) => {
	if (!users) return []
	let usersCopy = JSON.parse(JSON.stringify(users))
	if (usersCopy && usersCopy.length > 0) {
		for (const user of users) {
			if (user.userId === userId) {
				if (!user.accounts) return []
				let accounts = []
				for (const account of user.accounts) {
					accounts.push(account.accountId)
				}
				return accounts
			}
		}
	}
}

const getUser = (users, userId) => {
	if (!users || users.length < 1)
		return {
			firstName: '',
			lastName: '',
			email: '',
			roleId: '',
			accounts: [],
			company: ''
		}
	let usersCopy = JSON.parse(JSON.stringify(users))
	for (const user of usersCopy) {
		if (user.userId === userId) return user
	}
}

export function EditUser(props) {
	const [ openDialog, setOpenDialog  ] = React.useState(false)

	let parsedUserId = JSON.parse(props.match.params.user)

	let treeAccounts = React.useMemo(
		() => formatAccountsForTree(props.accounts.data),
		[props.accounts.data]
	)
	let grantedAccounts = React.useMemo(
		() => getGrantedAccounts(props.users.data, parsedUserId),
		[props.users.data, parsedUserId]
	)
	let user = React.useMemo(() => getUser(props.users.data, parsedUserId), [
		props.users.data,
		parsedUserId
	])

	const handleSaveClick = (values, resetForm) => {
		values.userType = values.email.toLowerCase().includes('sightly.com')
			? 'Internal'
			: 'External'

		values.userId = user.userId

		props.updateUserData(values)
		let accounts = []
		for (const account of values.accounts) {
			accounts.push({ accountId: account })
		}
		props.updateUserAccounts(user, accounts)
	}

	const handleDialog = (value) =>{
		setOpenDialog(value)
	}

	const filteredRolesPermissions = (userType,userEmail) => {
		console.log('userEmail',userEmail)
		if(userType === 'External') return Array.from(props.roles).filter(role => role.userType === 'External')
		if(!userEmail) return Array.from(props.roles)
		if(!(userEmail.toLowerCase().includes('sightly.com'))) return Array.from(props.roles).filter(role => role.userType === 'External')
		return Array.from(props.roles).filter(role => role.userType === 'Internal')
	}
	

	let fetchUserAccounts = props.fetchUserAccounts

	React.useEffect(() => {
		if (!user.accounts) {
			fetchUserAccounts(parsedUserId)
		}
	}, [props.users, parsedUserId, user.accounts, fetchUserAccounts])

	return (
		<>
			<Formik
				data-qa='editUserForm'
				enableReinitialize={true}
				validateOnMount={true}
				validateOnChange={true}
				validateOnBlur={true}
				validationSchema={() => schemaValidation}
				initialValues={{
					company: user.company,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					roleId: user.roleId,
					accounts: grantedAccounts
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
					dirty,
					resetForm
				}) => (
					<div>
						<GridContainer>
							<GridItem xs={12} sm={12} md={8}>
								<Card>
									{props.editUserUserAccountsLoading ? (
										<FormLoader />
									) : (
										<div>
											<CardBody>
												<GridContainer>
													<GridItem xs={12} sm={12} md={6}>
														<FormikInput
															name='company'
															formikValue={values.company}
															labelText='Company'
															id='company'
															disabled={!userCan(perms.USER_UPDATE)}
														/>
													</GridItem>

													<GridItem xs={12} sm={12} md={6}>
														<FormikInput
															name='email'
															formikValue={values.email}
															labelText='Email'
															id='email'
															disabled={!userCan(perms.USER_UPDATE)}
														/>
													</GridItem>

													<GridItem xs={12} sm={12} md={6}>
														<FormikInput
															name='firstName'
															formikValue={values.firstName}
															labelText='First Name'
															id='firstName'
															disabled={!userCan(perms.USER_UPDATE)}
														/>
													</GridItem>

													<GridItem xs={12} sm={12} md={6}>
														<FormikInput
															name='lastName'
															formikValue={values.lastName}
															labelText='Last Name'
															id='lastName'
															disabled={!userCan(perms.USER_UPDATE)}
														/>
													</GridItem>

													<GridItem xs={12} sm={12} md={6}>
														{props.accounts.data &&
														props.accounts.data.length > 0 &&
														!props.editUserUserAccountsLoading ? (
															<SuiteTree
																label='Account Access'
																name='accounts'
																data-qa='accounts'
																data={treeAccounts}
																labelKey='accountName'
																valueKey='accountId'
																value={values.accounts}
																onChange={setFieldValue}
																cascade={true}
																error={errors.accounts}
																disabled={
																	!userCan(perms.ASSIGNED_ACCOUNT_UPDATE)
																}
															/>
														) : null}
													</GridItem>
													<GridItem xs={12} sm={12} md={6}></GridItem>

													<GridItem xs={10} sm={10} md={6}>
														<div
															style={{
																display: 'flex',
																alignItems: 'flex-end'
															}}
														>
															<FormikSelect
																id='role'
																name='roleId'
																data-qa='roleId'
																label='Role'
																placeholder='Role'
																optionLabel='roleName'
																optionValue='roleId'
																options={filteredRolesPermissions(props.userProfile && props.userProfile.userType, values.email)}
																value={values.roleId}
																onChange={setFieldValue}
																onBlur={setFieldTouched}
																validateField={validateField}
																validateForm={validateForm}
																touched={touched.roleId}
																error={errors.roleId}
																isDisabled={!userCan(perms.USER_UPDATE)}
															/>
															<Whisper
																placement='right'
																trigger='hover'
																speaker={
																	<Tooltip>
																		More about Roles/Permissions
																	</Tooltip>
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
												<UserCan i={perms.USER_UPDATE}>
													<Button
														disabled={!isValid || !dirty}
														onClick={() => handleSaveClick(values, resetForm)}
														loading={props.userEditSaving}
													>
														Save
													</Button>
												</UserCan>
											</CardFooter>
										</div>
									)}
								</Card>
							</GridItem>
						</GridContainer>

						<Snackbar
							autoHideDuration={2000}
							place='bc'
							open={props.userEditSaved}
							onClose={() => props.setUserEditSaved(false)}
						>
							<Alert
								onClose={() => props.setUserEditSaved(false)}
								severity='success'
							>
								User info saved
							</Alert>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
