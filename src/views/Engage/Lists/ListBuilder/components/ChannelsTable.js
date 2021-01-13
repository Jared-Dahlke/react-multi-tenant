import React from 'react'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import debounce from 'just-debounce-it'
import Table from 'rsuite/lib/Table'

import { accentColor } from '../../../../../assets/jss/colorContants'
import Whisper from 'rsuite/lib/Whisper'
import Tooltip from 'rsuite/lib/Tooltip'
import { TooltipCell } from './TooltipCell'

var dayjs = require('dayjs')
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

export default function ChannelsTable({
	channelsIsLoading,
	items,
	incrementPage,
	handleActionButtonClick,
	handleVideosClick
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
					<Button appearance='link' onClick={() => handleVideosClick(rowData)}>
						{rowData.videosDisplay}
					</Button>
				</Whisper>
			</Table.Cell>
		)
	}

	return (
		<Table
			loading={items.length < 1 && channelsIsLoading}
			virtualized
			height={500}
			rowHeight={80}
			data={items}
			shouldUpdateScroll={false}
			onScroll={() => {
				handleScroll()
			}}
		>
			<Table.Column verticalAlign={'middle'} width={80}>
				<Table.HeaderCell></Table.HeaderCell>
				<ImageCell />
			</Table.Column>

			<Table.Column verticalAlign={'middle'} width={60} align='center'>
				<Table.HeaderCell></Table.HeaderCell>
				<TooltipCell
					displayProp='countryDisplay'
					tooltipProp='countryTooltip'
				/>
			</Table.Column>

			<Table.Column verticalAlign={'middle'} flexGrow={2}>
				<Table.HeaderCell>Name</Table.HeaderCell>
				<TooltipCell
					displayProp='nameDisplay'
					tooltipProp='nameTooltip'
					tooltipPlacement='topLeft'
				/>
			</Table.Column>
			<Table.Column verticalAlign={'middle'} align='center'>
				<Table.HeaderCell>Date</Table.HeaderCell>
				<TooltipCell
					displayProp='createDateDisplay'
					tooltipProp='createDateTooltip'
				/>
			</Table.Column>
			<Table.Column verticalAlign={'middle'} align='center'>
				<Table.HeaderCell>Id</Table.HeaderCell>
				<Table.Cell dataKey='id' style={{ color: 'grey' }} />
			</Table.Column>
			<Table.Column verticalAlign={'middle'} flexGrow={1} align='center'>
				<Table.HeaderCell>Video Categories</Table.HeaderCell>
				<TooltipCell
					displayProp='categoryDisplay'
					tooltipProp='categoryTooltip'
				/>
			</Table.Column>
			<Table.Column verticalAlign={'middle'} align='center'>
				<Table.HeaderCell>Subscribers</Table.HeaderCell>
				<TooltipCell
					displayProp='subscribersDisplay'
					tooltipProp='subscribersTooltip'
				/>
			</Table.Column>
			<Table.Column verticalAlign={'middle'} align='center'>
				<Table.HeaderCell>Videos</Table.HeaderCell>
				<VideoCountCell />
			</Table.Column>
			<Table.Column verticalAlign={'middle'} align='center'>
				<Table.HeaderCell>Views</Table.HeaderCell>
				<TooltipCell displayProp='viewsDisplay' tooltipProp='viewsTooltip' />
			</Table.Column>
			<Table.Column width={180} verticalAlign={'middle'}>
				<Table.HeaderCell></Table.HeaderCell>
				<ActionCell />
			</Table.Column>
		</Table>
	)
}
