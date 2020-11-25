import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ResultTable from './ResultTable'
import Toggle from 'rsuite/lib/Toggle'
import Grid from '@material-ui/core/Grid'
import WarningModal from './WarningModal'
import TagPicker from 'rsuite/lib/TagPicker'
import Panel from 'rsuite/lib/Panel'
import {
	fetchVideos,
	fetchChannels,
	setVideos,
	removeAllVideos,
	removeAllChannels,
	setChannels,
	setHasNextPage
} from '../../../../redux/actions/discover/channels'

import {
	fetchFilterCategories,
	fetchFilterCountries,
	fetchFilterLanguages
} from '../../../../redux/actions/engage/filters'

import {
	patchVersionData,
	deleteAllVersionData
} from '../../../../redux/actions/engage/lists'
import { neutralLightColor } from '../../../../assets/jss/colorContants'

const mapStateToProps = (state) => {
	return {
		videos: state.videos,
		channels: state.channels,
		brandProfiles: state.brandProfiles,
		filterCountries: state.engage.filterCountries,
		filterLanguages: state.engage.filterLanguages,
		filterCategories: state.engage.filterCategories,
		hasNextPage: state.hasNextPage
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
			dispatch(deleteAllVersionData(versionId))
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

	const handleAction = (args) => {
		args.versionId = createdListVersion.versionId
		args.data = [{ actionId: args.action, id: args.id }]
		props.patchVersionData(args)
	}

	const [filterState, setFilterState] = React.useState({ kids: false })

	const handleFilterChange = (filter, value) => {
		console.log(value)
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
				for (const country of value) {
					countries.push({ countryCode: country })
				}
				setFilterState((prevState) => {
					return {
						...prevState,
						countries
					}
				})

			default:
				break
		}
	}

	React.useEffect(() => {
		console.log('fiting filter change effect')
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
			<Grid item xs={12}>
				<Toggle
					size='lg'
					checkedChildren='Videos'
					unCheckedChildren='Channels'
					onChange={() => setShowWarning(true)}
					checked={!isChannels}
				/>
			</Grid>

			<Grid item xs={12} md={3}>
				<Panel
					bordered
					header='Filters'
					style={{ backgroundColor: neutralLightColor }}
				>
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
									/>
								</Grid>
								<Grid item xs={12}>
									<TagPicker
										data={props.filterCategories}
										labelKey={'categoryName'}
										valueKey={'categoryCode'}
										block
										virtualized={true}
										placeholder='Categories'
									/>
								</Grid>
							</>
						)}
						<Grid item xs={12}>
							<Toggle
								checkedChildren='Only Kids Content'
								unCheckedChildren='No Kids Content'
								onChange={(bool) => handleFilterChange(filters.kids, bool)}
								//	checked={!isChannels}
							/>
						</Grid>
					</Grid>
				</Panel>
			</Grid>

			<Grid item xs={9}>
				<ResultTable
					hasNextPage={props.hasNextPage}
					isNextPageLoading={isNextPageLoading}
					items={isChannels ? props.channels : props.videos}
					loadNextPage={_loadNextPage}
					handleAction={(args) => handleAction(args)}
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
