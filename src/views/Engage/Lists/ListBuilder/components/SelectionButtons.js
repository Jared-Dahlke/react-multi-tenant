import React from 'react'
import React from 'react'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'

const SelectionButtons = (props) => {
	let item = props.item
	return (
		<ButtonGroup>
			<Button
				active={item.actionId === 1}
				onClick={() => {
					props.handleActionButtonClick(1, item)
					props.setActionsTaken((prevState) => prevState + 1)
				}}
			>
				Target
			</Button>
			<Button
				active={item.actionId === 3}
				onClick={() => {
					props.handleActionButtonClick(3, item)
					props.setActionsTaken((prevState) => prevState + 1)
				}}
			>
				Watch
			</Button>
			<Button
				active={item.actionId === 2}
				onClick={() => {
					props.handleActionButtonClick(2, item)
					props.setActionsTaken((prevState) => prevState + 1)
				}}
			>
				Block
			</Button>
		</ButtonGroup>
	)
}

export default SelectionButtons
