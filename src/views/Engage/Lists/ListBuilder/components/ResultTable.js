import React from 'react'
import { FixedSizeList as InfiniteList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import Video from './Video'
import debounce from 'just-debounce-it'
import Channel from './Channel'
import Table from 'rsuite/lib/Table'
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
	incrementPage,

	handleActionButtonClick
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

	const handleScroll = debounce(() => {
		incrementPage()
	}, 800)

	const ImageCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell
				{...props}
				className='link-group'
				style={{ align: 'center', padding: 5 }}
			>
				<img
					src={rowData.thumbnail}
					width={'45%'}
					style={{ borderRadius: 180 }}
				/>
			</Table.Cell>
		)
	}

	return (
		<Table
			virtualized
			height={600}
			rowHeight={80}
			data={items}
			shouldUpdateScroll={false}
			onScroll={() => {
				handleScroll()
			}}
		>
			<Table.Column verticalAlign={'middle'}>
				<Table.HeaderCell></Table.HeaderCell>
				<ImageCell />
			</Table.Column>

			<Table.Column verticalAlign={'middle'} resizable>
				<Table.HeaderCell>Name</Table.HeaderCell>
				<Table.Cell dataKey='name' />
			</Table.Column>
			<Table.Column verticalAlign={'middle'}>
				<Table.HeaderCell>Date</Table.HeaderCell>
				<Table.Cell dataKey='createDate' style={{ color: 'grey' }} />
			</Table.Column>
			<Table.Column verticalAlign={'middle'}>
				<Table.HeaderCell>Id</Table.HeaderCell>
				<Table.Cell dataKey='id' style={{ color: 'grey' }} />
			</Table.Column>
			<Table.Column verticalAlign={'middle'}>
				<Table.HeaderCell>Category</Table.HeaderCell>
				<Table.Cell dataKey='categoryName' />
			</Table.Column>
			<Table.Column verticalAlign={'middle'} flexGrow={1}>
				<Table.HeaderCell>Description</Table.HeaderCell>
				<Table.Cell dataKey='abbreviatedDescription' />
			</Table.Column>
			<Table.Column verticalAlign={'middle'} flexGrow={1}>
				<Table.HeaderCell>Subscribers</Table.HeaderCell>
				<Table.Cell dataKey='subscribersCount' />
			</Table.Column>
			<Table.Column verticalAlign={'middle'} flexGrow={1}>
				<Table.HeaderCell>Videos</Table.HeaderCell>
				<Table.Cell dataKey='videosCount' />
			</Table.Column>
			<Table.Column verticalAlign={'middle'} flexGrow={1}>
				<Table.HeaderCell>Views</Table.HeaderCell>
				<Table.Cell dataKey='viewsCount' />
			</Table.Column>
		</Table>
	)
}
