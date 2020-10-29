import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Navbar from '../components/Navbars/Navbar.js'
import { SettingsRoutes } from '../routes.js'
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js'
import CreateUser from '../views/Users/CreateUser.js'

// Redux
import { connect } from 'react-redux'
import { setUserId, setLoggedInUserPermissions } from '../redux/actions/auth.js'
import { fetchSiteData } from '../redux/actions/accounts.js'
import EditUser from '../views/Users/EditUser'
import BrandMentality from '../views/BrandMentality/BrandMentality'
import ChannelResearchTemp from '../views/Discover/ChannelResearchTemp'
import ListBuilder from '../views/Discover/ListBuilder.js'
import Users from '../views/Users/Users'
import BrandProfiles from '../views/BrandProfiles/BrandProfiles.js'
import CreateBrandProfile from '../views/BrandProfiles/CreateBrandProfile.js'
import EditBrandProfile from '../views/BrandProfiles/EditBrandProfile.js'
import UserProfile from '../views/UserProfile/UserProfile.js'
import Account from '../views/Account/Account'

const switchRoutes = (
	<Switch>
		<Route path='/admin/settings/brandMentality' component={BrandMentality} />

		<Route
			path='/admin/discover/channelResearch'
			component={ChannelResearchTemp}
		/>

		<Route
			path='/admin/settings/users'
			render={({ match: { url } }) => (
				<>
					<Route path={`${url}/`} component={Users} exact />

					<Route path={`${url}/create`} component={CreateUser} />
					<Route
						path={`${url}/edit/:user`}
						render={(props) => <EditUser {...props} foo='bar' />}
					/>
				</>
			)}
		/>

		<Route path='/admin/engage/listBuilder' component={ListBuilder} />

		<Route path='/admin/settings/profile' component={UserProfile} />

		<Route path='/admin/settings/account' component={Account} />

		<Route
			path='/admin/settings/brandProfiles'
			render={({ match: { url } }) => (
				<>
					<Route path={`${url}/`} component={BrandProfiles} exact />
					<Route path={`${url}/create`} component={CreateBrandProfile} />
					<Route
						path={`${url}/edit/:brandProfileId`}
						component={EditBrandProfile}
					/>
				</>
			)}
		/>

		<Redirect from='/admin' to='/admin/settings/profile' />
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

	let permissions = localStorage.getItem('permissions')
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
				<Navbar
					routes={SettingsRoutes}
					handleDrawerToggle={handleDrawerToggle}
					{...rest}
				/>

				<div className={classes.content}>
					<div className={classes.container}>{switchRoutes}</div>
				</div>
			</div>
		</div>
	)
}

export default connect(null, mapDispatchToProps)(Admin)
