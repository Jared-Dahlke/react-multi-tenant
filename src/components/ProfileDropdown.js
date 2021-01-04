import React from 'react'
import { connect } from 'react-redux'
import Popover from 'rsuite/lib/Popover'
import Avatar from 'rsuite/lib/Avatar'
import Grid from '@material-ui/core/Grid'
import { neutralExtraExtraLightColor } from '../assets/jss/colorContants'
import { getCurrentAccount } from '../utils'
import Whisper from 'rsuite/lib/Whisper'
import { routes } from '../routes'
import Panel from 'rsuite/lib/Panel'
import PanelGroup from 'rsuite/lib/PanelGroup'
import Button from 'rsuite/lib/Button'
import { useHistory } from 'react-router-dom'
import { setAuthToken, setLoggedIn } from '../redux/actions/auth'
import { clearSiteData } from '../redux/actions/accounts'

const mapStateToProps = (state) => {
	return { user: state.user, accounts: state.accounts }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSiteData: (accountId) => dispatch(fetchSiteData(accountId)),
		clearSiteData: () => dispatch(clearSiteData()),
		setAuthToken: (val) => dispatch(setAuthToken(val)),
		setLoggedIn: (val) => dispatch(setLoggedIn(val))
	}
}

function ProfileDropdown(props) {
	const history = useHistory()
	const handleLogOut = (props) => {
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
		props.setAuthToken(null)
		props.setLoggedIn(false)
		props.clearSiteData()
	}

	const handleProfileClick = () => {
		history.push(routes.app.settings.profile.path)
	}

	let currentAccount = React.useMemo(() => {
		let current = getCurrentAccount(props.accounts.data)
		if (!current) {
			return {}
		}
		return current
	}, [props.accounts.data])

	const handleAccountClick = () => {
		history.push(routes.app.settings.account.path)
	}

	return (
		<Whisper
			trigger='click'
			placement={'bottomEnd'}
			speaker={
				<Popover style={{ width: 400 }}>
					<PanelGroup>
						<Panel>
							<Grid container>
								<Grid item xs={6}>
									<Avatar
										style={{
											backgroundColor: neutralExtraExtraLightColor
										}}
										size={'lg'}
										circle
									>
										{props.user.userProfile.firstName.charAt(0)}
									</Avatar>
								</Grid>
								<Grid item xs={6}>
									<Grid container>
										<div style={{ fontSize: '16px' }}>
											{`${props.user.userProfile.firstName} ${props.user.userProfile.lastName}`}
										</div>
										<div
											style={{
												fontSize: '16px',
												color: neutralExtraExtraLightColor
											}}
										>
											{props.user.userProfile.email}
										</div>
										<div>
											<Button
												size={'sm'}
												block
												appearance='ghost'
												onClick={handleProfileClick}
											>
												My Profile
											</Button>
										</div>
									</Grid>
								</Grid>
							</Grid>
						</Panel>
						<Panel>
							<Button
								appearance={'link'}
								style={{ fontSize: '16px' }}
								onClick={handleAccountClick}
							>
								{currentAccount.accountName}
							</Button>
						</Panel>

						<Panel>
							<Button
								block
								appearance='ghost'
								onClick={() => {
									handleLogOut(props)
								}}
							>
								Logout
							</Button>
						</Panel>
					</PanelGroup>
				</Popover>
			}
		>
			<Avatar
				style={{
					backgroundColor: neutralExtraExtraLightColor,
					cursor: 'pointer'
				}}
				circle
			>
				{props.user.userProfile.firstName.charAt(0)}
			</Avatar>
		</Whisper>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown)
