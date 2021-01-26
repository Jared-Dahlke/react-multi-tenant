import React from 'react'
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

	const { id, label, placeholder, options, value, isDisabled, error } = props

	return (
		<FormControl
			fullWidth={true}
			className={classes.formControl}
			style={{ color: '#FFF' }}
		>
			{label && <p>{label}</p>}

			<SelectPicker
				id={id}
				labelKey={props.optionLabel}
				valueKey={props.optionValue}
				placeholder={placeholder}
				data={options}
				value={value}
				renderMenuItem={(label, item) => {
					return <div>{label}</div>
				}}
				onChange={handleChange}
				disabled={isDisabled}
				cleanable={false}
				style={{ width: '100%' }}
				preventOverflow={true}
				searchable={!props.hideSearch}
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
