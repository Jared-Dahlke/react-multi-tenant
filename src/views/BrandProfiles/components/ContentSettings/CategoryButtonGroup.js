import React from 'react'
import GridItem from '../../../../components/Grid/GridItem'
import GridContainer from '../../../../components/Grid/GridContainer'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import { neutralColor } from '../../../../assets/jss/colorContants'

export default function CategoryButtonGroup(props) {
	const handleClick = (val) => {
		let contentCategoryResponseId = val
		props.handleCategorySelect(
			props.category.contentCategoryId,
			contentCategoryResponseId
		)
	}

	return (
		<GridContainer>
			<GridItem xs={6} sm={6} md={6}>
				<div
					style={{
						color: 'white',
						fontSize: '16px',
						//	marginTop: '11px',
						float: 'right'
					}}
				>
					{props.category.contentCategoryName}
				</div>
			</GridItem>

			<GridItem xs={6} sm={6} md={6}>
				<ButtonGroup size='xs'>
					<Button
						key='0'
						id='0'
						onClick={(e) => handleClick(1)}
						color={
							props.category.contentCategoryResponseId == 1 ? 'green' : 'blue'
						}
					>
						Target
					</Button>
					<Button
						key='1'
						onClick={(e) => handleClick(2)}
						color={
							props.category.contentCategoryResponseId == 2 ? 'red' : 'blue'
						}
					>
						Block
					</Button>

					<Button
						key='2'
						onClick={(e) => handleClick(3)}
						color={
							props.category.contentCategoryResponseId == 3 ? 'yellow' : 'blue'
						}
					>
						No Action
					</Button>
				</ButtonGroup>
				<div style={{ color: neutralColor, height: 15 }} />
			</GridItem>
		</GridContainer>
	)
}
