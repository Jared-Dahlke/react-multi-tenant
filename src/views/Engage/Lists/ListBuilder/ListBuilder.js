import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ResultTable from './ResultTable'
import Toggle from 'rsuite/lib/Toggle'
import Grid from '@material-ui/core/Grid'

import {
	fetchVideos,
	fetchChannels,
	setVideos
} from '../../../../redux/actions/discover/channels'

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
		patchVersionData: (params) => dispatch(patchVersionData(params))
	}
}

function ListBuilder(props) {
	const history = useHistory()
	console.log('list builder props')
	console.log(props)
	if (!props.location.state || props.location.state.from !== 'lists') {
		history.push(routes.app.engage.lists.lists.path)
	}

	const [createdListVersion, setCreatedListVersion] = React.useState(
		props.location.state.createdListVersion
	)

	const [level, setLevel] = React.useState('channels')

	const [hasNextPage, setHasNextPage] = React.useState(true)
	const [isNextPageLoading, setIsNextPageLoading] = React.useState(false)
	const [items, setItems] = React.useState([])

	const _loadNextPage = (index) => {
		setIsNextPageLoading(true)
		setHasNextPage(items.length < 1000000)
		setIsNextPageLoading(false)
		let pageNum = Math.round(index / 100)
		let params = {
			versionId: createdListVersion.versionId,
			pageNumber: pageNum < 1 ? 1 : pageNum + 1
		}
		if (level === 'channels') {
			props.fetchChannels(params)
		} else {
			props.fetchVideos(params)
		}
	}

	const handleToggle = (bool) => {
		if (bool) {
			setLevel('videos')
		} else {
			setLevel('channels')
		}
	}

	const handleAction = (args) => {
		console.log(args)
		//args.item.actionId = args.action
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
					onChange={(bool) => handleToggle(bool)}
				/>
			</Grid>
			<Grid item xs={12}>
				<ResultTable
					hasNextPage={hasNextPage}
					isNextPageLoading={isNextPageLoading}
					items={level === 'videos' ? props.videos : props.channels}
					loadNextPage={_loadNextPage}
					handleAction={(args) => handleAction(args)}
				/>
			</Grid>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
