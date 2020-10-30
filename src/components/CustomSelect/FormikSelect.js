import React, { Component } from 'react'
import { dangerColor } from '../../assets/jss/material-dashboard-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import SelectPicker from 'rsuite/lib/SelectPicker'
import Label from '../CustomInputLabel/CustomInputLabel'
import FormControl from '@material-ui/core/FormControl'
import makeStyles from '@material-ui/core/styles/makeStyles'
import styles from '../../assets/jss/material-dashboard-react/components/customInputStyle.js'
const useStyles = makeStyles(styles)

export default function SelectField(props) {
	const classes = useStyles()
	function handleChange(value) {
		if (!value) value = []
		const { onChange, name } = props
		onChange(name, value)
	}

	const {
		id,
		name,
		label,
		placeholder,
		options,
		value,
		isDisabled,
		touched,
		error
	} = props

	return (
		<FormControl fullWidth={true} className={classes.formControl}>
			{label && <Label label={label} />}

			<SelectPicker
				id={id}
				labelKey={props.optionLabel}
				valueKey={props.optionValue}
				placeholder={placeholder}
				data={options}
				value={value}
				onChange={handleChange}
				disabled={isDisabled}
				cleanable={false}
				style={{ width: '100%' }}
				preventOverflow={true}
			/>
			<div>
				<FormHelperText
					id='component-helper-text'
					style={{
						color: dangerColor[0],
						position: 'absolute',
						bottom: '-1'
					}}
				>
					{error}
				</FormHelperText>
			</div>
		</FormControl>
	)
}
