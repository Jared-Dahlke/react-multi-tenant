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
		fetchVideos: (query, pageNum) => dispatch(fetchVideos(query, pageNum)),
		fetchChannels: (query, pageNum) => dispatch(fetchChannels(query, pageNum))
	}
}

function ListBuilder(props) {
	const history = useHistory()
	if (!props.location.state || props.location.state.from !== 'lists') {
		history.push(routes.app.engage.lists.lists.path)
	}

	const [level, setLevel] = React.useState('channels')

	const [hasNextPage, setHasNextPage] = React.useState(true)
	const [isNextPageLoading, setIsNextPageLoading] = React.useState(false)
	const [items, setItems] = React.useState([])

	const _loadNextPage = (index) => {
		setIsNextPageLoading(true)
		setHasNextPage(items.length < 1000000)
		setIsNextPageLoading(false)
		let pageNum = Math.round(index / 100)
		if (level === 'channels') {
			props.fetchChannels('', pageNum < 1 ? 1 : pageNum + 1)
		} else {
			props.fetchVideos('', pageNum < 1 ? 1 : pageNum + 1)
		}
	}

	const handleToggle = (bool) => {
		if (bool) {
			setLevel('videos')
		} else {
			setLevel('channels')
		}
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
				/>
			</Grid>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
