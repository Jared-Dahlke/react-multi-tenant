import React from 'react'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import Grid from '@material-ui/core/Grid'
import Radio from 'rsuite/lib/Radio'
import RadioGroup from 'rsuite/lib/RadioGroup'
import Panel from 'rsuite/lib/Panel'

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
	loadNextPage,

	handleAction
}) {
	// We create a reference for the InfiniteLoader
	const infiniteLoaderRef = React.useRef(null)
	const hasMountedRef = React.useRef(false)

	const [actionsTaken, setActionsTaken] = React.useState(0)

	// Each time the sort prop changed we called the method resetloadMoreItemsCache to clear the cache
	React.useEffect(() => {
		console.log('running use effect loader')
		// We only need to reset cached items when "sortOrder" changes.
		// This effect will run on mount too; there's no need to reset in that case.
		if (hasMountedRef.current) {
			if (infiniteLoaderRef.current) {
				infiniteLoaderRef.current.resetloadMoreItemsCache()
			}
		}
		hasMountedRef.current = true
	}, [actionsTaken])

	// If there are more items to be loaded then add an extra row to hold a loading indicator.
	const itemCount = hasNextPage ? items.length + 1 : items.length

	// Only load 1 page of items at a time.
	// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage

	// Every row is loaded except for our loading indicator row.
	const isItemLoaded = (index) => !hasNextPage || index < items.length

	// Render an item or a loading indicator.
	const Item = ({ index, style }) => {
		if (!isItemLoaded(index)) {
			return <div style={style}>Loading...</div>
		} else {
			let item = items[index]
			let imgUrl =
				'https://source.unsplash.com/random/100x100/?' +
				item.name[0] +
				item.name[1]
			return (
				<div style={style}>
					<Panel
						bordered
						style={{ marginBottom: 20, marginRight: 20 }}
						header={item.name}
					>
						<Grid container>
							<Grid item xs={6}></Grid>
							<Grid item xs={6}>
								<RadioGroup
									inline
									value={item.actionId}
									onChange={(action) => {
										item.actionId = action
										let params = {
											action,
											id: item.id
											//		item
										}
										setActionsTaken((prevState) => prevState + 1)
										handleAction(params)
									}}
								>
									<Radio value={1}>Target</Radio>
									<Radio value={3}>Watch</Radio>
									<Radio value={2}>Block</Radio>
								</RadioGroup>
							</Grid>
						</Grid>
					</Panel>
				</div>
			)
		}
	}

	return (
		<InfiniteLoader
			ref={infiniteLoaderRef}
			isItemLoaded={isItemLoaded}
			itemCount={itemCount}
			loadMoreItems={loadMoreItems}
		>
			{({ onItemsRendered, ref }) => (
				<List
					className='List'
					height={500}
					itemCount={itemCount}
					itemSize={140}
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
