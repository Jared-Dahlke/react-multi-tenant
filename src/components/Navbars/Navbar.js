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

const useStyles = makeStyles(styles)
const useSidebarStyles = makeStyles(sidebarStyles)

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthToken: (authToken) => dispatch(setAuthToken(authToken)),
		setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
	}
}

function Header(props) {
	const classes = useStyles()
	const sidebarClasses = useSidebarStyles()
	function makeBrand() {
		const crumbSize = 20

		let url = window.location.pathname
		console.log(url)
		if (url === '/admin/discover/channelResearch') {
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
		if (url === '/admin/engage/listBuilder') {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						List Builder
					</div>
				</Breadcrumbs>
			)
		}
		if (url === '/admin/settings/account') {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Account
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/admin/settings/users') {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Users
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/admin/settings/users/create') {
			return (
				<Breadcrumbs
					aria-label='breadcrumb'
					style={{ color: whiteColor }}
					separator='>'
				>
					<Link to='/admin/settings/users' style={{ fontSize: crumbSize }}>
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
					<Link to='/admin/settings/users' style={{ fontSize: crumbSize }}>
						Users
					</Link>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Edit
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/admin/settings/brandProfiles') {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Brand Profiles
					</div>
				</Breadcrumbs>
			)
		}
		if (url === '/admin/settings/brandProfiles/create') {
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
						Create
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/admin/settings/brandMentality') {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Brand Mentality
					</div>
				</Breadcrumbs>
			)
		}

		if (url === '/admin/settings/profile') {
			return (
				<Breadcrumbs aria-label='breadcrumb' style={{ color: whiteColor }}>
					<div className={classes.disabledLink} style={{ fontSize: crumbSize }}>
						Profile
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
	}

	const NavLink = (props) => (
		<Dropdown.Item componentClass={MyLink} {...props} />
	)

	let permissions = localStorage.getItem('permissions')
	const onlyMentality = permissions == 1 ? true : false

	return (
		<div>
			<Navbar style={{ borderBottom: '1px solid white' }}>
				<Navbar.Body>
					<Nav>
						<Nav.Item>{brand}</Nav.Item>

						{!onlyMentality ? (
							<Dropdown
								title='Discover'
								icon={<Icon icon='pie-chart' />}
								style={{ marginRight: 15 }}
								id='Channel_Research_Nav_Tab'
							>
								<NavLink
									href='/admin/discover/channelResearch'
									label='Channel Research'
								/>
							</Dropdown>
						) : null}

						{!onlyMentality ? (
							<Dropdown
								title='Engage'
								icon={<Icon icon='bolt' />}
								style={{ marginRight: 15 }}
								id='Engage_Nav_Tab'
							>
								<NavLink
									href='/admin/engage/listBuilder'
									label='List Builder'
								/>
							</Dropdown>
						) : null}

						<Dropdown
							title='Account Configuration'
							icon={<Icon icon='sliders' />}
						>
							{!onlyMentality ? (
								<div>
									<NavLink href='/admin/settings/account' label='Account' />
									<NavLink href='/admin/settings/users' label='Users' />
									<NavLink
										href='/admin/settings/brandProfiles'
										label='Brand Profiles'
									/>
								</div>
							) : null}

							<NavLink
								href='/admin/settings/brandMentality'
								label='Brand Mentality'
							/>
						</Dropdown>
					</Nav>
					<Nav pullRight style={{ marginRight: 30 }}>
						<Dropdown title='' icon={<Icon icon='avatar' />}>
							{!onlyMentality ? (
								<NavLink href='/admin/settings/profile' label='Profile' />
							) : null}

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

Header.propTypes = {
	color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
	rtlActive: PropTypes.bool,
	handleDrawerToggle: PropTypes.func,
	routes: PropTypes.arrayOf(PropTypes.object)
}

export default connect(null, mapDispatchToProps)(Header)
