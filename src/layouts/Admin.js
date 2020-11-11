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
var encryptor = require('simple-encryptor')(
	process.env.REACT_APP_LOCAL_STORAGE_KEY
)

const switchRoutes = (
	<Switch>
		{userCan(perms.BRAND_MENTALITY_READ) && (
			<Route
				path={routes.app.settings.brandMentality.path}
				component={routes.app.settings.brandMentality.component}
			/>
		)}

		<Route
			path={routes.app.discover.channelResearch.path}
			component={routes.app.discover.channelResearch.component}
		/>

		<Route
			path={routes.app.settings.users.path}
			render={({ match: { url } }) => (
				<>
					<Route
						path={routes.app.settings.users.path}
						component={routes.app.settings.users.component}
						exact
					/>

					{userCan(perms.USER_CREATE) && (
						<Route
							path={routes.app.settings.users.create.path}
							component={routes.app.settings.users.create.component}
						/>
					)}
					<Route
						path={routes.app.settings.users.edit.path}
						component={routes.app.settings.users.edit.component}
					/>
				</>
			)}
		/>

		<Route
			path={routes.app.engage.lists.lists.path}
			render={({ match: { url } }) => (
				<>
					<Route
						path={routes.app.engage.lists.lists.path}
						component={routes.app.engage.lists.lists.component}
						exact
					/>

					<Route
						path={routes.app.engage.lists.uploadList.path}
						component={routes.app.engage.lists.uploadList.component}
					/>

					<Route
						path={routes.app.engage.lists.listBuilder.path}
						component={routes.app.engage.lists.listBuilder.component}
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
			component={routes.app.settings.account.component}
		/>

		<Route
			path={routes.app.settings.brandProfiles.path}
			render={({ match: { url } }) => (
				<>
					<Route
						path={routes.app.settings.brandProfiles.path}
						component={routes.app.settings.brandProfiles.component}
						exact
					/>
					{userCan(perms.BRAND_PROFILE_CREATE) && (
						<Route
							path={routes.app.settings.brandProfiles.create.path}
							component={routes.app.settings.brandProfiles.create.component}
						/>
					)}
					<Route
						path={routes.app.settings.brandProfiles.edit.path}
						component={routes.app.settings.brandProfiles.edit.component}
					/>

					<Route
						path={routes.app.settings.brandProfiles.admin.path}
						render={({ match: { url } }) => (
							<>
								<Route
									path={routes.app.settings.brandProfiles.admin.path}
									component={routes.app.settings.brandProfiles.admin.component}
									exact
								/>

								<Route
									path={routes.app.settings.brandProfiles.admin.scenarios.path}
									render={({ match: { url } }) => (
										<>
											<Route
												path={
													routes.app.settings.brandProfiles.admin.scenarios.path
												}
												component={
													routes.app.settings.brandProfiles.admin.scenarios
														.component
												}
												exact
											/>
											<Route
												path={
													routes.app.settings.brandProfiles.admin.scenarios
														.create.path
												}
												component={
													routes.app.settings.brandProfiles.admin.scenarios
														.create.component
												}
											/>
										</>
									)}
								/>

								<Route
									path={routes.app.settings.brandProfiles.admin.opinions.path}
									render={({ match: { url } }) => (
										<>
											<Route
												path={
													routes.app.settings.brandProfiles.admin.opinions.path
												}
												component={
													routes.app.settings.brandProfiles.admin.opinions
														.component
												}
												exact
											/>
											<Route
												path={
													routes.app.settings.brandProfiles.admin.opinions
														.create.path
												}
												component={
													routes.app.settings.brandProfiles.admin.opinions
														.create.component
												}
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

		<Redirect from='/app' to={routes.app.settings.account.path} />
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
