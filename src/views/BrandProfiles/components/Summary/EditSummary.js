import React from 'react'
import Panel from 'rsuite/lib/Panel'
import Grid from '@material-ui/core/Grid'
import Message from 'rsuite/lib/Message'
import { Link } from 'react-router-dom'
import { modifiedRoutes } from '../../../../routes'

export default function Summary(props) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',

				height: '100%',
				color: 'white'
			}}
		>
			{!props.dirty ? (
				<Message
					showIcon
					type='success'
					title={'Looks good!'}
					description={
						<>
							<h2>{props.values.basicInfoProfileName}</h2>
							<p>
								{'Now you can '}
								<Link to={modifiedRoutes.app.subRoutes.engage.path}>
									{'go to Smartlists '}
								</Link>
								or
								<Link
									to={modifiedRoutes.app.subRoutes.settings_brandProfiles.path}
								>
									{' view your brand profiles'}
								</Link>
							</p>
						</>
					}
				/>
			) : (
				<Message
					showIcon
					type='warning'
					title={'Unsaved changes'}
					description={
						<>
							<h2>{props.values.basicInfoProfileName}</h2>
							<p>
								{'Some of your changes were not saved; However, you can still '}
								<Link to={modifiedRoutes.app.subRoutes.engage.path}>
									{'go to Smartlists '}
								</Link>
								or
								<Link
									to={modifiedRoutes.app.subRoutes.settings_brandProfiles.path}
								>
									{' view your brand profiles'}
								</Link>
							</p>
						</>
					}
				/>
			)}
		</div>
	)
}
