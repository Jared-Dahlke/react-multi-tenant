import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import FormControl from '@material-ui/core/FormControl'
import styles from '../../assets/jss/material-dashboard-react/components/customInputStyle.js'
import {
	whiteColor,
	dangerColor,
	successColor
} from '../../assets/jss/material-dashboard-react'
import { Field } from 'formik'
import FormHelperText from '@material-ui/core/FormHelperText'
import Label from '../CustomInputLabel/CustomInputLabel'
import Input from 'rsuite/lib/Input'
import InputGroup from 'rsuite/lib/InputGroup'
import Icon from 'rsuite/lib/Icon'
const useStyles = makeStyles(styles)

export default function CustomInput(props) {
	const classes = useStyles()
	const { labelText, id } = props
	const [myVal, setMyVal] = React.useState(props.formikValue)

	const handleBlur = async (e, form) => {
		e.preventDefault()
		await form.setFieldValue(props.name, e.target.value)
		form.validateField(props.name)
	}

	return (
		<Field name={props.name}>
			{({ field, form }) => (
				<FormControl
					fullWidth={true}
					className={
						props.simple ? classes.formControlSlim : classes.formControl
					}
				>
					{labelText && <Label label={labelText} />}

					<InputGroup>
						{props.startAdornmentText && (
							<InputGroup.Addon style={{ color: '#AAAAAA' }}>
								{props.startAdornmentText}
							</InputGroup.Addon>
						)}

						<Input
							id={id}
							value={myVal}
							onChange={(e) => setMyVal(e)}
							onBlur={(e) => handleBlur(e, form)}
							disabled={props.disabled}
							style={{
								borderColor: 'white',
								color: props.inputColor ? props.inputColor : whiteColor
							}}
						/>

						{!props.simple && (
							<InputGroup.Addon>
								{!form.errors[field.name] && field.value.length > 0 && (
									<Icon icon='check' style={{ color: successColor[0] }} />
								)}
							</InputGroup.Addon>
						)}
					</InputGroup>

					{form.errors[field.name] && (
						<div>
							<FormHelperText
								id='component-helper-text'
								style={{
									color: dangerColor[0],
									position: 'absolute',
									bottom: '-1'
								}}
							>
								{form.errors[field.name]}
							</FormHelperText>
						</div>
					)}
				</FormControl>
			)}
		</Field>
	)
}

CustomInput.propTypes = {
	labelText: PropTypes.node,
	labelProps: PropTypes.object,
	id: PropTypes.string,
	inputProps: PropTypes.object,
	formControlProps: PropTypes.object,
	error: PropTypes.bool,
	success: PropTypes.bool,
	handleClear: PropTypes.func,
	styling: PropTypes.object,
	inputColor: PropTypes.string
}
