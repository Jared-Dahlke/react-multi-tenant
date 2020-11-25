import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ResultTable from './ResultTable'
import Toggle from 'rsuite/lib/Toggle'
import Grid from '@material-ui/core/Grid'
import WarningModal from './WarningModal'
import {
	fetchVideos,
	fetchChannels,
	setVideos,
	removeAllVideos,
	removeAllChannels,
	setChannels
} from '../../../../redux/actions/discover/channels'

import {
	fetchFilterCategories,
	fetchFilterCountries,
	fetchFilterLanguages
} from '../../../../redux/actions/engage/filters'

import { patchVersionData } from '../../../../redux/actions/engage/lists'

const mapStateToProps = (state) => {
	return {
		videos: state.videos,
		channels: state.channels,
		brandProfiles: state.brandProfiles
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
		fetchFilterLanguages: () => dispatch(fetchFilterLanguages())
	}
}

function ListBuilder(props) {
	const history = useHistory()
	if (!props.location.state || props.location.state.from !== 'lists') {
		history.push(routes.app.engage.lists.lists.path)
	}

	const [createdListVersion, setCreatedListVersion] = React.useState(
		props.location.state.createdListVersion
	)

	const [isChannels, setIsChannels] = React.useState(true)

	const [hasNextPage, setHasNextPage] = React.useState(true)
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
		setHasNextPage(true) // TODO: make this dynamic
		setIsNextPageLoading(false)
		let pageNum = Math.round(index / 100)
		let params = {
			versionId: createdListVersion.versionId,
			pageNumber: pageNum < 1 ? 1 : pageNum + 1
		}
		if (isChannels) {
			props.fetchChannels(params)
		} else {
			props.fetchVideos(params)
		}
	}

	const [showWarning, setShowWarning] = React.useState(false)

	const executeToggle = () => {
		setIsChannels((prevState) => !prevState)
		setShowWarning(false)
		props.deleteAllVersionData(createdListVersion)
	}

	const handleAction = (args) => {
		args.versionId = createdListVersion.versionId
		args.data = [{ actionId: args.action, id: args.id }]
		props.patchVersionData(args)
	}

	React.useEffect(() => {
		if (isNextPageLoading) {
		}
	}, [isNextPageLoading])

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
			<Grid item xs={12}>
				<ResultTable
					hasNextPage={hasNextPage}
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
