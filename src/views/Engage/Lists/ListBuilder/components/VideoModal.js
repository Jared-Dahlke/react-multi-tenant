import React from 'react'
import Modal from 'rsuite/lib/Modal'
import Button from 'rsuite/lib/Button'
import Table from 'rsuite/lib/Table'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import debounce from 'just-debounce-it'
import { accentColor } from '../../../../../assets/jss/colorContants'
import Whisper from 'rsuite/lib/Whisper'
import Tooltip from 'rsuite/lib/Tooltip'
import numeral from 'numeral'

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

	const Duration = ({ seconds }) => {
		let minutes = Math.floor(seconds / 60)
		let remainingSeconds = Math.floor(seconds - minutes * 60) - 1
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
				{`${minutes}:${remainingSeconds}`}
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

	const NameCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell {...props} className='link-group' style={{ padding: 1 }}>
				<Whisper
					placement='bottomStart'
					trigger='hover'
					speaker={<Tooltip>{rowData.description}</Tooltip>}
				>
					<div>{rowData.name}</div>
				</Whisper>
			</Table.Cell>
		)
	}

	const DislikesCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell {...props} className='link-group' style={{ padding: 1 }}>
				<Whisper
					placement='bottomStart'
					trigger='hover'
					speaker={<Tooltip>{numeral(rowData.dislikes).format('0,0')}</Tooltip>}
				>
					<div>{numeral(rowData.dislikes).format('0.0a')}</div>
				</Whisper>
			</Table.Cell>
		)
	}

	const LikesCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell {...props} className='link-group' style={{ padding: 1 }}>
				<Whisper
					placement='bottomStart'
					trigger='hover'
					speaker={<Tooltip>{numeral(rowData.likes).format('0,0')}</Tooltip>}
				>
					<div>{numeral(rowData.likes).format('0.0a')}</div>
				</Whisper>
			</Table.Cell>
		)
	}

	const ViewsCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell {...props} className='link-group' style={{ padding: 1 }}>
				<Whisper
					placement='bottomStart'
					trigger='hover'
					speaker={<Tooltip>{numeral(rowData.views).format('0,0')}</Tooltip>}
				>
					<div>{numeral(rowData.views).format('0.0a')}</div>
				</Whisper>
			</Table.Cell>
		)
	}

	const CommentsCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell {...props} className='link-group' style={{ padding: 1 }}>
				<Whisper
					placement='bottomStart'
					trigger='hover'
					speaker={<Tooltip>{numeral(rowData.comments).format('0,0')}</Tooltip>}
				>
					<div>{numeral(rowData.comments).format('0.0a')}</div>
				</Whisper>
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
					loading={props.videos.length < 1}
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

					<Table.Column verticalAlign={'middle'} resizable>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<NameCell />
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
						<Table.HeaderCell>Likes</Table.HeaderCell>
						<LikesCell />
					</Table.Column>

					<Table.Column verticalAlign={'middle'} flexGrow={1}>
						<Table.HeaderCell>Dislikes</Table.HeaderCell>
						<DislikesCell />
					</Table.Column>

					<Table.Column verticalAlign={'middle'} flexGrow={1}>
						<Table.HeaderCell>Views</Table.HeaderCell>
						<ViewsCell />
					</Table.Column>

					<Table.Column verticalAlign={'middle'} flexGrow={1}>
						<Table.HeaderCell>Comments</Table.HeaderCell>
						<CommentsCell />
					</Table.Column>

					<Table.Column verticalAlign={'middle'} flexGrow={1}>
						<Table.HeaderCell>Subscribers</Table.HeaderCell>
						<Table.Cell dataKey='subscribersCount' />
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
