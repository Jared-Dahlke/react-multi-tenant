/*eslint-disable no-restricted-globals*/
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Snackbar from '@material-ui/core/Snackbar'
import AddAlert from '@material-ui/icons/AddAlert'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import AccountDropdown from '../../components/AccountDropdown'

import { userProfileFetchData } from '../../redux/actions/auth.js'
import { connect } from 'react-redux'
import { updateUserData } from '../../redux/actions/users.js'
import { FormLoader } from '../../components/SkeletonLoader'
import { Formik } from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import FormikSelect from '../../components/CustomSelect/FormikSelect'
import * as Yup from 'yup'
import { getCurrentAccount } from '../../utils'
import {
	updateAccount,
	deleteAccount,
	createAccount,
	accountCreated
} from '../../redux/actions/accounts'
import { Debug } from '../Debug'

const styles = {
	cardCategoryWhite: {
		color: 'rgba(255,255,255,.62)',
		margin: '0',
		fontSize: '14px',
		marginTop: '0',
		marginBottom: '0'
	},
	cardTitleWhite: {
		color: '#FFFFFF',
		marginTop: '0px',
		minHeight: 'auto',
		fontWeight: '300',
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: '3px',
		textDecoration: 'none'
	},
	minWidth: {
		minWidth: '30px'
	},
	green: {
		color: 'green'
	}
}

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		accounts: state.accounts,
		accountTypes: state.accountTypes,
		isSwitchingAccounts: state.isSwitchingAccounts,
		accountCreated: state.accountCreated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserProfile: () => dispatch(userProfileFetchData()),
		updateUserData: (userData) => dispatch(updateUserData(userData)),
		updateAccount: (account) => dispatch(updateAccount(account)),
		deleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
		createAccount: (account) => dispatch(createAccount(account)),
		setAccountCreated: (val) => dispatch(accountCreated(val))
	}
}

const schemaValidation = Yup.object().shape({
	users: Yup.array()
		.min(1, 'Select at least one field')
		.of(
			Yup.object()
				.shape({
					label: Yup.string(),
					value: Yup.string()
				})
				.transform((v) => (v === '' ? null : v))
		),
	accountName: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters')
		.required('Required'),
	contactName: Yup.string()
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters')
		.required('Required'),
	contactEmail: Yup.string()
		.email('Invalid email')
		.required('Required'),
	accountMargin: Yup.number()
		.typeError('Account margin must be a number')
		.min(0, 'Margin must be a positive number')
		.max(3000, 'Margin cannot be greater than 3000')
		.required('Required'),
	accountType: Yup.object()
		.shape({
			label: Yup.string(),
			value: Yup.number()
		})
		.nullable()
		.required('Account Type is required')
})

