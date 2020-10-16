import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CheckCircle from '@material-ui/icons/CheckCircle'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import ClearRounded from '@material-ui/icons/ClearRounded'
import { whiteColor } from '../../assets/jss/material-dashboard-react'

const useStyles = makeStyles(() => ({
	minWidth: {
		minWidth: '30px'
	},
	green: {
		color: 'green'
	},
	grey: {
		color: 'grey'
	}
}))

export default function CustomPasswordMatchChecker({
	password,
	password_confirmation
}) {
	const classes = useStyles()
	const passwordLength = password.length

	return (
		<ListItem>
			<ListItemIcon className={classes.minWidth}>
				{password === password_confirmation ? (
					<CheckCircle
						className={passwordLength > 0 ? classes.green : classes.grey}
						fontSize='small'
					/>
				) : (
					<ClearRounded style={{ color: 'red' }} fontSize='small' />
				)}
			</ListItemIcon>
			{password === password_confirmation ? (
				<div style={{ color: whiteColor }}>Passwords Match</div>
			) : (
				<div style={{ color: 'red' }}>Passwords Must Match</div>
			)}
		</ListItem>
	)
}
