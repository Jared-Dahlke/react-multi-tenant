import React from 'react'
import CheckTreePicker from 'rsuite/lib/CheckTreePicker'
import 'rsuite/lib/styles/index.less'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { dangerColor } from '../../assets/jss/material-dashboard-react'
import Label from '../CustomInputLabel/CustomInputLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import styles from '../../assets/jss/material-dashboard-react/components/customInputStyle.js'
const useStyles = makeStyles(styles)

export default function SuiteTree(props) {
	const classes = useStyles()
	const handleChange = (val) => {
		props.onChange('accounts', val)
	}

	return (
		<FormControl
			fullWidth={true}
			className={classes.formControl}
			style={{ color: '#FFF' }}
		>
			{props.label && <p>{props.label} </p>}
			<CheckTreePicker
				defaultExpandAll
				data={props.data}
				labelKey={props.labelKey}
				valueKey={props.valueKey}
				value={props.value}
				onChange={handleChange}
				cascade={props.cascade}
				style={{ width: '100%' }}
				disabled={props.disabled}
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
					{props.error}
				</FormHelperText>
			</div>
		</FormControl>
	)
}
