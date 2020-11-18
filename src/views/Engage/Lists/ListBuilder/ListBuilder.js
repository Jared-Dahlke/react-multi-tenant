import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ResultTable from './ResultTable'

import {
	fetchVideos,
	setVideos
} from '../../../../redux/actions/discover/channels'

const mapStateToProps = (state) => {
	return {
		videos: state.videos,
		brandProfiles: state.brandProfiles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setVideos: (videos) => dispatch(setVideos(videos)),
		fetchVideos: (channels, categories) =>
			dispatch(fetchVideos(channels, categories))
	}
}

function ListBuilder(props) {
	const history = useHistory()
	if (!props.location.state || props.location.state.from !== 'lists') {
		console.log(routes.app.engage.lists.lists.path)
		history.push(routes.app.engage.lists.lists.path)
	}

	const [hasNextPage, setHasNextPage] = React.useState(true)
	const [isNextPageLoading, setIsNextPageLoading] = React.useState(false)
	const [items, setItems] = React.useState([])

	const _loadNextPage = (index) => {
		console.log('loadNextPage')
		console.log(index)
		setIsNextPageLoading(true)
		setHasNextPage(items.length < 100000)
		setIsNextPageLoading(false)
		let pageNum = Math.round(index / 100)
		props.fetchVideos('', pageNum < 1 ? 1 : pageNum)
		//setItems(
		//	[...items].concat(
		//		new Array(10).fill(true).map(() => ({ name: Math.random() }))
		//	)
		//)
	}

	React.useEffect(() => {
		console.log('inside use effect')
		if (isNextPageLoading) {
		}
	}, [isNextPageLoading])

	//let fetchVideos = props.fetchVideos
	//React.useEffect(() => {
	//	fetchVideos('', 1)
	//}, [fetchVideos])

	console.log(props)

	return (
		<ResultTable
			hasNextPage={hasNextPage}
			isNextPageLoading={isNextPageLoading}
			items={props.videos}
			loadNextPage={_loadNextPage}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
