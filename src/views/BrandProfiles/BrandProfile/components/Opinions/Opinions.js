import React from 'react'
import CustomRadio from './CustomRadio'
import { connect } from 'react-redux'
import {
	patchBrandProfileOpinions,
	fetchBrandProfileOpinions,
	setBrandProfiles
} from '../../../../../redux/actions/brandProfiles'
import Panel from 'rsuite/lib/Panel'

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		brandProfileIdUnderEdit: state.brandProfileIdUnderEdit,
		brandProfiles: state.brandProfiles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileOpinions: (data) =>
			dispatch(patchBrandProfileOpinions(data)),
		fetchBrandProfileOpinions: (data) =>
			dispatch(fetchBrandProfileOpinions(data)),
		setBrandProfiles: (brandProfiles) =>
			dispatch(setBrandProfiles(brandProfiles))
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
			if (props.brandProfile && props.brandProfile.brandProfileId) {
				props.fetchBrandProfileOpinions(props.brandProfile.brandProfileId)
				setFetched(true)
			}
		}
	}, [props.brandProfile])

	React.useEffect(() => {
		return () => {
			//clean up on unmount
			setFetched(false)
		}
	}, [])

	const handleSetBrandProfiles = (opinions) => {
		let brandProfilesCopy = JSON.parse(JSON.stringify(props.brandProfiles))
		for (const brandProfile of brandProfilesCopy) {
			if (brandProfile.brandProfileId === props.brandProfile.brandProfileId) {
				brandProfile.opinions = opinions
			}
		}
		props.setBrandProfiles(brandProfilesCopy)
	}

	const handleOpinionSelect = (opinionId, opinionResponseId) => {
		let data = {
			opinionId: opinionId,
			opinionResponseId: opinionResponseId
		}
		let newopinions = JSON.parse(JSON.stringify(props.brandProfile.opinions))
		setOpinionAction(data, newopinions)
		handleSetBrandProfiles(newopinions)

		let scenToSave = JSON.parse(JSON.stringify(newopinions))
		for (const [index, scen] of scenToSave.entries()) {
			delete scen.question
			delete scen.brandProfileId
			delete scen.opinionType
			delete scen.opinionResponseName
		}

		let params = {
			opinions: scenToSave.filter(checkResponse),
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileOpinions(params)

		let valid = true
		for (const scen of props.brandProfile.opinions) {
			if (scen.opinionResponseId === '') {
				valid = false
			}
		}
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
