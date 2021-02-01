import React from 'react'
import GridItem from '../../../../components/Grid/GridItem.js'
import FormikInput from '../../../../components/CustomInput/FormikInput'
import Grid from '@material-ui/core/Grid'
import { withFormik, Form, useFormikContext } from 'formik'
import debounce from 'just-debounce-it'
import {
	patchBrandProfileBasicInfo,
	setBrandProfileBasicInfo
} from '../../../../redux/actions/brandProfiles'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { perms, userCan } from '../../../../Can'
import Panel from '../../../../components/CustomPanel'
const urlRegex = require('url-regex')

export const schemaValidation = Yup.object().shape({
	primaryKPI: Yup.string(),
	secondaryKPI: Yup.string(),
	tertiaryKPI: Yup.string()
})

const mapStateToProps = (state) => {
	return {
		brandProfile: state.brandProfileUnderEdit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileBasicInfo: (data) =>
			dispatch(patchBrandProfileBasicInfo(data)),
		setBrandProfileBasicInfo: (basicInfo) =>
			dispatch(setBrandProfileBasicInfo(basicInfo))
	}
}

const AutoSave = ({ debounceMs }) => {
	const formik = useFormikContext()
	const debouncedSubmit = React.useCallback(
		debounce(() => formik.submitForm(), debounceMs),
		[debounceMs, formik.submitForm]
	)

	React.useEffect(() => {
		if (formik.dirty) {
			debouncedSubmit()
		}
	}, [debouncedSubmit, formik.values])

	return null
}

function Outcomes(props) {
	return (
		<div>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={12} md={12}>
					<Panel
						header='Outcomes'
						bordered
						style={{
							position: 'relative',
							boxShadow: '0 -2px 20px rgba(0, 0, 0, 1)'
						}}
					>
						<Form>
							<Grid container>
								<GridItem xs={12}>
									<FormikInput
										name='primaryKPI'
										labelText='Please specify your Primary KPI'
										formikValue={props.values.primaryKPI}
									/>
								</GridItem>
								<GridItem xs={12}>
									<FormikInput
										name='secondaryKPI'
										labelText='Please specify your Secondary KPI'
										formikValue={props.values.secondaryKPI}
									/>
								</GridItem>
								<GridItem xs={12}>
									<FormikInput
										name='tertiaryKPI'
										labelText='Please specify your Tertiary KPI'
										formikValue={props.values.tertiaryKPI}
									/>
								</GridItem>
							</Grid>
							<AutoSave debounceMs={700} />
						</Form>
					</Panel>
				</Grid>
			</Grid>
		</div>
	)
}

const FormikForm = withFormik({
	mapPropsToValues: (props) => {
		return {
			brandName: props.brandProfile.brandName,
			websiteUrl: props.brandProfile.websiteUrl,
			industryVerticalId: props.brandProfile.industryVerticalId,
			twitterProfileUrl: props.brandProfile.twitterProfileUrl,
			brandProfileId: props.brandProfile.brandProfileId,
			primaryKPI: props.brandProfile.primaryKPI,
			secondaryKPI: props.brandProfile.secondaryKPI,
			tertiaryKPI: props.brandProfile.tertiaryKPI
		}
	},
	enableReinitialize: true,
	validateOnMount: false,
	validationSchema: schemaValidation,
	handleSubmit: (values, { props }) => {
		props.setBrandProfileBasicInfo(values)
		props.patchBrandProfileBasicInfo(values)
	}
})(Outcomes)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
