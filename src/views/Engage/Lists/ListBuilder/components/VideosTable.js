import React from 'react'
import Table from 'rsuite/lib/Table'
import { TooltipCell } from './TooltipCell'
import { NameCell } from './NameCell'
import './listbuilder.css'
import { ActionCell } from './ActionCell'
import ColumnPicker from '../components/ColumnPicker'
import debounce from 'just-debounce-it'
import Button from 'rsuite/lib/Button'

const VideosTable = (props) => {
	let visibleVideoColumns = props.visibleVideoColumns
	let handleActionButtonClick = props.handleActionButtonClick

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

	const ImageCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell
				{...props}
				className='link-group'
				style={{ padding: 1, margin: 0, position: 'relative' }}
			>
				<img src={rowData.thumbnail} width={'80%'} />
				<div style={{ position: 'absolute', right: 0, bottom: 0 }}>
					<Duration seconds={rowData.duration} />
				</div>
			</Table.Cell>
		)
	}

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

	const handleVideoScroll = debounce(() => {
		props.incrementPage()
	}, 1200)

	const [columnPickerShowing, setColumnPickerShowing] = React.useState(false)

	const [allVideoColumns] = React.useState([
		{ label: 'Image', id: 'image' },
		{ label: 'Name', id: 'name' },
		{ label: 'Uploaded', id: 'uploaded' },
		{ label: 'Category', id: 'category' },
		{ label: 'Likes', id: 'likes' },
		{ label: 'Dislikes', id: 'dislikes' },
		{ label: 'Views', id: 'views' },
		{ label: 'Comments', id: 'comments' },
		{ label: 'IAB Category', id: 'iabCategory' },
		{ label: 'Actions', id: 'actions' }
	])

	return (
		<>
			<ColumnPicker
				show={columnPickerShowing}
				close={() => setColumnPickerShowing(false)}
				visibleColumns={props.visibleVideoColumns}
				allColumns={allVideoColumns}
				setVisibleColumns={props.setVisibleVideoColumns}
			/>
			<Button
				size='xs'
				onClick={() => setColumnPickerShowing(true)}
				appearance={'link'}
			>
				Visible Columns
			</Button>

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
				{visibleVideoColumns.includes('image') && (
					<Table.Column verticalAlign={'middle'}>
						<Table.HeaderCell></Table.HeaderCell>
						<ImageCell />
					</Table.Column>
				)}

				{visibleVideoColumns.includes('name') && (
					<Table.Column verticalAlign={'middle'} sortable resizable width={300}>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<NameCell
							displayProp='nameDisplay'
							tooltipProp='nameTooltip'
							tooltipPlacement='topLeft'
							dataKey='name'
							urlPrefix='https://www.youtube.com/watch?v='
						/>
					</Table.Column>
				)}

				{visibleVideoColumns.includes('uploaded') && (
					<Table.Column verticalAlign={'middle'} sortable>
						<Table.HeaderCell>Uploaded</Table.HeaderCell>
						<TooltipCell
							displayProp='createDateDisplay'
							tooltipProp='createDateTooltip'
							dataKey='published'
						/>
					</Table.Column>
				)}

				{/**	<Table.Column verticalAlign={'middle'} sortable>
						<Table.HeaderCell>Id</Table.HeaderCell>
						<Table.Cell dataKey='id' style={{ color: 'grey' }} />
					</Table.Column> */}

				{visibleVideoColumns.includes('category') && (
					<Table.Column verticalAlign={'middle'} sortable resizable width={130}>
						<Table.HeaderCell>Category</Table.HeaderCell>
						<TooltipCell
							displayProp='categoryDisplay'
							tooltipProp='categoryTooltip'
							dataKey='categoryName'
						/>
					</Table.Column>
				)}

				{visibleVideoColumns.includes('likes') && (
					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>Likes</Table.HeaderCell>
						<TooltipCell
							displayProp='likesDisplay'
							tooltipProp='likesTooltip'
							dataKey='likes'
						/>
					</Table.Column>
				)}

				{visibleVideoColumns.includes('dislikes') && (
					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>Dislikes</Table.HeaderCell>
						<TooltipCell
							displayProp='dislikesDisplay'
							tooltipProp='dislikesTooltip'
							dataKey='dislikes'
						/>
					</Table.Column>
				)}

				{visibleVideoColumns.includes('views') && (
					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>Views</Table.HeaderCell>
						<TooltipCell
							displayProp='viewsDisplay'
							tooltipProp='viewsTooltip'
							dataKey='views'
						/>
					</Table.Column>
				)}

				{visibleVideoColumns.includes('comments') && (
					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>Comments</Table.HeaderCell>
						<TooltipCell
							displayProp='commentsDisplay'
							tooltipProp='commentsTooltip'
							dataKey='comments'
						/>
					</Table.Column>
				)}

				{visibleVideoColumns.includes('iabCategory') && (
					<Table.Column verticalAlign={'middle'} align='center' sortable>
						<Table.HeaderCell>IAB Category</Table.HeaderCell>
						<TooltipCell
							dataKey='iabCategoryName'
							displayProp='iabCategoryName'
							tooltipProp='iabCategoryName'
						/>
					</Table.Column>
				)}

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

				{visibleVideoColumns.includes('actions') && (
					<Table.Column verticalAlign={'middle'} minWidth={180} flexGrow={1}>
						<Table.HeaderCell></Table.HeaderCell>
						<ActionCell
							handleActionButtonClick={handleActionButtonClick}
							setActionsTaken={setActionsTaken}
						/>
					</Table.Column>
				)}
			</Table>
		</>
	)
}

export default VideosTable
