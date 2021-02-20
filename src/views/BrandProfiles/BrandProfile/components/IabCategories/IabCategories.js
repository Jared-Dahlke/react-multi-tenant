import React from 'react'
import IabCategoriesTree from '../../../../../components/IabCategoriesTree'
import Panel from '../../../../../components/CustomPanel'
import { connect } from 'react-redux'
import { fetchBrandProfileIabCategories } from '../../../../../redux/actions/brandProfiles'
import { iabCategoriesFilter } from '../../../../../staticData/iabCategories'

const mapStateToProps = (state) => {
	return {
		brandProfile: state.brandProfileUnderEdit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBrandProfileIabCategories: (args) =>
			dispatch(fetchBrandProfileIabCategories(args))
	}
}

function IabCategories(props) {
	const [fetched, setFetched] = React.useState(false)
	React.useEffect(() => {
		if (!fetched) {
			let params = {
				brandProfileId: props.brandProfileId,
				iabCategories: JSON.parse(JSON.stringify(iabCategoriesFilter))
			}
			props.fetchBrandProfileIabCategories(params)
			setFetched(true)
		}
	}, [])

	React.useEffect(() => {
		return () => {
			setFetched(false)
		}
	}, [])

	return (
		<Panel header='IAB Categories' bordered>
			<IabCategoriesTree />
		</Panel>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(IabCategories)
