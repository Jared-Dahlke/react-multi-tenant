import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Navbar from '../components/Navbars/Navbar.js'
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js'
import { connect } from 'react-redux'
import { setUserId, setLoggedInUserPermissions } from '../redux/actions/auth.js'
import { fetchSiteData } from '../redux/actions/accounts.js'
import { modifiedRoutes, routes } from '../routes'
var encryptor = require('simple-encryptor')(
	process.env.REACT_APP_LOCAL_STORAGE_KEY
)

export const generateRoutes = (modifiedRoutes) => {
	let invalidRoutesPath = [] //Holds value of userCan blocked URLs
	let parentRedirectRoutes = []
	//generates Routes Array for render props for Parent Route Components
	const createSubRoutes = (subRoutes) => {
		const currentWindowPath = window.location.pathname
		const subRoutesJSX = subRoutes.map((curr)=>{
			if(curr.hasOwnProperty('subRoutes')) return parseRoutes(curr)
			return (<Route path = {curr.path} component={curr.component} key={curr.path}/>)
		})
		const invalidPath = invalidRoutesPath.find(path=> currentWindowPath.includes(path))
		if(invalidPath) {

			return [(<Redirect to={modifiedRoutes.app.subRoutes.settings_profile.path} key={modifiedRoutes.app.subRoutes.settings_profile.path} />)]
		}
		return subRoutesJSX
	}

	//callback to filter Routes Array against userCan value
	const filterRoutesCB = (curr)=>{
		if(curr.userCan === false) {
			if((curr.path).includes(':')){
				invalidRoutesPath.push((curr.path).split('/:')[0])	
				return false
			}
			invalidRoutesPath.push(curr.path)
			return false
		}
		return true
	}

	//Creates the children Routes Array as children to Switch Component
	const parseRoutes = (routesParam) => {
		let routeJSX
		let routeValues = Object.values(routesParam.subRoutes)

		const filteredRouteValues = routeValues.filter(filterRoutesCB)
		const invalidPath = invalidRoutesPath.find(path=> (window.location.pathname).includes(path))
		if(invalidPath) {
			parentRedirectRoutes.push((<Redirect to={modifiedRoutes.app.subRoutes.settings_profile.path} key={modifiedRoutes.app.subRoutes.settings_profile.path} />))
		}

		let parentRoute = filteredRouteValues.map((value,index) => {
			const { path, component, subRoutes} = value
			if(subRoutes){
				const filteredSubRoutes = Array.from(subRoutes).filter(filterRoutesCB)
				routeJSX =  (<Route path={path} key={path} render={({match: {url}}) => (
						<>
							
							{[...createSubRoutes(filteredSubRoutes),
								(<Route
								path = {path}
								key={path}
								component = {component}
								exact />)]}
						</>
						)}/>)
			}
			else if(path && component) {
				routeJSX = (<Route 
								path = {path}
								key={path}
								component = {component}/>)
			}
			if(routesParam.path && routesParam.component){
				return (
					<React.Fragment key={routesParam.path + index}>
					<Route
						path = {routesParam.path}
						component = {routesParam.component}
						key={routesParam.path}
						exact />
						{routeJSX}
					</React.Fragment>
					)
			}
			return routeJSX

		})
		return parentRoute
	}
	return [...parseRoutes(modifiedRoutes.app), ...parentRedirectRoutes]

}

const modifiedSwitchRoutes = (
	<Switch>
		{[...generateRoutes(modifiedRoutes),(<Redirect to={modifiedRoutes.app.subRoutes.settings_profile.path} key={modifiedRoutes.app.subRoutes.settings_profile.path} />)]}
	</Switch>)

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
					<div className={classes.container}>{modifiedSwitchRoutes}</div>
				</div>
			</div>
		</div>
	)
}

export default connect(null, mapDispatchToProps)(Admin)
