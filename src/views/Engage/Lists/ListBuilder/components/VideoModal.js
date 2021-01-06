import React from 'react'
import Modal from 'rsuite/lib/Modal'
import Button from 'rsuite/lib/Button'

const VideoModal = (props) => {
	return (
		<Modal full show={props.show} onHide={props.close}>
			<Modal.Header>
				<Modal.Title>Modal Title</Modal.Title>
			</Modal.Header>
			<Modal.Body></Modal.Body>
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
