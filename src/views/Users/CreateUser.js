/* eslint-disable semi, indent, no-mixed-operators, no-underscore-dangle */
import React from 'react'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Button from 'rsuite/lib/Button'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import { connect } from 'react-redux'
import { createUser, setUserAdded } from '../../redux/actions/users'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import SuiteTree from '../../components/Tree/SuiteTree.js'
import { Formik } from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import FormikSelect from '../../components/CustomSelect/FormikSelect'
import * as Yup from 'yup'
import { default as UUID } from 'node-uuid'

const schemaValidation = Yup.object().shape({
	roleId: Yup.number()
		.typeError('Required')
		.required('Required'),
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
		currentAccountId: state.currentAccountId,
		userAdded: state.userAdded,
		userAdding: state.userAdding
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNewUser: (user) => dispatch(createUser(user)),
		setUserAdded: (bool) => dispatch(setUserAdded(bool))
	}
}

function CreateUser(props) {
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
		<Formik
			enableReinitialize
			validateOnMount={false}
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
												labelText='Company'
												id='company'
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={7}>
											<FormikInput name='email' labelText='Email' id='email' />
										</GridItem>
										<GridItem xs={12} sm={12} md={5}>
											<FormikInput
												name='firstName'
												labelText='First Name'
												id='firstName'
											/>
										</GridItem>
										<GridItem xs={12} sm={12} md={7}>
											<FormikInput
												name='lastName'
												labelText='Last Name'
												id='lastName'
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
												cascade={true}
												error={errors.accounts}
											/>
										</GridItem>

										<GridItem xs={10} sm={10} md={12}>
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
						<Alert onClose={() => props.setUserAdded(false)} severity='success'>
							User invite sent
						</Alert>
					</Snackbar>
				</div>
			)}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
