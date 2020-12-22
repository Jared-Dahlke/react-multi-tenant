import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ResultTable from './components/ResultTable'
import Toggle from 'rsuite/lib/Toggle'
import Grid from '@material-ui/core/Grid'
import WarningModal from './WarningModal'
import TagPicker from 'rsuite/lib/TagPicker'
import Panel from 'rsuite/lib/Panel'
import Button from 'rsuite/lib/Button'
import {
	fetchVideos,
	fetchChannels,
	setVideos,
	removeAllVideos,
	removeAllChannels,
	setChannels,
	setHasNextPage
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
import {
	neutralLightColor,
	neutralExtraLightColor,
	neutralColor
} from '../../../../assets/jss/colorContants'

const mapStateToProps = (state) => {
	return {
		videos: state.engage.videos,
		channels: state.engage.channels,
		hasNextPage: state.engage.hasNextPage,
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

	const [createdListVersion, setCreatedListVersion] = React.useState(
		props.location.state.createdListVersion
	)

	const [isChannels, setIsChannels] = React.useState(true)

	const [isNextPageLoading, setIsNextPageLoading] = React.useState(false)

	React.useEffect(() => {
		props.removeAllChannels()
		props.removeAllVideos()
		props.fetchFilterCategories()
		props.fetchFilterCountries()
		props.fetchFilterLanguages()
	}, [])

	React.useEffect(() => {
		_loadNextPage(0)
	}, [props.deleteAllVersionDataSuccess])

	const _loadNextPage = (index) => {
		setIsNextPageLoading(true)
		props.setHasNextPage(true) // TODO: make this dynamic
		setIsNextPageLoading(false)
		let pageNum = Math.round(index / 100)
		let params = {
			versionId: createdListVersion.versionId,
			pageNumber: pageNum < 1 ? 1 : pageNum + 1,
			filters: filterState
		}
		if (isChannels) {
			props.fetchChannels(params)
		} else {
			props.fetchVideos(params)
		}
	}

	const filters = {
		kids: 'kids',
		categories: 'categories',
		languages: 'languages',
		countries: 'countries'
	}

	const [showWarning, setShowWarning] = React.useState(false)

	const executeToggle = () => {
		setIsChannels((prevState) => !prevState)
		setShowWarning(false)
		props.removeAllChannels()
		props.removeAllVideos()
		props.deleteAllVersionData(createdListVersion.versionId)
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
			props.patchVersionData(args)
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
			//props.setHasNextPage(true)

			props.removeAllChannels()
			props.removeAllVideos()

			_loadNextPage(0)
		}
		hasMountedRef.current = true
	}, [filterState])

	return (
		<Grid container spacing={3}>
			<Grid item xs={4} align='left'>
				<Toggle
					size='lg'
					checkedChildren='Videos'
					unCheckedChildren='Channels'
					onChange={() => setShowWarning(true)}
					checked={!isChannels}
				/>
			</Grid>

			<Grid item xs={4} align='center'>
				<h5>{createdListVersion.smartListName}</h5>
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
						{isChannels && (
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
						)}

						{!isChannels && (
							<>
								<Grid item xs={12}>
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
							</>
						)}
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
				<ResultTable
					hasNextPage={props.hasNextPage}
					isNextPageLoading={isNextPageLoading}
					items={isChannels ? props.channels : props.videos}
					loadNextPage={_loadNextPage}
					handleActionButtonClick={handleActionButtonClick}
					isChannels={isChannels}
				/>
			</Grid>
			<WarningModal
				show={showWarning}
				handleClose={() => setShowWarning(false)}
				executeToggle={executeToggle}
			/>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
