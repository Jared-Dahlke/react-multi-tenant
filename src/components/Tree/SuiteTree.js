import React from 'react'
import CheckTreePicker from 'rsuite/lib/CheckTreePicker'
import 'rsuite/lib/styles/index.less'
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor } from '../../assets/jss/material-dashboard-react'

export default function SuiteTree(props) {
	const handleChange = (val) => {
		props.onChange('accounts', val)
	}

	return (
		<div style={{ marginTop: 27 }}>
			<CheckTreePicker
				defaultExpandAll
				data={props.data}
				labelKey={props.labelKey}
				valueKey={props.valueKey}
				value={props.value}
				onChange={handleChange}
				cascade={props.cascade}
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
				{props.error}
			</FormHelperText>
		</div>
	)
}
