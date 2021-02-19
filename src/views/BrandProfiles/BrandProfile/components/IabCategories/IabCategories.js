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
				iabCategories: iabCategoriesFilter
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

	const handleSetBrandProfiles = (categories) => {
		let categoriesCopy = JSON.parse(JSON.stringify(categories))
		//	brandProfile.categories = categories
		props.setBrandProfileCategories(categoriesCopy)
	}

	const handleCategorySelect = (
		contentCategoryId,
		contentCategoryResponseId
	) => {
		let data = {
			contentCategoryId: contentCategoryId,
			contentCategoryResponseId: contentCategoryResponseId
		}
		let newCategories = JSON.parse(
			JSON.stringify(props.brandProfile.categories)
		)
		setCategoryAction(data, newCategories)
		handleSetBrandProfiles(newCategories)
		let newFinalCategories = JSON.parse(JSON.stringify(newCategories))
		let params = {
			categories: newFinalCategories,
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileCategories(params)
	}

	return (
		<Panel header='IAB Categories' bordered>
			<IabCategoriesTree />
		</Panel>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(IabCategories)
