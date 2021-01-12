import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ChannelsTable from './components/ChannelsTable'
import Toggle from 'rsuite/lib/Toggle'
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
import Input from 'rsuite/lib/Input'
import FiltersLabel from './components/FiltersLabel'
import Panel from 'rsuite/lib/Panel'

import {
	fetchVideos,
	fetchChannels,
	setVideos,
	removeAllVideos,
	removeAllChannels,
	setHasNextPage,
	setVideosHasNextPage
} from '../../../../redux/actions/engage/listBuilder'

import {
	fetchFilterCategories,
	fetchFilterCountries,
	fetchFilterLanguages
} from '../../../../redux/actions/engage/filters'

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
import { Checkbox } from 'rsuite'
import { neutralLightColor } from '../../../../assets/jss/colorContants'
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
		hasNextPage: state.engage.hasNextPage,
		videosHasNextPage: state.engage.videosHasNextPage,
		brandProfiles: state.brandProfiles,
		filterCountries: state.engage.filterCountries,
		filterLanguages: state.engage.filterLanguages,
		filterCategories: state.engage.filterCategories,
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
		fetchFilterCategories: () => dispatch(fetchFilterCategories()),
		fetchFilterCountries: () => dispatch(fetchFilterCountries()),
		fetchFilterLanguages: () => dispatch(fetchFilterLanguages()),
		setHasNextPage: (bool) => dispatch(setHasNextPage(bool)),
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

	let [parsedVersionId] = React.useState(props.match.params.versionId)

	if (!parsedVersionId || isNaN(parsedVersionId)) {
		history.push(routes.app.engage.lists.lists.path)
	}

	React.useEffect(() => {
		return () => {
			//clean up on unmount
			props.setHasNextPage(true)
			props.setVideosHasNextPage(true)
		}
	}, [])

	const [viewingVideosForChannel, setViewingVideosForChannel] = React.useState(
		null
	)

	React.useEffect(() => {
		props.removeAllChannels()
		props.removeAllVideos()
		props.fetchFilterCategories()
		props.fetchFilterCountries()
		props.fetchFilterLanguages()
		setCurrentPage(1)
	}, [])

	const [currentPage, setCurrentPage] = React.useState(1)
	const [currentVideoPage, setCurrentVideoPage] = React.useState(0)

	React.useEffect(() => {
		if (props.hasNextPage) {
			let params = {
				versionId: parsedVersionId,
				pageNumber: currentPage,
				filters: {
					channelFilters: {
						countries: filterState.countries,
						categories: filterState.categories,
						kids: filterState.kids,
						actionIds: filterState.actionIds,
						views: {
							min: filterState.views.min ? filterState.views.min : 0,
							max: filterState.views.max
								? filterState.views.max
								: 1000000000000000
						},
						videoDurationSeconds: {
							min: filterState.videoDurationSeconds.min
								? filterState.videoDurationSeconds.min * 60
								: 0,
							max: filterState.videoDurationSeconds.max
								? filterState.videoDurationSeconds.max * 60
								: 1000000000000000
						},
						uploadDate: filterState.uploadDate
					},
					videoFilters: {
						languages: filterState.languages,
						categories: filterState.categories,
						kids: filterState.kids,
						actionIds: filterState.actionIds,
						views: {
							min: filterState.views.min ? filterState.views.min : 0,
							max: filterState.views.max
								? filterState.views.max
								: 1000000000000000
						},
						videoDurationSeconds: {
							min: filterState.videoDurationSeconds.min
								? filterState.videoDurationSeconds.min * 60
								: 0,
							max: filterState.videoDurationSeconds.max
								? filterState.videoDurationSeconds.max * 60
								: 1000000000000000
						},
						uploadDate: filterState.uploadDate
					}
				}
			}
			props.fetchChannels(params)
		}
	}, [currentPage, channelsFetchTrigger])

	let videosHasNextPage = props.videosHasNextPage

	React.useEffect(() => {
		if (currentVideoPage > 0 && viewingVideosForChannel && videosHasNextPage) {
			let params = {
				versionId: parsedVersionId,
				pageNumber: currentVideoPage,
				filters: {
					channelId: viewingVideosForChannel.id,
					kids: filterState.kids,
					views: {
						min: filterState.views.min ? filterState.views.min : 0,
						max: filterState.views.max
							? filterState.views.max
							: 1000000000000000
					},
					videoDurationSeconds: {
						min: filterState.videoDurationSeconds.min
							? filterState.videoDurationSeconds.min * 60
							: 0,
						max: filterState.videoDurationSeconds.max
							? filterState.videoDurationSeconds.max * 60
							: 1000000000000000
					},
					uploadDate: filterState.uploadDate,
					actionIds: filterState.actionIds,
					categories: filterState.categories
				}
			}
			props.fetchVideos(params)
		}
	}, [currentVideoPage, viewingVideosForChannel])

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
		countries: [{ countryCode: 'US' }],
		actionIds: [],
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
		props.setHasNextPage(true)
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

	if (pageIsLoading) {
		return <Loader center content='Loading...' vertical />
	} else {
		return (
			<Grid container spacing={2}>
				<VideoModal
					show={showVideoModal}
					close={handleVideoModalClose}
					videos={props.videos}
					incrementPage={() =>
						setCurrentVideoPage((prevState) => prevState + 1)
					}
					handleActionButtonClick={handleActionButtonClick}
					channel={viewingVideosForChannel}
					videosIsLoading={props.videosIsLoading}
				/>

				<Grid item xs={12} align='right'>
					<Button
						style={{ marginLeft: 20 }}
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
				</Grid>

				<Grid item xs={3}>
					<Grid container>
						<Panel
							header={<Icon size='lg' icon='filter' />}
							bodyFill
							style={{
								background: neutralLightColor
							}}
						>
							<PanelGroup>
								<CustomPanel header='Actions Taken'>
									<SelectPicker
										size='xs'
										labelKey={'label'}
										valueKey={'actionIds'}
										placeholder={'Select'}
										data={actionIdOptions}
										defaultValue={[]}
										onChange={(val) => {
											handleFilterChange(filters.actionIds, val)
										}}
										cleanable={false}
										block
										preventOverflow={true}
										searchable={false}
									/>
								</CustomPanel>

								<CustomPanel header='YouTube Filters'>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<TagPicker
												block
												size={'xs'}
												data={props.filterCountries}
												labelKey={'countryName'}
												valueKey={'countryCode'}
												defaultValue={['US']}
												placeholder='Countries'
												onChange={(val) => {
													handleFilterChange(filters.countries, val)
												}}
											/>
										</Grid>

										<Grid item xs={12}>
											<TagPicker
												block
												size={'xs'}
												data={props.filterLanguages}
												labelKey={'languageName'}
												valueKey={'languageCode'}
												defaultValue={['en']}
												virtualized={true}
												placeholder='Languages'
												onChange={(val) => {
													handleFilterChange(filters.languages, val)
												}}
											/>
										</Grid>
										<Grid item xs={12}>
											<TagPicker
												block
												size={'xs'}
												data={props.filterCategories}
												labelKey={'categoryName'}
												valueKey={'categoryId'}
												virtualized={true}
												placeholder='Categories'
												onChange={(val) => {
													handleFilterChange(filters.categories, val)
												}}
											/>
										</Grid>

										<Grid item xs={12}>
											<Checkbox
												size={'xs'}
												onChange={(na, bool) => {
													handleFilterChange(filters.kids, bool)
												}}
											>
												Kids Only
											</Checkbox>
										</Grid>
									</Grid>
								</CustomPanel>
								<CustomPanel header='Video Filters'>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<FiltersLabel text='Views' />
											<InputGroup size='xs'>
												<InputNumber
													step={10000}
													size='xs'
													value={filterState.views.min}
													onFocus={(event) => event.target.select()}
													placeholder={'Min'}
													min={0}
													onChange={(nextValue) => {
														let value = {
															min: Number(nextValue),
															max: filterState.views.max
														}
														handleFilterChange(filters.views, value)
													}}
												/>

												<InputGroup.Addon>to</InputGroup.Addon>
												<InputNumber
													step={10000}
													onFocus={(event) => event.target.select()}
													size='xs'
													min={0}
													placeholder={'Max'}
													value={filterState.views.max}
													onChange={(nextValue) => {
														let value = {
															min: filterState.views.min,
															max: Number(nextValue)
														}
														handleFilterChange(filters.views, value)
													}}
												/>
											</InputGroup>
											<Button
												size='xs'
												appearance='link'
												onClick={() =>
													handleFilterChange(filters.views, {
														min: null,
														max: null
													})
												}
											>
												Clear
											</Button>
										</Grid>

										<Grid item xs={12}>
											<FiltersLabel text='Duration (minutes)' />
											<InputGroup size='xs'>
												<InputNumber
													value={filterState.videoDurationSeconds.min}
													size='xs'
													onFocus={(event) => event.target.select()}
													placeholder={'Min'}
													onChange={(nextValue) => {
														let value = {
															min: Number(nextValue),
															max: filterState.videoDurationSeconds.max
														}
														handleFilterChange(
															filters.videoDurationSeconds,
															value
														)
													}}
												/>

												<InputGroup.Addon>to</InputGroup.Addon>
												<InputNumber
													value={filterState.videoDurationSeconds.max}
													onFocus={(event) => event.target.select()}
													size='xs'
													min={0}
													placeholder={'Max'}
													onChange={(nextValue) => {
														let value = {
															min: filterState.videoDurationSeconds.min,
															max: Number(nextValue)
														}
														handleFilterChange(
															filters.videoDurationSeconds,
															value
														)
													}}
												/>
											</InputGroup>
											<Button
												size='xs'
												appearance='link'
												onClick={() =>
													handleFilterChange(filters.videoDurationSeconds, {
														min: null,
														max: null
													})
												}
											>
												Clear
											</Button>
										</Grid>

										<Grid item xs={12}>
											<FiltersLabel text='Upload Date' />
											<DateRangePicker
												block
												size='xs'
												showOneCalendar
												placement='topStart'
												onChange={(val) => {
													let value = {}
													if (val.length > 0) {
														value = {
															min: dayjs(val[0]).format('YYYY-MM-DD'),
															max: dayjs(val[1]).format('YYYY-MM-DD')
														}
													}
													handleFilterChange(filters.uploadDate, value)
												}}
											/>
										</Grid>
									</Grid>
								</CustomPanel>
								<CustomPanel>
									<Button
										block
										size='xs'
										onClick={handleApplyFiltersButtonClick}
									>
										Apply Filters
									</Button>
								</CustomPanel>
							</PanelGroup>
						</Panel>
					</Grid>
				</Grid>

				<Grid item xs={9}>
					<Grid item xs={12}>
						<CustomPanel header={props.smartListVersionUnderEdit.smartListName}>
							<b>Brand Profile:</b>
							<p style={{ color: 'grey' }}>
								{props.smartListVersionUnderEdit.brandName}
							</p>
							<b>Objective:</b>
							<p style={{ color: 'grey' }}>
								{props.smartListVersionUnderEdit.objectiveName}
							</p>
						</CustomPanel>
					</Grid>

					<Grid item xs={12}>
						<ChannelsTable
							hasNextPage={props.hasNextPage}
							channelsIsLoading={props.channelsIsLoading}
							items={props.channels}
							incrementPage={() => setCurrentPage((prevState) => prevState + 1)}
							handleActionButtonClick={handleActionButtonClick}
							handleVideosClick={handleVideosClick}
						/>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
