import React from 'react'
import Modal from 'rsuite/lib/Modal'
import Button from 'rsuite/lib/Button'
import CheckTree from 'rsuite/lib/CheckTree'

const ColumnPicker = (props) => {
	return (
		<Modal show={props.show} onHide={props.close}>
			<Modal.Header>
				<Modal.Title>Visible Columns</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CheckTree
					labelKey='label'
					valueKey='id'
					block
					data={props.allColumns}
					value={props.visibleColumns}
					onChange={(arr) => props.setVisibleColumns(arr)}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.close} appearance='primary'>
					Done
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ColumnPicker
