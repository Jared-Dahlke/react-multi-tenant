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

const Duration = ({ seconds }) => {
	let minutes = Math.floor(seconds / 60)
	let remainingSeconds = Math.floor(seconds - minutes * 60) - 1
	return (
		<div
			style={{
				backgroundColor: 'black',
				color: 'white',
				width: 33,
				height: 18,
				margin: 4,
				letterSpacing: 0.5
			}}
		>
			{`${minutes}:${remainingSeconds}`}
		</div>
	)
}

const Video = ({
	item,
	name,
	style,
	createDate,
	description,
	abbreviatedDescription,
	handleActionButtonClick,
	setActionsTaken
}) => {
	let language = item.languageName?.replace(/\s/g, '').length
		? item.languageName
		: '[No language]'

	return (
		<div style={style}>
			<Panel
				style={{
					marginBottom: 20,
					marginRight: 20,
					backgroundColor: neutralColor
				}}
				header={
					<Grid container>
						<Grid item xs={12}>
							<h4>{name}</h4>
						</Grid>

						<Grid item xs={12}>
							<i>{`${createDate} | ${item.id}`}</i>
						</Grid>
						<Grid item xs={12}>
							<p>Channel: {item.channelName}</p>
						</Grid>
						<Grid item xs={12}>
							<p>{item.categoryName}</p>
						</Grid>
						<Grid item xs={12}>
							<p>{language}</p>
						</Grid>
						<Grid item xs={12}>
							<p>{item.kids ? 'Kids' : 'Not kids'}</p>
						</Grid>
					</Grid>
				}
			>
				<Grid container spacing={2} justify='center'>
					<Grid item xs={6}>
						<div style={{ position: 'relative' }}>
							<img
								src={
									'https://yt3.ggpht.com/ppck-AwbY6EkWjzOKkLBaWrsahJrfAMxhqeNJXAyKMW6E9IXv4qPM9q61qIcauOBWYNuaTF4HQ=s800-c-k-c0x00ffffff-no-rj'
								}
								width={'25%'}
								style={{ borderRadius: 10 }}
							/>
							<div style={{ position: 'absolute', left: 102, bottom: 5 }}>
								<Duration seconds={item.duration} />
							</div>
						</div>
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
										Dislikes
										<br />
										{numeral(item.dislikes).format('0.0a')}
									</Grid>
									<Grid item xs={2}>
										Views
										<br />
										{numeral(item.views).format('0a')}
									</Grid>
									<Grid item xs={2}>
										Likes
										<br />
										{numeral(item.likes).format('0.0a')}
									</Grid>
									<Grid item xs={1}>
										Comments
										<br />
										{item.comments}
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

export default Video
