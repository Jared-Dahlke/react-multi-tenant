import React from 'react'
import { connect } from 'react-redux'
import { fetchVersionStats } from '../../../../../redux/actions/engage/lists'
import '../components/listbuilder.css'
import numeral from 'numeral'
import Panel from 'rsuite/lib/Panel'

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
		fetchVersionStats(props.parsedVersionId)
	}, [])

	let stats = props.smartListStats

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
			<Panel>
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
				<p>
					Channels {numeral(stats.channelCount).format('0,0')}/
					{numeral(stats.totalChannelCount).format('0a')}
				</p>
				<p>Targeted: {numeral(stats.targetChannelCount).format('0,0')}</p>
				<p>Watched: {numeral(stats.watchChannelCount).format('0,0')}</p>
				<p>Blocked: {numeral(stats.blockChannelCount).format('0,0')}</p>
			</Panel>

			<Panel>
				<p>
					Videos {numeral(stats.videoCount).format('0,0')}/
					{numeral(stats.totalVideoCount).format('0a')}
				</p>
				<p>Targeted: {numeral(stats.targetVideoCount).format('0,0')}</p>
				<p>Watched: {numeral(stats.watchVideoCount).format('0,0')}</p>
				<p>Blocked: {numeral(stats.blockVideoCount).format('0,0')}</p>
			</Panel>

			<Panel>
				<p>
					Subscribers {numeral(stats.subscriberCount).format('0a')}/
					{numeral(stats.totalSubscriberCount).format('0a')}
				</p>
				<p>Targeted: {numeral(stats.targetSubscriberCount).format('0a')}</p>
				<p>Watched: {numeral(stats.watchSubscriberCount).format('0a')}</p>
				<p>Blocked: {numeral(stats.blockSubscriberCount).format('0a')}</p>
			</Panel>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
