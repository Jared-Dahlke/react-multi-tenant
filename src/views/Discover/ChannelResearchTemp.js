import React from 'react'
import CardBody from '../../components/Card/CardBody.js'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Hidden from '@material-ui/core/Hidden'
import styles from '../../assets/jss/material-dashboard-react/views/iconsStyle.js'

const useStyles = makeStyles(styles)

function ChannelResearchTemp(props) {
	const classes = useStyles()

	return (
		<CardBody>
			<Hidden only={['sm', 'xs']}>
				<iframe
					className={classes.iframe}
					src='https://platform.datorama.com/external/dashboard?embedpage=ea166473-1999-44cf-934c-bbcccca4ee9d'
					title='Brand Mentality'
				>
					<p>Your browser does not support iframes.</p>
				</iframe>
			</Hidden>
		</CardBody>
	)
}

export default ChannelResearchTemp
