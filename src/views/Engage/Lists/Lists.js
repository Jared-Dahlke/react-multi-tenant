import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import Button from 'rsuite/lib/Button'
import { connect } from 'react-redux'
import { FormLoader } from '../../../components/SkeletonLoader'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../routes'
import Panel from 'rsuite/lib/Panel'
import Checkbox from 'rsuite/lib/Checkbox'
import Label from '../../../components/CustomInputLabel/CustomInputLabel'
import numeral from 'numeral'
import Icon from 'rsuite/lib/Icon'
import IconButton from 'rsuite/lib/IconButton'
import {
	fetchLists,
	archiveList,
	downloadExcelList,
	activateListVersion
} from '../../../redux/actions/engage/lists'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import { neutralLightColor } from '../../../assets/jss/colorContants.js'
import { getCurrentAccount } from '../../../utils'
import { whiteColor } from '../../../assets/jss/material-dashboard-react.js'
import { useTransition, animated } from 'react-spring'
import ButtonToolbar from 'rsuite/lib/ButtonToolbar'
import InputPicker from 'rsuite/lib/InputPicker'
var dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

const mapStateToProps = (state) => {
	return {
		lists: state.engage.lists,
		accounts: state.accounts,
		brandProfiles: state.brandProfiles,
		isFetchingLists: state.engage.isFetchingLists,
		fetchListsSuccess: state.engage.fetchListsSuccess,
		isDownloadingExcel: state.engage.isDownloadingExcel,
		isDownloadingExcelVersionId: state.engage.isDownloadingExcelVersionId
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLists: (accountId) => dispatch(fetchLists(accountId)),
		archiveList: (payload) => dispatch(archiveList(payload)),
		downloadExcelList: (payload) => dispatch(downloadExcelList(payload)),
		activateListVersion: (payload) => dispatch(activateListVersion(payload))
	}
}

const panelStyle = {
	border: '1px solid #565656',
	borderRadius: '6px',
	height: 100,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
}
const panelActionStyle = {
	border: '1px solid #565656',
	borderRadius: '6px',
	height: 100
}

const MyList = (props) => {
	let activeVersion = {}
	for (const version of props.list.versions) {
		if (version.active) activeVersion = version
	}
	return (
		<Panel
			style={{ backgroundColor: neutralLightColor, marginBottom: 20 }}
			shaded
			header={
				<Version
					data={activeVersion}
					handleArchiveClick={props.handleArchiveClick}
					handleDownloadClick={props.handleDownloadClick}
					isDownloadingExcel={props.isDownloadingExcel}
					isDownloadingExcelVersionId={props.isDownloadingExcelVersionId}
					handleEditClick={props.handleEditClick}
				/>
			}
			bordered
		>
			{props.viewAll.includes(props.list.smartListId) &&
				props.list.versions &&
				props.list.versions.length > 0 &&
				props.list.versions.map((version, index) => {
					if (!version.active) {
						return (
							<div
								style={{ paddingBottom: 20 }}
								key={version.smartListId + version.versionId}
							>
								<Version
									data={version}
									handleDownloadClick={props.handleDownloadClick}
									handleActivateClick={props.handleActivateClick}
									isDownloadingExcel={props.isDownloadingExcel}
									isDownloadingExcelVersionId={
										props.isDownloadingExcelVersionId
									}
									handleEditClick={props.handleEditClick}
								/>
							</div>
						)
					}
				})}
			<div style={{ paddingBottom: 20 }}>
				<div style={{ float: 'left' }}>
					<Checkbox
						checked={props.list.archived}
						onChange={(e, value) => {
							props.handleArchiveClick(props.list.smartListId, value)
						}}
					>
						Archived
					</Checkbox>
				</div>
				{props.viewAll.includes(props.list.smartListId) && (
					<Button
						appearance='link'
						onClick={() => props.handleHideAllClick(props.list.smartListId)}
						style={{ float: 'right' }}
					>
						View less
					</Button>
				)}

				{props.list.versions.length > 1 &&
					!props.viewAll.includes(props.list.smartListId) && (
						<Button
							appearance='link'
							onClick={() => props.handleViewAllClick(props.list.smartListId)}
							style={{ float: 'right' }}
						>
							View version history
						</Button>
					)}
			</div>
		</Panel>
	)
}

