import React from 'react'
import PropTypes from 'prop-types'
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
import styles from '../../assets/jss/material-dashboard-react/components/headerStyle.js'
import { whiteColor } from '../../assets/jss/material-dashboard-react.js'
import { clearSiteData } from '../../redux/actions/accounts'
import { perms, userCan } from '../../Can'
import { routes } from '../../routes'
import Grid from '@material-ui/core/Grid'
import SideBar from '../SideBar/SideBar'
import IconButton from 'rsuite/lib/IconButton'

const useStyles = makeStyles(styles)
const useSidebarStyles = makeStyles(sidebarStyles)

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthToken: (authToken) => dispatch(setAuthToken(authToken)),
		setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn)),
		clearSiteData: () => dispatch(clearSiteData())
	}
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
		console.log('calling open mobile drawer')
		setShowMobileDrawer(true)
	}

	let isMobile = width <= 768
	const classes = useStyles()
	const sidebarClasses = useSidebarStyles()
	function makeBrand() {
		const crumbSize = 20

		let url = window.location.pathname
		if (url === routes.app.discover.channelResearch.path) {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Channel Research
					</div>
				</Breadcrumbs>
			)
		}
		if (url === routes.app.engage.lists.lists.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Lists
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.app.engage.lists.uploadList.path) {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to={routes.app.engage.lists.lists.path}
						style={{ fontSize: crumbSize }}
					>
						Lists
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Upload List
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.app.engage.lists.listBuilder.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						List Builder
					</div>
				</Breadcrumbs>
			)
		}
		if (url === routes.app.settings.account.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Account
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.app.settings.users.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Users
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.app.settings.users.create.path) {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to={routes.app.settings.users.path}
						style={{ fontSize: crumbSize }}
					>
						Users
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Create
					</div>
				</Breadcrumbs>
			)
		}

		if (url.includes('/app/settings/users/edit')) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<Link
						to={routes.app.settings.users.path}
						style={{ fontSize: crumbSize }}
					>
						Users
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Edit
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.app.settings.brandProfiles.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Brand Profiles
					</div>
				</Breadcrumbs>
			)
		}
		if (url === routes.app.settings.brandProfiles.create.path) {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to={routes.app.settings.brandProfiles.path}
						style={{ fontSize: crumbSize }}
					>
						Brand Profiles
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Create
					</div>
				</Breadcrumbs>
			)
		}

		if (url.includes('/app/settings/brandProfiles/edit')) {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to={routes.app.settings.brandProfiles.path}
						style={{ fontSize: crumbSize }}
					>
						Brand Profiles
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Edit
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.app.settings.brandMentality.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Brand Mentality
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.app.settings.profile.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Profile
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/app/settings/brandProfiles/admin') {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to='/app/settings/brandProfiles'
						style={{ fontSize: crumbSize }}
					>
						Brand Profiles
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Admin
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/app/settings/brandProfiles/admin/scenarios') {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to='/app/settings/brandProfiles'
						style={{ fontSize: crumbSize }}
					>
						Brand Profiles
					</Link>
					<Link
						to='/app/settings/brandProfiles/admin'
						style={{ fontSize: crumbSize }}
					>
						Admin
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Scenarios
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/app/settings/brandProfiles/admin/scenarios/create') {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to='/app/settings/brandProfiles'
						style={{ fontSize: crumbSize }}
					>
						Brand Profiles
					</Link>
					<Link
						to='/app/settings/brandProfiles/admin'
						style={{ fontSize: crumbSize }}
					>
						Admin
					</Link>
					<Link
						to='/app/settings/brandProfiles/admin/scenarios'
						style={{ fontSize: crumbSize }}
					>
						Scenarios
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Create
					</div>
				</Breadcrumbs>
			)
		}
		return null
	}

	var brand = (
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
				<div style={{ paddingLeft: 30, paddingTop: 20 }}>{makeBrand()}</div>
			</div>
		)
	} else {
		return (
			<div>
				<Navbar style={{ borderBottom: '1px solid white' }}>
					<Navbar.Body>
						<Nav>
							<Nav.Item>{brand}</Nav.Item>

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
									label='Lists'
								/>
								<NavLink
									href={routes.app.engage.lists.listBuilder.path}
									label='List Builder'
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
				<div style={{ paddingLeft: 30, paddingTop: 20 }}>{makeBrand()}</div>
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(Header)
