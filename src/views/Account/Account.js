/*eslint-disable no-restricted-globals*/
import React from 'react'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Button from 'rsuite/lib/Button'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import AccountDropdown from '../../components/AccountDropdown'

import { userProfileFetchData } from '../../redux/actions/auth.js'
import { connect } from 'react-redux'
import { updateUserData } from '../../redux/actions/users.js'
import { FormLoader } from '../../components/SkeletonLoader'
import { withFormik, Form } from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import FormikSelect from '../../components/CustomSelect/FormikSelect'
import * as Yup from 'yup'
import { getCurrentAccount } from '../../utils'
import {
	updateAccount,
	deleteAccount,
	createAccount,
	accountCreated,
	setAccountSaved
} from '../../redux/actions/accounts'
import { UserCan, perms, userCan } from '../../Can'

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		accounts: state.accounts,
		accountTypes: state.accountTypes,
		isSwitchingAccounts: state.isSwitchingAccounts,
		accountCreated: state.accountCreated,
		accountSaved: state.accountSaved,
		accountSaving: state.accountSaving,
		rolesIsLoading: state.rolesIsLoading,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserProfile: () => dispatch(userProfileFetchData()),
		updateUserData: (userData) => dispatch(updateUserData(userData)),
		updateAccount: (account) => dispatch(updateAccount(account)),
		deleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
		createAccount: (account) => dispatch(createAccount(account)),
		setAccountCreated: (val) => dispatch(accountCreated(val)),
		setAccountSaved: (bool) => dispatch(setAccountSaved(bool))
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
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters'),
	contactName: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters'),
	contactEmail: Yup.string()
		.required('Required')
		.email('Invalid email'),
	accountMargin: Yup.number()
		.typeError('Account margin must be a number')
		.required('Required')
		.min(0, 'Margin must be a positive number')
		.max(3000, 'Margin cannot be greater than 3000'),
	accountType: Yup.object()
		.shape({
			label: Yup.string(),
			value: Yup.number()
		})
		.nullable()
		.required('Account Type is required')
})

const getAccountTypeNameById = (accountTypeId, accountTypes) => {
	let accountTypesCopy = JSON.parse(JSON.stringify(accountTypes))
	for (const accountType of accountTypesCopy) {
		if (accountTypeId === accountType.accountTypeId)
			return accountType.accountTypeName
	}
	throw new error('Cannot find accountTypeId in the accountTypes object')
}

