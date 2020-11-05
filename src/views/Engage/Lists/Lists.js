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
import { routes } from '../../../routes'
import Panel from 'rsuite/lib/Panel'
import Row from 'rsuite/lib/Row'
import Col from 'rsuite/lib/Col'
import Checkbox from 'rsuite/lib/Checkbox'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const lists = [
	{
		listId: 1,
		listName: 'TestList',
		createdBy: 'Jared D',
		createdDate: '202010010830',
		archived: false,
		subscriberCount: 234,
		videoCount: 456,
		channelCount: 4,
		objectiveId: 1,
		objectiveName: 'Reach',
		versions: [
			{
				listId: 1,
				listName: 'TestList',
				versionId: 45,
				versionName: 'Test Version list name',
				createdBy: 'Eric D',
				createdDate: '202010010930',
				archived: false,
				subscriberCount: 234,
				videoCount: 456,
				channelCount: 1,
				objectiveId: 1,
				objectiveName: 'Reach'
			},
			{
				listId: 1,
				listName: 'TestList',
				versionId: 56,
				versionName: 'Test Version list name 2',
				createdBy: 'Rob C',
				createdDate: '202010011030',
				archived: false,
				subscriberCount: 56,
				videoCount: 5675,
				channelCount: 3,
				objectiveId: 2,
				objectiveName: 'Awareness'
			}
		]
	},
	{
		listId: 2,
		listName: 'TestList2',
		createdBy: 'Rob C',
		createdDate: '202010011030',
		archived: false,
		subscriberCount: 4567,
		videoCount: 45674,
		channelCount: 56,
		objectiveId: 1,
		objectiveName: 'Reach',
		versions: [
			{
				listId: 2,
				listName: 'TestList2',
				versionId: 3456,
				versionName: 'Test 35463563 list name',
				createdBy: 'Rob C',
				createdDate: '202010011030',
				archived: true,
				subscriberCount: 34563,
				videoCount: 34563,
				channelCount: 356,
				objectiveId: 1,
				objectiveName: 'Reach'
			},
			{
				listId: 2,
				listName: 'TestList2',
				versionId: 3456,
				versionName: 'Test 34563 list name 2',
				createdBy: 'Suzan F',
				createdDate: '202010011030',
				archived: false,
				subscriberCount: 56,
				videoCount: 34563,
				channelCount: 5,
				objectiveId: 1,
				objectiveName: 'Reach'
			}
		]
	}
]

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
		history.push(routes.admin.engage.lists.uploadList.path)
	}

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={12}>
				<Grid item xs={12} sm={12} md={12}>
					<Checkbox>Show archived</Checkbox>
					<Grid container justify='flex-end' style={{ marginBottom: 30 }}>
						<Button onClick={handleUploadNewList}>Upload a new list</Button>
					</Grid>
				</Grid>
				{lists && lists.length > 0 ? (
					<Grid container spacing={2} col>
						{lists &&
							lists.map((list) => (
								<Grid item xs={12}>
									<Panel
										header={
											<div>
												<Grid container>
													<Grid item xs={3}>
														{list.listName}{' '}
														<Button apearance='link'>Archive</Button>
													</Grid>
												</Grid>
											</div>
										}
										bordered
										collapsible
										//	header={list.listName}
									>
										versions: <br />
										Monday, November 3rd 2020 - Subscribers: 2342, Videos: 345,
										CHannels: 34 <Button apearance='link'>Download</Button>
										<Button apearance='link'>Archive</Button>
										<br />
										Monday, November 2rd 2020 - Subscribers: 345, Videos: 45,
										CHannels: 4<Button apearance='link'>Download</Button>
										<Button apearance='link'>Archive</Button>
										<br />
										Monday, November 1rd 2020 - Subscribers: 4563, Videos: 45,
										CHannels: 5 <Button apearance='link'>Download</Button>
										<Button apearance='link'>Archive</Button>
										<br />
									</Panel>
								</Grid>
							))}
					</Grid>
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