function Account(props) {
	const getAccountTypeNameById = (accountTypeId) => {
		let accountTypesCopy = JSON.parse(JSON.stringify(props.accountTypes))
		for (const accountType of accountTypesCopy) {
			if (accountTypeId === accountType.accountTypeId)
				return accountType.accountTypeName
		}
		throw new error('Cannot find accountTypeId in the accountTypes object')
	}

	const [current, setCurrent] = React.useState({})

	const handleCreateChild = () => {
		let levelId = current.accountLevelId + 1
		if (levelId > 3) {
			levelId = 3
		}
		let childAccount = {
			accountName: 'New Child',
			accountTypeId: props.accountTypes[0].accountTypeId,
			accountLevelId: levelId,
			accountMargin: 0,
			contactName: ' ',
			contactEmail: 'placeholder@placeholder.com',
			parentAccountId: current.accountId
		}
		props.createAccount(childAccount)
	}

	const handleDeleteAccount = () => {
		if (current.accountName === 'Sightly') {
			alert('You cannot delete the top level Sightly account')
			return
		}
		if (confirm('Are you sure you want to delete this account?')) {
			props.deleteAccount(props.currentAccountId)
		} else {
		}
	}

	const handleMySubmit = (values) => {
		let account = {
			accountId: values.accountId,
			accountName: values.accountName,
			accountMargin: values.accountMargin,
			contactEmail: values.contactEmail,
			contactName: values.contactName,
			accountTypeId: values.accountTypeId,
			accountTypeName: getAccountTypeNameById(values.accountTypeId)
		}
		props.updateAccount(account)
	}

	let currentAccount = React.useMemo(() => {
		let current = getCurrentAccount(props.accounts.data)
		setCurrent(current)
		return current
	}, [props.accounts.data])

	let accountLoading = false

	if (!currentAccount) {
		accountLoading = true
		currentAccount = {
			accountId: 'placeholder',
			accountName: '',
			accountTypeName: '',
			accountTypeId: '',
			contactName: '',
			contactEmail: '',
			accountMargin: '',
			parentAccountName: ''
		}
	}

	return (
		<Formik
			enableReinitialize
			validateOnMount={false}
			// validateOnChange={true}
			validationSchema={() => schemaValidation}
			initialValues={{
				accountName: currentAccount.accountName,
				contactName: currentAccount.contactName,
				contactEmail: currentAccount.contactEmail,
				accountMargin: currentAccount.accountMargin,

				accountTypeId: currentAccount.accountTypeId,

				parentAccountName: currentAccount.parentAccountName,
				accountId: currentAccount.accountId
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
				<GridContainer>
					<GridItem xs={12} sm={12} md={6}>
						<AccountDropdown />
						<Card>
							{accountLoading || props.isSwitchingAccounts ? (
								<FormLoader />
							) : (
								<div>
									<CardBody>
										<GridContainer>
											<Grid container justify='flex-end'>
												<GridItem>
													<Button color='primary' onClick={handleCreateChild}>
														Create Child Account
													</Button>
												</GridItem>
											</Grid>

											<GridItem xs={12} sm={12} md={12}>
												<FormikInput
													name='accountName'
													labelText='Account Name'
													id='accountName'
													formControlProps={{
														fullWidth: true
													}}
													inputProps={{}}
												/>

												<FormikInput
													name='parentAccountName'
													labelText='Parent Account'
													formControlProps={{
														fullWidth: true
													}}
													inputProps={{
														disabled: true
													}}
												/>

												<FormikInput
													name='contactName'
													labelText='Contact Name'
													formControlProps={{
														fullWidth: true
													}}
													inputProps={{}}
												/>

												<FormikInput
													name='contactEmail'
													labelText='Contact Email'
													formControlProps={{
														fullWidth: true
													}}
													inputProps={{}}
												/>
												<FormikInput
													name='accountMargin'
													labelText='Account Margin'
													formControlProps={{
														fullWidth: true
													}}
													inputProps={{}}
												/>

												<FormikSelect
													id='accountType'
													name='accountTypeId'
													label='Account Type'
													placeholder='Select an Account Type'
													optionLabel='accountTypeName'
													optionValue='accountTypeId'
													options={props.accountTypes}
													value={values.accountTypeId}
													onChange={setFieldValue}
													onBlur={setFieldTouched}
													validateField={validateField}
													validateForm={validateForm}
													touched={touched.accountTypeId}
													error={errors.accountTypeId}
												/>
											</GridItem>
										</GridContainer>
									</CardBody>

									<CardFooter>
										{current.accountName === 'Sightly' ||
										(current.children && current.children.length > 0) ? null : (
											<Button color='danger' onClick={handleDeleteAccount}>
												Delete
											</Button>
										)}

										<Button
											disabled={!isValid}
											color='primary'
											onClick={() => handleMySubmit(values)}
										>
											Save
										</Button>
										<Snackbar
											autoHideDuration={2000}
											place='bc'
											icon={AddAlert}
											open={props.accountCreated}
											onClose={() => props.setAccountCreated(false)}
										>
											<Alert severity='success'>Account created!</Alert>
										</Snackbar>
									</CardFooter>
								</div>
							)}
						</Card>
					</GridItem>
				</GridContainer>
			)}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