function Account(props) {
	const handleCreateChild = (current) => {
		let levelId = current.accountLevelId + 1
		if (levelId > 3) {
			levelId = 3
		}
		let childAccount = {
			accountName: 'New Child',
			accountTypeId: props.accountTypes[0].accountTypeId,
			accountLevelId: levelId,
			accountMargin: 0,
			contactName: 'placeholder',
			contactEmail: 'placeholder@placeholder.com',
			parentAccountId: current.accountId
		}
		props.createAccount(childAccount)
	}

	const handleDeleteAccount = (current) => {
		if (current.accountName === 'Sightly') {
			alert('You cannot delete the top level Sightly account')
			return
		}
		if (confirm('Are you sure you want to delete this account?')) {
			props.deleteAccount(props.currentAccountId)
		} else {
		}
	}

	let current = React.useMemo(() => getCurrentAccount(props.accounts.data), [
		props.accounts
	])

	if (!current) {
		current = {}
	}

	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		validateField,
		validateForm,
		isSubmitting,
		isValid,
		isValidating,
		dirty
	} = props

	if (
		props.rolesIsLoading ||
		props.isSwitchingAccounts ||
		values.accountTypeName.length < 1
	) {
		return (
			<GridContainer>
				<GridItem xs={12} sm={12} md={6}>
					<FormLoader />
				</GridItem>
			</GridContainer>
		)
	} else {
		return (
			<GridContainer>
				<GridItem xs={12} sm={12} md={6}>
					<AccountDropdown />
					<Card>
						<Form>
							<CardBody>
								<GridContainer>
									<Grid container justify='flex-end'>
										<GridItem>
											<UserCan i={perms.ACCOUNT_CREATE}>
												<Button onClick={() => handleCreateChild(current)}>
													Create Child Account
												</Button>
											</UserCan>
										</GridItem>
									</Grid>

									<GridItem xs={12} sm={12} md={12}>
										<FormikInput
											name='accountName'
											formikValue={values.accountName}
											labelText='Account Name'
											id='accountName'
											disabled={!userCan(perms.ACCOUNT_UPDATE)}
										/>

										<FormikInput
											name='parentAccountName'
											formikValue={values.parentAccountName}
											labelText='Parent Account'
											disabled
										/>

										<FormikInput
											name='contactName'
											formikValue={values.contactName}
											labelText='Contact Name'
											disabled={!userCan(perms.ACCOUNT_UPDATE)}
										/>

										<FormikInput
											name='contactEmail'
											formikValue={values.contactEmail}
											labelText='Contact Email'
											disabled={!userCan(perms.ACCOUNT_UPDATE)}
										/>
										<FormikInput
											name='accountMargin'
											formikValue={values.accountMargin}
											labelText='Account Margin'
											disabled={!userCan(perms.ACCOUNT_UPDATE)}
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
											isDisabled={!userCan(perms.ACCOUNT_UPDATE)}
										/>
									</GridItem>
								</GridContainer>
							</CardBody>

							<CardFooter>
								{current.accountName === 'Sightly' ||
								(current.children && current.children.length > 0) ? null : (
									<UserCan i={perms.ACCOUNT_DELETE}>
										<Button
											color='red'
											onClick={() => handleDeleteAccount(current)}
										>
											Delete
										</Button>
									</UserCan>
								)}

								<UserCan i={perms.ACCOUNT_UPDATE}>
									<Button
										loading={props.accountSaving}
										disabled={!isValid || !dirty || props.accountSaving}
										type='submit'
									>
										Save
									</Button>
								</UserCan>
								<Snackbar
									autoHideDuration={2000}
									place='bc'
									open={props.accountCreated}
									onClose={() => props.setAccountCreated(false)}
								>
									<Alert
										onClose={() => props.setAccountCreated(false)}
										severity='success'
									>
										Account created
									</Alert>
								</Snackbar>

								<Snackbar
									autoHideDuration={2000}
									place='bc'
									open={props.accountSaved}
									onClose={() => props.setAccountSaved(false)}
								>
									<Alert
										onClose={() => props.setAccountSaved(false)}
										severity='success'
									>
										Account saved
									</Alert>
								</Snackbar>
							</CardFooter>
						</Form>
						)}
					</Card>
				</GridItem>
			</GridContainer>
		)
	}
}

const FormikForm = withFormik({
	mapPropsToValues: (props) => {
		let currentAccount = getCurrentAccount(props.accounts.data)
		if (!currentAccount) {
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

		return {
			accountName: currentAccount.accountName,
			contactName: currentAccount.contactName,
			contactEmail: currentAccount.contactEmail,
			accountMargin: currentAccount.accountMargin,
			accountTypeId: currentAccount.accountTypeId,
			accountTypeName: currentAccount.accountTypeName,
			parentAccountName: currentAccount.parentAccountName,
			accountId: currentAccount.accountId
		}
	},
	enableReinitialize: true,
	validateOnMount: true,
	validateOnChange: true,
	validateOnBlur: true,
	validationSchema: schemaValidation,
	handleSubmit: (values, { props }) => {
		let account = {
			accountId: values.accountId,
			accountName: values.accountName,
			accountMargin: values.accountMargin,
			contactEmail: values.contactEmail,
			contactName: values.contactName,
			accountTypeId: values.accountTypeId,
			accountTypeName: getAccountTypeNameById(
				values.accountTypeId,
				props.accountTypes
			)
		}
		props.updateAccount(account)
	}
})(Account)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