const Version = (props) => {
	let subscriberCount =
		props.data.subscriberCount > 999999
			? numeral(props.data.subscriberCount)
					.format('0.0a')
					.toUpperCase()
			: numeral(props.data.subscriberCount).format('0.0a')

	let videoCount = numeral(props.data.videoCount).format('0a')
	let channelCount = numeral(props.data.channelCount).format('0a')

	var createdDate = dayjs(props.data.createdDate).calendar()

	return (
		<div>
			<Grid container alignItems='center' spacing={1}>
				<Grid item xs={12} sm={12} md={7} style={panelStyle}>
					<Grid container style={{ position: 'relative' }}>
						<Grid item xs={4}>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Label label={'Name'} />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid
									container
									justify='center'
									style={{ textAlign: 'center' }}
								>
									{props.data.smartListId}
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={4}>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Label label={'Objective'} />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid
									container
									justify='center'
									style={{ textAlign: 'center' }}
								>
									{props.data.objectiveName}
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={4}>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Label label={'Status'} />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<div style={{ color: props.data.active ? 'green' : 'red' }}>
										{props.data.active ? 'Active' : 'Inactive'}
									</div>
								</Grid>
							</Grid>
						</Grid>

						<div style={{ position: 'absolute', bottom: -30, left: 5 }}>
							<Label label={props.data.createdBy.email + ', ' + createdDate} />
						</div>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={12} md={3} style={panelStyle}>
					<Grid container>
						<Grid item xs={4}>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Icon size='lg' icon='tv' />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Label label={'Channels'} />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify='center'>
									{channelCount}
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={4}>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Icon size='lg' icon='youtube-play' />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Label label={'Videos'} />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify='center'>
									{videoCount}
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={4}>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Icon size='lg' icon='group' />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Label label={'Subscribers'} />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify='center'>
									{subscriberCount}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{props.data.active && (
					<Grid item xs={12} sm={12} md={2} style={panelStyle}>
						<ButtonGroup vertical block style={{ width: '100%' }}>
							<IconButton
								appearance='ghost'
								icon={<Icon icon={'file-download'} size='lg' />}
								size='sm'
								block
								loading={
									props.isDownloadingExcel &&
									props.isDownloadingExcelVersionId === props.data.versionId
								}
								onClick={(e) => {
									props.handleDownloadClick(
										props.data.versionId,
										props.data.smartListName
									)
								}}
							>
								Download
							</IconButton>
							<IconButton
								appearance='ghost'
								icon={<Icon icon={'file-download'} size='lg' />}
								size='sm'
								block
								onClick={() => props.handleEditClick(props.data)}
							>
								Edit
							</IconButton>
						</ButtonGroup>
					</Grid>
				)}
				{!props.data.active && (
					<Grid item xs={2} style={panelActionStyle}>
						<Grid item xs={12}>
							<ButtonGroup vertical block style={{ width: '100%' }}>
								<IconButton
									appearance='ghost'
									icon={<Icon icon={'file-download'} size='lg' />}
									size='lg'
									block
									loading={
										props.isDownloadingExcel &&
										props.isDownloadingExcelVersionId === props.data.versionId
									}
									onClick={(e) => {
										props.handleDownloadClick(
											props.data.versionId,
											props.data.smartListName
										)
									}}
								>
									Download
								</IconButton>

								<IconButton
									block
									appearance='ghost'
									icon={<Icon icon={'file-download'} size='lg' />}
									size='lg'
									onClick={(e) => {
										props.handleActivateClick({
											versionId: props.data.versionId,
											smartListId: props.data.smartListId
										})
									}}
								>
									Activate
								</IconButton>
							</ButtonGroup>
						</Grid>
					</Grid>
				)}
			</Grid>
		</div>
	)
}

