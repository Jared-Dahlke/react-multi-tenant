import React from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { connect } from 'react-redux'
import Uploader from 'rsuite/lib/Uploader'
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
		postListSuccess: state.engage.postListSuccess
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

	const handleUploadSuccess = (data) => {
		props.setUploadedList(data)
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
										options={unarchivedLists}
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

								<FormControl fullWidth={true} className={classes.formControl}>
									<Label label={'Pick a file'} />
									<Uploader
										disabled={uploadedCount > 0}
										listType='text'
										accept='.xlsx, .xls, .csv'
										action={parseExcelUrl}
										headers={{ Authorization: token }}
										multiple={false}
										draggable
										onSuccess={(val) => {
											incrementUploadedCount()
											setFieldValue('uploadedList', val)
											handleUploadSuccess(val)
										}}
										onRemove={() => decrementUploadedCount()}
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
			uploadedList: []
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
			accountId: currentAccount.accountId
		}
		props.postList(data)
	}
})(UploadList)

export default connect(mapStateToProps, mapDispatchToProps)(MyEnhancedForm)
