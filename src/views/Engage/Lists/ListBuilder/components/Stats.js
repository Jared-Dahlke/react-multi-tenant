import React from 'react'
import { connect } from 'react-redux'
import { fetchVersionStats } from '../../../../../redux/actions/engage/lists'

const mapStateToProps = (state) => {
	return {
		smartListVersionUnderEdit: state.engage.smartListVersionUnderEdit
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

	return <div>stats</div>
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
