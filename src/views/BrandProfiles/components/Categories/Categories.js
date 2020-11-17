import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor } from '../../../../assets/jss/material-dashboard-react'
import Divider from 'rsuite/lib/Divider'
import CategoryButtonGroup from './CategoryButtonGroup'

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

export default function Categories(props) {
	const handleCategorySelect = (
		contentCategoryId,
		contentCategoryResponseId
	) => {
		let data = {
			contentCategoryId: contentCategoryId,
			contentCategoryResponseId: contentCategoryResponseId
		}
		let newCategories = JSON.parse(JSON.stringify(props.values.categories))
		setCategoryAction(data, newCategories)
		props.setFieldValue('categories', newCategories)
	}

	React.useEffect(() => {
		props.setFieldValue('categories', props.categories)
	}, [props.categories])
	return (
		<div>
			<Divider style={{ color: 'white' }}>Categories</Divider>

			<div>
				{props.categories &&
					props.categories.length > 0 &&
					props.categories.map((category, index) => {
						return (
							<CategoryButtonGroup
								category={category}
								key={index}
								handleCategorySelect={handleCategorySelect}
							/>
						)
					})}
				<div>
					{props.errors.categories ? (
						<FormHelperText
							id='component-helper-text'
							style={{
								color: dangerColor[0],
								fontSize: '16px',
								position: 'absolute',
								bottom: -20
							}}
						>
							{props.errors.categories}
						</FormHelperText>
					) : null}
				</div>
			</div>
		</div>
	)
}
