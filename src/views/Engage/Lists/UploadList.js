import React from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { connect } from 'react-redux'
import Uploader from 'rsuite/lib/Uploader'
import { Form, withFormik } from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'
import FormikSelect from '../../../components/CustomSelect/FormikSelect'
import Panel from '../../../components/CustomPanel'
import styles from '../../../assets/jss/material-dashboard-react/components/customInputStyle.js'
import FormControl from '@material-ui/core/FormControl'
import Radio from 'rsuite/lib/Radio'
import RadioGroup from 'rsuite/lib/RadioGroup'
import Button from 'rsuite/lib/Button'
import { getCurrentAccount } from '../../../utils'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import {
	fetchLists,
	setUploadedList,
	postList,
	setPostListSuccess
} from '../../../redux/actions/engage/lists'
import { uploadedListObjValidation } from '../../../schemas/Engage/Lists/schemas'
import config from '../../../config'
const parseExcelUrl = config.api.listBuilderUrl + '/parse-excel'
const token = localStorage.getItem('token')
const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		lists: state.engage.lists,
		uploadedList: state.engage.uploadedList,
		accounts: state.accounts,
		isPostingList: state.engage.isPostingList,
		postListSuccess: state.engage.postListSuccess,
		brandProfiles: state.brandProfiles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLists: (accountId) => dispatch(fetchLists(accountId)),
		setUploadedList: (list) => dispatch(setUploadedList(list)),
		postList: (data) => dispatch(postList(data)),
		setPostListSuccess: (bool) => dispatch(setPostListSuccess(bool))
	}
}

const objectives = [
	{ objectiveId: 1, objectiveName: 'Reach & Awareness' },
	{ objectiveId: 2, objectiveName: 'Branding' },
	{ objectiveId: 3, objectiveName: 'Conversions' }
]

function UploadList(props) {
	let fetchLists = props.fetchLists
	let accounts = props.accounts.data

	React.useEffect(() => {
		let currentAccount = getCurrentAccount(props.accounts.data)
		if (currentAccount) {
			fetchLists(currentAccount.accountId)
		}
	}, [fetchLists, accounts])

	let postListSuccess = props.postListSuccess

	React.useEffect(() => {
		if (postListSuccess) {
			let currentAccount = getCurrentAccount(props.accounts.data)
			fetchLists(currentAccount.accountId)
		}
	}, [postListSuccess])

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

	const smartListsNames = React.useMemo(() => {
		let unarchivedLists = props.lists.filter((list) => !list.archived)
		let names = []
		let ids = []
		for (const version of unarchivedLists) {
			if (!ids.includes(version.smartListId)) {
				names.push({
					smartListId: version.smartListId,
					smartListName: version.smartListName
				})
				ids.push(version.smartListId)
			}
		}
		return names
	}, [props.lists])

	const handleUploadSuccess = (data) => {
		props.setUploadedList(data)
	}

	const handleRemoveFile = () => {
		decrementUploadedCount()
		setFieldValue('uploadedList', [])
	}

	const [uploadedCount, setUploadedCount] = React.useState(0)
	const incrementUploadedCount = () => {
		setUploadedCount(uploadedCount + 1)
	}

	const decrementUploadedCount = () => {
		setUploadedCount(uploadedCount - 1)
	}

	return (
		<div>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={6} md={10}>
					<Form>
						<Panel header='Upload a list' bordered>
							<Grid container>
								<RadioGroup
									inline
									name='uploadedType'
									value={uploadType}
									onChange={(value) => {
										setUploadType(value)
										setFieldValue('uploadType', value)
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
										id='smartListId'
										name='smartListId'
										label='Smart List'
										optionLabel='smartListName'
										optionValue='smartListId'
										options={smartListsNames}
										value={values.smartListId}
										onChange={setFieldValue}
										onBlur={setFieldTouched}
										validateField={validateField}
										validateForm={validateForm}
										touched={touched.smartListId}
										error={errors.smartListId}
										hideSearch
									/>
								)}

								{uploadType === 'new' && (
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
								)}

								{uploadType === 'new' && (
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
								)}

								<FormControl fullWidth={true} className={classes.formControl}>
									<p>Pick a file</p>
									<Uploader
										disabled={uploadedCount > 0}
										listType='text'
										accept='.xlsx, .xls, .csv'
										action={parseExcelUrl}
										headers={{ Authorization: token }}
										multiple={false}
										draggable
										onError={(err) => console.log('err consolelog:', err)}
										onSuccess={(val) => {
											uploadedListObjValidation
												.isValid(val)
												.then(function(valid) {
													if (valid) {
														setFieldValue('uploadedList', val)
														handleUploadSuccess(val)
													} else {
														alert('invalid file')
													}
												})

											incrementUploadedCount()
										}}
										onRemove={() => handleRemoveFile()}
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
							<Button
								disabled={!dirty || !isValid || props.isPostingList}
								type='submit'
								loading={props.isPostingList}
							>
								Submit
							</Button>
						</Panel>
					</Form>
				</Grid>
			</Grid>
			<Snackbar
				autoHideDuration={2000}
				place='bc'
				open={props.postListSuccess}
				onClose={() => props.setPostListSuccess(false)}
			>
				<Alert
					onClose={() => props.setPostListSuccess(false)}
					severity='success'
				>
					Success
				</Alert>
			</Snackbar>
		</div>
	)
}

