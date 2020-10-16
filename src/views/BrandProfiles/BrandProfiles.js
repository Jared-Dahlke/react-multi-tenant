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
import Close from '@material-ui/icons/Close'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import {
	fetchBrandProfiles,
	deleteBrandProfile
} from '../../redux/actions/brandProfiles.js'
import { connect } from 'react-redux'
import styles from '../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import CustomAlert from '../../components/CustomAlert.js'
import Snackbar from '../../components/Snackbar/Snackbar'
import Success from '@material-ui/icons/Check'
import Error from '@material-ui/icons/Error'
import { Link } from 'react-router-dom'
import { FormLoader } from '../../components/SkeletonLoader'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		brandProfiles: state.brandProfiles,
		currentAccountId: state.currentAccountId,
		brandProfilesIsLoading: state.brandProfilesIsLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBrandProfiles: (accountId) => dispatch(fetchBrandProfiles(accountId)),
		deleteBrandProfile: (brandProfileId) =>
			dispatch(deleteBrandProfile(brandProfileId))
	}
}

function BrandProfiles(props) {
	const classes = useStyles()
	const tableClasses = useTableStyles()
	//const [deleteUserAlertIsOpen, setDeleteUserAlertIsOpen] = React.useState(false)
	//const [userToDelete, setUserToDelete] = React.useState({})

	const { fetchBrandProfiles } = props

	let currentAccountId = localStorage.getItem('currentAccountId')

	React.useEffect(() => {
		fetchBrandProfiles(currentAccountId)
	}, [fetchBrandProfiles])

	const tableCellClasses = classnames(classes.tableCell, {
		[classes.tableCellRTL]: false
	})

	const userHeaders = ['Profile Name', 'Website', '']

	const handleDeleteBrandProfileClick = (brandProfileId) => {
		props.deleteBrandProfile(brandProfileId)
	}

	return (
		<GridContainer spacing={2}>
			<CustomAlert
				open={false}
				//handleClose={handleCloseDeleteUserAlert}
				contentText={'Are you sure you want to delete this user?'}
				cancelText={'Cancel'}
				proceedText={'Yes'}
				titleText={'Delete User'}
				//handleConfirm={()=>{handleDeleteUser()}}
			/>

			<Snackbar
				place='bc'
				color='success'
				icon={Success}
				message={'User succesfully deleted'}
				//open={props.userDeleted}
			/>

			<Snackbar
				place='bc'
				color='danger'
				icon={Error}
				message={
					'There was an error deleting this user. Please try again later.'
				}
				//open={props.userDeletedError}
			/>

			<Grid container justify='flex-end'>
				<GridItem>
					{props.brandProfiles && props.brandProfiles.length > 0 ? (
						<Link
							style={{ textDecoration: 'none' }}
							to={'/admin/settings/brandProfiles/create'}
						>
							<Button color='primary'>Create New Profile</Button>
						</Link>
					) : null}
				</GridItem>
			</Grid>

			<GridItem xs={12} sm={12} md={8}>
				<Card>
					<CardBody>
						{props.brandProfiles && props.brandProfiles.length > 0 ? (
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
									{props.brandProfiles &&
										props.brandProfiles.map((profile) => (
											<TableRow
												key={profile.brandProfileId || 'placeholder'}
												className={classes.tableRow}
											>
												<TableCell className={tableCellClasses}>
													{profile.brandName}
												</TableCell>
												<TableCell className={tableCellClasses}>
													{profile.websiteUrl}
												</TableCell>

												<TableCell className={classes.tableActions}>
													{/**<Tooltip
                          id="tooltip-top"
                          title="(Edit Brand Profile"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Edit"
                            className={classes.tableActionButton}
                            disabled
                            //onClick={()=>handleEditUserClick(user)}
                          >
                            <Edit
                              className={
                                classes.tableActionButtonIcon + " " + classes.edit
                              }
                            />
                          </IconButton>
                        </Tooltip> */}

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
																handleDeleteBrandProfileClick(
																	profile.brandProfileId
																)
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
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						) : props.brandProfilesIsLoading ? (
							<FormLoader />
						) : (
							<Link
								style={{ textDecoration: 'none' }}
								to={'/admin/settings/brandProfiles/create'}
							>
								<Button color='primary'>Create New Profile</Button>
							</Link>
						)}
					</CardBody>
				</Card>
			</GridItem>
		</GridContainer>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandProfiles)
