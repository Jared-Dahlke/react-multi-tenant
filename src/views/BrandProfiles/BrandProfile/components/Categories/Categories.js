import React from 'react'
import CategoryButtonGroup from './CategoryButtonGroup'
import Panel from '../../../../../components/CustomPanel'
import { connect } from 'react-redux'
import {
	patchBrandProfileCategories,
	fetchBrandProfileCategories,
	setBrandProfileCategories
} from '../../../../../redux/actions/brandProfiles'

const mapStateToProps = (state) => {
	return {
		brandProfile: state.brandProfileUnderEdit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileCategories: (data) =>
			dispatch(patchBrandProfileCategories(data)),
		fetchBrandProfileCategories: (data) =>
			dispatch(fetchBrandProfileCategories(data)),
		setBrandProfileCategories: (cats) =>
			dispatch(setBrandProfileCategories(cats))
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
			props.fetchBrandProfileCategories(props.brandProfileId)
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
