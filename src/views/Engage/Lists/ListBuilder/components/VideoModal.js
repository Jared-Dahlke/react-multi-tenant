import React from 'react'
import Modal from 'rsuite/lib/Modal'
import Button from 'rsuite/lib/Button'
import Table from 'rsuite/lib/Table'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import debounce from 'just-debounce-it'
import { accentColor } from '../../../../../assets/jss/colorContants'
import { TooltipCell } from './TooltipCell'
import { NameCell } from './NameCell'
import './listbuilder.css'
const VideoModal = (props) => {
	let handleActionButtonClick = props.handleActionButtonClick

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

	function secondsToTime(e) {
		var h = Math.floor(e / 3600)
				.toString()
				.padStart(2, '0'),
			m = Math.floor((e % 3600) / 60)
				.toString()
				.padStart(2, '0'),
			s = Math.floor(e % 60)
				.toString()
				.padStart(2, '0')
		if (h == '00') {
			return m + ':' + s
		}
		return h + ':' + m + ':' + s
	}

	const Duration = ({ seconds }) => {
		return (
			<div
				style={{
					backgroundColor: 'black',
					color: 'white',
					width: '100%',
					height: 18,
					margin: 4,
					letterSpacing: 0.5
				}}
			>
				{`${secondsToTime(seconds)}`}
			</div>
		)
	}

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
				<div style={{ position: 'relative' }}>
					<img src={rowData.thumbnail} width={'100%'} />
					<div style={{ position: 'absolute', left: 0, bottom: 5 }}>
						<Duration seconds={rowData.duration} />
					</div>
				</div>
			</Table.Cell>
		)
	}

	const handleVideoScroll = debounce(() => {
		props.incrementPage()
	}, 1200)

	return (
		<Modal full show={props.show} onHide={props.close}>
			<Modal.Header>
				<Modal.Title>Videos for {props?.channel?.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table
					rowClassName={'lbtable'}
					sortColumn={props.currentVideosSort.sortColumn}
					sortType={props.currentVideosSort.sortType}
					onSortColumn={(sortColumn, sortType) => {
						if (!props.videosIsLoading) {
							props.setCurrentVideosSort({ sortColumn, sortType })
						}
					}}
					loading={props.videos.length < 1 && props.videosIsLoading}
					virtualized
					height={500}
					rowHeight={80}
					data={props.videos}
					shouldUpdateScroll={false}
					onScroll={() => {
						handleVideoScroll()
					}}
				>
					<Table.Column verticalAlign={'middle'}>
						<Table.HeaderCell></Table.HeaderCell>
						<ImageCell />
					</Table.Column>

					<Table.Column verticalAlign={'middle'} sortable resizable>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<NameCell
							displayProp='nameDisplay'
							tooltipProp='nameTooltip'
							tooltipPlacement='topLeft'
							dataKey='name'
							urlPrefix='https://www.youtube.com/watch?v='
						/>
					</Table.Column>

					<Table.Column verticalAlign={'middle'} sortable>
						<Table.HeaderCell>Uploaded</Table.HeaderCell>
						<TooltipCell
							displayProp='createDateDisplay'
							tooltipProp='createDateTooltip'
							dataKey='published'
						/>
					</Table.Column>

					{/**	<Table.Column verticalAlign={'middle'} sortable>
						<Table.HeaderCell>Id</Table.HeaderCell>
						<Table.Cell dataKey='id' style={{ color: 'grey' }} />
					</Table.Column> */}

					<Table.Column verticalAlign={'middle'} sortable resizable>
						<Table.HeaderCell>Category</Table.HeaderCell>
						<TooltipCell
							displayProp='categoryDisplay'
							tooltipProp='categoryTooltip'
							dataKey='categoryName'
						/>
					</Table.Column>

					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>Likes</Table.HeaderCell>
						<TooltipCell
							displayProp='likesDisplay'
							tooltipProp='likesTooltip'
							dataKey='likes'
						/>
					</Table.Column>

					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>Dislikes</Table.HeaderCell>
						<TooltipCell
							displayProp='dislikesDisplay'
							tooltipProp='dislikesTooltip'
							dataKey='dislikes'
						/>
					</Table.Column>

					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>Views</Table.HeaderCell>
						<TooltipCell
							displayProp='viewsDisplay'
							tooltipProp='viewsTooltip'
							dataKey='views'
						/>
					</Table.Column>

					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>Comments</Table.HeaderCell>
						<TooltipCell
							displayProp='commentsDisplay'
							tooltipProp='commentsTooltip'
							dataKey='comments'
						/>
					</Table.Column>

					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>IAB Category</Table.HeaderCell>
						<TooltipCell
							dataKey='iabCategoryId'
							displayProp='iabCategoryName'
							tooltipProp='iabCategoryName'
						/>
					</Table.Column>

					{/** <Table.Column verticalAlign={'middle'} align='center' sortable>
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
					</Table.Column>*/}

					<Table.Column verticalAlign={'middle'} width={200}>
						<Table.HeaderCell></Table.HeaderCell>
						<ActionCell />
					</Table.Column>
				</Table>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.close} appearance='primary'>
					Back to channels
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default VideoModal
