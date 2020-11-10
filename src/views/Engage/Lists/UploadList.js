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
import Radio from 'rsuite/lib/Radio'
import RadioGroup from 'rsuite/lib/RadioGroup'
import { fetchLists } from '../../../redux/actions/engage/lists'
import config from '../../../config'
const parseExcelUrl = config.api.listBuilderUrl + '/parse-excel'
const token = localStorage.getItem('token')
const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		lists: state.engage.lists
	}
}

const mapDispatchToProps = (dispatch) => {
	return { fetchLists: () => dispatch(fetchLists()) }
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
	let fetchLists = props.fetchLists
	React.useEffect(() => {
		fetchLists()
	}, [fetchLists])

	const classes = useStyles()
	const [uploadType, setUploadType] = React.useState('new')
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

	const unarchivedLists = React.useMemo(() => {
		return props.lists.filter((list) => !list.archived)
	}, [props.lists])

	return (
		<div>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={6} md={10}>
					<Panel header='Upload a list' bordered>
						<Grid container>
							<RadioGroup
								inline
								name='radioList'
								value={uploadType}
								onChange={(value) => {
									setUploadType(value)
								}}
							>
								<Radio value='new'>Upload a new list</Radio>
								<Radio value='existing'>
									Upload a new version of an existing list
								</Radio>
							</RadioGroup>

							{uploadType === 'new' && (
								<FormikInput
									name='name'
									formikValue={values.name}
									labelText='List Name'
									id='name'
								/>
							)}

							{uploadType === 'existing' && (
								<FormikSelect
									id='accountType'
									name='objectiveId'
									label='Smart List'
									optionLabel='smartListName'
									optionValue='smartListId'
									options={unarchivedLists}
									value={values.objectiveId}
									onChange={setFieldValue}
									onBlur={setFieldTouched}
									validateField={validateField}
									validateForm={validateForm}
									touched={touched.objectiveId}
									error={errors.objectiveId}
									hideSearch
								/>
							)}

							{uploadType === 'new' && (
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
							)}

							<FormControl fullWidth={true} className={classes.formControl}>
								<Label label={'Pick a file'} />
								<Uploader
									listType='picture-text'
									accept='.xlsx, .xls, .csv'
									action={parseExcelUrl}
									headers={`Authorization: ${token}`}
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
