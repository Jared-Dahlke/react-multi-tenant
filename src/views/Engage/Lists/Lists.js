import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import Button from 'rsuite/lib/Button'
import Divider from 'rsuite/lib/Divider'
import {
	fetchBrandProfiles,
	fetchBrandProfile,
	deleteBrandProfile,
	setBrandProfileDeleted,
	removeBrandProfile
} from '../../../redux/actions/brandProfiles.js'
import { connect } from 'react-redux'
import styles from '../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import { FormLoader } from '../../../components/SkeletonLoader'
import { UserCan, perms } from '../../../Can'
import { useHistory } from 'react-router-dom'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		brandProfiles: state.brandProfiles,
		currentAccountId: state.currentAccountId,
		brandProfilesIsLoading: state.brandProfilesIsLoading,
		brandProfileDeleted: state.brandProfileDeleted,
		scenarios: state.scenarios,
		categories: state.brandCategories,
		topics: state.topics
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBrandProfiles: (accountId) => dispatch(fetchBrandProfiles(accountId)),
		deleteBrandProfile: (brandProfileId) =>
			dispatch(deleteBrandProfile(brandProfileId)),
		removeBrandProfile: (brandProfileId) =>
			dispatch(removeBrandProfile(brandProfileId)),
		setBrandProfileDeleted: (bool) => dispatch(setBrandProfileDeleted(bool)),
		fetchBrandProfile: (brandProfileId) =>
			dispatch(fetchBrandProfile(brandProfileId))
	}
}

function Lists(props) {
	const classes = useStyles()
	const tableClasses = useTableStyles()
	const history = useHistory()

	const tableCellClasses = classnames(classes.tableCell, {
		[classes.tableCellRTL]: false
	})

	const userHeaders = ['Profile Name', 'Website', '']

	const handleUploadNewList = () => {
		history.push()
	}

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={12}>
				<Grid item xs={12} sm={12} md={12}>
					<Grid container justify='flex-end'>
						<Button onClick={handleUploadNewList}>Upload a new list</Button>
					</Grid>
				</Grid>
				{props.brandProfiles && props.brandProfiles.length > 0 ? (
					<div>
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
												<Tooltip
													id='tooltip-top'
													title='Edit Brand Profile'
													placement='top'
													classes={{ tooltip: classes.tooltip }}
												>
													<Button appearance='link'>Edit</Button>
												</Tooltip>
												<div
													style={{
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												>
													<Divider vertical />
												</div>
												<UserCan i={perms.BRAND_PROFILE_DELETE}>
													<Tooltip
														id='tooltip-top-start'
														title='Remove'
														placement='top'
														classes={{ tooltip: classes.tooltip }}
													>
														<Button color='yellow' appearance='link'>
															Remove
														</Button>
													</Tooltip>
												</UserCan>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>
				) : props.brandProfilesIsLoading ? (
					<FormLoader />
				) : (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',

							height: 'calc(100vh - 200px)',
							color: 'white'
						}}
					>
						<Button
							disabled
							//	color='primary'
							//	onClick={handleCreateNewProfileClick}
						>
							Create New List
						</Button>
					</div>
				)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
