import React from 'react'
import GridItem from '../../../../../components/Grid/GridItem'
import GridContainer from '../../../../../components/Grid/GridContainer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import {
	whiteColor,
	primaryColor,
	grayColor
} from '../../../../../assets/jss/material-dashboard-react.js'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { neutralColor } from '../../../../../assets/jss/colorContants'
import { perms, userCan } from '../../../../../Can'

const styles = (theme) => ({
	radio: {
		'&$checked': {
			color: primaryColor[0]
		},
		color: 'grey'
	},
	checked: {}
})

const useStyles = makeStyles(styles)

export default function CustomRadio(props) {
	const handleChange = (e) => {
		e.persist()
		props.handleScenarioSelect(props.scenario.scenarioId, e.target.value)
	}

	const classes = useStyles()

	return (
		<GridContainer>
			<GridItem xs={6} sm={6} md={6}>
				<div
					style={{
						fontSize: '16px',
						marginTop: '11px',
						float: 'right'
					}}
				>
					{props.scenario.scenarioName}
				</div>
			</GridItem>

			<GridItem xs={6} sm={6} md={6}>
				<RadioGroup
					onChange={(e) => handleChange(e)}
					aria-label='position'
					defaultValue='top'
					row
					value={props.scenario.scenarioResponseId}
				>
					<FormControlLabel
						value={3}
						control={
							<Radio
								classes={{ root: classes.radio, checked: classes.checked }}
								disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
							/>
						}
						label='Target'
					/>
					<FormControlLabel
						value={1}
						control={
							<Radio
								classes={{ root: classes.radio, checked: classes.checked }}
								disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
							/>
						}
						label='Block'
					/>
					<FormControlLabel
						value={2}
						control={
							<Radio
								classes={{ root: classes.radio, checked: classes.checked }}
								disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
							/>
						}
						label='Monitor'
					/>
				</RadioGroup>
				<div style={{ color: neutralColor, height: 15 }} />
			</GridItem>
		</GridContainer>
	)
}
