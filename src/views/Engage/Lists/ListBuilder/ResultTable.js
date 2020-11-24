import React from 'react'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import Grid from '@material-ui/core/Grid'
import Radio from 'rsuite/lib/Radio'
import RadioGroup from 'rsuite/lib/RadioGroup'

export default function ResultTable({
	// Are there more items to load?
	// (This information comes from the most recent API request.)
	hasNextPage,

	// Are we currently loading a page of items?
	// (This may be an in-flight flag in your Redux store for example.)
	isNextPageLoading,

	// Array of items loaded so far.
	items,

	// Callback function responsible for loading the next page of items.
	loadNextPage
}) {
	// If there are more items to be loaded then add an extra row to hold a loading indicator.
	const itemCount = hasNextPage ? items.length + 1 : items.length

	// Only load 1 page of items at a time.
	// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage

	// Every row is loaded except for our loading indicator row.
	const isItemLoaded = (index) => !hasNextPage || index < items.length

	// Render an item or a loading indicator.
	const Item = ({ index, style }) => {
		console.log(style)
		let content
		if (!isItemLoaded(index)) {
			content = 'Loading...'
		} else {
			content = items[index].name
		}

		return (
			<Grid container style={style}>
				<Grid item xs={6}>
					{content}
				</Grid>
				<Grid item xs={6}>
					<RadioGroup
						inline
						value={'target'}
						onChange={(value) => {
							console.log('clicked', value)
							console.log(content.name)
							//	setUploadType(value)
							//	setFieldValue('uploadType', value)
						}}
					>
						<Radio value='target'>Target</Radio>
						<Radio value='watch'>Watch</Radio>
						<Radio value='block'>Block</Radio>
					</RadioGroup>
				</Grid>
			</Grid>
		)
	}

	return (
		<InfiniteLoader
			isItemLoaded={isItemLoaded}
			itemCount={itemCount}
			loadMoreItems={loadMoreItems}
		>
			{({ onItemsRendered, ref }) => (
				<List
					className='List'
					height={500}
					itemCount={itemCount}
					itemSize={50}
					onItemsRendered={onItemsRendered}
					ref={ref}
					width={800}
				>
					{Item}
				</List>
			)}
		</InfiniteLoader>
	)
}
