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
import Icon from 'rsuite/lib/Icon'
import IconButton from 'rsuite/lib/IconButton'
import { fetchLists } from '../../../redux/actions/engage/lists'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Badge from 'rsuite/lib/Badge'
import ButtonToolbar from 'rsuite/lib/ButtonToolbar'
import {
	neutralExtraLightColor,
	neutralLightColor
} from '../../../assets/jss/colorContants.js'

const mapStateToProps = (state) => {
	return {
		lists: state.engage.lists
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLists: () => dispatch(fetchLists())
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
				header={<MyHeader data={activeVersion} />}
				bordered
			>
				<div style={{ paddingBottom: 20 }}>
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
				{props.viewAll.includes(props.list.smartListId) &&
					props.list.versions &&
					props.list.versions.length > 0 &&
					props.list.versions.map((version, index) => {
						if (!version.active) {
							return (
								<MyHeader
									data={version}
									key={version.smartListId + version.versionId}
								/>
							)
						}
					})}
			</Panel>
		</Grid>
	)
}

const MyHeader = (props) => {
	return (
		<div>
			{props.data.active && (
				<Checkbox style={{ paddingBottom: 20 }}>Archived</Checkbox>
			)}

			<Grid container alignItems='center' spacing={1}>
				<Grid item xs={5} style={panelStyle}>
					<Grid container>
						<Grid item xs={4}>
							<Grid item xs={12}>
								<Grid container justify='center'>
									<Label label={'Name'} />
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify='center'>
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
								<Grid container justify='center'>
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
				<Grid item xs={5} style={panelStyle}>
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
									{props.data.channelCount}
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
									{props.data.videoCount}
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
									{props.data.subscriberCount}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				{props.data.active && (
					<Grid item xs={2} style={panelStyle}>
						<IconButton
							appearance='ghost'
							icon={<Icon icon={'file-download'} size='lg' />}
							size='lg'
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

	let fetchLists = props.fetchLists
	React.useEffect(() => {
		fetchLists()
	}, [fetchLists])

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

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={12}>
				<Grid item xs={12} sm={12} md={12}>
					<Grid container justify='flex-end' style={{ marginBottom: 30 }}>
						<Grid item xs={8}></Grid>
						<Grid item xs={2}>
							<Checkbox> View archived</Checkbox>
						</Grid>

						<Button onClick={handleUploadNewList}>Upload a new list</Button>
					</Grid>
				</Grid>
				{props.lists && props.lists.length > 0 ? (
					<Grid container spacing={2}>
						{props.lists &&
							props.lists.map((list, index) => (
								<MyList
									list={list}
									key={index}
									handleViewAllClick={handleViewAllClick}
									handleHideAllClick={handleHideAllClick}
									viewAll={viewingAll}
								/>
							))}
					</Grid>
				) : (
					<FormLoader />
				)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
