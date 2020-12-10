/*eslint-disable no-restricted-globals*/
import React from 'react'
import Button from 'rsuite/lib/Button'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../routes'

function BrandProfilesAdmin(props) {
	let history = useHistory()

	const handleScenariosClick = () => {
		let url = routes.admin.scenarios.path
		history.push(url)
	}

	const handleOpinionsClick = () => {
		let url = routes.admin.opinions.path
		history.push(url)
	}

	const handlePermissionsClick = () => {
		let url = routes.admin.permissions.path
		history.push(url)
	}

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: 'calc(100vh - 200px)'
			}}
		>
			<Button onClick={handleScenariosClick}>Configure Scenarios</Button>
			&nbsp;
			<Button onClick={handleOpinionsClick}>Configure Opinions</Button>
			&nbsp;
			<Button onClick={handlePermissionsClick}>Configure Permissions</Button>
		</div>
	)
}

export default BrandProfilesAdmin
