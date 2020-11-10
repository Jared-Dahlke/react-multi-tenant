/*eslint-disable*/
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
// @material-ui/core components
import Drawer from 'rsuite/lib/Drawer'
import Dropdown from 'rsuite/lib/Dropdown'
// core components
import IconButton from 'rsuite/lib/IconButton'
import Sidenav from 'rsuite/lib/Sidenav'
import Nav from 'rsuite/lib/Nav'
import Button from 'rsuite/lib/Nav'
import Icon from 'rsuite/lib/Icon'
export default function Sidebar(props) {
	return (
		<Drawer
			full
			placement={'left'}
			show={props.showMobileDrawer}
			onHide={props.closeMobileDrawer}
		>
			<Drawer.Header>
				<Drawer.Title>Drawer Title</Drawer.Title>
			</Drawer.Header>
			<Drawer.Body>test</Drawer.Body>
			<Drawer.Footer></Drawer.Footer>
		</Drawer>
	)
}
