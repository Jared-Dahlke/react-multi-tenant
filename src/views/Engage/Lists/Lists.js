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
import { fetchLists, archiveList } from '../../../redux/actions/engage/lists'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import { neutralLightColor } from '../../../assets/jss/colorContants.js'
import { getCurrentAccount } from '../../../utils'

const mapStateToProps = (state) => {
	return {
		lists: state.engage.lists,
		accounts: state.accounts,
		isFetchingLists: state.engage.isFetchingLists,
		fetchListsSuccess: state.engage.fetchListsSuccess
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLists: (accountId) => dispatch(fetchLists(accountId)),
		archiveList: (payload) => dispatch(archiveList(payload))
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
		<Grid item xs={12}>
			<Panel
				style={{ backgroundColor: neutralLightColor }}
				shaded
				header={
					<MyHeader
						data={activeVersion}
						handleArchiveClick={props.handleArchiveClick}
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
									<MyHeader data={version} />
								</div>
							)
						}
					})}
				<div style={{ paddingBottom: 20 }}>
					<div style={{ float: 'left' }}>
						<Checkbox
							checked={props.list.archived}
							onChange={(e, value) => {
								props.handleArchiveClick(props.data.smartListId, value)
							}}
							disabled
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
		</Grid>
	)
}

const MyHeader = (props) => {
	let subscriberCount =
		props.data.subscriberCount > 999999
			? numeral(props.data.subscriberCount)
					.format('0.0a')
					.toUpperCase()
			: numeral(props.data.subscriberCount).format('0.0a')

	let videoCount = numeral(props.data.videoCount).format('0a')
	let channelCount = numeral(props.data.channelCount).format('0a')
	return (
		<div>
			<Grid container alignItems='center' spacing={1}>
				<Grid item xs={12} sm={12} md={7} style={panelStyle}>
					<Grid container>
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
									{props.data.smartListName}
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
						<IconButton
							appearance='ghost'
							icon={<Icon icon={'file-download'} size='lg' />}
							size='lg'
							disabled
							block
							onClick={(e) => {
								e.preventDefault()
							}}
						>
							Download
						</IconButton>
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
									disabled
									onClick={(e) => {
										e.preventDefault()
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
										e.preventDefault()
									}}
									disabled
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

	const smartLists = props.lists

	/*React.useMemo(() => {
		if (!props.lists || props.lists.length < 0) return []
		if (viewArchivedLists) {
			return props.lists
		} else {
			return props.lists.filter((list) => !list.archived)
		}
	}, [props.lists, viewArchivedLists]) */

	const archivedCount = React.useMemo(() => {
		let _archivedCount = 0
		for (const list of props.lists) {
			if (list.archived) ++_archivedCount
		}
		return _archivedCount
	}, [props.lists])

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={12}>
				<Grid item xs={12} sm={12} md={12}>
					<Grid container justify='flex-end' style={{ marginBottom: 30 }}>
						<Grid item xs={8}></Grid>
						{archivedCount > 0 && (
							<Grid item xs={2}>
								<Checkbox
									checked={viewArchivedLists}
									onChange={(e, val) => {
										setViewArchivedLists(val)
									}}
								>
									View archived
								</Checkbox>
							</Grid>
						)}

						<Button onClick={handleUploadNewList}>Upload a new list</Button>
					</Grid>
				</Grid>
				{smartLists && smartLists.length > 0 ? (
					<Grid container spacing={2}>
						{smartLists &&
							smartLists.map((list, index) => {
								if (list.archived && !viewArchivedLists) {
									return null
								}
								return (
									<MyList
										list={list}
										key={index}
										handleViewAllClick={handleViewAllClick}
										handleHideAllClick={handleHideAllClick}
										handleArchiveClick={handleArchiveClick}
										viewAll={viewingAll}
									/>
								)
							})}
					</Grid>
				) : (
					<FormLoader />
				)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
