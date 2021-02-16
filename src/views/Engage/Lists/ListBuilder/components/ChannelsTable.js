import React from 'react'

import Button from 'rsuite/lib/Button'
import debounce from 'just-debounce-it'
import Table from 'rsuite/lib/Table'
import Dropdown from 'rsuite/lib/Dropdown'
import Whisper from 'rsuite/lib/Whisper'
import Tooltip from 'rsuite/lib/Tooltip'
import { TooltipCell } from './TooltipCell'
import { NameCell } from './NameCell'
import { ActionCell } from './ActionCell'
import Icon from 'rsuite/lib/Icon'
import './listbuilder.css'
var dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

export default function ChannelsTable({
	channelsIsLoading,
	items,
	incrementPage,
	handleActionButtonClick,
	handleVideosClick,
	currentChannelsSort,
	setCurrentChannelsSort,
	visibleChannelColumns
}) {
	const hasMountedRef = React.useRef(false)

	const [actionsTaken, setActionsTaken] = React.useState(0)

	React.useEffect(() => {
		hasMountedRef.current = true
	}, [actionsTaken])

	const handleScroll = debounce(() => {
		incrementPage()
	}, 1200)

	const ImageCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell {...props} className='link-group' style={{ padding: 1 }}>
				<img src={rowData.thumbnail} width={50} style={{ borderRadius: 180 }} />
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
				<Whisper
					placement={'bottom'}
					trigger='hover'
					speaker={<Tooltip>{rowData.videosTooltip}</Tooltip>}
				>
					<Button
						appearance='link'
						onClick={() => handleVideosClick(rowData)}
						className={'lbTableFont'}
					>
						{rowData.videosDisplay}
					</Button>
				</Whisper>
			</Table.Cell>
		)
	}

	return (
		<Table
			style={{ flex: 1, marginLeft: 15 }}
			rowClassName={'lbtable'}
			sortColumn={currentChannelsSort.sortColumn}
			sortType={currentChannelsSort.sortType}
			onSortColumn={(sortColumn, sortType) => {
				if (!channelsIsLoading) {
					setCurrentChannelsSort({ sortColumn, sortType })
				}
			}}
			loading={items.length < 1 && channelsIsLoading}
			virtualized
			height={890}
			rowHeight={80}
			data={items}
			shouldUpdateScroll={false}
			onScroll={() => {
				handleScroll()
			}}
		>
			{visibleChannelColumns.includes('image') && (
				<Table.Column verticalAlign={'middle'} width={60}>
					<Table.HeaderCell></Table.HeaderCell>
					<ImageCell />
				</Table.Column>
			)}

			{/**<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>Country</Table.HeaderCell>
				<TooltipCell
					displayProp='countryDisplay'
					tooltipProp='countryTooltip'
					dataKey='countryCode'
				/>
			</Table.Column> */}

			{visibleChannelColumns.includes('name') && (
				<Table.Column verticalAlign={'middle'} sortable width={280} resizable>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<NameCell
						displayProp='nameDisplay'
						tooltipProp='nameTooltip'
						tooltipPlacement='topLeft'
						dataKey='name'
						urlPrefix='https://www.youtube.com/channel/'
					/>
				</Table.Column>
			)}

			{visibleChannelColumns.includes('createDate') && (
				<Table.Column verticalAlign={'middle'} align='center' sortable>
					<Table.HeaderCell>Create Date</Table.HeaderCell>
					<TooltipCell
						displayProp='createDateDisplay'
						tooltipProp='createDateTooltip'
						dataKey='created'
					/>
				</Table.Column>
			)}

			{/**	<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>Id</Table.HeaderCell>
				<Table.Cell dataKey='id' style={{ color: 'grey' }} />
			</Table.Column> */}

			{visibleChannelColumns.includes('ytCategory') && (
				<Table.Column
					verticalAlign={'middle'}
					align='center'
					width={180}
					resizable
				>
					<Table.HeaderCell>YT Category</Table.HeaderCell>
					<TooltipCell
						displayProp='categoryDisplay'
						tooltipProp='categoryTooltip'
						dataKey='categoryName'
						//	tooltipPlacement='topLeft'
					/>
				</Table.Column>
			)}

			{visibleChannelColumns.includes('iabCategory') && (
				<Table.Column
					verticalAlign={'middle'}
					align='center'
					sortable
					resizable
				>
					<Table.HeaderCell>IAB Category</Table.HeaderCell>
					<TooltipCell
						dataKey='iabCategoryName'
						displayProp='iabCategoryName'
						tooltipProp='iabCategoryName'
					/>
				</Table.Column>
			)}

			{visibleChannelColumns.includes('videos') && (
				<Table.Column verticalAlign={'middle'} align='center'>
					<Table.HeaderCell>Videos</Table.HeaderCell>

					<VideoCountCell dataKey='allVideoCount' />
				</Table.Column>
			)}

			{visibleChannelColumns.includes('views') && (
				<Table.Column verticalAlign={'middle'} align='center' sortable>
					<Table.HeaderCell>Views</Table.HeaderCell>
					<TooltipCell
						dataKey='views'
						displayProp='viewsDisplay'
						tooltipProp='viewsTooltip'
					/>
				</Table.Column>
			)}

			{visibleChannelColumns.includes('subscribers') && (
				<Table.Column verticalAlign={'middle'} align='center' sortable>
					<Table.HeaderCell>Subscribers</Table.HeaderCell>
					<TooltipCell
						displayProp='subscribersDisplay'
						tooltipProp='subscribersTooltip'
						dataKey='subscribers'
					/>
				</Table.Column>
			)}

			{/**	<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>IAB SubCategory</Table.HeaderCell>
				<TooltipCell
					dataKey='iabSubCategoryId'
					displayProp='iabSubCategoryName'
					tooltipProp='iabSubCategoryName'
				/>
			</Table.Column>

			<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>IAB Topic</Table.HeaderCell>
				<TooltipCell
					dataKey='iabTopicId'
					displayProp='iabTopicName'
					tooltipProp='iabTopicName'
				/>
			</Table.Column>
			<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>IAB SubTopic</Table.HeaderCell>
				<TooltipCell
					dataKey='iabSubTopicId'
					displayProp='iabSubTopicName'
					tooltipProp='iabSubTopicName'
				/>
			</Table.Column> */}

			{visibleChannelColumns.includes('actions') && (
				<Table.Column minWidth={180} flexGrow={1} verticalAlign={'middle'}>
					<Table.HeaderCell></Table.HeaderCell>
					<ActionCell
						handleActionButtonClick={handleActionButtonClick}
						setActionsTaken={setActionsTaken}
					/>
				</Table.Column>
			)}
		</Table>
	)
}
