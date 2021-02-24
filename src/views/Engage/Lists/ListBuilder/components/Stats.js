import React from 'react'
import { connect } from 'react-redux'
import { fetchVersionStats } from '../../../../../redux/actions/engage/lists'
import '../components/listbuilder.css'
import numeral from 'numeral'
import CustomPie from './CustomPie'

const mapStateToProps = (state) => {
	return {
		smartListStatsLoading: state.engage.smartListStatsLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchVersionStats: (versionId) => dispatch(fetchVersionStats(versionId))
	}
}

const Stats = (props) => {
	let fetchVersionStats = props.fetchVersionStats
	React.useEffect(() => {
		//fetchVersionStats(props.parsedVersionId)
	}, [])

	let stats = props.smartListStats

	const channelsData = {
		data: [
			stats.targetChannelCount,
			stats.watchChannelCount,
			stats.blockChannelCount
		],
		legendData: [
			numeral(stats.targetChannelCount).format('0a'),
			numeral(stats.watchChannelCount).format('0a'),
			numeral(stats.blockChannelCount).format('0a')
		]
	}

	const videosData = {
		data: [
			stats.targetVideoCount,
			stats.watchVideoCount,
			stats.blockVideoCount
		],
		legendData: [
			numeral(stats.targetVideoCount).format('0a'),
			numeral(stats.watchVideoCount).format('0a'),
			numeral(stats.blockVideoCount).format('0a')
		]
	}

	const subscribersData = {
		data: [
			stats.targetSubscriberCount,
			stats.watchSubscriberCount,
			stats.blockSubscriberCount
		],
		legendData: [
			numeral(stats.targetSubscriberCount).format('0a'),
			numeral(stats.watchSubscriberCount).format('0a'),
			numeral(stats.blockSubscriberCount).format('0a')
		]
	}

	return (
		<div>
			<div style={{ position: 'relative' }}>
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						color: 'grey'
					}}
				>
					{' '}
					{props.smartListStatsLoading ? 'Loading...' : ''}
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<CustomPie data={channelsData} title='Channels' />
				<CustomPie data={videosData} title='Videos' />
				<CustomPie data={subscribersData} title='Subscribers' />
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
