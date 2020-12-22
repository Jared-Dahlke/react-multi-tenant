import React from 'react'
import Grid from '@material-ui/core/Grid'
import Panel from 'rsuite/lib/Panel'
import {
	neutralLightColor,
	neutralExtraExtraLightColor,
	neutralColor,
	accentColor
} from '../../../../../assets/jss/colorContants'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import numeral from 'numeral'
import Whisper from 'rsuite/lib/Whisper'
import Tooltip from 'rsuite/lib/Tooltip'

const Channel = ({
	item,
	name,
	style,
	createDate,
	description,
	abbreviatedDescription,
	handleActionButtonClick,
	setActionsTaken
}) => {
	return (
		<div style={style}>
			<Panel
				style={{
					marginBottom: 20,
					marginRight: 20,
					backgroundColor: neutralColor
				}}
				header={
					<>
						<h4>{name}</h4>
						<br />
						<div style={{ color: 'grey', marginTop: -20 }}>
							<i>{`${createDate} | ${item.id}`}</i>
							<br />
							<p>{item.categoryName}</p>
						</div>
					</>
				}
			>
				<Grid container spacing={2} justify='center'>
					<Grid item xs={6}>
						<img
							src={
								'https://yt3.ggpht.com/ppck-AwbY6EkWjzOKkLBaWrsahJrfAMxhqeNJXAyKMW6E9IXv4qPM9q61qIcauOBWYNuaTF4HQ=s800-c-k-c0x00ffffff-no-rj'
							}
							width={'25%'}
							style={{ borderRadius: 180 }}
						/>
					</Grid>
					<Grid item xs={6}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<Whisper
									placement='bottomStart'
									trigger='hover'
									speaker={<Tooltip>{description}</Tooltip>}
								>
									<div>{abbreviatedDescription}</div>
								</Whisper>
							</Grid>
							<Grid item xs={12}>
								<Grid container>
									<Grid item xs={2}>
										Subscribers
										<br />
										{numeral(item.subscribers).format('0.0a')}
									</Grid>
									<Grid item xs={2}>
										Videos
										<br />
										{numeral(item.videos).format('0a')}
									</Grid>
									<Grid item xs={2}>
										Views
										<br />
										{numeral(item.views).format('0.0a')}
									</Grid>
									<Grid item xs={1}>
										Country
										<br />
										{item.countryName}
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<ButtonGroup>
									<Button
										appearance={'ghost'}
										active={item.actionId === 1}
										style={{
											backgroundColor: item.actionId === 1 ? accentColor : ''
										}}
										onClick={() => {
											handleActionButtonClick(1, item)
											setActionsTaken((prevState) => prevState + 1)
										}}
									>
										Target
									</Button>
									<Button
										appearance={'ghost'}
										active={item.actionId === 3}
										style={{
											backgroundColor: item.actionId === 3 ? accentColor : ''
										}}
										onClick={() => {
											handleActionButtonClick(3, item)
											setActionsTaken((prevState) => prevState + 1)
										}}
									>
										Watch
									</Button>
									<Button
										appearance={'ghost'}
										active={item.actionId === 2}
										style={{
											backgroundColor: item.actionId === 2 ? accentColor : ''
										}}
										onClick={() => {
											handleActionButtonClick(2, item)
											setActionsTaken((prevState) => prevState + 1)
										}}
									>
										Block
									</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Panel>
		</div>
	)
}

export default Channel
