import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import Button from 'rsuite/lib/Button'
import {
	fetchBrandProfiles,
	fetchBrandProfile,
	deleteBrandProfile,
	setBrandProfileDeleted,
	removeBrandProfile
} from '../../../redux/actions/brandProfiles.js'
import { connect } from 'react-redux'
import { FormLoader } from '../../../components/SkeletonLoader'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../routes'
import Panel from 'rsuite/lib/Panel'
import Checkbox from 'rsuite/lib/Checkbox'
import Label from '../../../components/CustomInputLabel/CustomInputLabel'
import numeral from 'numeral'

const lists = [
	{
		smartListId: 1,
		smartListName: 'TestList',
		archived: false,
		objectiveId: 1,
		objectiveName: 'Reach',
		versions: [
			{
				versionId: 1,
				createdBy: 'Eric D',
				createdDate: '202010010930',
				subscriberCount: 234,
				videoCount: 456,
				channelCount: 1,
				active: true
			},
			{
				versionId: 1,
				createdBy: 'Rob C',
				createdDate: '202010011030',
				subscriberCount: 56,
				videoCount: 5675,
				channelCount: 3,
				active: false
			}
		]
	},
	{
		smartListId: 2,
		smartListName: 'TestList2',
		archived: false,
		objectiveId: 1,
		objectiveName: 'Reach',
		versions: [
			{
				versionId: 2,
				createdBy: 'Rob C',
				createdDate: '202010011030',
				subscriberCount: 34563,
				videoCount: 34563,
				channelCount: 356,
				active: true
			},
			{
				versionId: 2,
				createdBy: 'Suzan F',
				createdDate: '202010011030',
				subscriberCount: 56,
				videoCount: 34563,
				channelCount: 5,
				active: false
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
	const history = useHistory()

	const handleUploadNewList = () => {
		history.push(routes.app.engage.lists.uploadList.path)
	}

	const ListVersion = (props) => {
		return <div key={Math.random()}>{props.version.createdBy}</div>
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
						props.list.versions.map((version, index) => {
							return <ListVersion version={version} />
						})}
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
						{lists &&
							lists.map((list, index) => <MyList list={list} key={index} />)}
					</Grid>
				) : (
					<FormLoader />
				)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
