import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Navbar from '../components/Navbars/Navbar.js'
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js'
import { connect } from 'react-redux'
import { setUserId, setLoggedInUserPermissions } from '../redux/actions/auth.js'
import { fetchSiteData } from '../redux/actions/accounts.js'
import { routes } from '../routes'
import { userCan, perms } from '../Can'
import ProtectedRoute from './ProtectedRoute'
var encryptor = require('simple-encryptor')(
	process.env.REACT_APP_LOCAL_STORAGE_KEY
)

const switchRoutes = (
	<Switch>
		<Route
			path={routes.app.settings.brandMentality.path}
			render={({ match: { url } }) => (
				<>
					<ProtectedRoute
						path={routes.app.settings.brandMentality.path}
						component={routes.app.settings.brandMentality.component}
						canView={userCan(perms.BRAND_MENTALITY_READ)}
					/>
				</>
			)}
		/>

		<Route
			path={routes.app.discover.channelResearch.path}
			render={({ match: { url } }) => (
				<>
					<ProtectedRoute
						path={routes.app.discover.channelResearch.path}
						component={routes.app.discover.channelResearch.component}
						canView={userCan(perms.DISCOVER_READ)}
					/>
				</>
			)}
		/>

		<Route
			path={routes.app.settings.users.path}
			render={({ match: { url } }) => (
				<>
					<ProtectedRoute
						path={routes.app.settings.users.path}
						component={routes.app.settings.users.component}
						canView={userCan(perms.USER_READ)}
						exact
					/>

					<ProtectedRoute
						path={routes.app.settings.users.create.path}
						component={routes.app.settings.users.create.component}
						canView={userCan(perms.USER_CREATE)}
					/>

					<ProtectedRoute
						path={routes.app.settings.users.edit.path}
						component={routes.app.settings.users.edit.component}
						canView={userCan(perms.USER_READ)}
					/>
				</>
			)}
		/>

		<Route
			path={routes.app.engage.lists.lists.path}
			render={({ match: { url } }) => (
				<>
					<ProtectedRoute
						path={routes.app.engage.lists.lists.path}
						component={routes.app.engage.lists.lists.component}
						exact
						canView={userCan(perms.ENGAGE_READ)}
					/>

					<ProtectedRoute
						path={routes.app.engage.lists.createList.path}
						component={routes.app.engage.lists.createList.component}
						canView={userCan(perms.ENGAGE_READ)}
					/>

					<ProtectedRoute
						path={routes.app.engage.lists.uploadList.path}
						component={routes.app.engage.lists.uploadList.component}
						canView={userCan(perms.ENGAGE_READ)}
					/>

					<ProtectedRoute
						path={routes.app.engage.lists.listBuilder.path}
						component={routes.app.engage.lists.listBuilder.component}
						canView={userCan(perms.ENGAGE_READ)}
					/>
				</>
			)}
		/>

		<Route
			path={routes.app.settings.profile.path}
			component={routes.app.settings.profile.component}
		/>

		<Route
			path={routes.app.settings.account.path}
			render={({ match: { url } }) => (
				<>
					<ProtectedRoute
						path={routes.app.settings.account.path}
						component={routes.app.settings.account.component}
						canView={userCan(perms.ACCOUNT_READ)}
					/>
				</>
			)}
		/>

		<Route
			path={routes.app.settings.brandProfiles.path}
			render={({ match: { url } }) => (
				<>
					<ProtectedRoute
						path={routes.app.settings.brandProfiles.path}
						component={routes.app.settings.brandProfiles.component}
						canView={userCan(perms.BRAND_PROFILE_READ)}
						exact
					/>

					<ProtectedRoute
						path={routes.app.settings.brandProfiles.create.path}
						component={routes.app.settings.brandProfiles.create.component}
						canView={userCan(perms.BRAND_PROFILE_CREATE)}
					/>

					<ProtectedRoute
						path={routes.app.settings.brandProfiles.edit.path}
						component={routes.app.settings.brandProfiles.edit.component}
						canView={userCan(perms.BRAND_PROFILE_READ)}
					/>

					<Route
						path={routes.app.settings.brandProfiles.admin.path}
						render={({ match: { url } }) => (
							<>
								<ProtectedRoute
									path={routes.app.settings.brandProfiles.admin.path}
									component={routes.app.settings.brandProfiles.admin.component}
									canView={userCan(perms.ADMIN_READ)}
									exact
								/>

								<Route
									path={routes.app.settings.brandProfiles.admin.scenarios.path}
									render={({ match: { url } }) => (
										<>
											<ProtectedRoute
												path={
													routes.app.settings.brandProfiles.admin.scenarios.path
												}
												component={
													routes.app.settings.brandProfiles.admin.scenarios
														.component
												}
												canView={userCan(perms.ADMIN_READ)}
												exact
											/>
											<ProtectedRoute
												path={
													routes.app.settings.brandProfiles.admin.scenarios
														.create.path
												}
												component={
													routes.app.settings.brandProfiles.admin.scenarios
														.create.component
												}
												canView={userCan(perms.ADMIN_READ)}
											/>
										</>
									)}
								/>

								<Route
									path={routes.app.settings.brandProfiles.admin.opinions.path}
									render={({ match: { url } }) => (
										<>
											<ProtectedRoute
												path={
													routes.app.settings.brandProfiles.admin.opinions.path
												}
												component={
													routes.app.settings.brandProfiles.admin.opinions
														.component
												}
												canView={userCan(perms.ADMIN_READ)}
												exact
											/>
											<ProtectedRoute
												path={
													routes.app.settings.brandProfiles.admin.opinions
														.create.path
												}
												component={
													routes.app.settings.brandProfiles.admin.opinions
														.create.component
												}
												canView={userCan(perms.ADMIN_READ)}
											/>
										</>
									)}
								/>
							</>
						)}
					/>
				</>
			)}
		/>

		<Redirect from='/app' to={routes.app.settings.profile.path} />
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

export function Admin({ ...rest }) {
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
