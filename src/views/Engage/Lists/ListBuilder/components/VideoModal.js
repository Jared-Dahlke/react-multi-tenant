import React from 'react'
import Modal from 'rsuite/lib/Modal'
import Button from 'rsuite/lib/Button'
import Table from 'rsuite/lib/Table'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import debounce from 'just-debounce-it'
import { accentColor } from '../../../../../assets/jss/colorContants'

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

	const handleVideoScroll = debounce(() => {
		props.incrementPage()
	}, 1200)

	return (
		<Modal full show={props.show} onHide={props.close}>
			<Modal.Header>
				<Modal.Title>{props?.videos[0]?.channelName || ' '}</Modal.Title>
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
					Ok
				</Button>
				<Button onClick={props.close} appearance='subtle'>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default VideoModal
