/*eslint-disable*/
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import AdminNavbarLinks from '../../components/Navbars/AdminNavbarLinks.js'
import styles from '../../assets/jss/material-dashboard-react/components/sidebarStyle.js'
import Settings from '@material-ui/icons/Settings'
import PieChart from '@material-ui/icons/PieChart'
import { SettingsRoutes, DiscoverRoutes } from '../../routes'
import AccountDropdown from '../../components/AccountDropdown'

const useStyles = makeStyles(styles)

export default function Sidebar(props) {
	const classes = useStyles()
	// verifies if routeName is the one active (in browser input)
	function activeRoute(routeName) {
		let current = window.location.href
		return current.includes(routeName)
	}

	const [openCollapse, setOpenCollapse] = React.useState(true)
	const [openCollapseDiscover, setOpenCollapseDiscover] = React.useState(true)

	function handleOpenSettings() {
		setOpenCollapse(!openCollapse)
	}

	function handleOpenDiscover() {
		setOpenCollapseDiscover(!openCollapseDiscover)
	}

	const { color, logo, image, logoText, routes } = props

	const listItemClasses = classNames({
		[' ' + classes[color]]: activeRoute('/admin/settings')
	})

	const listItemClassesDiscover = classNames({
		[' ' + classes[color]]: activeRoute('/admin/discover')
	})

	const whiteFontClasses = classNames({
		[' ' + classes.whiteFont]: true
	})

	var links = (
		<div>
			{/**begin discover slinky */}

			<List className={classes.list}>
				<ListItem
					onClick={handleOpenDiscover}
					button
					className={classes.itemLink + listItemClassesDiscover}
				>
					<PieChart
						className={classNames(classes.itemIcon, whiteFontClasses)}
					/>

					<ListItemText
						primary={'Discover'}
						className={classNames(classes.itemText, whiteFontClasses)}
						disableTypography={true}
					/>
					{openCollapseDiscover ? (
						<ExpandLess
							className={classNames(classes.itemIcon, whiteFontClasses)}
						/>
					) : (
						<ExpandMore
							className={classNames(classes.itemIcon, whiteFontClasses)}
						/>
					)}
				</ListItem>

				<Collapse in={openCollapseDiscover} timeout='auto' unmountOnExit>
					<List>
						{DiscoverRoutes.map((setting, key) => {
							const whiteFontClassesNest = classNames({
								[' ' + classes.whiteFont]: true
							})

							const subListItemClasses = classNames({
								[' ' + classes[color]]: activeRoute(
									setting.layout + setting.path
								)
							})

							let itemClass = classes.nestedItemLink
							//if(setting.path === '/settings/users' || setting.path === '/settings/rolesPermissions' || setting.path === '/settings/brandProfiles' || setting.path === '/settings/brandMentality') {
							//  itemClass = classes.subNestedItemLink
							//}

							return (
								<NavLink
									to={setting.layout + setting.path}
									className={classes.item}
									activeClassName='active'
									key={key}
								>
									<div
										className={
											setting.path.includes('brand')
												? 'brandProfileLink'
												: 'test'
										}
									>
										<ListItem
											button
											inset='true'
											className={itemClass + subListItemClasses}
										>
											<setting.icon
												style={{
													color: 'white',
													width: '24px',
													height: '30px',
													fontSize: '24px',
													lineHeight: '30px',
													float: 'left',
													marginRight: '15px',
													marginLeft: '15px',
													textAlign: 'center',
													verticalAlign: 'middle'
												}}
											/>

											<ListItemText
												primary={setting.name}
												className={classNames(
													classes.itemText,
													whiteFontClassesNest
												)}
												disableTypography={true}
											/>
										</ListItem>
									</div>
								</NavLink>
							)
						})}
					</List>
				</Collapse>
			</List>

			{/**end discover slinky , begin settings slinky*/}

			<List className={classes.list}>
				<ListItem
					onClick={handleOpenSettings}
					button
					className={classes.itemLink + listItemClasses}
				>
					<Settings
						className={classNames(classes.itemIcon, whiteFontClasses)}
					/>

					<ListItemText
						primary={'Settings'}
						className={classNames(classes.itemText, whiteFontClasses)}
						disableTypography={true}
					/>
					{openCollapse ? (
						<ExpandLess
							className={classNames(classes.itemIcon, whiteFontClasses)}
						/>
					) : (
						<ExpandMore
							className={classNames(classes.itemIcon, whiteFontClasses)}
						/>
					)}
				</ListItem>

				<Collapse in={openCollapse} timeout='auto' unmountOnExit>
					<List>
						{SettingsRoutes.map((setting, key) => {
							const whiteFontClassesNest = classNames({
								[' ' + classes.whiteFont]: true
							})

							const subListItemClasses = classNames({
								[' ' + classes[color]]: activeRoute(
									setting.layout + setting.path
								)
							})

							let itemClass = classes.nestedItemLink
							//if(setting.path === '/settings/users' || setting.path === '/settings/rolesPermissions' || setting.path === '/settings/brandProfiles' || setting.path === '/settings/brandMentality') {
							//  itemClass = classes.subNestedItemLink
							//}

							return (
								<NavLink
									to={setting.layout + setting.path}
									className={classes.item}
									activeClassName='active'
									key={key}
								>
									<div
										className={
											setting.path.includes('brand')
												? 'brandProfileLink'
												: 'test'
										}
									>
										<ListItem
											button
											inset='true'
											className={itemClass + subListItemClasses}
										>
											<setting.icon
												style={{
													color: 'white',
													width: '24px',
													height: '30px',
													fontSize: '24px',
													lineHeight: '30px',
													float: 'left',
													marginRight: '15px',
													marginLeft: '15px',
													textAlign: 'center',
													verticalAlign: 'middle'
												}}
											/>

											<ListItemText
												primary={setting.name}
												className={classNames(
													classes.itemText,
													whiteFontClassesNest
												)}
												disableTypography={true}
											/>
										</ListItem>
									</div>
								</NavLink>
							)
						})}
					</List>
				</Collapse>
			</List>
		</div>
	)

	var brand = (
		<div className={classes.logo}>
			<a
				href='https://www.sightly.com/'
				className={classNames(classes.logoLink, {
					[classes.logoLinkRTL]: props.rtlActive
				})}
				target='_blank'
			>
				<div className={classes.logoImage}>
					<img src={logo} alt='logo' className={classes.img} />
				</div>
				{logoText}
			</a>

			<AccountDropdown />
		</div>
	)
	return (
		<div>
			<Hidden mdUp implementation='css'>
				<Drawer
					variant='temporary'
					anchor={props.rtlActive ? 'left' : 'right'}
					open={props.open}
					classes={{
						paper: classNames(classes.drawerPaper, {
							[classes.drawerPaperRTL]: props.rtlActive
						})
					}}
					onClose={props.handleDrawerToggle}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
				>
					{brand}

					<div className={classes.sidebarWrapper}>
						<AdminNavbarLinks />
						{links}
					</div>
					{image !== undefined ? (
						<div
							className={classes.background}
							style={{ backgroundImage: 'url(' + image + ')' }}
						/>
					) : null}
				</Drawer>
			</Hidden>
			<Hidden smDown implementation='css'>
				<Drawer
					anchor={props.rtlActive ? 'right' : 'left'}
					variant='permanent'
					open
					classes={{
						paper: classNames(classes.drawerPaper, {
							[classes.drawerPaperRTL]: props.rtlActive
						})
					}}
				>
					{brand}

					<div className={classes.sidebarWrapper}>{links}</div>
					{image !== undefined ? (
						<div
							className={classes.background}
							style={{ backgroundImage: 'url(' + image + ')' }}
						/>
					) : null}
				</Drawer>
			</Hidden>
		</div>
	)
}

Sidebar.propTypes = {
	rtlActive: PropTypes.bool,
	handleDrawerToggle: PropTypes.func,
	bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
	logo: PropTypes.string,
	image: PropTypes.string,
	logoText: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object),
	open: PropTypes.bool
}
