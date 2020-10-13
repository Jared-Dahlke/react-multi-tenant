import React from 'react'
import { connect } from 'react-redux'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Snackbar from '../../components/Snackbar/Snackbar'
import AddAlert from '@material-ui/icons/AddAlert'
import {
	updateUserData,
	updateUserRoles,
	updateUserAccounts,
	fetchUserAccounts
} from '../../redux/actions/users'
import { FormLoader } from '../../components/SkeletonLoader'
import { Formik } from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import FormikSelect from '../../components/CustomSelect/FormikSelect'
import * as Yup from 'yup'
import SuiteTree from '../../components/Tree/SuiteTree.js'

const schemaValidation = Yup.object().shape({
	roles: Yup.array()
		.min(1, 'Select at least one role')
		.of(
			Yup.object()
				.shape({
					label: Yup.string(),
					value: Yup.string()
				})
				.transform((v) => (v === '' ? null : v))
		),
	accounts: Yup.array().min(1, 'Select at least one account'),
	firstName: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters')
		.required('Required'),
	lastName: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters')
		.required('Required'),
	company: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters')
		.required('Required'),
	email: Yup.string()
		.email('Invalid email')
		.required('Required')
})

const mapStateToProps = (state) => {
	return {
		roles: state.roles.data,
		accounts: state.accounts,
		users: state.users,
		editUserUserAccountsLoading: state.editUserUserAccountsLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateUserData: (userData) => dispatch(updateUserData(userData)),
		fetchUserAccounts: (userId) => dispatch(fetchUserAccounts(userId)),
		updateUserRoles: (user, roles) => dispatch(updateUserRoles(user, roles)),
		updateUserAccounts: (user, accounts) =>
			dispatch(updateUserAccounts(user, accounts))
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
			roles: [],
			accounts: [],
			company: ''
		}
	let usersCopy = JSON.parse(JSON.stringify(users))
	for (const user of usersCopy) {
		if (user.userId === userId) return user
	}
}

function EditUser(props) {
	let parsedUserId = JSON.parse(props.match.params.user)

	let treeAccounts = React.useMemo(
		() => formatAccountsForTree(props.accounts.data),
		[props.accounts.data]
	)
	let grantedAccounts = React.useMemo(
		() => getGrantedAccounts(props.users.data, parsedUserId),
		[props.users.data]
	)
	let user = React.useMemo(() => getUser(props.users.data, parsedUserId), [
		props.users.data
	])

	const handleSaveClick = (values) => {
		values.userType = 'External'
		values.userId = user.userId

		props.updateUserData(values)

		let roles = []
		for (const role of values.roles) {
			roles.push({ roleId: role.roleId })
		}
		props.updateUserRoles(user, roles)
		let accounts = []
		for (const account of values.accounts) {
			accounts.push({ accountId: account })
		}
		props.updateUserAccounts(user, accounts)
	}

	let fetchUserAccounts = props.fetchUserAccounts

	React.useEffect(() => {
		if (!user.accounts) {
			fetchUserAccounts(parsedUserId)
		}
	}, [props.users])

	return (
		<Formik
			enableReinitialize
			validateOnMount={false}
			validationSchema={() => schemaValidation}
			initialValues={{
				company: user.company,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				roles: user.roles,
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
												labelText='Company'
												id='company'
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{
													disabled: true
												}}
											/>
										</GridItem>

										<GridItem xs={12} sm={12} md={6}>
											<FormikInput
												name='email'
												labelText='Email'
												id='email'
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{}}
											/>
										</GridItem>

										<GridItem xs={12} sm={12} md={4}>
											<FormikInput
												name='firstName'
												labelText='First Name'
												id='firstName'
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{}}
											/>
										</GridItem>

										<GridItem xs={12} sm={12} md={8}>
											<FormikInput
												name='lastName'
												labelText='Last Name'
												id='lastName'
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{}}
											/>
										</GridItem>

										<GridItem xs={12} sm={12} md={12}>
											{props.accounts.data &&
											props.accounts.data.length > 0 &&
											!props.editUserUserAccountsLoading ? (
												<SuiteTree
													name='accounts'
													data={treeAccounts}
													labelKey='accountName'
													valueKey='accountId'
													value={values.accounts}
													onChange={setFieldValue}
													cascade={false}
													error={errors.accounts}
												/>
											) : (
												<FormLoader />
											)}
										</GridItem>

										<GridItem xs={10} sm={10} md={12}>
											<FormikSelect
												id='roles'
												name='roles'
												label='Roles'
												placeholder='Roles'
												optionLabel='roleName'
												optionValue='roleId'
												options={props.roles}
												value={values.roles}
												isMulti={true}
												onChange={setFieldValue}
												onBlur={setFieldTouched}
												validateField={validateField}
												validateForm={validateForm}
												touched={touched.roles}
												error={errors.roles}
												isClearable={true}
												backspaceRemovesValue={true}
											/>
										</GridItem>
									</GridContainer>
								</CardBody>
								<CardFooter>
									<Button
										disabled={!isValid || !dirty}
										onClick={() => handleSaveClick(values)}
										color='primary'
									>
										Save
									</Button>
								</CardFooter>
							</Card>
						</GridItem>
					</GridContainer>

					<Snackbar
						place='bc'
						color='success'
						icon={AddAlert}
						message='User info is saved'
						//  open={showAlertMessage}
						// closeNotification={() => setShowAlertMessage(false)}
						close
					/>
				</div>
			)}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
