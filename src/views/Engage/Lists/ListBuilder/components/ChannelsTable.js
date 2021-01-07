import React from 'react'
import { FixedSizeList as InfiniteList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import Video from './Video'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import debounce from 'just-debounce-it'
import Table from 'rsuite/lib/Table'
import countryCodeToFlagEmoji from 'country-code-to-flag-emoji'
import IconButton from 'rsuite/lib/IconButton'
import Icon from 'rsuite/lib/Icon'
import { accentColor } from '../../../../../assets/jss/colorContants'
var dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

export default function ChannelsTable({
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

	handleActionButtonClick,
	handleVideosClick
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
				//	infiniteLoaderRef.current.resetloadMoreItemsCache()
			}
		}
		hasMountedRef.current = true
	}, [actionsTaken])

	const handleScroll = debounce(() => {
		incrementPage()
	}, 1200)

	const ActionCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell {...props} className='link-group' style={{ padding: 1 }}>
				<ButtonGroup vertical={false} size='xs'>
					<Button
						appearance={'ghost'}
						active={rowData.actionId === 1}
						style={{
							backgroundColor: rowData.actionId === 1 ? accentColor : ''
						}}
						onClick={() => {
							handleActionButtonClick(1, rowData)
							setActionsTaken((prevState) => prevState + 1)
						}}
					>
						Target
					</Button>
					<Button
						appearance={'ghost'}
						active={rowData.actionId === 3}
						style={{
							backgroundColor: rowData.actionId === 3 ? accentColor : ''
						}}
						onClick={() => {
							handleActionButtonClick(3, rowData)
							setActionsTaken((prevState) => prevState + 1)
						}}
					>
						Watch
					</Button>
					<Button
						appearance={'ghost'}
						active={rowData.actionId === 2}
						style={{
							backgroundColor: rowData.actionId === 2 ? accentColor : ''
						}}
						onClick={() => {
							handleActionButtonClick(2, rowData)
							setActionsTaken((prevState) => prevState + 1)
						}}
					>
						Block
					</Button>
				</ButtonGroup>
			</Table.Cell>
		)
	}

	const ImageCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell {...props} className='link-group' style={{ padding: 1 }}>
				<img
					src={rowData.thumbnail}
					width={'45%'}
					style={{ borderRadius: 180 }}
				/>
			</Table.Cell>
		)
	}

	const CountryCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell
				{...props}
				className='link-group'
				style={{ align: 'center', padding: 5 }}
			>
				{countryCodeToFlagEmoji(rowData.countryCode)}
			</Table.Cell>
		)
	}

	const VideoCountCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell
				{...props}
				className='link-group'
				style={{ align: 'center', padding: 5 }}
			>
				<Button appearance='link' onClick={() => handleVideosClick(rowData.id)}>
					{rowData.videosCount}
				</Button>
			</Table.Cell>
		)
	}

	return (
		<Table
			loading={items.length < 1}
			virtualized
			height={500}
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

			<Table.Column width={30} verticalAlign={'middle'}>
				<Table.HeaderCell></Table.HeaderCell>
				<CountryCell />
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
			<Table.Column verticalAlign={'middle'}>
				<Table.HeaderCell>Videos</Table.HeaderCell>
				<VideoCountCell />
			</Table.Column>
			<Table.Column verticalAlign={'middle'} flexGrow={1}>
				<Table.HeaderCell>Views</Table.HeaderCell>
				<Table.Cell dataKey='viewsCount' />
			</Table.Column>
			<Table.Column width={200} verticalAlign={'middle'}>
				<Table.HeaderCell></Table.HeaderCell>
				<ActionCell />
			</Table.Column>
		</Table>
	)
}
