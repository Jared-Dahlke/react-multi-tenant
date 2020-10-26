import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../components/Grid/GridItem.js'
import Button from '../../components/CustomButtons/Button.js'
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
import { useHistory } from 'react-router-dom'
import {
	fetchBrandProfiles,
	fetchBrandProfile,
	deleteBrandProfile,
	setBrandProfileDeleted,
	fetchBrandScenarios,
	fetchBrandIndustryVerticals,
	fetchBrandTopics,
	fetchBrandCategories,
	setBrandProfileBasicInfo,
	setBrandProfileCompetitors,
	setCurrentBrandProfile,
	addBrandProfile
} from '../../redux/actions/brandProfiles.js'
import { connect } from 'react-redux'
import styles from '../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'
import { FormLoader } from '../../components/SkeletonLoader'
import Edit from '@material-ui/icons/Edit'
import { brandProfileModel } from './Model'

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
		setBrandProfileDeleted: (bool) => dispatch(setBrandProfileDeleted(bool)),
		fetchBrandProfile: (brandProfileId) =>
			dispatch(fetchBrandProfile(brandProfileId)),
		fetchBrandScenarios: () => dispatch(fetchBrandScenarios()),
		fetchBrandIndustryVerticals: () => dispatch(fetchBrandIndustryVerticals()),
		fetchBrandTopics: () => dispatch(fetchBrandTopics()),
		fetchBrandCategories: () => dispatch(fetchBrandCategories()),
		setBrandProfileCompetitors: (arr) =>
			dispatch(setBrandProfileCompetitors(arr)),
		setBrandProfileBasicInfo: (obj) => dispatch(setBrandProfileBasicInfo(obj)),
		setCurrentBrandProfile: (brandProfileId) =>
			dispatch(setCurrentBrandProfile(brandProfileId)),
		addBrandProfile: (brandProfile) => dispatch(addBrandProfile(brandProfile))
	}
}

function BrandProfiles(props) {
	let history = useHistory()
	let fetchBrandScenarios = props.fetchBrandScenarios
	let fetchBrandIndustryVerticals = props.fetchBrandIndustryVerticals
	let fetchBrandTopics = props.fetchBrandTopics
	let fetchBrandCategories = props.fetchBrandCategories
	let setBrandProfileBasicInfo = props.setBrandProfileBasicInfo
	let setBrandProfileCompetitors = props.setBrandProfileCompetitors
	React.useEffect(() => {
		fetchBrandScenarios()
		fetchBrandIndustryVerticals()
		fetchBrandTopics()
		fetchBrandCategories()
		setBrandProfileBasicInfo({
			twitterProfileUrl: '',
			websiteUrl: '',
			brandName: '',
			industryVerticalId: ''
		})
		setBrandProfileCompetitors([])
	}, [
		fetchBrandScenarios,
		fetchBrandIndustryVerticals,
		fetchBrandTopics,
		fetchBrandCategories
	])
	const classes = useStyles()
	const tableClasses = useTableStyles()

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

	const handleEditBrandProfileClick = (profile) => {
		//let brandProfileId = profile.brandProfileId
		props.setCurrentBrandProfile(profile.brandProfileId)
		let url = `/admin/settings/brandProfiles/edit`
		history.push(url)
	}

	const handleCreateNewProfileClick = () => {
		// create new brand profile in state and set it as current
		brandProfileModel.scenarios = props.scenarios
		brandProfileModel.topics = props.topics
		brandProfileModel.categories = props.categories
		props.addBrandProfile(brandProfileModel)
		props.setCurrentBrandProfile(brandProfileModel.brandProfileId)
		let url = `/admin/settings/brandProfiles/create`
		history.push(url)
	}

	return (
		<Grid container justify='center'>
			<Snackbar
				autoHideDuration={2000}
				place='bc'
				open={props.brandProfileDeleted}
				onClose={() => props.setBrandProfileDeleted(false)}
				color='success'
			>
				<Alert
					onClose={() => props.setBrandProfileDeleted(false)}
					severity='success'
				>
					Brand profile deleted
				</Alert>
			</Snackbar>

			<GridItem xs={12} sm={12} md={6}>
				{props.brandProfiles && props.brandProfiles.length > 0 ? (
					<div>
						<Button color='primary' onClick={handleCreateNewProfileClick}>
							Create New Profile
						</Button>

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
													<IconButton
														aria-label='Edit'
														className={classes.tableActionButton}
														onClick={() => handleEditBrandProfileClick(profile)}
														onMouseEnter={() =>
															props.fetchBrandProfile(profile.brandProfileId)
														}
														//disabled={
														//	!profile.topics ||
														//	!profile.categories ||
														//	!profile.scenarios
														//}
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
						<Link
							style={{ textDecoration: 'none', alignSelf: 'right' }}
							to={'/admin/settings/brandProfiles/create'}
						>
							<Button color='primary'>Create New Profile</Button>
						</Link>
					</div>
				)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandProfiles)
