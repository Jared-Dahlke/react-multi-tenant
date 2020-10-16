import React, { useState } from 'react'
// import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import CustomInput from '../components/CustomInput/CustomInput'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import { setAlert, changePassword } from '../redux/actions/auth'
import Snackbar from '@material-ui/core/Snackbar'
import AddAlert from '@material-ui/icons/AddAlert'
import Alert from '@material-ui/lab/Alert'
import adminStyle from '../assets/jss/material-dashboard-react/layouts/adminStyle'
import Button from '../components/CustomButtons/Button'
import logo from '../assets/img/sightly-logo.svg'
import { logoStyle } from '../assets/jss/material-dashboard-react'

// Validation
import * as v from '../validations'
import CustomPassword from '../components/CustomPasswordRequirements/CustomPasswordRequirements.js'
import CustomPasswordMatchChecker from '../components/CustomPasswordRequirements/CustomPasswordMatchChecker'

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
		alert: state.alert
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changePassword: (password, userId, token) =>
			dispatch(changePassword(password, userId, token)),
		setAlert: (alert) => dispatch(setAlert(alert))
	}
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

const useAdminStyles = makeStyles(adminStyle)

function PasswordChange(props) {
	const { userId, token } = props
	const classes = useStyles()
	const adminClasses = useAdminStyles()
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')

	async function postChangePassword() {
		if (password === password_confirmation) {
			props.changePassword(password, userId, token)
		} else {
			props.setAlert({
				show: true,
				message: 'Passwords do not match.',
				severity: 'error'
			})
			setTimeout(() => {
				props.setAlert({ show: false })
			}, 5000)
		}
	}

	const passwordIsValid = () => {
		let isValid = true
		for (var prop of v.invalidPasswordObject(password)) {
			if (!prop.satisfied) {
				isValid = false
				break
			}
		}
		if (password === password_confirmation) return isValid
		else return false
	}

	if (props.isLoggedIn) {
		return <Redirect to='./admin/settings/brandMentality' />
	}

	return (
		<div className={adminClasses.authPanel}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<img src={logo} alt='logo' style={logoStyle} />

					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<CustomInput
									labelText='Password'
									id='password'
									name='password'
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
							</Grid>

							<Grid item xs={12}>
								<CustomInput
									labelText='Password'
									id='password_confirmation'
									name='password_confirmation'
									formControlProps={{
										fullWidth: true
									}}
									inputProps={{
										type: 'password',
										value: password_confirmation,
										onChange: (e) => setPasswordConfirmation(e.target.value),
										autoComplete: 'password_confirmation'
									}}
									handleClear={() => setPasswordConfirmation('')}
								/>
							</Grid>
						</Grid>

						<Grid item xs={12}>
							<CustomPassword password={password} />
							<CustomPasswordMatchChecker
								password={password}
								password_confirmation={password_confirmation}
							/>
						</Grid>

						<Button
							color='primary'
							disabled={!passwordIsValid()}
							onClick={postChangePassword}
							fullWidth={true}
							style={{ marginTop: '10px' }}
						>
							Change Password
						</Button>

						<Snackbar
							autoHideDuration={5000}
							place='bc'
							icon={AddAlert}
							open={props.alert.show}
							onClose={() => props.setAlert({ show: false })}
						>
							<Alert severity={props.alert.severity}>
								{props.alert.message}
							</Alert>
						</Snackbar>
					</form>
				</div>
			</Container>
		</div>
	)
}

const ChangePassword = connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordChange)

export default ChangePassword
