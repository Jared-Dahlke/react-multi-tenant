import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from 'rsuite/lib/Button'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import { login } from '../redux/actions/auth.js'
import adminStyle from '../assets/jss/material-dashboard-react/layouts/adminStyle'
import { whiteColor } from '../assets/jss/material-dashboard-react.js'
import CustomInput from '../components/CustomInput/CustomInput'
import svgLogo from '../assets/img/sightly-logo.svg'
import { logoStyle } from '../assets/jss/material-dashboard-react'
import { routes } from '../routes'
import { useSpring, animated } from 'react-spring'

const mapStateToProps = (state) => {
	return {
		authToken: state.authToken,
		isLoggedIn: state.isLoggedIn,
		alert: state.alert,
		loggingIn: state.loggingIn
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (credentials) => dispatch(login(credentials))
	}
}

const useStyles = makeStyles((theme) => ({
	paper: {
		paddingTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	input: {
		color: whiteColor
	}
}))
const useAdminStyles = makeStyles(adminStyle)

function Login(props) {
	const [flipped, set] = React.useState(false)
	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 1,
		transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
		config: { mass: 40, tension: 500, friction: 80 }
	})

	React.useEffect(() => {
		setTimeout(() => {
			set(true)
		}, 0)
	}, [])

	const classes = useStyles()
	const adminClasses = useAdminStyles()
	let referer = props.location.state
		? props.location.state.referer
		: routes.app.settings.brandMentality.path

	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')

	const postLogin = () => {
		let credentials = {
			username: userName,
			password: password
		}
		props.login(credentials)
	}

	if (props.isLoggedIn) {
		return <Redirect to={referer} />
	}

	return (
		<div className={adminClasses.authPanel}>
			<Container maxWidth='xs'>
				<div className={classes.paper}>
					<animated.div
						style={{
							opacity,
							transform: transform.interpolate((t) => `${t} rotateX(180deg)`)
						}}
					>
						<img src={svgLogo} alt='logo' style={logoStyle} />
					</animated.div>

					<form className={classes.form} noValidate>
						<CustomInput
							labelText='Email address'
							id='email-address'
							formControlProps={{
								fullWidth: true
							}}
							inputProps={{
								type: 'email',
								value: userName,
								onChange: (e) => setUserName(e.target.value)
							}}
							handleClear={() => setUserName('')}
						/>

						<CustomInput
							labelText='Password'
							id='password'
							formControlProps={{
								fullWidth: true
							}}
							inputProps={{
								type: 'password',
								value: password,
								onChange: (e) => setPassword(e.target.value),
								autoComplete: 'current-password'
							}}
							handleClear={() => setPassword('')}
						/>

						<Button
							onClick={postLogin}
							disabled={props.loggingIn}
							style={{ marginTop: '10px', width: '100%' }}
							loading={props.loggingIn}
						>
							Sign In
						</Button>

						<Grid style={{ marginTop: '10px' }} container>
							<Grid item xs>
								<Link to='/resetPassword' style={{ color: whiteColor }}>
									Forgot password?
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</div>
	)
}

const MyLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default MyLogin