const validateNew = (values, errors) => {
	errors = {}
	if (values.name.length < 2) {
		errors.name = 'Required'
	}
	if (values.uploadedList.length < 1) {
		errors.uploadedList = 'Please upload a file'
	}
	if (values.brandProfileId.length < 1) {
		errors.brandProfileId = 'Please select a brand profile'
	}

	for (const version of values.smartLists) {
		if (version.smartListName === values.name) {
			errors.name = 'Sorry, this name is already taken. Please try another.'
		} else {
		}
	}

	return errors
}

const validateExisting = (values, errors) => {
	errors = {}
	if (values.smartListId.length < 1) {
		errors.smartListId = 'Required'
	}
	if (values.uploadedList.length < 1) {
		errors.uploadedList = 'Please upload a file'
	}
	return errors
}

const MyEnhancedForm = withFormik({
	mapPropsToValues: (props) => {
		return {
			// userId: props.user.userProfile.userId,
			uploadType: 'new',
			name: '',
			objectiveId: 1,
			smartListId: '',
			uploadedList: [],
			smartLists: props.lists,
			brandProfileId: props.brandProfiles[0]
				? props.brandProfiles[0].brandProfileId
				: ''
		}
	},
	enableReinitialize: true,
	validateOnChange: true,
	validateOnBlur: true,
	validate: (values, props) => {
		let errors = {}
		if (values.uploadType === 'new') {
			errors = validateNew(values, errors)
		} else {
			errors = validateExisting(values, errors)
		}
		return errors
	},
	handleSubmit: (values, { props }) => {
		const getSmartListName = (smartListId) => {
			for (const list of props.lists) {
				if (list.smartListId === smartListId) {
					return list.smartListName
				}
			}
		}
		let currentAccount = getCurrentAccount(props.accounts.data)
		let list = {}
		if (values.uploadType === 'new') {
			list = {
				smartListName: values.name,
				objectiveId: values.objectiveId,
				smartListData: values.uploadedList
			}
		}
		if (values.uploadType === 'existing') {
			let smartListName = getSmartListName(values.smartListId)
			list = {
				smartListName: smartListName,
				smartListId: values.smartListId,
				objectiveId: values.objectiveId,
				smartListData: values.uploadedList
			}
		}
		let data = {
			list,
			brandProfileId: values.brandProfileId,
			accountId: currentAccount.accountId
		}
		props.postList(data)
	}
})(UploadList)

export default connect(mapStateToProps, mapDispatchToProps)(MyEnhancedForm)
