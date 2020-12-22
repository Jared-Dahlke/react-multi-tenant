import React from 'react'
import { FixedSizeList as InfiniteList } from 'react-window'
import List from 'rsuite/lib/List'
import InfiniteLoader from 'react-window-infinite-loader'
import Grid from '@material-ui/core/Grid'
import Panel from '../../../../components/CustomPanel'
import {
	neutralLightColor,
	neutralExtraExtraLightColor
} from '../../../../assets/jss/colorContants'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import numeral from 'numeral'
import Whisper from 'rsuite/lib/Whisper'
import Tooltip from 'rsuite/lib/Tooltip'
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
				description = item.description
			}

			if (isChannels) {
				return (
					<div style={style}>
						<Panel
							bordered
							style={{
								marginBottom: 20,
								marginRight: 20,
								backgroundColor: neutralLightColor
							}}
							header={
								<>
									<h4>{name}</h4>
									<br />
									<div style={{ color: 'grey', marginTop: -20 }}>
										<i>{`${createDate} | ${item.id}`}</i>
										<br />
										<p>Category: {item.categoryName}</p>
									</div>
								</>
							}
						>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Grid item xs={12}>
										<Whisper
											placement='bottomStart'
											trigger='hover'
											speaker={<Tooltip>{description}</Tooltip>}
										>
											<div>{abbreviatedDescription}</div>
										</Whisper>
									</Grid>
									<Grid item xs={12}>
										{isChannels && (
											<Grid container>
												<Grid item xs={2}>
													Subscribers
													<br />
													{numeral(item.subscribers).format('0.0a')}
												</Grid>
												<Grid item xs={2}>
													Videos
													<br />
													{numeral(item.videos).format('0a')}
												</Grid>
												<Grid item xs={2}>
													Views
													<br />
													{numeral(item.views).format('0.0a')}
												</Grid>
												<Grid item xs={1}>
													Country
													<br />
													{item.countryName}
												</Grid>
											</Grid>
										)}
									</Grid>
									<Grid item xs={12}>
										<ButtonGroup>
											<Button
												active={item.actionId === 1}
												onClick={() => {
													handleActionButtonClick(1, item)
													setActionsTaken((prevState) => prevState + 1)
												}}
											>
												Target
											</Button>
											<Button
												active={item.actionId === 3}
												onClick={() => {
													handleActionButtonClick(3, item)
													setActionsTaken((prevState) => prevState + 1)
												}}
											>
												Watch
											</Button>
											<Button
												active={item.actionId === 2}
												onClick={() => {
													handleActionButtonClick(2, item)
													setActionsTaken((prevState) => prevState + 1)
												}}
											>
												Block
											</Button>
										</ButtonGroup>
									</Grid>
									<Grid item xs={6}>
										<img
											src={
												'https://yt3.ggpht.com/ppck-AwbY6EkWjzOKkLBaWrsahJrfAMxhqeNJXAyKMW6E9IXv4qPM9q61qIcauOBWYNuaTF4HQ=s800-c-k-c0x00ffffff-no-rj'
											}
											height={'100%'}
											width={'100%'}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Panel>
					</div>
				)
			} else {
				return (
					<div style={style}>
						<Panel
							bordered
							style={{
								marginBottom: 20,
								marginRight: 20,
								backgroundColor: neutralLightColor
							}}
							header={<h4>{name}</h4>}
						>
							<img
								src={
									'https://yt3.ggpht.com/ppck-AwbY6EkWjzOKkLBaWrsahJrfAMxhqeNJXAyKMW6E9IXv4qPM9q61qIcauOBWYNuaTF4HQ=s800-c-k-c0x00ffffff-no-rj'
								}
								height={294}
								width={526}
							/>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<List
										style={{ backgroundColor: neutralLightColor, border: 0 }}
									>
										<List.Item
											key={0}
											style={{ backgroundColor: neutralLightColor, border: 0 }}
										>
											<i>{`${createDate} | ${item.id}`}</i>
										</List.Item>
										<List.Item
											key={1}
											style={{ backgroundColor: neutralLightColor }}
										>
											<p>Category: {item.categoryName}</p>
										</List.Item>
										<List.Item
											key={2}
											style={{ backgroundColor: neutralLightColor }}
										>
											<p>Channel: {item.channelName}</p>
										</List.Item>
										<List.Item
											key={3}
											style={{ backgroundColor: neutralLightColor }}
										>
											<Whisper
												placement='bottomStart'
												trigger='hover'
												speaker={<Tooltip>{description}</Tooltip>}
											>
												<div>{abbreviatedDescription}</div>
											</Whisper>
										</List.Item>
										<List.Item
											key={4}
											style={{ backgroundColor: neutralLightColor }}
										>
											<Grid container>
												<Grid item xs={2}>
													{item.kids ? 'For Kids' : 'Not for Kids'}
												</Grid>

												<Grid item xs={2}>
													{item.languageName
														? item.languageName
														: '[No language]'}
												</Grid>
											</Grid>
										</List.Item>
									</List>
								</Grid>

								<Grid item xs={12}>
									{isChannels && (
										<Grid container>
											<Grid item xs={2}>
												Subscribers
												<br />
												{numeral(item.subscribers).format('0.0a')}
											</Grid>
											<Grid item xs={2}>
												Videos
												<br />
												{numeral(item.videos).format('0a')}
											</Grid>
											<Grid item xs={2}>
												Views
												<br />
												{numeral(item.views).format('0.0a')}
											</Grid>
											<Grid item xs={1}>
												Country
												<br />
												{item.countryName}
											</Grid>
										</Grid>
									)}
								</Grid>
								<Grid item xs={12}>
									<ButtonGroup>
										<Button
											active={item.actionId === 1}
											onClick={() => {
												handleActionButtonClick(1, item)
												setActionsTaken((prevState) => prevState + 1)
											}}
										>
											Target
										</Button>
										<Button
											active={item.actionId === 3}
											onClick={() => {
												handleActionButtonClick(3, item)
												setActionsTaken((prevState) => prevState + 1)
											}}
										>
											Watch
										</Button>
										<Button
											active={item.actionId === 2}
											onClick={() => {
												handleActionButtonClick(2, item)
												setActionsTaken((prevState) => prevState + 1)
											}}
										>
											Block
										</Button>
									</ButtonGroup>
								</Grid>
							</Grid>
						</Panel>
					</div>
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
