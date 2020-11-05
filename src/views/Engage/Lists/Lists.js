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
import Label from '../../../components/CustomInputLabel/CustomInputLabel'
import numeral from 'numeral'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const lists = [
	{
		listId: 1,
		listName: 'My very first list',
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
				archived: true,
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
		listName: 'A 2nd list',
		//	createdBy: 'Rob C',
		//	createdDate: '202010011030',
		//archived: true,
		//subscriberCount: 4567,
		//videoCount: 45674,
		//channelCount: 56,
		//	objectiveId: 1,  // if you can only assign objectives at the list level
		//	objectiveName: 'Reach',

		// 1 can differnt versions of the same list have differnt objectives? (engineering recommends yes if we think the users will always want to keep versions the same objective for sure)
		// 2 if im asigned to account A and so is John, and John creates a list in account A, should I autmotically be able to see that list?
		// if not, do we need to give users the ability to assign users to lists (engineering recommends for v0 that all users under an account can view/edit all lists. However in a future version we can let users give users access to specific lists)
		// 3 can users archive a list and a version? (engineering recommends allowing uses to archive both lists and versions to give user full control. However one version must always be active, if a user wants to archive all versions they should just archive the list instead.)

		versions: [
			{
				active: true,
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
				active: false,
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
		history.push(routes.app.engage.lists.uploadList.path)
	}

	const ListVersion = (props) => {
		return <div>{props.versions.listName}</div>
	}

	const MyList = (props) => {
		return (
			<Grid item xs={12}>
				<Panel
					header={
						<div>
							<ListVersion version={props.list.versions[0]} />
						</div>
					}
					bordered
					collapsible
				>
					{props.list.versions &&
						props.list.versions.length > 0 &&
						props.list.versions.map((version) => {
							return <ListVersion version={version} />
						})}
					<Checkbox>Show archived</Checkbox>
					<Label label='Other versions' />
					Monday, November 3rd 2020 - Subscribers: 2342, Videos: 345, CHannels:
					34 <Button appearance='link'>Download to Excel</Button>
					<Button appearance='link'>Make this the active version</Button>
					<Button appearance='link'>Unarchive this version</Button>
					<br />
					Monday, November 2rd 2020 - Subscribers: 345, Videos: 45, CHannels: 4{' '}
					<Button appearance='link'>Download to Excel</Button>
					<Button appearance='link'>Make this the active version</Button>
					<Button appearance='link'>Archive/Hide this version</Button>
					<br />
					Monday, November 1rd 2020 - Subscribers: 4563, Videos: 45, CHannels: 5{' '}
					<Button appearance='link'>Download to Excel</Button>
					<Button appearance='link'>Make this the active version</Button>
					<Button appearance='link'>Archive/Hide this version</Button>
					<br />
				</Panel>
			</Grid>
		)
	}

	//let subscribers = numeral(item.channelSubscribers).format('0.0a')

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={12}>
				<Grid item xs={12} sm={12} md={12}>
					<Grid container justify='flex-end' style={{ marginBottom: 30 }}>
						<Button onClick={handleUploadNewList}>Upload a new list</Button>
					</Grid>
				</Grid>
				{lists && lists.length > 0 ? (
					<Grid container spacing={2} col>
						{lists && lists.map((list) => <MyList list={list} />)}
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
