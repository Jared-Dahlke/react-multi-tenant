import React from 'react'
import GridItem from '../../../../components/Grid/GridItem.js'
import Panel from 'rsuite/lib/Panel'
import FormikInput from '../../../../components/CustomInput/FormikInput'
import FormikSelect from '../../../../components/CustomSelect/FormikSelect'
import Grid from '@material-ui/core/Grid'
import { withFormik, Form, useFormikContext } from 'formik'
import debounce from 'just-debounce-it'
import {
	patchBrandProfileBasicInfo,
	fetchBrandProfileBasic
} from '../../../../redux/actions/brandProfiles'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { UserCan, perms, userCan } from '../../../../Can'
const urlRegex = require('url-regex')

export const schemaValidation = Yup.object().shape({
	industryVerticalId: Yup.number()
		.typeError('Required')
		.required('Required'),
	brandName: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 50 characters'),
	websiteUrl: Yup.string()
		.required('Required')
		.test('urlTest', 'Valid URL required', (basicInfoWebsiteUrl) => {
			return urlRegex({ exact: true, strict: false }).test(basicInfoWebsiteUrl)
		}),
	twitterProfileUrl: Yup.string()
		.required('Required')
		.min(2, 'Must be greater than 1 character')
		.max(50, 'Must be less than 30 characters')
})

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		brandProfiles: state.brandProfiles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileBasicInfo: (data) =>
			dispatch(patchBrandProfileBasicInfo(data)),
		fetchBrandProfileBasic: (brandProfileId) =>
			dispatch(fetchBrandProfileBasic(brandProfileId))
	}
}

const AutoSave = ({ debounceMs }) => {
	const formik = useFormikContext()
	const debouncedSubmit = React.useCallback(
		debounce(() => formik.submitForm(), debounceMs),
		[debounceMs, formik.submitForm]
	)

	React.useEffect(() => {
		if (formik.isValid && formik.dirty) debouncedSubmit()
	}, [debouncedSubmit, formik.values])

	return null
}

function BasicInfo(props) {
	let fetchBrandProfileBasic = props.fetchBrandProfileBasic

	const [fetched, setFetched] = React.useState(false)
	React.useEffect(() => {
		if (!fetched) {
			if (props.brandProfile && props.brandProfile.brandProfileId) {
				fetchBrandProfileBasic(props.brandProfile.brandProfileId)
				setFetched(true)
			}
		}
	}, [props.brandProfile])

	React.useEffect(() => {
		return () => {
			//clean up on unmount
			setFetched(false)
		}
	}, [])

	return (
		<div>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={12} md={12}>
					<Panel
						header='Brand Information'
						bordered
						style={{ position: 'relative' }}
					>
						<Form>
							<Grid container>
								<GridItem xs={12} sm={12} md={12}>
									<FormikInput
										name='brandName'
										labelText='Brand Profile Name'
										formikValue={props.values.brandName}
										autoFocus={true}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12}>
									<FormikInput
										name='websiteUrl'
										labelText='Website'
										formikValue={props.values.websiteUrl}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12}>
									<FormikSelect
										id='industryVertical'
										name='industryVerticalId'
										label='Industry Vertical'
										placeholder={''}
										optionLabel='industryVerticalName'
										optionValue='industryVerticalId'
										options={
											props.industryVerticals.length < 1
												? [
														{
															industryVerticalId: 0,
															industryVerticalName: 'Loading...'
														}
												  ]
												: props.industryVerticals
										}
										value={props.values.industryVerticalId}
										onChange={props.setFieldValue}
										onBlur={props.setFieldTouched}
										validateField={props.validateField}
										validateForm={props.validateForm}
										touched={props.touched.industryVerticalId}
										error={props.errors.industryVerticalId}
										isDisabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={12}>
									<FormikInput
										name='twitterProfileUrl'
										labelText='Twitter Profile'
										formikValue={props.values.twitterProfileUrl}
										startAdornmentText={'twitter.com/'}
										disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
									/>
								</GridItem>
							</Grid>
						</Form>
						<AutoSave debounceMs={500} />
					</Panel>
				</Grid>
			</Grid>
		</div>
	)
}

const FormikForm = withFormik({
	mapPropsToValues: (props) => {
		console.log('reinit')
		console.log(props)

		return {
			brandName: props.brandProfile.brandName,
			websiteUrl: props.brandProfile.websiteUrl,
			industryVerticalId: props.brandProfile.industryVerticalId,
			twitterProfileUrl: props.brandProfile.twitterProfileUrl,
			brandProfileId: props.brandProfile.brandProfileId
		}
	},
	enableReinitialize: true,
	validateOnMount: false,
	validationSchema: schemaValidation,
	handleSubmit: (values, { props }) => {
		props.patchBrandProfileBasicInfo(values)
	}
})(BasicInfo)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
