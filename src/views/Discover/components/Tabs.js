import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { whiteColor } from '../../../assets/jss/material-dashboard-react'
import ListBuilderTable from './ListBuilderTable'

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3} style={{ padding: 16 }}>
					{children}
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`
	}
}

export default function FullWidthTabs(props) {
	const useStyles = makeStyles((theme) => ({
		root: {
			// backgroundColor: 'blue', //theme.palette.background.paper,
			width: '100%',
			height: props.bodyHeight,
			borderRadius: props.borderRad
		}
	}))

	const classes = useStyles()
	const theme = useTheme()
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
		props.changeTabIndex(newValue)
	}

	const handleChangeIndex = (index) => {
		setValue(index)
	}

	let categoryLabel = `Categories (${props.selectedCategoriesCount}/15)`
	let channelLabel = `Channels (${props.selectedChannelsCount}/304k)`
	let videoLabel = `Videos (${props.selectedVideosCount}/698k)`

	return (
		<div className={classes.root}>
			<AppBar
				position='static'
				color='default'
				style={{ borderRadius: props.borderRad }}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
					aria-label='full width tabs example'
				>
					<Tab label={categoryLabel} {...a11yProps(0)} />
					<Tab
						label={channelLabel}
						{...a11yProps(1)}
						disabled={props.selectedCategoriesCount < 1}
					/>
					<Tab
						label={videoLabel}
						{...a11yProps(2)}
						disabled={props.selectedCategoriesCount < 1}
					/>
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
				style={{ borderRadius: props.borderRad, backgroundColor: whiteColor }}
			>
				<TabPanel
					value={value}
					index={0}
					dir={theme.direction}
					style={{ backgroundColor: whiteColor }}
				>
					{props.categories && props.categories.length > 0 ? (
						<ListBuilderTable
							data={props.categories}
							bodyHeight={props.bodyHeight}
							handleButtonGroupChange={props.handleButtonGroupChange}
							level='Category'
							levelId='categoryId'
						/>
					) : null}
				</TabPanel>

				<TabPanel
					value={value}
					index={1}
					dir={theme.direction}
					style={{ backgroundColor: whiteColor }}
				>
					{props.channels && props.channels.length > 0 ? (
						<ListBuilderTable
							data={props.channels}
							bodyHeight={props.bodyHeight}
							handleButtonGroupChange={props.handleButtonGroupChange}
							level='Channel'
							levelId='channelId'
						/>
					) : null}
				</TabPanel>

				<TabPanel
					value={value}
					index={2}
					dir={theme.direction}
					style={{ backgroundColor: whiteColor }}
				>
					{props.videos && props.videos.length > 0 ? (
						<ListBuilderTable
							data={props.videos}
							bodyHeight={props.bodyHeight}
							handleButtonGroupChange={props.handleButtonGroupChange}
							level='Video'
							levelId='videoId'
						/>
					) : null}
				</TabPanel>
			</SwipeableViews>
		</div>
	)
}
