import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Navbar from '../components/Navbars/Navbar.js'
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js'
import EditUser from '../views/Users/EditUser'
import { connect } from 'react-redux'
import { setUserId, setLoggedInUserPermissions } from '../redux/actions/auth.js'
import { fetchSiteData } from '../redux/actions/accounts.js'
import { routes } from '../routes'
import { userCan, perms } from '../Can'
var encryptor = require('simple-encryptor')(
	process.env.REACT_APP_LOCAL_STORAGE_KEY
)

const switchRoutes = (
	<Switch>
		{userCan(perms.BRAND_MENTALITY_READ) && (
			<Route
				path={routes.admin.settings.brandMentality.path}
				component={routes.admin.settings.brandMentality.component}
			/>
		)}

		<Route
			path={routes.admin.discover.channelResearch.path}
			component={routes.admin.discover.channelResearch.component}
		/>

		<Route
			path={routes.admin.settings.users.path}
			render={({ match: { url } }) => (
				<>
					<Route
						path={routes.admin.settings.users.path}
						component={routes.admin.settings.users.component}
						exact
					/>

					{userCan(perms.USER_CREATE) && (
						<Route
							path={routes.admin.settings.users.create.path}
							component={routes.admin.settings.users.create.component}
						/>
					)}
					<Route
						path={routes.admin.settings.users.edit.path}
						component={routes.admin.settings.users.edit.component}
					/>
				</>
			)}
		/>

		<Route
			path={routes.admin.engage.listBuilder.path}
			component={routes.admin.engage.listBuilder.component}
		/>
		<Route
			path={routes.admin.engage.lists.path}
			component={routes.admin.engage.lists.component}
		/>

		<Route
			path={routes.admin.settings.profile.path}
			component={routes.admin.settings.profile.component}
		/>

		<Route
			path={routes.admin.settings.account.path}
			component={routes.admin.settings.account.component}
		/>

		<Route
			path={routes.admin.settings.brandProfiles.path}
			render={({ match: { url } }) => (
				<>
					<Route
						path={routes.admin.settings.brandProfiles.path}
						component={routes.admin.settings.brandProfiles.component}
						exact
					/>
					{userCan(perms.BRAND_PROFILE_CREATE) && (
						<Route
							path={routes.admin.settings.brandProfiles.create.path}
							component={routes.admin.settings.brandProfiles.create.component}
						/>
					)}
					<Route
						path={routes.admin.settings.brandProfiles.edit.path}
						component={routes.admin.settings.brandProfiles.edit.component}
					/>
				</>
			)}
		/>

		<Redirect from='/admin' to={routes.admin.settings.account.path} />
	</Switch>
)

const useStyles = makeStyles(styles)

const mapDispatchToProps = (dispatch) => {
	return {
		setUserId: (userId) => dispatch(setUserId(userId)),
		fetchSiteData: () => dispatch(fetchSiteData()),
		setLoggedInUserPermissions: (permissions) =>
			dispatch(setLoggedInUserPermissions(permissions))
	}
}

function Admin({ ...rest }) {
	const classes = useStyles()
	const mainPanel = React.createRef()
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	var userId = rest.userId
	if (!userId) {
		let userId = localStorage.getItem('userId')
		if (userId) {
			rest.setUserId(userId)
		}
	}

	let permissions = encryptor.decrypt(localStorage.getItem('permissions'))
	if (permissions) {
		let parsedPerms = JSON.parse(permissions)
		rest.setLoggedInUserPermissions(parsedPerms)
	}

	//preload critical data into the application
	const { fetchSiteData } = rest
	React.useEffect(() => {
		fetchSiteData()
	}, [fetchSiteData])

	return (
		<div className={classes.wrapper}>
			<div className={classes.mainPanel} ref={mainPanel}>
				<Navbar handleDrawerToggle={handleDrawerToggle} {...rest} />

				<div className={classes.content}>
					<div className={classes.container}>{switchRoutes}</div>
				</div>
			</div>
		</div>
	)
}

export default connect(null, mapDispatchToProps)(Admin)
