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
					src='https://datastudio.google.com/embed/reporting/1c7y-ayVXrgmrkfPEe1bw2kJDmRKxnc5b/page/Fs5KB'
					title='Brand Mentality'
				>
					<p>Your browser does not support iframes.</p>
				</iframe>
			</Hidden>
		</CardBody>
	)
}

export default ChannelResearchTemp
