import React from 'react'
import ButtonToolbar from 'rsuite/lib/ButtonToolbar'
import Modal from 'rsuite/lib/Modal'
import Button from 'rsuite/lib/Button'
import { Form, withFormik } from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'
import FormikSelect from '../../../components/CustomSelect/FormikSelect'
import Panel from 'rsuite/lib/Panel'
import Grid from '@material-ui/core/Grid'
import { objectives } from './constants'
import FormGroup from 'rsuite/lib/FormGroup'

function CreateNewListModal(props) {
	const { show, handleClose } = props

	const {
		isValid,
		dirty,
		values,
		setFieldValue,
		setFieldTouched,
		errors,
		validateField,
		validateForm,
		touched
	} = props

	return (
		<div className='modal-container'>
			<Modal show={show} onHide={handleClose} overflow={false} backdrop={true}>
				<Modal.Header>
					<Modal.Title>Create a new Smartlist</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Grid container spacing={3} justify='center'>
						<Grid item xs={12} sm={6} md={10}>
							<Form>
								<Grid container direction='column' spacing={1}>
									<FormGroup>
										<FormikInput
											name='name'
											formikValue={values.name}
											labelText='List Name'
											id='name'
										/>
									</FormGroup>
									<FormGroup>
										<FormikSelect
											id='objectiveId'
											name='objectiveId'
											label='Objective'
											optionLabel='objectiveName'
											optionValue='objectiveId'
											options={objectives}
											value={values.objectiveId}
											onChange={setFieldValue}
											onBlur={setFieldTouched}
											validateField={validateField}
											validateForm={validateForm}
											touched={touched.objectiveId}
											error={errors.objectiveId}
											hideSearch
										/>
									</FormGroup>
									<FormGroup>
										<FormikSelect
											id='brandProfileId'
											name='brandProfileId'
											label='Brand Profile'
											optionLabel='brandName'
											optionValue='brandProfileId'
											options={props.brandProfiles}
											value={values.brandProfileId}
											onChange={setFieldValue}
											onBlur={setFieldTouched}
											validateField={validateField}
											validateForm={validateForm}
											touched={touched.brandProfileId}
											error={errors.brandProfileId}
											hideSearch
											isDisabled={
												props.brandProfiles && props.brandProfiles.length < 1
											}
										/>
									</FormGroup>
									<FormGroup>
										<ButtonToolbar>
											<Button
												//	disabled={!dirty || !isValid || props.isPostingList}
												type='submit'
												//	loading={props.isPostingList}
											>
												Let's go!
											</Button>
											<Button
												//	disabled={!dirty || !isValid || props.isPostingList}
												onClick={handleClose}
												color='red'
												appearance='subtle'
												//	loading={props.isPostingList}
											>
												Cancel
											</Button>
										</ButtonToolbar>
									</FormGroup>
								</Grid>
							</Form>
						</Grid>
					</Grid>
				</Modal.Body>
			</Modal>
		</div>
	)
}

const MyEnhancedForm = withFormik({
	mapPropsToValues: (props) => {
		return {
			name: '',
			objectiveId: 1,
			smartListId: '',
			brandProfileId: props.brandProfiles[0]
				? props.brandProfiles[0].brandProfileId
				: ''
		}
	},
	enableReinitialize: true,
	validateOnChange: true,
	validateOnBlur: true,
	handleSubmit: (values, { props }) => {}
})(CreateNewListModal)

export default MyEnhancedForm
