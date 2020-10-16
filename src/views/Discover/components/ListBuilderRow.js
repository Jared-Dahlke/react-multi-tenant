import React from 'react'
import {
	Table,
	TableCell,
	TableBody,
	TableRow,
	TableHead,
	Button,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Typography
} from '@material-ui/core'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	successColor,
	dangerColor,
	warningColor,
	blackColor,
	whiteColor
} from '../../../assets/jss/material-dashboard-react'
var numeral = require('numeral')

export default function ListBuilderRow(props) {
	const useStyles = makeStyles((theme) => ({
		root: {
			// backgroundColor: 'blue', //theme.palette.background.paper,

			backgroundColor: 'yellow',
			'&.MuiToggleButton-root > .Mui-selected': {
				backgroundColor: 'blue'
			}
		},
		selectedButton: {
			backgroundColor: 'blue',
			color: 'yellow'
		},
		targetGreen: {
			'&.Mui-selected': {
				backgroundColor: successColor[0]
			},
			'&.Mui-selected:hover': {
				backgroundColor: successColor[0]
			}
		},
		monitorYellow: {
			'&.Mui-selected': {
				backgroundColor: 'yellow'
			},
			'&.Mui-selected:hover': {
				backgroundColor: 'yellow'
			}
		},
		blockRed: {
			'&.Mui-selected': {
				backgroundColor: dangerColor[0]
			},
			'&.Mui-selected:hover': {
				backgroundColor: dangerColor[0]
			}
		}
	}))

	const classes = useStyles()

	const [view, setView] = React.useState('')

	const handleChange = (event, nextView, id) => {
		//setView(nextView);
		props.handleButtonGroupChange(nextView, id, props.level)
	}

	let item = props.item

	let subscribers = numeral(item.channelSubscribers).format('0.0a')
	let channels = numeral(item.channels).format('0a')
	let videos = numeral(item.channelVideos).format('0a')

	let views = numeral(item.views).format('0a')

	let comments = numeral(item.comments).format('0a')
	let likes = numeral(item.likes).format('0a')
	let dislikes = numeral(item.dislikes).format('0a')

	let channelVideos = numeral(item.videoCount).format('0a')
	let channelSubscribers = numeral(item.subscribers).format('0.0a')

	let cpm = numeral(item.averageCPM).format('$00.00')
	let cpc = numeral(item.averageCPC).format('$.000')
	let cpv = numeral(item.averageCPV).format('$.000')

	let countStyle = {
		border: 0,
		margin: 0,
		padding: 0,
		paddingRight: 12
	}
	let mainCellStyle = {
		padding: 8,
		color: blackColor
		//  verticalAlign: 'top'
	}

	return (
		<ListItem key={item.categoryId} className={props.rowStyle}>
			{props.level === 'Category' ? (
				<div style={{ color: blackColor }}>
					<ListItemText
						primary={item.categoryName}
						secondary={
							'Channels: ' +
							channels +
							', Subscribers: ' +
							subscribers +
							', Videos: ' +
							videos
						}
					/>

					<ListItemText
						secondary={'CPM: ' + cpm + ', CPC: ' + cpc + ', CPV: ' + cpv}
					/>
				</div>
			) : props.level === 'Channel' ? (
				<div style={{ color: blackColor }}>
					<ListItemText
						primary={item.title + ' (' + item.categoryName + ')'}
						secondary={
							'Subscribers: ' +
							channelSubscribers +
							', Videos: ' +
							channelVideos +
							', Views: ' +
							views
						}
					/>

					<ListItemText
						secondary={'CPM: ' + cpm + ', CPC: ' + cpc + ', CPV: ' + cpv}
					/>
				</div>
			) : props.level === 'Video' ? (
				<div style={{ color: blackColor }}>
					<ListItemText
						primary={item.title}
						secondary={
							'Category: ' + item.categoryName + ', Chanel: ' + item.channelName
						}
					/>

					<ListItemText
						secondary={
							'Views: ' +
							views +
							', Comments: ' +
							comments +
							', Likes: ' +
							likes +
							', Dislikes: ' +
							dislikes
						}
					/>

					<ListItemText
						secondary={'CPM: ' + cpm + ', CPC: ' + cpc + ', CPV: ' + cpv}
					/>
				</div>
			) : null}

			<ListItemSecondaryAction>
				<ToggleButtonGroup
					size='small'
					aria-label='small outlined button group'
					onChange={(event, nextView) => {
						handleChange(event, nextView, item[props.levelId])
					}}
					exclusive
					value={item.toggleValue}
				>
					<ToggleButton
						value='Target'
						classes={{ selected: classes.targetGreen }}
					>
						Target
					</ToggleButton>
					<ToggleButton
						value='Monitor'
						classes={{ selected: classes.monitorYellow }}
					>
						Monitor
					</ToggleButton>
					<ToggleButton value='Block' classes={{ selected: classes.blockRed }}>
						Block
					</ToggleButton>
				</ToggleButtonGroup>
			</ListItemSecondaryAction>
		</ListItem>
	)
}
