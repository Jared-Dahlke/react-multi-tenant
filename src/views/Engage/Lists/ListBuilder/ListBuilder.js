import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ChannelsTable from './components/ChannelsTable'
import Grid from '@material-ui/core/Grid'
import TagPicker from 'rsuite/lib/TagPicker'
import PanelGroup from 'rsuite/lib/PanelGroup'
import SelectPicker from 'rsuite/lib/SelectPicker'
import Icon from 'rsuite/lib/Icon'
import CustomPanel from '../../../../components/CustomPanel'
import Button from 'rsuite/lib/Button'
import VideoModal from './components/VideoModal'
import InputGroup from 'rsuite/lib/InputGroup'
import InputNumber from 'rsuite/lib/InputNumber'
import DateRangePicker from 'rsuite/lib/DateRangePicker'
import FiltersLabel from './components/FiltersLabel'
import Panel from 'rsuite/lib/Panel'
import Container from 'rsuite/lib/Container'
import CheckTreePicker from 'rsuite/lib/CheckTreePicker'
import { iabCategoriesFilter } from '../../../../staticData/iabCategories'
import Header from 'rsuite/lib/Header'
import Content from 'rsuite/lib/Content'

import {
	fetchVideos,
	fetchChannels,
	setVideos,
	removeAllVideos,
	removeAllChannels,
	setChannelsHasNextPage,
	setVideosHasNextPage
} from '../../../../redux/actions/engage/listBuilder'

import {
	patchVersionData,
	deleteAllVersionData,
	deleteVersionDataItem,
	downloadExcelList,
	setSmartListVersionUnderEdit,
	fetchLists
} from '../../../../redux/actions/engage/lists'
import toast from 'react-hot-toast'
import Loader from 'rsuite/lib/Loader'
import Checkbox from 'rsuite/lib/Checkbox'
import { neutralLightColor } from '../../../../assets/jss/colorContants'
import {
	youtubeCategories,
	countriesOptions,
	languagesOptions
} from '../../../../staticData/data'
import { FiltersSideBar } from './components/FiltersSideBar'
var dayjs = require('dayjs')

const mapStateToProps = (state) => {
	return {
		smartListVersionUnderEdit: state.engage.smartListVersionUnderEdit,
		lists: state.engage.lists,
		fetchListsSuccess: state.engage.fetchListsSuccess,
		videos: state.engage.videos,
		channels: state.engage.channels,
		channelsIsLoading: state.engage.channelsIsLoading,
		videosIsLoading: state.engage.videosIsLoading,
		channelsHasNextPage: state.engage.channelsHasNextPage,
		videosHasNextPage: state.engage.videosHasNextPage,
		brandProfiles: state.brandProfiles,
		isDownloadingExcel: state.engage.isDownloadingExcel,
		isDownloadingExcelVersionId: state.engage.isDownloadingExcelVersionId,
		deleteAllVersionDataSuccess: state.engage.deleteAllVersionDataSuccess,
		isPostingList: state.engage.isPostingList,
		currentAccountId: state.currentAccountId
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setVideos: (videos) => dispatch(setVideos(videos)),
		fetchLists: (accountId) => dispatch(fetchLists(accountId)),

		setSmartListVersionUnderEdit: (version) =>
			dispatch(setSmartListVersionUnderEdit(version)),
		fetchVideos: (params) => dispatch(fetchVideos(params)),
		fetchChannels: (params) => dispatch(fetchChannels(params)),
		patchVersionData: (params) => dispatch(patchVersionData(params)),
		removeAllVideos: () => dispatch(removeAllVideos()),
		removeAllChannels: () => dispatch(removeAllChannels()),
		setChannelsHasNextPage: (bool) => dispatch(setChannelsHasNextPage(bool)),
		setVideosHasNextPage: (bool) => dispatch(setVideosHasNextPage(bool)),
		deleteAllVersionData: (versionId) =>
			dispatch(deleteAllVersionData(versionId)),
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
		setCurrentPage(1)
	}, [])

	const [currentPage, setCurrentPage] = React.useState(1)
	const [currentVideoPage, setCurrentVideoPage] = React.useState(0)

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
		if (currentVideoPage > 0 && viewingVideosForChannel) {
			let params = {
				versionId: parsedVersionId,
				pageNumber: currentVideoPage,
				filters: {
					...filterState,
					channelId: viewingVideosForChannel.id
				},
				sort: currentVideosSort
			}
			props.fetchVideos(params)
		}
	}, [currentVideoPage, viewingVideosForChannel, videosFetchTrigger])

	const filters = {
		kids: 'kids',
		categories: 'categories',
		languages: 'languages',
		countries: 'countries',
		actionIds: 'actionIds',
		views: 'views',
		videoDurationSeconds: 'videoDurationSeconds',
		uploadDate: 'uploadDate',
		iabCategories: 'iabCategories'
	}

	const actionIdOptions = [
		{ label: 'View Targeted Items', actionIds: [1], id: 1 },
		{ label: 'View Blocked Items', actionIds: [2], id: 2 },
		{ label: 'View Watched Items', actionIds: [3], id: 3 },
		{
			label: 'View Targeted, Watched, and Blocked Items',
			actionIds: [1, 2, 3],
			id: 4
		},
		{ label: 'View All Items', actionIds: [], id: 5 }
	]

	const handleActionButtonClick = (actionId, item) => {
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
		props.setChannelsHasNextPage(true)
		setCurrentPage(1)
		setChannelsFetchTrigger((prevState) => prevState + 1)
	}

	const [showVideoModal, setShowVideoModal] = React.useState(false)

	const handleVideosClick = (channel) => {
		setViewingVideosForChannel(channel)
		setCurrentVideoPage(1)
		setShowVideoModal(true)
	}

	const handleVideoModalClose = () => {
		setShowVideoModal(false)
		props.setVideosHasNextPage(true)
		setViewingVideosForChannel(null)
		props.removeAllVideos()
	}

	const filterSpacing = 1

	const [filtersExpanded, setFiltersExpanded] = React.useState(true)

	if (pageIsLoading) {
		return <Loader center content='Loading...' vertical size='lg' />
	} else {
		return (
			<>
				<Container>
					<FiltersSideBar
						expand={filtersExpanded}
						handleToggle={() => setFiltersExpanded((prevState) => !prevState)}
						filterState={filterState}
						handleApplyFiltersButtonClick={handleApplyFiltersButtonClick}
					/>

					<Container>
						<Header>
							<CustomPanel
								header={props.smartListVersionUnderEdit.smartListName}
							>
								<b>Brand Profile:</b>
								<p style={{ color: 'grey' }}>
									{props.smartListVersionUnderEdit.brandName}
								</p>
								<b>Objective:</b>
								<p style={{ color: 'grey' }}>
									{props.smartListVersionUnderEdit.objectiveName}
								</p>
							</CustomPanel>
						</Header>
						<Content>
							<ChannelsTable
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
							/>
						</Content>
					</Container>
				</Container>

				<VideoModal
					currentVideosSort={currentVideosSort}
					setCurrentVideosSort={setCurrentVideosSort}
					show={showVideoModal}
					close={handleVideoModalClose}
					videos={props.videos}
					incrementPage={() => {
						if (!props.videosIsLoading) {
							setCurrentVideoPage((prevState) => prevState + 1)
						}
					}}
					handleActionButtonClick={handleActionButtonClick}
					channel={viewingVideosForChannel}
					videosIsLoading={props.videosIsLoading}
				/>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
