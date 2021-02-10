import React from 'react'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import debounce from 'just-debounce-it'
import Table from 'rsuite/lib/Table'
import { accentColor } from '../../../../../assets/jss/colorContants'
import Whisper from 'rsuite/lib/Whisper'
import Tooltip from 'rsuite/lib/Tooltip'
import { TooltipCell } from './TooltipCell'
import { NameCell } from './NameCell'
import { listActions } from '../../constants'
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
	setCurrentChannelsSort
}) {
	const hasMountedRef = React.useRef(false)

	const [actionsTaken, setActionsTaken] = React.useState(0)

	React.useEffect(() => {
		hasMountedRef.current = true
	}, [actionsTaken])

	const handleScroll = debounce(() => {
		incrementPage()
	}, 1200)

	const ActionCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell
				{...props}
				className='link-group'
				style={{ padding: 1, textAlign: 'center' }}
			>
				<ButtonGroup vertical={false} size='xs'>
					<Button
						appearance={'ghost'}
						active={rowData.actionId === listActions.target.actionId}
						style={{
							backgroundColor:
								rowData.actionId === listActions.target.actionId
									? accentColor
									: 'transparent'
						}}
						onClick={() => {
							handleActionButtonClick(listActions.target.actionId, rowData)
							setActionsTaken((prevState) => prevState + 1)
						}}
					>
						Target
					</Button>
					<Button
						appearance={'ghost'}
						active={rowData.actionId === listActions.watch.actionId}
						style={{
							backgroundColor:
								rowData.actionId === listActions.watch.actionId
									? accentColor
									: 'transparent'
						}}
						onClick={() => {
							handleActionButtonClick(listActions.watch.actionId, rowData)
							setActionsTaken((prevState) => prevState + 1)
						}}
					>
						Watch
					</Button>
					<Button
						appearance={'ghost'}
						active={rowData.actionId === listActions.block.actionId}
						style={{
							backgroundColor:
								rowData.actionId === listActions.block.actionId
									? accentColor
									: 'transparent'
						}}
						onClick={() => {
							handleActionButtonClick(listActions.block.actionId, rowData)
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
			<Table.Column verticalAlign={'middle'} width={60}>
				<Table.HeaderCell></Table.HeaderCell>
				<ImageCell />
			</Table.Column>

			{/**<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>Country</Table.HeaderCell>
				<TooltipCell
					displayProp='countryDisplay'
					tooltipProp='countryTooltip'
					dataKey='countryCode'
				/>
			</Table.Column> */}

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
			<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>Create Date</Table.HeaderCell>
				<TooltipCell
					displayProp='createDateDisplay'
					tooltipProp='createDateTooltip'
					dataKey='created'
				/>
			</Table.Column>

			{/**	<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>Id</Table.HeaderCell>
				<Table.Cell dataKey='id' style={{ color: 'grey' }} />
			</Table.Column> */}

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

			<Table.Column verticalAlign={'middle'} align='center' sortable resizable>
				<Table.HeaderCell>IAB Category</Table.HeaderCell>
				<TooltipCell
					dataKey='iabCategoryId'
					displayProp='iabCategoryName'
					tooltipProp='iabCategoryName'
				/>
			</Table.Column>

			<Table.Column verticalAlign={'middle'} align='center'>
				<Table.HeaderCell>Videos</Table.HeaderCell>

				<VideoCountCell dataKey='allVideoCount' />
			</Table.Column>

			<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>Views</Table.HeaderCell>
				<TooltipCell
					dataKey='views'
					displayProp='viewsDisplay'
					tooltipProp='viewsTooltip'
				/>
			</Table.Column>

			<Table.Column verticalAlign={'middle'} align='center' sortable>
				<Table.HeaderCell>Subscribers</Table.HeaderCell>
				<TooltipCell
					displayProp='subscribersDisplay'
					tooltipProp='subscribersTooltip'
					dataKey='subscribers'
				/>
			</Table.Column>

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

			<Table.Column minWidth={180} flexGrow={1} verticalAlign={'middle'}>
				<Table.HeaderCell></Table.HeaderCell>
				<ActionCell />
			</Table.Column>
		</Table>
	)
}
