import React from 'react'
import Panel from 'rsuite/lib/Panel'
import Grid from '@material-ui/core/Grid'
import Button from 'rsuite/lib/Button'
import Message from 'rsuite/lib/Message'
import { Link } from 'react-router-dom'
import { modifiedRoutes } from '../../../../routes'
import { dangerColor } from '../../../../assets/jss/material-dashboard-react'
import ButtonToolbar from 'rsuite/lib/ButtonToolbar'

export default function Summary(props) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				color: 'white',
				width: '100%'
			}}
		>
			<Message
				showIcon
				style={{ width: '100%' }}
				type='success'
				title={'Looks good!'}
				description={
					<>
						<Grid container align='center'>
							<Grid item xs={12}>
								<h2>{props.values.basicInfoProfileName}</h2>

								<ButtonToolbar>
									<Button
										onClick={() => props.handleCreateClick(props.values)}
										loading={props.brandProfileCreating}
										disabled={props.brandProfileCreating || props.createClicked}
									>
										Create
									</Button>
									{props.createClicked && (
										<Button
											onClick={() => props.handleExitClick()}
											disabled={props.brandProfileCreating}
										>
											Exit
										</Button>
									)}
								</ButtonToolbar>
							</Grid>
						</Grid>
					</>
				}
			/>
		</div>
	)
}
