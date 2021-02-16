import React from 'react'
import Table from 'rsuite/lib/Table'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import { listActions } from '../../constants'
import Button from 'rsuite/lib/Button'
import './listbuilder.css'
import { accentColor } from '../../../../../assets/jss/colorContants'

export const ActionCell = ({
	rowData,
	dataKey,
	handleActionButtonClick,
	setActionsTaken,
	...props
}) => {
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
						borderColor: accentColor,
						backgroundColor:
							rowData.actionId === listActions.target.actionId
								? accentColor
								: 'transparent',
						color:
							rowData.actionId === listActions.target.actionId
								? 'white'
								: accentColor
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
						borderColor: accentColor,
						backgroundColor:
							rowData.actionId === listActions.watch.actionId
								? accentColor
								: 'transparent',
						color:
							rowData.actionId === listActions.watch.actionId
								? 'white'
								: accentColor
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
						borderColor: accentColor,
						backgroundColor:
							rowData.actionId === listActions.block.actionId
								? accentColor
								: 'transparent',
						color:
							rowData.actionId === listActions.block.actionId
								? 'white'
								: accentColor
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