function Lists(props) {
	const history = useHistory()
	const [viewArchivedLists, setViewArchivedLists] = React.useState(false)
	const [brandProfileId, setBrandProfileId] = React.useState(null)

	let fetchLists = props.fetchLists
	let accounts = props.accounts.data

	React.useEffect(() => {
		let currentAccount = getCurrentAccount(props.accounts.data)
		if (currentAccount) {
			fetchLists(currentAccount.accountId)
		}
	}, [fetchLists, accounts])

	const handleUploadNewList = () => {
		history.push(routes.app.engage.lists.uploadList.path)
	}
	const handleCreateNewList = () => {
		history.push(`${routes.app.engage.lists.createList.path}`, {
			from: 'lists'
		})
	}
	//let subscribers = numeral(item.channelSubscribers).format('0.0a')
	const [viewingAll, setViewingAll] = React.useState([])
	const handleViewAllClick = (smartListId) => {
		setViewingAll([...viewingAll, smartListId])
	}

	const handleHideAllClick = (smartListId) => {
		let newArr = viewingAll.filter((id) => id !== smartListId)
		setViewingAll(newArr)
	}

	const handleArchiveClick = (smartListId, archive) => {
		const payload = {
			smartListId: smartListId,
			archive: archive
		}
		props.archiveList(payload)
	}

	const handleDownloadClick = (versionId, smartListName) => {
		let payload = {
			versionId,
			smartListName
		}
		props.downloadExcelList(payload)
	}

	const handleActivateClick = (payload) => {
		props.activateListVersion(payload)
	}

	const handleEditClick = (item) => {
		history.push(routes.app.engage.lists.listBuilder.path, {
			from: 'lists',
			createdListVersion: props.createdListVersion
		})
	}

	const archivedCount = React.useMemo(() => {
		let _archivedCount = 0
		for (const list of props.lists) {
			if (list.archived) ++_archivedCount
		}
		return _archivedCount
	}, [props.lists])

	const visibleLists = React.useMemo(() => {
		if (viewArchivedLists) {
			if (brandProfileId) {
				return props.lists.filter(
					(list) => list.brandProfileId === brandProfileId
				)
			} else {
				return props.lists
			}
		} else {
			if (brandProfileId) {
				return props.lists.filter(
					(list) => !list.archived && list.brandProfileId === brandProfileId
				)
			} else {
				return props.lists.filter((list) => !list.archived)
			}
		}
	}, [viewArchivedLists, props.lists, brandProfileId])

	const transition = useTransition(visibleLists, {
		from: {
			opacity: 0,
			maxHeight: `600px`
		},
		enter: { opacity: 1, transform: `translateY(0px)` },
		leave: {
			opacity: 0,
			maxHeight: `0px`
		},
		keys: visibleLists.map((item, index) => item.smartListId)
	})

	//	const tableTransitionProps = useSpring({ opacity: 1, from: { opacity: 0 } })

	if (props.isFetchingLists) {
		return <FormLoader />
	}

	return (
		<Grid container justify='center'>
			<Grid item xs={12} sm={12} md={5}>
				<Grid container justify='flex-start' style={{ marginBottom: 20 }}>
					<Grid item style={{ position: 'relative' }}>
						<div style={{ position: 'absolute', top: -20, left: 0 }}>
							<p>Brand Profile</p>
						</div>
						<InputPicker
							size='lg'
							id='brandProfileId'
							label='Brand Profile'
							placeholder='Select a BrandProfile'
							labelKey='brandName'
							valueKey='brandProfileId'
							data={props.brandProfiles}
							value={brandProfileId}
							onChange={(val) => setBrandProfileId(val)}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={12} md={7}>
				<Grid
					container
					justify='flex-end'
					spacing={2}
					style={{ marginBottom: 20 }}
				>
					<Grid item>
						{archivedCount > 0 && (
							<Checkbox
								checked={viewArchivedLists}
								onChange={(e, val) => {
									setViewArchivedLists(val)
								}}
							>
								View archived
							</Checkbox>
						)}
					</Grid>
					<Grid item>
						<ButtonToolbar>
							<Button onClick={() => handleCreateNewList()} color='green'>
								Build New SmartList
							</Button>
							<Button onClick={handleUploadNewList}>Upload Excel/CSV</Button>
						</ButtonToolbar>
					</Grid>
				</Grid>
			</Grid>
			{visibleLists &&
				visibleLists.length > 0 &&
				!props.isFetchingLists &&
				transition((values, item) => {
					let list = item
					let key = item.smartListId
					return (
						<Grid item xs={12} key={key}>
							<animated.div style={values}>
								<MyList
									list={list}
									handleViewAllClick={handleViewAllClick}
									handleHideAllClick={handleHideAllClick}
									handleArchiveClick={handleArchiveClick}
									handleDownloadClick={handleDownloadClick}
									handleActivateClick={handleActivateClick}
									handleEditClick={handleEditClick}
									isDownloadingExcel={props.isDownloadingExcel}
									isDownloadingExcelVersionId={
										props.isDownloadingExcelVersionId
									}
									viewAll={viewingAll}
								/>
							</animated.div>
						</Grid>
					)
				})}

			{!props.isFetchingLists &&
				props.fetchListsSuccess &&
				props.lists.length < 1 && (
					<h2 style={{ color: whiteColor }}>
						This account currently has no lists associated with it.
					</h2>
				)}
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
