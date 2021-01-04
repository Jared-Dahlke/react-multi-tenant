import React from 'react'
import { FixedSizeList as InfiniteList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import Video from './Video'
import Channel from './Channel'
var dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

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

	handleActionButtonClick,
	isChannels
}) {
	// We create a reference for the InfiniteLoader
	const infiniteLoaderRef = React.useRef(null)
	const hasMountedRef = React.useRef(false)

	const [actionsTaken, setActionsTaken] = React.useState(0)

	// Each time the sort prop changed we called the method resetloadMoreItemsCache to clear the cache
	React.useEffect(() => {
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
			let abbreviatedDescription
			if (!item.description) {
				abbreviatedDescription = '[No description]'
			} else if (item.description.length > 40) {
				abbreviatedDescription = item.description.substring(0, 40) + '...'
			} else if (!item.description.replace(/\s/g, '').length) {
				abbreviatedDescription = '[No description]'
			} else {
				abbreviatedDescription = item.description
			}

			let createDate = item.created
				? dayjs(item.created).calendar()
				: dayjs(item.published).calendar()
			let name = item.name.replace(/\s/g, '').length ? item.name : '[No name]'
			let description
			if (!item.description) {
				description = '[No description]'
			} else if (!item.description.replace(/\s/g, '').length) {
				description = '[No description]'
			} else {
				description = item.description.substring(0, 500)
			}

			if (isChannels) {
				return (
					<Channel
						item={item}
						name={name}
						style={style}
						createDate={createDate}
						description={description}
						abbreviatedDescription={abbreviatedDescription}
						handleActionButtonClick={handleActionButtonClick}
						setActionsTaken={setActionsTaken}
					/>
				)
			} else {
				return (
					<Video
						item={item}
						name={name}
						style={style}
						createDate={createDate}
						description={description}
						abbreviatedDescription={abbreviatedDescription}
						handleActionButtonClick={handleActionButtonClick}
						setActionsTaken={setActionsTaken}
					/>
				)
			}
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
				<InfiniteList
					className='List'
					height={500}
					itemCount={itemCount}
					itemSize={isChannels ? 290 : 430}
					onItemsRendered={onItemsRendered}
					ref={ref}
					width={'100%'}
				>
					{Item}
				</InfiniteList>
			)}
		</InfiniteLoader>
	)
}
