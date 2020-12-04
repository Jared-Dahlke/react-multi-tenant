import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Navbar from 'rsuite/lib/Navbar'
import Nav from 'rsuite/lib/Nav'
import Icon from 'rsuite/lib/Icon'
import Dropdown from 'rsuite/lib/Dropdown'
import logo from '../../assets/img/sightly-logo.svg'
import sidebarStyles from '../../assets/jss/material-dashboard-react/components/sidebarStyle.js'
import { setAuthToken, setLoggedIn } from '../../redux/actions/auth'
import { whiteColor } from '../../assets/jss/material-dashboard-react.js'
import { clearSiteData } from '../../redux/actions/accounts'
import { perms, userCan } from '../../Can'
import { routes, modifiedRoutes } from '../../routes'
import SideBar from '../SideBar/SideBar'
import IconButton from 'rsuite/lib/IconButton'

const useSidebarStyles = makeStyles(sidebarStyles)

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthToken: (authToken) => dispatch(setAuthToken(authToken)),
		setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn)),
		clearSiteData: () => dispatch(clearSiteData())
	}
}

const generateBreadCrumbs = (routes) => {
	const crumbSize = 20
	let url = window.location.pathname
	const routeHierarchy = []

	const getPathWithoutParams = (path) => {
		return path.split('/:')[0]
	}

	const findRoute = (route) => {
		let subRoutes = Object.values(route.subRoutes)
		let matchedRoute = subRoutes.find((route) => {
			if (url === route.path) return true
			if (
				route.name.toLowerCase().includes('edit') &&
				url.includes(getPathWithoutParams(route.path))
			)
				return true
			if (route.subRoutes) return findRoute(route)
			return false
		})
		matchedRoute && routeHierarchy.push(matchedRoute)
		return matchedRoute
	}

	const createBreadCrumbs = (routes) => {
		findRoute(routes)
		const disabledLinkStyle = {
			fontSize: crumbSize,
			cursor: 'not-allowed',
			color: 'white',
			pointerEvents: 'none'
		}
		return (
			<Breadcrumbs
				aria-label='breadcrumb'
				style={{ color: whiteColor }}
				separator='>'
			>
				{routeHierarchy.reverse().map((curr, index, array) => {
					if (index === array.length - 1)
						return (
							<div key={curr.path} style={disabledLinkStyle}>
								{curr.name}
							</div>
						)
					return (
						<Link
							to={curr.path}
							style={{ fontSize: crumbSize }}
							key={curr.path}
						>
							{curr.name}
						</Link>
					)
				})}
			</Breadcrumbs>
		)
	}

	return createBreadCrumbs(routes)
}

function Header(props) {
	const [width, setWidth] = React.useState(window.innerWidth)
	function handleWindowSizeChange() {
		setWidth(window.innerWidth)
	}
	React.useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	const [showMobileDrawer, setShowMobileDrawer] = React.useState(false)

	const closeMobileDrawer = () => {
		setShowMobileDrawer(false)
	}
	const openMobileDrawer = () => {
		setShowMobileDrawer(true)
	}

	let isMobile = width <= 768
	const sidebarClasses = useSidebarStyles()

	let brand = (
		<div className={sidebarClasses.logoImage}>
			<img src={logo} alt='logo' className={sidebarClasses.img} />
		</div>
	)

	const MyLink = React.forwardRef((props, ref) => {
		const { href, as, label, ...rest } = props

		return (
			<Link to={href} style={{ textDecoration: 'none' }} ref={ref} {...rest}>
				{label}
			</Link>
		)
	})

	const handleLogOut = (props) => {
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
		props.setAuthToken(null)
		props.setLoggedIn(false)
		props.clearSiteData()
	}

	const NavLink = (props) => (
		<Dropdown.Item componentClass={MyLink} {...props} />
	)

	if (isMobile) {
		return (
			<div>
				<IconButton
					style={{ marginLeft: 30, marginTop: 30 }}
					appearance='ghost'
					icon={<Icon icon='bars' />}
					onClick={() => openMobileDrawer()}
				></IconButton>
				<SideBar
					closeMobileDrawer={closeMobileDrawer}
					showMobileDrawer={showMobileDrawer}
					openMobileDrawer={openMobileDrawer}
				/>
				<div style={{ paddingLeft: 30, paddingTop: 20 }}>
					{generateBreadCrumbs(modifiedRoutes.app)}
				</div>
			</div>
		)
	} else {
		return (
			<div>
				<Navbar style={{ borderBottom: '1px solid white' }}>
					<Navbar.Body>
						<Nav>
							<Nav.Item href={routes.app.homepage.path}>{brand}</Nav.Item>

							<Dropdown
								title='Discover'
								icon={<Icon icon='pie-chart' />}
								style={{
									marginRight: 15,
									display: userCan(perms.DISCOVER_READ)
										? 'inline-block'
										: 'none'
								}}
								id='Channel_Research_Nav_Tab'
							>
								<NavLink
									href={routes.app.discover.channelResearch.path}
									label='Channel Research'
								/>
							</Dropdown>

							<Dropdown
								title='Engage'
								icon={<Icon icon='bolt' />}
								style={{
									marginRight: 15,
									display: userCan(perms.ENGAGE_READ) ? 'inline-block' : 'none'
								}}
								id='Engage_Nav_Tab'
							>
								<NavLink
									href={routes.app.engage.lists.lists.path}
									label='Smart Lists'
								/>
							</Dropdown>

							<Dropdown title='Account Settings' icon={<Icon icon='sliders' />}>
								{userCan(perms.ACCOUNT_READ) && (
									<NavLink
										href={routes.app.settings.account.path}
										label='Account'
									/>
								)}
								{userCan(perms.USER_READ) && (
									<NavLink
										href={routes.app.settings.users.path}
										label='Users'
									/>
								)}

								{userCan(perms.BRAND_PROFILE_READ) && (
									<NavLink
										href={routes.app.settings.brandProfiles.path}
										label='Brand Profiles'
									/>
								)}
								{userCan(perms.BRAND_MENTALITY_READ) && (
									<NavLink
										href={routes.app.settings.brandMentality.path}
										label='Brand Mentality'
									/>
								)}
							</Dropdown>
							{/* <Nav.Item href={routes.app.measure.path}>Measure</Nav.Item> */}
						</Nav>
						<Nav pullRight style={{ marginRight: 30 }}>
							<Dropdown title='' icon={<Icon icon='avatar' />}>
								<NavLink
									href={routes.app.settings.profile.path}
									label='Profile'
								/>

								<Dropdown.Item onSelect={() => handleLogOut(props)}>
									Logout
								</Dropdown.Item>
							</Dropdown>
						</Nav>
					</Navbar.Body>
				</Navbar>
				<div style={{ paddingLeft: 30, paddingTop: 20 }}>
					{generateBreadCrumbs(modifiedRoutes.app)}
				</div>
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(Header)
