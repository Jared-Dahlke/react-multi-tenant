import React from 'react'
import CategoryButtonGroup from './CategoryButtonGroup'
import Panel from 'rsuite/lib/Panel'
import { connect } from 'react-redux'
import {
	patchBrandProfileCategories,
	fetchBrandProfileCategories,
	setBrandProfiles
} from '../../../redux/actions/brandProfiles'
import { brandProfileModel } from '../Model'

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		brandProfileIdUnderEdit: state.brandProfileIdUnderEdit,
		categories: state.brandCategories,
		brandProfiles: state.brandProfiles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileCategories: (data) =>
			dispatch(patchBrandProfileCategories(data)),
		fetchBrandProfileCategories: (data) =>
			dispatch(fetchBrandProfileCategories(data)),
		setBrandProfiles: (brandProfiles) =>
			dispatch(setBrandProfiles(brandProfiles))
	}
}

function setCategoryAction(data, categories) {
	const contentCategoryId = data.contentCategoryId
	let value = Number(data.contentCategoryResponseId)
	for (const category of categories) {
		if (category.contentCategoryId === contentCategoryId) {
			if (category.contentCategoryResponseId === value) {
				value = 3
			}
			category.contentCategoryResponseId = value
		}
	}
}

function Categories(props) {
	const [fetched, setFetched] = React.useState(false)
	React.useEffect(() => {
		if (!fetched) {
			if (props.brandProfile && props.brandProfile.brandProfileId) {
				props.fetchBrandProfileCategories(props.brandProfile.brandProfileId)
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

	const handleSetBrandProfiles = (categories) => {
		let brandProfilesCopy = JSON.parse(JSON.stringify(props.brandProfiles))
		for (const brandProfile of brandProfilesCopy) {
			if (brandProfile.brandProfileId === props.brandProfile.brandProfileId) {
				brandProfile.categories = categories
			}
		}
		props.setBrandProfiles(brandProfilesCopy)
	}

	const handleCategorySelect = (
		contentCategoryId,
		contentCategoryResponseId
	) => {
		props.setCategoriesValid(true)
		let data = {
			contentCategoryId: contentCategoryId,
			contentCategoryResponseId: contentCategoryResponseId
		}
		let newCategories = JSON.parse(
			JSON.stringify(props.brandProfile.categories)
		)
		setCategoryAction(data, newCategories)
		//setBrandProfilessetComponentCategories(newCategories)
		handleSetBrandProfiles(newCategories)
		let newFinalCategories = JSON.parse(JSON.stringify(newCategories))
		let params = {
			categories: newFinalCategories,
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileCategories(params)
	}

	return (
		<Panel header='Categories' bordered>
			<div>
				{props.brandProfile.categories &&
					props.brandProfile.categories.length > 0 &&
					props.brandProfile.categories.map((category, index) => {
						return (
							<CategoryButtonGroup
								category={category}
								key={index}
								handleCategorySelect={handleCategorySelect}
							/>
						)
					})}
			</div>
		</Panel>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
