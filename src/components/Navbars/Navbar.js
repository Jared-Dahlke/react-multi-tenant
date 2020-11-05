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
	const classes = useStyles()
	const sidebarClasses = useSidebarStyles()
	function makeBrand() {
		const crumbSize = 20

		let url = window.location.pathname
		if (url === routes.admin.discover.channelResearch.path) {
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
		if (url === routes.admin.engage.lists.lists.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Lists
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.admin.engage.lists.uploadList.path) {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to={routes.admin.engage.lists.lists.path}
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

		if (url === routes.admin.engage.lists.listBuilder.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						List Builder
					</div>
				</Breadcrumbs>
			)
		}
		if (url === routes.admin.settings.account.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Account
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.admin.settings.users.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Users
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.admin.settings.users.create.path) {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to={routes.admin.settings.users.path}
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

		if (url.includes('/admin/settings/users/edit')) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<Link
						to={routes.admin.settings.users.path}
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

		if (url === routes.admin.settings.brandProfiles.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Brand Profiles
					</div>
				</Breadcrumbs>
			)
		}
		if (url === routes.admin.settings.brandProfiles.create.path) {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to={routes.admin.settings.brandProfiles.path}
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

		if (url.includes('/admin/settings/brandProfiles/edit')) {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to={routes.admin.settings.brandProfiles.path}
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

		if (url === routes.admin.settings.brandMentality.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Brand Mentality
					</div>
				</Breadcrumbs>
			)
		}

		if (url === routes.admin.settings.profile.path) {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Profile
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/admin/settings/brandProfiles/scenarios') {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to='/admin/settings/brandProfiles'
						style={{ fontSize: crumbSize }}
					>
						Brand Profiles
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Scenarios
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/admin/settings/brandProfiles/scenarios/create') {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link
						to='/admin/settings/brandProfiles'
						style={{ fontSize: crumbSize }}
					>
						Brand Profiles
					</Link>
					<Link
						to='/admin/settings/brandProfiles/scenarios'
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

		if (
			label.includes('Brand Mentality') &&
			!userCan(perms.BRAND_MENTALITY_READ)
		) {
			return null
		} else {
			return (
				<Link to={href} style={{ textDecoration: 'none' }} ref={ref} {...rest}>
					{label}
				</Link>
			)
		}
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

	return (
		<div>
			<Navbar style={{ borderBottom: '1px solid white' }}>
				<Navbar.Body>
					<Nav>
						<Nav.Item>{brand}</Nav.Item>

						<Dropdown
							title='Discover'
							icon={<Icon icon='pie-chart' />}
							style={{ marginRight: 15 }}
							id='Channel_Research_Nav_Tab'
						>
							<NavLink
								href={routes.admin.discover.channelResearch.path}
								label='Channel Research'
							/>
						</Dropdown>

						<Dropdown
							title='Engage'
							icon={<Icon icon='bolt' />}
							style={{ marginRight: 15 }}
							id='Engage_Nav_Tab'
						>
							<NavLink
								href={routes.admin.engage.lists.lists.path}
								label='Lists'
							/>
							<NavLink
								href={routes.admin.engage.lists.listBuilder.path}
								label='List Builder'
							/>
						</Dropdown>

						<Dropdown title='Account Settings' icon={<Icon icon='sliders' />}>
							<NavLink
								href={routes.admin.settings.account.path}
								label='Account'
							/>

							<NavLink href={routes.admin.settings.users.path} label='Users' />
							<NavLink
								href={routes.admin.settings.brandProfiles.path}
								label='Brand Profiles'
							/>

							<NavLink
								href={routes.admin.settings.brandMentality.path}
								label='Brand Mentality'
							/>
						</Dropdown>
					</Nav>
					<Nav pullRight style={{ marginRight: 30 }}>
						<Dropdown title='' icon={<Icon icon='avatar' />}>
							<NavLink
								href={routes.admin.settings.profile.path}
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

export default connect(null, mapDispatchToProps)(Header)
