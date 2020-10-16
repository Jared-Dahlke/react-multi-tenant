import React, { Component } from 'react'
import { dangerColor } from '../../assets/jss/material-dashboard-react'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputPicker from 'rsuite/lib/InputPicker'

export default class SelectField extends Component {
	handleChange = (value) => {
		if (!value) value = []
		const { onChange, name } = this.props
		onChange(name, value)
	}

	handleBlur = () => {
		const { onBlur, name } = this.props
		onBlur(name, true)
	}

	render() {
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
		} = this.props

		return (
			<div className='input-field-wrapper'>
				{label && (
					<h5 className='input-label' htmlFor={name} error={error}>
						{label}
					</h5>
				)}

				<InputPicker
					id={id}
					labelKey={this.props.optionLabel}
					valueKey={this.props.optionValue}
					placeholder={placeholder}
					data={options}
					value={value}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					disabled={isDisabled}
					cleanable={false}
					style={{ width: '100%' }}
				/>

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
		)
	}
}
