/* eslint-disable semi, indent, no-mixed-operators, no-underscore-dangle */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/users'
import CustomCheckbox from '../../components/CustomCheckbox/Checkbox'
import CustomSelect from '../../components/CustomSelect/CustomSelect.js'
import Snackbar from '../../components/Snackbar/Snackbar'
import AddAlert from '@material-ui/icons/AddAlert'
import * as v from '../../validations'
import SuiteTree from '../../components/Tree/SuiteTree.js'
import { Formik } from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import FormikSelect from '../../components/CustomSelect/FormikSelect'
import * as Yup from 'yup'
import { default as UUID } from 'node-uuid'
import { getTopLevelChecked } from '../../utils'

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
		hasErrored: state.rolesHasErrored,
		isLoading: state.rolesIsLoading,
		accounts: state.accounts,
		currentAccountId: state.currentAccountId
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNewUser: (user) => dispatch(createUser(user))
	}
}

function CreateUser(props) {
	const handleInviteUserClick = (values) => {
		console.log(values)

		let userRoles = []
		for (const role of values.roles) {
			userRoles.push({ roleId: role.roleId })
		}

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
			roles: userRoles,
			accounts: accountsToLink
		}
		props.addNewUser(newUser)
	}

	return (
		<Formik
			enableReinitialize
			validateOnMount={false}
			validationSchema={() => schemaValidation}
			initialValues={{
				company: 'test',
				firstName: 'testfirst',
				lastName: 'testLast',
				email: 'test@test.com',
				roles: [],
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
												labelText='Company'
												id='company'
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{}}
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={7}>
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
										<GridItem xs={12} sm={12} md={5}>
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
										<GridItem xs={12} sm={12} md={7}>
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
											<SuiteTree
												name='accounts'
												data={props.accounts.data}
												labelKey='accountName'
												valueKey='accountId'
												value={values.accounts}
												onChange={setFieldValue}
												cascade={false}
												error={errors.accounts}
											/>
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
										onClick={() => handleInviteUserClick(values)}
										color='primary'
									>
										Invite User
									</Button>
								</CardFooter>
							</Card>
						</GridItem>
					</GridContainer>

					<Snackbar
						place='bc'
						color='success'
						icon={AddAlert}
						message='User created and Signup invitation is sent'
						//	open={showAlertMessage}
						// closeNotification={() => setShowAlertMessage(false)}
						close
					/>
				</div>
			)}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
