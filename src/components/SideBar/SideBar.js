/*eslint-disable*/
import React from 'react'
// @material-ui/core components
import Drawer from 'rsuite/lib/Drawer'
import Dropdown from 'rsuite/lib/Dropdown'
import { Link } from 'react-router-dom'
// core components
import Icon from 'rsuite/lib/Icon'

import Nav from 'rsuite/lib/Nav'
import { perms, userCan } from '../../Can'
import { routes } from '../../routes'
import IconButton from 'rsuite/lib/IconButton'
import Sidenav from 'rsuite/lib/Sidenav'

export default function Sidebar(props) {
	const NavLink = (props) => (
		<Dropdown.Item componentClass={MyLink} {...props} />
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

	return (
		<Drawer
			full
			placement={'left'}
			show={props.showMobileDrawer}
			onHide={props.closeMobileDrawer}
		>
			<Sidenav defaultOpenKeys={['3', '4']} activeKey='1'>
				<Sidenav.Header>Sightly</Sidenav.Header>
				<Sidenav.Body>
					<Nav>
						<Dropdown
							eventKey='3'
							title='Discover'
							icon={<Icon icon='pie-chart' />}
						>
							<NavLink
								href={routes.app.discover.channelResearch.path}
								label='Channel Research'
							/>
						</Dropdown>
						<Dropdown eventKey='4' title='Engage' icon={<Icon icon='bolt' />}>
							<NavLink
								href={routes.app.engage.lists.lists.path}
								label='Smart Lists'
							/>
						</Dropdown>
						<Dropdown
							eventKey='5'
							title='Account Settings'
							icon={<Icon icon='sliders' />}
						>
							<NavLink
								href={routes.app.settings.account.path}
								label='Account'
							/>

							<NavLink href={routes.app.settings.users.path} label='Users' />
							<NavLink
								href={routes.app.settings.brandProfiles.path}
								label='Brand Profiles'
							/>

							<NavLink
								href={routes.app.settings.brandMentality.path}
								label='Brand Mentality'
							/>
						</Dropdown>
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</Drawer>
	)
}

/**
    
				<Nav>
					<Dropdown
						title='Discover'
						icon={<Icon icon='pie-chart' />}
						style={{ marginRight: 15 }}
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
						style={{ marginRight: 15 }}
						id='Engage_Nav_Tab'
					>
						<NavLink href={routes.app.engage.lists.lists.path} label='Lists' />
						<NavLink
							href={routes.app.engage.lists.listBuilder.path}
							label='List Builder'
						/>
					</Dropdown>

					<Dropdown title='Account Settings' icon={<Icon icon='sliders' />}>
						<NavLink href={routes.app.settings.account.path} label='Account' />

						<NavLink href={routes.app.settings.users.path} label='Users' />
						<NavLink
							href={routes.app.settings.brandProfiles.path}
							label='Brand Profiles'
						/>

						<NavLink
							href={routes.app.settings.brandMentality.path}
							label='Brand Mentality'
						/>
					</Dropdown>
				</Nav>
				<Nav pullRight style={{ marginRight: 30 }}>
					<Dropdown title='' icon={<Icon icon='avatar' />}>
						<NavLink href={routes.app.settings.profile.path} label='Profile' />

						<Dropdown.Item onSelect={() => handleLogOut(props)}>
							Logout
						</Dropdown.Item>
					</Dropdown>
				</Nav> */