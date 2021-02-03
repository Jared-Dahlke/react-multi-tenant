/*eslint-disable no-restricted-globals*/
import React from 'react'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Button from 'rsuite/lib/Button'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Grid from '@material-ui/core/Grid'
import AccountDropdown from '../../components/AccountDropdown'
import Panel from '../../components/CustomPanel'
import { userProfileFetchData } from '../../redux/actions/auth.js'
import { connect } from 'react-redux'

import Loader from 'rsuite/lib/Loader'
import { withFormik, Form } from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import FormikSelect from '../../components/CustomSelect/FormikSelect'
import Icon from 'rsuite/lib/Icon'
import IconButton from 'rsuite/lib/IconButton'
import * as Yup from 'yup'
import { getCurrentAccount } from '../../utils'
import InputPicker from 'rsuite/lib/InputPicker'
import { useHistory } from 'react-router-dom'
import config from '../../config'
import {
	updateAccount,
	deleteAccount,
	createAccount
} from '../../redux/actions/accounts'

import { setFromGoogleAuthCallback } from '../../redux/actions/ThirdParty/Google/google'
import { accountTypes } from '../../staticData/data'
import queryString from 'query-string'

import {
	handleGoogleAdsApiConsent,
	setAccountHasValidGoogleRefreshToken
} from '../../redux/actions/ThirdParty/Google/google'
import { UserCan, perms, userCan } from '../../Can'
import { neutralExtraLightColor } from '../../assets/jss/colorContants.js'

const googleAuth = config.googleAuth

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		accounts: state.accounts,
		isSwitchingAccounts: state.isSwitchingAccounts,
		accountSaving: state.accountSaving,
		rolesPermissionsIsLoading: state.rolesPermissionsIsLoading,
		user: state.user,
		googleLoginUrl: state.thirdParty.googleLoginUrl,
		accountHasValidGoogleRefreshToken:
			state.thirdParty.accountHasValidGoogleRefreshToken,
		googleAccountCampaigns: state.thirdParty.googleAccountCampaigns,
		googleAccounts: state.thirdParty.googleAccounts
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserProfile: () => dispatch(userProfileFetchData()),
		updateAccount: (account) => dispatch(updateAccount(account)),
		deleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
		createAccount: (account) => dispatch(createAccount(account)),
		handleGoogleAdsApiConsent: (params) =>
			dispatch(handleGoogleAdsApiConsent(params)),
		setAccountHasValidGoogleRefreshToken: (bool) =>
			dispatch(setAccountHasValidGoogleRefreshToken(bool)),
		setFromGoogleAuthCallback: (bool) =>
			dispatch(setFromGoogleAuthCallback(bool))
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
	throw new Error('Cannot find accountTypeId in the accountTypes object')
}

function Account(props) {
	let history = useHistory()

	React.useEffect(() => {
		if (props.currentAccountId && props.currentAccountId.length > 0) {
			let params = queryString.parse(location.search)
			if (params && params.code) {
				let args = {
					code: params.code,
					accountId: props.currentAccountId
				}
				props.setFromGoogleAuthCallback(true)
				props.setAccountHasValidGoogleRefreshToken(true)
				history.push('/app/settings/account')
				props.handleGoogleAdsApiConsent(args)
			}
		}
	}, [props.currentAccountId])

	const handleGoogleLogin = () => {
		let url = props.googleLoginUrl
		window.open(url)
	}

	const handleCreateChild = (current) => {
		let levelId = current.accountLevelId + 1
		if (levelId > 3) {
			levelId = 3
		}
		let childAccount = {
			accountName: 'New Child',
			accountTypeId: accountTypes[0].accountTypeId,
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
		isValid,
		dirty
	} = props

	if (
		props.rolesPermissionsIsLoading ||
		props.isSwitchingAccounts ||
		values.accountTypeName.length < 1
	) {
		return <Loader center size='lg' content='Loading...' vertical />
	} else {
		return (
			<GridContainer>
				<GridItem xs={12} sm={12} md={6}>
					<AccountDropdown searchable={true} />

					{!props.accountHasValidGoogleRefreshToken && googleAuth && (
						<IconButton
							style={{
								backgroundColor: neutralExtraLightColor,
								marginBottom: 15
							}}
							onClick={handleGoogleLogin}
							block
							icon={
								<Icon
									style={{ backgroundColor: neutralExtraLightColor }}
									icon='google'
								/>
							}
						>
							Connect this account to Google Ads
						</IconButton>
					)}

					{props.accountHasValidGoogleRefreshToken &&
						props.googleAccounts &&
						googleAuth && (
							<>
								<p>
									Your linked Google Ads Account (this comes from Google Ads API
									based off the user you authenticated with)
								</p>
								<InputPicker
									block
									style={{
										backgroundColor: neutralExtraLightColor,
										marginBottom: 15
									}}
									id='googleAccountId'
									label='Google Ads Accounts'
									placeholder='Select a Google Account to Link'
									labelKey='accountId'
									valueKey='accountId'
									data={props.googleAccounts}
								/>
							</>
						)}

					<Panel
						header={
							<Grid container justify='flex-end'>
								<UserCan do={perms.ACCOUNT_CREATE}>
									<Button onClick={() => handleCreateChild(current)}>
										Create Child Account
									</Button>
								</UserCan>
							</Grid>
						}
					>
						<Form>
							<CardBody>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}>
										<FormikInput
											name='accountName'
											formikValue={values.accountName}
											labelText='Account Name'
											id='accountName'
											disabled={
												!userCan(perms.ACCOUNT_UPDATE) ||
												current.accountId === 1
											}
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
											disabled={
												!userCan(perms.ACCOUNT_UPDATE) ||
												current.accountId === 1
											}
										/>

										<FormikInput
											name='contactEmail'
											formikValue={values.contactEmail}
											labelText='Contact Email'
											disabled={
												!userCan(perms.ACCOUNT_UPDATE) ||
												current.accountId === 1
											}
										/>
										<FormikInput
											name='accountMargin'
											formikValue={values.accountMargin}
											labelText='Account Margin'
											disabled={
												!userCan(perms.ACCOUNT_UPDATE) ||
												current.accountId === 1
											}
										/>

										<FormikSelect
											id='accountType'
											name='accountTypeId'
											label='Account Type'
											placeholder='Select an Account Type'
											optionLabel='accountTypeName'
											optionValue='accountTypeId'
											options={accountTypes}
											value={values.accountTypeId}
											onChange={setFieldValue}
											onBlur={setFieldTouched}
											validateField={validateField}
											validateForm={validateForm}
											touched={touched.accountTypeId}
											error={errors.accountTypeId}
											isDisabled={
												!userCan(perms.ACCOUNT_UPDATE) ||
												current.accountId === 1
											}
											hideSearch
										/>
									</GridItem>
								</GridContainer>
							</CardBody>

							<CardFooter>
								{current.accountName === 'Sightly' ||
								current.accountId === 1 ||
								(current.children && current.children.length > 0) ? null : (
									<UserCan do={perms.ACCOUNT_DELETE}>
										<Button
											color='red'
											onClick={() => handleDeleteAccount(current)}
										>
											Delete
										</Button>
									</UserCan>
								)}

								<UserCan do={perms.ACCOUNT_UPDATE}>
									<Button
										loading={props.accountSaving}
										disabled={
											!isValid ||
											!dirty ||
											props.accountSaving ||
											current.accountId === 1
										}
										type='submit'
									>
										Save
									</Button>
								</UserCan>
							</CardFooter>
						</Form>
					</Panel>
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
				accountTypes
			)
		}
		props.updateAccount(account)
	}
})(Account)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
