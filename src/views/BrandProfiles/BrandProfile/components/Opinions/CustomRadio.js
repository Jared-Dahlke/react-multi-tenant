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
		color: whiteColor
	},
	checked: {}
})

const useStyles = makeStyles(styles)

export default function CustomRadio(props) {
	const handleChange = (e) => {
		e.persist()
		props.handleOpinionSelect(props.opinion.opinionId, e.target.value)
	}

	const classes = useStyles()

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
					{props.opinion.question}
				</div>
			</GridItem>

			<GridItem xs={6} sm={6} md={6}>
				<RadioGroup
					onChange={(e) => handleChange(e)}
					aria-label='position'
					defaultValue='top'
					value={props.opinion.opinionResponseId}
				>
					<FormControlLabel
						value={1}
						control={
							<Radio
								classes={{ root: classes.radio, checked: classes.checked }}
								disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
							/>
						}
						label='Strongly Disagree'
						style={{ color: whiteColor }}
					/>
					<FormControlLabel
						value={2}
						control={
							<Radio
								classes={{ root: classes.radio, checked: classes.checked }}
								disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
							/>
						}
						label='Disagree'
						style={{ color: whiteColor }}
					/>
					<FormControlLabel
						value={3}
						control={
							<Radio
								classes={{ root: classes.radio, checked: classes.checked }}
								disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
							/>
						}
						label='Unsure'
						style={{ color: whiteColor }}
					/>

					<FormControlLabel
						value={4}
						control={
							<Radio
								classes={{ root: classes.radio, checked: classes.checked }}
								disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
							/>
						}
						label='Agree'
						style={{ color: whiteColor }}
					/>

					<FormControlLabel
						value={5}
						control={
							<Radio
								classes={{ root: classes.radio, checked: classes.checked }}
								disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
							/>
						}
						label='Strongly Agree'
						style={{ color: whiteColor }}
					/>
				</RadioGroup>
				<div style={{ color: neutralColor, height: 15 }} />
			</GridItem>
		</GridContainer>
	)
}
