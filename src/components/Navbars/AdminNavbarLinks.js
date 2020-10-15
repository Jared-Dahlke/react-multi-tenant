import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Hidden from '@material-ui/core/Hidden'
import Poppers from '@material-ui/core/Popper'
import Divider from '@material-ui/core/Divider'
import Person from '@material-ui/icons/Person'
import Button from '../CustomButtons/Button.js'
import styles from '../../assets/jss/material-dashboard-react/components/headerLinksStyle.js'
import { setAuthToken, setLoggedIn } from '../../redux/actions/auth.js'
import { Link } from 'react-router-dom'
import { whiteColor } from '../../assets/jss/material-dashboard-react.js'

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		authToken: state.authToken
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthToken: (authToken) => dispatch(setAuthToken(authToken)),
		setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
	}
}

function AdminNavbarLinks(props) {
	const classes = useStyles()
	const [openNotification, setOpenNotification] = React.useState(null)
	const [openProfile, setOpenProfile] = React.useState(null)
	const handleCloseNotification = () => {
		setOpenNotification(null)
	}
	const handleClickProfile = (event) => {
		if (openProfile && openProfile.contains(event.target)) {
			setOpenProfile(null)
		} else {
			setOpenProfile(event.currentTarget)
		}
	}
	const handleCloseProfile = () => {
		setOpenProfile(null)
	}
	const handleLogOut = (props) => {
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
		props.setAuthToken(null)
		props.setLoggedIn(false)
	}

	const goToProfile = () => {}

	return (
		<div>
			<div className={classes.manager}></div>

			<div className={classes.manager}>
				<Button
					color={window.innerWidth > 959 ? 'transparent' : 'white'}
					justIcon={window.innerWidth > 959}
					simple={!(window.innerWidth > 959)}
					aria-owns={openProfile ? 'profile-menu-list-grow' : null}
					aria-haspopup='true'
					onClick={handleClickProfile}
					className={classes.buttonLink}
				>
					<Person style={{ color: whiteColor }} />
					<Hidden mdUp implementation='css'>
						<p className={classes.linkText}>Profile</p>
					</Hidden>
				</Button>
				<Poppers
					open={Boolean(openProfile)}
					anchorEl={openProfile}
					transition
					disablePortal
					className={
						classNames({ [classes.popperClose]: !openProfile }) +
						' ' +
						classes.popperNav
					}
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							id='profile-menu-list-grow'
							style={{
								transformOrigin:
									placement === 'bottom' ? 'center top' : 'center bottom'
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleCloseProfile}>
									<MenuList role='menu'>
										<Link
											to='/admin/settings/profile'
											style={{ textDecoration: 'none' }}
										>
											<MenuItem
												onClick={handleCloseProfile}
												className={classes.dropdownItem}
											>
												Profile
											</MenuItem>
										</Link>
										<MenuItem
											onClick={handleCloseProfile}
											className={classes.dropdownItem}
										>
											Settings
										</MenuItem>
										<Divider light />
										<MenuItem
											onClick={() => {
												handleLogOut(props)
											}}
											className={classes.dropdownItem}
										>
											Logout
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Poppers>
			</div>
		</div>
	)
}

const MyAdminNavbarLinks = connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminNavbarLinks)

export default MyAdminNavbarLinks
