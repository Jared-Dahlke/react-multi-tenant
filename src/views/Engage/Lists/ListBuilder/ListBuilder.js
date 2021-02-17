import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ChannelsTable from './components/ChannelsTable'
import Button from 'rsuite/lib/Button'
import VideoModal from './components/VideoModal'
import VideosTable from './components/VideosTable'
import Grid from '@material-ui/core/Grid'
import Icon from 'rsuite/lib/Icon'
import BulkOperationsModal from './components/BulkOperationsModal'
import Toggle from 'rsuite/lib/Toggle'
import Stats from './components/Stats'
import {
	fetchVideos,
	fetchChannels,
	fetchChannelVideos,
	setVideos,
	removeAllVideos,
	removeAllChannelVideos,
	removeAllChannels,
	setChannelsHasNextPage,
	setChannelVideosHasNextPage,
	setVideosHasNextPage,
	setVisibleChannelColumns,
	setVisibleVideoColumns
} from '../../../../redux/actions/engage/listBuilder'

import {
	patchVersionData,
	postVersionBulkAction,
	deleteVersionDataItem,
	downloadExcelList,
	setSmartListVersionUnderEdit,
	fetchLists,
	patchListName,
	setSmartListStats,
	setSmartListStatsLoading
} from '../../../../redux/actions/engage/lists'
import toast from 'react-hot-toast'
import Loader from 'rsuite/lib/Loader'
import { FiltersSideBar } from './components/FiltersSideBar'
import ButtonToolbar from 'rsuite/lib/ButtonToolbar'
import Input from 'rsuite/lib/Input'
import InputGroup from 'rsuite/lib/InputGroup'
import { accentColor } from '../../../../assets/jss/colorContants'
import Panel from 'rsuite/lib/Panel'
import ControlLabel from 'rsuite/lib/ControlLabel'

const mapStateToProps = (state) => {
	return {
		visibleVideoColumns: state.engage.visibleVideoColumns,
		visibleChannelColumns: state.engage.visibleChannelColumns,
		smartListStats: state.engage.smartListStats,
		smartListVersionUnderEdit: state.engage.smartListVersionUnderEdit,
		lists: state.engage.lists,
		videos: state.engage.videos,
		channelVideos: state.engage.channelVideos,
		channels: state.engage.channels,
		channelsIsLoading: state.engage.channelsIsLoading,
		videosIsLoading: state.engage.videosIsLoading,
		channelsHasNextPage: state.engage.channelsHasNextPage,
		videosHasNextPage: state.engage.videosHasNextPage,
		isDownloadingExcel: state.engage.isDownloadingExcel,
		isDownloadingExcelVersionId: state.engage.isDownloadingExcelVersionId,
		currentAccountId: state.currentAccountId
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setVisibleChannelColumns: (arr) => dispatch(setVisibleChannelColumns(arr)),
		setVisibleVideoColumns: (arr) => dispatch(setVisibleVideoColumns(arr)),
		setSmartListStatsLoading: (bool) =>
			dispatch(setSmartListStatsLoading(bool)),
		setVideos: (videos) => dispatch(setVideos(videos)),
		setSmartListStats: (params) => dispatch(setSmartListStats(params)),
		fetchLists: (accountId) => dispatch(fetchLists(accountId)),
		patchListName: (payload) => dispatch(patchListName(payload)),
		setSmartListVersionUnderEdit: (version) =>
			dispatch(setSmartListVersionUnderEdit(version)),
		fetchVideos: (params) => dispatch(fetchVideos(params)),
		fetchChannelVideos: (params) => dispatch(fetchChannelVideos(params)),
		fetchChannels: (params) => dispatch(fetchChannels(params)),
		patchVersionData: (params) => dispatch(patchVersionData(params)),
		postVersionBulkAction: (params) => dispatch(postVersionBulkAction(params)),
		removeAllVideos: () => dispatch(removeAllVideos()),
		removeAllChannels: () => dispatch(removeAllChannels()),
		removeAllChannelVideos: () => dispatch(removeAllChannelVideos()),
		setChannelsHasNextPage: (bool) => dispatch(setChannelsHasNextPage(bool)),
		setChannelVideosHasNextPage: (bool) =>
			dispatch(setChannelVideosHasNextPage(bool)),
		setVideosHasNextPage: (bool) => dispatch(setVideosHasNextPage(bool)),
		deleteVersionDataItem: (params) => dispatch(deleteVersionDataItem(params)),
		downloadExcelList: (payload) => dispatch(downloadExcelList(payload))
	}
}

