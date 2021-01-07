import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ChannelsTable from './components/ChannelsTable'
import Toggle from 'rsuite/lib/Toggle'
import Grid from '@material-ui/core/Grid'
import TagPicker from 'rsuite/lib/TagPicker'
import Panel from 'rsuite/lib/Panel'
import Button from 'rsuite/lib/Button'
import VideoModal from './components/VideoModal'
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
	downloadExcelList
} from '../../../../redux/actions/engage/lists'
import { neutralColor } from '../../../../assets/jss/colorContants'
import toast from 'react-hot-toast'

const mapStateToProps = (state) => {
	return {
		videos: state.engage.videos,
		channels: state.engage.channels,
		hasNextPage: state.engage.hasNextPage,
		videosHasNextPage: state.engage.videosHasNextPage,
		brandProfiles: state.brandProfiles,
		filterCountries: state.engage.filterCountries,
		filterLanguages: state.engage.filterLanguages,
		filterCategories: state.engage.filterCategories,
		isDownloadingExcel: state.engage.isDownloadingExcel,
		isDownloadingExcelVersionId: state.engage.isDownloadingExcelVersionId,
		deleteAllVersionDataSuccess: state.engage.deleteAllVersionDataSuccess
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setVideos: (videos) => dispatch(setVideos(videos)),
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
	if (!props.location.state || props.location.state.from !== 'lists') {
		history.push(routes.app.engage.lists.lists.path)
	}

	const hasMountedRef = React.useRef(false)

	React.useEffect(() => {
		return () => {
			//clean up on unmount
			props.setHasNextPage(true)
			props.setVideosHasNextPage(true)
		}
	}, [])

	const [createdListVersion, setCreatedListVersion] = React.useState(
		props.location.state.createdListVersion
	)

	const [isNextPageLoading, setIsNextPageLoading] = React.useState(false)

	const [
		viewingVideosForChannelId,
		setViewingVideosForChannelId
	] = React.useState(null)

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
				versionId: createdListVersion.versionId,
				pageNumber: currentPage,
				filters: {
					channelFilters: filterState,
					videoFilters: {}
				}
			}
			props.fetchChannels(params)
		}
	}, [currentPage])

	let videosHasNextPage = props.videosHasNextPage

	React.useEffect(() => {
		if (
			currentVideoPage > 0 &&
			viewingVideosForChannelId &&
			videosHasNextPage
		) {
			let params = {
				versionId: createdListVersion.versionId,
				pageNumber: currentVideoPage,
				filters: {
					channelId: viewingVideosForChannelId
				}
			}
			props.fetchVideos(params)
		}
	}, [currentVideoPage, viewingVideosForChannelId])

	const filters = {
		kids: 'kids',
		categories: 'categories',
		languages: 'languages',
		countries: 'countries'
	}

	const handleActionButtonClick = (actionId, item) => {
		let unSelecting = item.actionId === actionId
		let versionId = createdListVersion.versionId
		if (unSelecting) {
			delete item.actionId
			let _args = {
				versionId: versionId,
				id: item.id
			}
			props.deleteVersionDataItem(_args)
		} else {
			item.actionId = actionId
			let args = {
				versionId: versionId,
				data: [{ actionId: actionId, id: item.id }]
			}

			toast.promise(props.patchVersionData(args), {
				loading: 'Saving...',
				success: <b>saved!</b>,
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

	const [filterState, setFilterState] = React.useState({ kids: false })

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

			default:
				break
		}
	}

	React.useEffect(() => {
		if (hasMountedRef.current) {
			props.removeAllChannels()
			props.removeAllVideos()
			setCurrentPage(1)
		}
		hasMountedRef.current = true
	}, [filterState])

	const [showVideoModal, setShowVideoModal] = React.useState(false)

	const handleVideosClick = (channelId) => {
		setShowVideoModal(true)
		setViewingVideosForChannelId(channelId)
		setCurrentVideoPage(1)
	}

	const handleVideoModalClose = () => {
		setShowVideoModal(false)
		props.setVideosHasNextPage(true)
		setViewingVideosForChannelId(null)
		props.removeAllVideos()
	}

	return (
		<Grid container spacing={3}>
			<VideoModal
				show={showVideoModal}
				close={handleVideoModalClose}
				videos={props.videos}
				incrementPage={() => setCurrentVideoPage((prevState) => prevState + 1)}
				handleActionButtonClick={handleActionButtonClick}
			/>
			<Grid item xs={4} align='center'>
				<h4>{createdListVersion.smartListName}</h4>
			</Grid>
			<Grid item xs={4} align='right'>
				<Button
					style={{ marginLeft: 20 }}
					loading={
						props.isDownloadingExcel &&
						props.isDownloadingExcelVersionId === createdListVersion.versionId
					}
					onClick={() =>
						handleDownloadClick(
							createdListVersion.versionId,
							createdListVersion.smartListName
						)
					}
				>
					Download
				</Button>
			</Grid>

			<Grid item xs={12}>
				<Panel style={{ backgroundColor: neutralColor }}>
					<Grid container spacing={3}>
						<p>channel filters</p>
						<Grid item xs={12}>
							<TagPicker
								data={props.filterCountries}
								labelKey={'countryName'}
								valueKey={'countryCode'}
								block
								virtualized={true}
								placeholder='Countries'
								onChange={(val) => {
									handleFilterChange(filters.countries, val)
								}}
							/>
						</Grid>

						<Grid item xs={12}>
							<p>video filters</p>
							<TagPicker
								data={props.filterLanguages}
								labelKey={'languageName'}
								valueKey={'languageCode'}
								block
								virtualized={true}
								placeholder='Languages'
								onChange={(val) => {
									handleFilterChange(filters.languages, val)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TagPicker
								data={props.filterCategories}
								labelKey={'categoryName'}
								valueKey={'categoryId'}
								block
								virtualized={true}
								placeholder='Categories'
								onChange={(val) => {
									handleFilterChange(filters.categories, val)
								}}
							/>
						</Grid>

						<Grid item xs={12}>
							<Toggle
								checkedChildren='Only Kids Content'
								unCheckedChildren='No Kids Content'
								onChange={(bool) => handleFilterChange(filters.kids, bool)}
							/>
						</Grid>
					</Grid>
				</Panel>
			</Grid>

			<Grid item xs={12}>
				<ChannelsTable
					hasNextPage={props.hasNextPage}
					isNextPageLoading={isNextPageLoading}
					items={props.channels}
					incrementPage={() => setCurrentPage((prevState) => prevState + 1)}
					handleActionButtonClick={handleActionButtonClick}
					handleVideosClick={handleVideosClick}
				/>
			</Grid>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
