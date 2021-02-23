import React from 'react'
import Modal from 'rsuite/lib/Modal'
import Button from 'rsuite/lib/Button'
import VideosTable from './VideosTable'
const ChannelVideosModal = (props) => {
	return (
		<Modal full show={props.show} onHide={props.close}>
			<Modal.Header>
				<Modal.Title>Videos for {props?.channel?.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<VideosTable
					setVisibleVideoColumns={props.setVisibleVideoColumns}
					currentVideosSort={props.currentVideosSort}
					setCurrentVideosSort={props.setCurrentVideosSort}
					videos={props.videos}
					videosIsLoading={props.videosIsLoading}
					visibleVideoColumns={props.visibleVideoColumns}
					handleActionButtonClick={props.handleActionButtonClick}
					incrementPage={props.incrementPage}
					tableHeight={props.tableHeight}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.close} appearance='primary'>
					Back to channels
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ChannelVideosModal
