import React from 'react'
import Modal from 'rsuite/lib/Modal'
import Button from 'rsuite/lib/Button'
import Icon from 'rsuite/lib/Icon'

const WarningModal = (props) => {
	return (
		<Modal
			backdrop='static'
			show={props.show}
			onHide={props.handleClose}
			size='xs'
		>
			<Modal.Body>
				<Icon
					icon='remind'
					style={{
						color: '#ffb300',
						fontSize: 24
					}}
				/>
				{'  '}
				If you make this change, all of your current selections will be
				permanently deleted. Are you sure you want to proceed?
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.executeToggle} appearance='primary'>
					Yes, I'm sure
				</Button>
				<Button onClick={props.handleClose} appearance='subtle'>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default WarningModal
