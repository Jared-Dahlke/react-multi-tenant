/*eslint-disable no-restricted-globals*/
import React from 'react'
import GridItem from '../../../components/Grid/GridItem.js'
import GridContainer from '../../../components/Grid/GridContainer.js'
import Button from 'rsuite/lib/Button'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../routes'

function BrandProfilesAdmin(props) {
	let history = useHistory()
	const handleScenariosClick = () => {
		let url = routes.app.settings.brandProfiles.admin.scenarios.path
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
		</div>
	)
}

export default BrandProfilesAdmin