function ListBuilder(props) {
	const history = useHistory()

	let fetchLists = props.fetchLists
	let currentAccountId = props.currentAccountId
	let [listsFetched, setListsFetched] = React.useState(false)
	React.useEffect(() => {
		if (!listsFetched && currentAccountId) {
			fetchLists(currentAccountId)
			setListsFetched(true)
		}
	}, [fetchLists, currentAccountId])

	const [pageIsLoading, setPageIsLoading] = React.useState(true)

	const [channelsFetchTrigger, setChannelsFetchTrigger] = React.useState(0)
	const [videosFetchTrigger, setVideosFetchTrigger] = React.useState(0)
	const [
		channelVideosFetchTrigger,
		setChannelVideosFetchTrigger
	] = React.useState(0)

	let [parsedVersionId] = React.useState(props.match.params.versionId)

	if (!parsedVersionId || isNaN(parsedVersionId)) {
		history.push(routes.app.engage.lists.lists.path)
	}

	const [currentChannelsSort, setCurrentChannelsSort] = React.useState({
		sortColumn: 'views',
		sortType: 'desc'
	})

	const [currentVideosSort, setCurrentVideosSort] = React.useState({
		sortColumn: 'views',
		sortType: 'desc'
	})

	const goToListsPage = () => {
		history.push(routes.app.engage.lists.lists.path)
	}

	React.useEffect(() => {
		return () => {
			//clean up on unmount
			props.setChannelsHasNextPage(true)
			props.setVideosHasNextPage(true)
		}
	}, [])

	const [viewingVideosForChannel, setViewingVideosForChannel] = React.useState(
		null
	)

	React.useEffect(() => {
		props.removeAllChannels()
		props.removeAllVideos()
		props.removeAllChannelVideos()
		setCurrentPage(1)
		setCurrentVideoPage(1)
	}, [])

	const [currentPage, setCurrentPage] = React.useState(1)
	const [currentVideoPage, setCurrentVideoPage] = React.useState(1)
	const [currentChannelVideoPage, setCurrentChannelVideoPage] = React.useState(
		1
	)

	React.useEffect(() => {
		let params = {
			versionId: parsedVersionId,
			pageNumber: currentPage,
			filters: filterState,
			sort: currentChannelsSort
		}
		props.fetchChannels(params)
	}, [currentPage, channelsFetchTrigger])

	const [mounted, setMounted] = React.useState(false)
	React.useEffect(() => {
		if (mounted) {
			handleApplyFiltersButtonClick()
		}
		setMounted(true)
	}, [currentChannelsSort])

	const [mountedForVideos, setMountedForVideos] = React.useState(false)
	React.useEffect(() => {
		if (mountedForVideos) {
			props.removeAllVideos()
			setCurrentVideoPage(1)
			setVideosFetchTrigger((prevState) => prevState + 1)
		}
		setMountedForVideos(true)
	}, [currentVideosSort])

	React.useEffect(() => {
		console.log('firing fetchChannelVideos effect')
		if (viewingVideosForChannel) {
			let params = {
				versionId: parsedVersionId,
				pageNumber: currentChannelVideoPage,
				filters: {
					...filterState,
					channelId: viewingVideosForChannel.id
				},
				sort: currentVideosSort
			}
			props.fetchChannelVideos(params)
		}
	}, [currentChannelVideoPage, channelVideosFetchTrigger])

	const [viewingChannels, setViewingChannels] = React.useState(true)

	React.useEffect(() => {
		console.log('firing fetchVideos effect')
		let params = {
			versionId: parsedVersionId,
			pageNumber: currentVideoPage,
			filters: {
				...filterState
			},
			sort: currentVideosSort
		}
		props.fetchVideos(params)
	}, [currentVideoPage, videosFetchTrigger])

	const filters = {
		kids: 'kids',
		categories: 'categories',
		languages: 'languages',
		countries: 'countries',
		actionIds: 'actionIds',
		views: 'views',
		videoDurationSeconds: 'videoDurationSeconds',
		uploadDate: 'uploadDate'
	}

	const handleActionButtonClick = (actionId, item) => {
		props.setSmartListStatsLoading(true)
		let unSelecting = item.actionId === actionId
		let versionId = parsedVersionId

		if (unSelecting) {
			delete item.actionId
			let _args = {
				versionId: versionId,
				id: item.id
			}

			toast.promise(props.deleteVersionDataItem(_args), {
				loading: 'Deleting...',
				success: 'Deleted!   ',
				error: <b>Could not delete.</b>
			})
		} else {
			item.actionId = actionId
			//updateStats(actionId, true, item, oldItem.actionId)
			let args = {
				versionId: versionId,
				data: [{ actionId: actionId, id: item.id }]
			}

			toast.promise(props.patchVersionData(args), {
				loading: 'Saving...',
				success: 'Saved!   ',
				error: <b>Could not save.</b>
			})
		}
	}

	const handleDownloadClick = (versionId, smartListName) => {
		let payload = {
			versionId,
			smartListName
		}
		props.downloadExcelList(payload)
	}

	const [filterState, setFilterState] = React.useState({
		kids: false,
		iabCategories: [],
		countries: [{ countryCode: 'US' }],
		actionIds: [],
		uploadDate: null,
		categories: [],
		languages: [{ languageCode: 'en' }],
		views: {
			min: null,
			max: null
		},
		videoDurationSeconds: {
			min: null,
			max: null
		}
	})

	const handleFilterChange = (filter, value) => {
		switch (filter) {
			case filters.kids:
				setFilterState((prevState) => {
					return {
						...prevState,
						kids: value
					}
				})
				break
			case filters.countries:
				let countries = []
				if (!value) {
					value = []
				}
				for (const country of value) {
					countries.push({ countryCode: country })
				}
				setFilterState((prevState) => {
					return {
						...prevState,
						countries
					}
				})
				break
			case filters.languages:
				let languages = []
				if (!value) {
					value = []
				}
				for (const language of value) {
					languages.push({ languageCode: language })
				}
				setFilterState((prevState) => {
					return {
						...prevState,
						languages
					}
				})
				break
			case filters.categories:
				let categories = []
				if (!value) {
					value = []
				}
				for (const category of value) {
					categories.push({ categoryId: Number(category) })
				}
				setFilterState((prevState) => {
					return {
						...prevState,
						categories
					}
				})
				break

			case filters.iabCategories:
				let iabCategories = []
				if (!value) {
					value = []
				}
				for (const iabCategory of value) {
					iabCategories.push(iabCategory)
				}
				setFilterState((prevState) => {
					return {
						...prevState,
						iabCategories
					}
				})
				break

			case filters.actionIds:
				let actionIds = []
				if (!value) {
					value = []
				}
				for (const actionId of value) {
					actionIds.push(actionId)
				}
				setFilterState((prevState) => {
					return {
						...prevState,
						actionIds
					}
				})
				break

			case filters.views:
				if (!value) {
					value = {}
				}

				setFilterState((prevState) => {
					return {
						...prevState,
						views: value
					}
				})
				break

			case filters.videoDurationSeconds:
				if (!value) {
					value = {}
				}

				setFilterState((prevState) => {
					return {
						...prevState,
						videoDurationSeconds: value
					}
				})
				break

			case filters.uploadDate:
				if (!value) {
					value = {}
				}

				setFilterState((prevState) => {
					return {
						...prevState,
						uploadDate: value
					}
				})
				break

			default:
				break
		}
	}

	let lists = props.lists
	React.useEffect(() => {
		for (const version of props.lists) {
			if (
				version.versionId == parsedVersionId ||
				version.versionId === parsedVersionId
			) {
				props.setSmartListVersionUnderEdit(version)
				setPageIsLoading(false)
			}
		}
	}, [lists])

	const handleApplyFiltersButtonClick = () => {
		props.removeAllChannels()
		props.removeAllVideos()
		props.removeAllChannelVideos()
		props.setChannelsHasNextPage(true)
		props.setVideosHasNextPage(true)
		setCurrentPage(1)
		setCurrentVideoPage(1)
		setCurrentChannelVideoPage(1)
		setChannelsFetchTrigger((prevState) => prevState + 1)
		setVideosFetchTrigger((prevState) => prevState + 1)
	}

	const [showVideoModal, setShowVideoModal] = React.useState(false)

	const handleVideosClick = (channel) => {
		setViewingVideosForChannel(channel)
		props.removeAllChannelVideos()
		setChannelVideosFetchTrigger((prevState) => prevState + 1)
		setShowVideoModal(true)
	}

	const handleChannelsToggle = (viewingVideos) => {
		setViewingChannels(!viewingVideos)
		// setCurrentVideoPage(1)
		// setVideosFetchTrigger((prevState) => prevState + 1)
	}

	const handleVideoModalClose = () => {
		setShowVideoModal(false)
		props.setChannelVideosHasNextPage(true)
		setCurrentChannelVideoPage(1)
		setViewingVideosForChannel(null)
		props.removeAllChannelVideos()
	}

	const [isEditingName, setIsEditingName] = React.useState(false)
	const [smartListName, setSmartListName] = React.useState(
		props.smartListVersionUnderEdit.smartListName
	)

	React.useEffect(() => {
		setSmartListName(props.smartListVersionUnderEdit.smartListName)
	}, [props.smartListVersionUnderEdit.smartListName])

	const [filtersExpanded, setFiltersExpanded] = React.useState(true)

	const handleNameChange = (e) => {
		e.preventDefault()
		setIsEditingName(false)
		if (smartListName === e.target.value) {
			return
		}
		setSmartListName(e.target.value)

		let payload = {
			smartListName: e.target.value,
			smartListId: props.smartListVersionUnderEdit.smartListId
		}

		toast.promise(props.patchListName(payload), {
			loading: 'Saving...',
			success: 'Saved!   ',
			error: <b>Could not delete.</b>
		})
	}

	const [bulk, setBulk] = React.useState(false)

	const tableHeight = 890

	if (pageIsLoading) {
		return <Loader center content='Loading...' vertical size='lg' />
	} else {
		return (
			<>
				<BulkOperationsModal
					bulk={bulk}
					setBulk={setBulk}
					parsedVersionId={parsedVersionId}
				/>

				<div style={{ display: 'flex' }}>
					<Panel
						style={{
							flex: 1,
							marginBottom: 15,
							backgroundColor: '#F7F7FA'
						}}
						header={
							<Grid container>
								<Grid item xs={6}>
									<ControlLabel>SmartList Name</ControlLabel>
									<InputGroup
										style={{
											borderColor: isEditingName ? accentColor : '#F7F7FA'
										}}
									>
										<InputGroup.Button
											onClick={() => {
												setIsEditingName(true)
											}}
											style={{ backgroundColor: 'transparent' }}
										>
											<Icon style={{ color: '#0092d1' }} icon='pencil' />
										</InputGroup.Button>
										<Input
											style={{ backgroundColor: 'transparent', color: 'grey' }}
											onPressEnter={(e) => handleNameChange(e)}
											onBlur={(e) => {
												handleNameChange(e)
											}}
											disabled={!isEditingName}
											defaultValue={
												props.smartListVersionUnderEdit.smartListName
											}
										/>
									</InputGroup>
								</Grid>
								<Grid item xs={6} align='right'>
									<ButtonToolbar>
										<Toggle
											onChange={handleChannelsToggle}
											size='xs'
											checkedChildren='Videos'
											unCheckedChildren='Channels'
										/>

										<Button
											size='xs'
											loading={
												props.isDownloadingExcel &&
												props.isDownloadingExcelVersionId === parsedVersionId
											}
											onClick={() =>
												handleDownloadClick(
													parsedVersionId,
													props.smartListVersionUnderEdit.smartListName
												)
											}
										>
											Download
										</Button>

										<Button
											size='xs'
											onClick={() => {
												setBulk(true)
											}}
										>
											Bulk Operations
										</Button>
										<Button size='xs' onClick={goToListsPage}>
											Done
										</Button>
									</ButtonToolbar>
								</Grid>
							</Grid>
						}
					>
						<div style={{ display: 'flex' }}>
							<div
								style={{
									display: 'flex',
									minWidth: 430
								}}
							>
								<div style={{ flex: 1 }}>
									<p>Brand Profile:</p>
									<p style={{ color: 'grey' }}>
										{props.smartListVersionUnderEdit.brandName}
									</p>
									<p>Objective:</p>
									<p style={{ color: 'grey' }}>
										{props.smartListVersionUnderEdit.objectiveName}
									</p>
								</div>
							</div>
							<div
								style={{
									width: '100%'
								}}
							>
								<Stats
									parsedVersionId={parsedVersionId}
									smartListStats={props.smartListStats}
								/>
							</div>
						</div>
					</Panel>
				</div>
				<div style={{ display: 'flex' }}>
					<FiltersSideBar
						filters={filters}
						handleFilterChange={handleFilterChange}
						expand={filtersExpanded}
						handleToggle={() => setFiltersExpanded((prevState) => !prevState)}
						filterState={filterState}
						handleApplyFiltersButtonClick={handleApplyFiltersButtonClick}
					/>

					{viewingChannels && (
						<ChannelsTable
							tableHeight={tableHeight}
							setCurrentChannelsSort={setCurrentChannelsSort}
							currentChannelsSort={currentChannelsSort}
							channelsHasNextPage={props.channelsHasNextPage}
							channelsIsLoading={props.channelsIsLoading}
							items={props.channels}
							incrementPage={() => {
								if (!props.channelsIsLoading) {
									setCurrentPage((prevState) => prevState + 1)
								}
							}}
							handleActionButtonClick={handleActionButtonClick}
							handleVideosClick={handleVideosClick}
							visibleChannelColumns={props.visibleChannelColumns}
							setVisibleChannelColumns={props.setVisibleChannelColumns}
						/>
					)}
					{!viewingChannels && (
						<VideosTable
							tableHeight={tableHeight}
							setVisibleVideoColumns={props.setVisibleVideoColumns}
							currentVideosSort={currentVideosSort}
							setCurrentVideosSort={setCurrentVideosSort}
							videos={props.videos}
							videosIsLoading={props.videosIsLoading}
							visibleVideoColumns={props.visibleVideoColumns}
							handleActionButtonClick={handleActionButtonClick}
							incrementPage={() => {
								if (!props.videosIsLoading) {
									setCurrentVideoPage((prevState) => prevState + 1)
								}
							}}
						/>
					)}

					<VideoModal
						tableHeight={tableHeight - 400}
						visibleVideoColumns={props.visibleVideoColumns}
						setVisibleVideoColumns={props.setVisibleVideoColumns}
						//	setColumnPickerShowing={setColumnPickerShowing}
						currentVideosSort={currentVideosSort}
						setCurrentVideosSort={setCurrentVideosSort}
						show={showVideoModal}
						close={handleVideoModalClose}
						videos={props.channelVideos}
						incrementPage={() => {
							if (!props.videosIsLoading) {
								setCurrentChannelVideoPage((prevState) => prevState + 1)
							}
						}}
						handleActionButtonClick={handleActionButtonClick}
						channel={viewingVideosForChannel}
						videosIsLoading={props.videosIsLoading}
					/>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
