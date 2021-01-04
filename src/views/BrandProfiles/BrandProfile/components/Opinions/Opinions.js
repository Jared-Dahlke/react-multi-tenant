import React from 'react'
import CustomRadio from './CustomRadio'
import { connect } from 'react-redux'
import {
	patchBrandProfileOpinions,
	fetchBrandProfileOpinions,
	setBrandProfileOpinions
} from '../../../../../redux/actions/brandProfiles'
import Panel from '../../../../../components/CustomPanel'

const mapStateToProps = (state) => {
	return {
		brandProfile: state.brandProfileUnderEdit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileOpinions: (data) =>
			dispatch(patchBrandProfileOpinions(data)),
		fetchBrandProfileOpinions: (data) =>
			dispatch(fetchBrandProfileOpinions(data)),
		setBrandProfileOpinions: (opinions) =>
			dispatch(setBrandProfileOpinions(opinions))
	}
}

function setOpinionAction(data, opinions) {
	const opinionId = data.opinionId
	const value = Number(data.opinionResponseId)

	for (const opinion of opinions) {
		if (opinion.opinionId === opinionId) {
			opinion.opinionResponseId = value
		}
	}
}

function checkResponse(opinion) {
	return opinion.opinionResponseId > 0
}

function Opinions(props) {
	const [fetched, setFetched] = React.useState(false)
	React.useEffect(() => {
		if (!fetched) {
			props.fetchBrandProfileOpinions(props.brandProfileId)
			setFetched(true)
		}
	}, [])

	React.useEffect(() => {
		return () => {
			setFetched(false)
		}
	}, [])

	const handleSetBrandProfiles = (opinions) => {
		let opinionsCopy = JSON.parse(JSON.stringify(opinions))
		props.setBrandProfileOpinions(opinionsCopy)
	}

	const handleOpinionSelect = (opinionId, opinionResponseId) => {
		let data = {
			opinionId: opinionId,
			opinionResponseId: opinionResponseId
		}
		let newopinions = JSON.parse(JSON.stringify(props.brandProfile.opinions))
		setOpinionAction(data, newopinions)
		handleSetBrandProfiles(newopinions)

		let params = {
			opinions: [data],
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileOpinions(params)
	}

	return (
		<Panel bordered header='Opinions'>
			<div>
				{props.brandProfile.opinions &&
					props.brandProfile.opinions.length > 0 &&
					props.brandProfile.opinions.map((opinion, index) => {
						return (
							<CustomRadio
								key={index}
								handleOpinionSelect={handleOpinionSelect}
								opinion={opinion}
							/>
						)
					})}
			</div>
		</Panel>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Opinions)
