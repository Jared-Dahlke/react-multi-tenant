import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {
	fetchBrandProfiles,
	fetchBrandProfile,
	deleteBrandProfile,
	setBrandProfileDeleted,
	removeBrandProfile
} from '../../../redux/actions/brandProfiles.js'
import { connect } from 'react-redux'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import { useHistory } from 'react-router-dom'
import Uploader from 'rsuite/lib/Uploader'
import { neutralColor } from '../../../assets/jss/colorContants.js'
import { Form, withFormik } from 'formik'
import * as Yup from 'yup'
import FormikInput from '../../../components/CustomInput/FormikInput'
import FormikSelect from '../../../components/CustomSelect/FormikSelect'
import Panel from 'rsuite/lib/Panel'
import styles from '../../../assets/jss/material-dashboard-react/components/customInputStyle.js'
import FormControl from '@material-ui/core/FormControl'
import Label from '../../../components/CustomInputLabel/CustomInputLabel'
const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		brandProfiles: state.brandProfiles,
		currentAccountId: state.currentAccountId,
		brandProfilesIsLoading: state.brandProfilesIsLoading,
		brandProfileDeleted: state.brandProfileDeleted,
		scenarios: state.scenarios,
		categories: state.brandCategories,
		topics: state.topics
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBrandProfiles: (accountId) => dispatch(fetchBrandProfiles(accountId)),
		deleteBrandProfile: (brandProfileId) =>
			dispatch(deleteBrandProfile(brandProfileId)),
		removeBrandProfile: (brandProfileId) =>
			dispatch(removeBrandProfile(brandProfileId)),
		setBrandProfileDeleted: (bool) => dispatch(setBrandProfileDeleted(bool)),
		fetchBrandProfile: (brandProfileId) =>
			dispatch(fetchBrandProfile(brandProfileId))
	}
}

const schemaValidation = Yup.object().shape({
	name: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters'),
	objectiveId: Yup.number().required('Required')
})

const objectives = [
	{ objectiveId: 1, objectiveName: 'Reach & Awareness' },
	{ objectiveId: 2, objectiveName: 'Branding' },
	{ objectiveId: 3, objectiveName: 'Conversions' }
]

function UploadList(props) {
	const classes = useStyles()
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
		<div>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={6} md={10}>
					<Panel header='Upload a list' bordered>
						<Grid container>
							<FormikInput
								name='name'
								formikValue={values.name}
								labelText='List Name'
								id='name'
							/>

							<FormikSelect
								id='accountType'
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

							<FormControl fullWidth={true} className={classes.formControl}>
								<Label label={'Pick a file'} />
								<Uploader
									listType='picture-text'
									accept='.xlsx, .xls, .csv'
									action='//jsonplaceholder.typicode.com/posts/'
									draggable
								>
									<div
										style={{
											height: 200,
											width: '100%',
											backgroundColor: 'black',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										Click or Drag files to this area to upload
									</div>
								</Uploader>
							</FormControl>
						</Grid>
					</Panel>
				</Grid>
			</Grid>
		</div>
	)
}

const MyEnhancedForm = withFormik({
	mapPropsToValues: (props) => {
		return {
			// userId: props.user.userProfile.userId,
			name: '',
			objectiveId: 1
		}
	},
	enableReinitialize: true,
	validateOnChange: true,
	validateOnBlur: true,
	validationSchema: schemaValidation,
	handleSubmit: (values, { props }) => {
		props.updateUserData(values)
	}
})(UploadList)

export default connect(mapStateToProps, mapDispatchToProps)(MyEnhancedForm)

/** */
