import React from 'react'
import { connect } from 'react-redux'
import { fetchVersionStats } from '../../../../../redux/actions/engage/lists'
import '../components/listbuilder.css'
import numeral from 'numeral'
import ChartistGraph from 'react-chartist'
import Panel from 'rsuite/lib/Panel'
import CustomPanel from '../../../../../components/CustomPanel'
import { neutralColor } from '../../../../../assets/jss/colorContants'
import Loader from 'rsuite/lib/Loader'

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

	const getData = (args) => {
		var data = {
			labels: ['Target', 'Watch', 'Block'],
			series: [
				{
					value: args.target,
					className: 'pie-target'
				},
				{
					value: args.watch,
					className: 'pie-watch'
				},
				{
					value: args.block,
					className: 'pie-block'
				}
			]
		}

		return data
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
			{props.smartListStatsLoading ? (
				<Panel>Loading stats...</Panel>
			) : (
				<Panel>
					<p>
						Channels {numeral(stats.channelCount).format('0,0')}/
						{numeral(stats.totalChannelCount).format('0a')}
					</p>
					<p>Targeted: {numeral(stats.targetChannelCount).format('0,0')}</p>
					<p>Watched: {numeral(stats.watchChannelCount).format('0,0')}</p>
					<p>Blocked: {numeral(stats.blockChannelCount).format('0,0')}</p>
				</Panel>
			)}

			{props.smartListStatsLoading ? (
				<Panel>Loading stats...</Panel>
			) : (
				<Panel>
					<p>
						Videos {numeral(stats.videoCount).format('0,0')}/
						{numeral(stats.totalVideoCount).format('0a')}
					</p>
					<p>Targeted: {numeral(stats.targetVideoCount).format('0,0')}</p>
					<p>Watched: {numeral(stats.watchVideoCount).format('0,0')}</p>
					<p>Blocked: {numeral(stats.blockVideoCount).format('0,0')}</p>
				</Panel>
			)}

			{props.smartListStatsLoading ? (
				<Panel>Loading stats...</Panel>
			) : (
				<Panel>
					<p>
						Subscribers {numeral(stats.subscriberCount).format('0a')}/
						{numeral(stats.totalSubscriberCount).format('0a')}
					</p>
					<p>Targeted: {numeral(stats.targetSubscriberCount).format('0a')}</p>
					<p>Watched: {numeral(stats.watchSubscriberCount).format('0a')}</p>
					<p>Blocked: {numeral(stats.blockSubscriberCount).format('0a')}</p>
				</Panel>
			)}
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
