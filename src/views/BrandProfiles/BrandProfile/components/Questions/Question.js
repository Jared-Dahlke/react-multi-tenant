import React from 'react'
import GridItem from '../../../../../components/Grid/GridItem'
import GridContainer from '../../../../../components/Grid/GridContainer'

import { grayColor } from '../../../../../assets/jss/material-dashboard-react.js'
import { neutralColor } from '../../../../../assets/jss/colorContants'
import { perms, userCan } from '../../../../../Can'
import { withFormik, Form, useFormikContext } from 'formik'
import FormikInput from '../../../../../components/CustomInput/FormikInput'
import debounce from 'just-debounce-it'

const AutoSave = ({ debounceMs }) => {
	const formik = useFormikContext()
	const debouncedSubmit = React.useCallback(
		debounce(() => formik.submitForm(), debounceMs),
		[debounceMs, formik.submitForm]
	)

	React.useEffect(() => {
		if (
			formik.values.questionResponse != formik.initialValues.questionResponse
		) {
			debouncedSubmit()
		}
	}, [debouncedSubmit, formik.values])

	return null
}

function Question(props) {
	return (
		<GridContainer>
			<GridItem xs={12}>
				<div
					style={{
						color: grayColor[4],
						fontSize: '16px',
						marginTop: '11px'
					}}
				>
					{props.question.question}
				</div>

				<Form>
					<GridItem xs={12} sm={12} md={12}>
						<FormikInput
							name='questionResponse'
							formikValue={props.values.questionResponse}
							autoFocus={true}
							disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
						/>
					</GridItem>
					<AutoSave debounceMs={700} />
				</Form>
			</GridItem>

			<GridItem xs={6} sm={6} md={6}>
				<div style={{ color: neutralColor, height: 15 }} />
			</GridItem>
		</GridContainer>
	)
}

const FormikForm = withFormik({
	mapPropsToValues: (props) => {
		return {
			questionId: props.question.questionId,
			questionResponse: props.question.responseText
				? props.question.responseText
				: ''
		}
	},
	enableReinitialize: true,
	validateOnMount: false,

	handleSubmit: (values, { props }) => {
		console.log(values)
		props.handleQuestionResponse(values.questionId, values.questionResponse)
	}
})(Question)

export default FormikForm
