import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import Edit from '@material-ui/icons/Edit'
import Close from '@material-ui/icons/Close'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import {
	usersFetchData,
	deleteUser,
	fetchUserAccounts
} from '../../redux/actions/users.js'
import { connect } from 'react-redux'
import styles from '../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import { useHistory } from 'react-router-dom'
import CustomAlert from '../../components/CustomAlert.js'
import Snackbar from '../../components/Snackbar/Snackbar'
import Success from '@material-ui/icons/Check'
import Error from '@material-ui/icons/Error'
import { Link } from 'react-router-dom'
import { whiteColor } from '../../assets/jss/material-dashboard-react.js'
import { FormLoader } from '../../components/SkeletonLoader'
import { UserCan, perms } from '../../Can'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		users: state.users.data,
		hasErrored: state.usersHasErrored,
		userDeleted: state.userDeleted,
		userDeletedError: state.userDeletedError,
		currentAccount: state.currentAccount,
		usersIsLoading: state.usersIsLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsersData: (currentAccountId) =>
			dispatch(usersFetchData(currentAccountId)),
		deleteUser: (userId) => dispatch(deleteUser(userId)),
		fetchUserAccounts: (userId) => dispatch(fetchUserAccounts(userId))
	}
}

function Users(props) {
	let history = useHistory()
	const classes = useStyles()
	const tableClasses = useTableStyles()
	const [deleteUserAlertIsOpen, setDeleteUserAlertIsOpen] = React.useState(
		false
	)
	const [userToDelete, setUserToDelete] = React.useState({})

	const { fetchUsersData } = props

	const currentAccountId = localStorage.getItem('currentAccountId')

	React.useEffect(() => {
		fetchUsersData(currentAccountId)
	}, [fetchUsersData])

	const tableCellClasses = classnames(classes.tableCell, {
		[classes.tableCellRTL]: false
	})

	const userHeaders = ['First Name', 'Last Name', 'Company', 'Email', '']

	const handleEditUserClick = (user) => {
		let url = `/app/settings/users/edit/${user.userId}`
		history.push(url)
	}

	const handleDeleteUserClick = (user) => {
		handleOpenDeleteUserAlert(user)
		setUserToDelete(user)
	}

	const handleCloseDeleteUserAlert = () => {
		setDeleteUserAlertIsOpen(false)
		setUserToDelete({})
	}

	const handleOpenDeleteUserAlert = () => {
		setDeleteUserAlertIsOpen(true)
	}

	const handleDeleteUser = () => {
		setDeleteUserAlertIsOpen(false)
		props.deleteUser(userToDelete.userId)
		setUserToDelete({})
	}

	return (
		<GridContainer spacing={2}>
			<CustomAlert
				open={deleteUserAlertIsOpen}
				handleClose={handleCloseDeleteUserAlert}
				contentText={'Are you sure you want to delete this user?'}
				cancelText={'Cancel'}
				proceedText={'Yes'}
				titleText={'Delete User'}
				handleConfirm={() => {
					handleDeleteUser()
				}}
			/>

			<Snackbar
				place='bc'
				color='success'
				icon={Success}
				message={'User succesfully deleted'}
				open={props.userDeleted}
			/>

			<Snackbar
				place='bc'
				color='danger'
				icon={Error}
				message={
					'There was an error deleting this user. Please try again later.'
				}
				open={props.userDeletedError}
			/>

			<Grid container justify='flex-end'>
				<GridItem>
					<UserCan do={perms.USER_CREATE}>
						<Link
							style={{ textDecoration: 'none' }}
							to={'/app/settings/users/create'}
						>
							<Button color='primary'>Create New User</Button>
						</Link>
					</UserCan>
				</GridItem>
			</Grid>

			<GridItem xs={12} sm={12} md={12}>
				<Card>
					<CardBody>
						{props.users && props.users.length > 0 && !props.usersIsLoading ? (
							<Table className={classes.table}>
								<TableHead className={tableClasses['primaryTableHeader']}>
									<TableRow className={tableClasses.tableHeadRow}>
										{userHeaders.map((prop, key) => {
											return (
												<TableCell
													className={
														tableClasses.tableCell +
														' ' +
														tableClasses.tableHeadCell
													}
													key={key}
												>
													{prop}
												</TableCell>
											)
										})}
									</TableRow>
								</TableHead>

								<TableBody>
									{props.users &&
										props.users.length > 0 &&
										props.users.map((user) => (
											<TableRow key={user.userId} className={classes.tableRow}>
												<TableCell className={tableCellClasses}>
													{user.firstName}
												</TableCell>
												<TableCell className={tableCellClasses}>
													{user.lastName}
												</TableCell>
												<TableCell className={tableCellClasses}>
													{user.company}
												</TableCell>
												<TableCell className={tableCellClasses}>
													{user.email}
												</TableCell>

												<TableCell className={classes.tableActions}>
													<Tooltip
														id='tooltip-top'
														title='Edit User'
														placement='top'
														classes={{ tooltip: classes.tooltip }}
														onMouseEnter={() =>
															props.fetchUserAccounts(user.userId)
														}
													>
														<IconButton
															aria-label='Edit'
															className={classes.tableActionButton}
															onClick={() => handleEditUserClick(user)}
														>
															<Edit
																className={
																	classes.tableActionButtonIcon +
																	' ' +
																	classes.edit
																}
															/>
														</IconButton>
													</Tooltip>
													<UserCan do={perms.USER_DELETE}>
														<Tooltip
															id='tooltip-top-start'
															title='Remove'
															placement='top'
															classes={{ tooltip: classes.tooltip }}
														>
															<IconButton
																aria-label='Close'
																className={classes.tableActionButton}
																onClick={() => {
																	handleDeleteUserClick(user)
																}}
															>
																<Close
																	className={
																		classes.tableActionButtonIcon +
																		' ' +
																		classes.close
																	}
																/>
															</IconButton>
														</Tooltip>
													</UserCan>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						) : props.usersIsLoading ? (
							<FormLoader />
						) : (
							<h2 style={{ color: whiteColor }}>
								{'This account'} has no users directly linked to it; however,
								users linked to any of its parent accounts will have access to
								this account.
							</h2>
						)}
					</CardBody>
				</Card>
			</GridItem>
		</GridContainer>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
