import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { whiteColor } from '../../../../assets/jss/material-dashboard-react.js'
import Tabs from './components/Tabs'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import InputPicker from 'rsuite/lib/InputPicker'
import FilterList from '@material-ui/icons/FilterList'
import ListItemText from '@material-ui/core/ListItemText'
import {
	fetchChannels,
	setCategories,
	setChannels,
	fetchVideos,
	setVideos
} from '../../../../redux/actions/discover/channels'
import countryList from 'react-select-country-list'
import numeral from 'numeral'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Button from '../../../../components/CustomButtons/Button'

import InputGroup from 'rsuite/lib/InputGroup'
import Input from 'rsuite/lib/Input'
import Icon from 'rsuite/lib/Icon'
import { neutralColor } from '../../../../assets/jss/colorContants.js'

const bodyHeight = 600
const borderRad = 2

const styles = {
	summaryBody: {
		backgroundColor: neutralColor,
		borderRadius: borderRad,
		color: whiteColor
	},
	col: {
		marginTop: '1px',
		height: '100%',
		borderRadius: borderRad
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.categories,
		channels: state.channels,
		videos: state.videos,
		brandProfiles: state.brandProfiles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchChannels: (categories, filters) =>
			dispatch(fetchChannels(categories, filters)),
		setCategories: (categories) => dispatch(setCategories(categories)),
		setChannels: (payload) => dispatch(setChannels(payload)),
		setVideos: (videos) => dispatch(setVideos(videos)),
		fetchVideos: (channels, categories) =>
			dispatch(fetchVideos(channels, categories))
	}
}

const downloadClick = () => {
	window.location.href =
		'https://storage.googleapis.com/sightlyoutcomeintelligence_temp/channels_and_videos_sample.xlsx'
}

function ListBuilder(props) {
	const history = useHistory()
	if (!props.location.state || props.location.state.from !== 'lists') {
		console.log(routes.app.engage.lists.lists.path)
		history.push(routes.app.engage.lists.lists.path)
	}
	const [tabIndex, setTabIndex] = React.useState(0)
	const [filters, setFilters] = React.useState({})

	const countries = countryList().getData()
	const languages = [
		{ value: 'English', label: 'English' },
		{ value: 'Arabic', label: 'Arabic' },
		{ value: 'Chinese (simplified)', label: 'Chinese (simplified)' },
		{ value: 'Chinese (traditional)', label: 'Chinese (traditional)' },
		{ value: 'French', label: 'French' },
		{ value: 'German', label: 'German' },
		{ value: 'Italian', label: 'Italian' },
		{ value: 'Indonesian', label: 'Indonesian' },
		{ value: 'Japanese', label: 'Japanese' },
		{ value: 'Korean', label: 'Korean' },
		{ value: 'Polish', label: 'Polish' },
		{ value: 'Portuguese', label: 'Portuguese' },
		{ value: 'Russian', label: 'Russian' },
		{ value: 'Spanish', label: 'Spanish' },
		{ value: 'Thai', label: 'Thai' },
		{ value: 'Turkish', label: 'Turkish' },
		{ value: 'Vietnamese', label: 'Vietnamese' }
	]

	const boolOptions = [
		{ value: 'True', label: 'True' },
		{ value: 'False', label: 'False' }
	]

	const handleFilterChange = (e, type) => {
		let prevFilters = JSON.parse(JSON.stringify(filters))
		if (type === 'Country') {
			prevFilters.country = e.value
		}
		setFilters(prevFilters)

		handleButtonGroupChange('', 'dummyId', 'Channel')

		props.fetchChannels(props.categories, prevFilters)

		// trigger regather
	}

	const handleButtonGroupChange = (value, id, level) => {
		if (level === 'Category') {
			let categoriesCopy = JSON.parse(JSON.stringify(props.categories))
			for (const category of categoriesCopy) {
				if (category.categoryId === id) {
					category.toggleValue = value
				}
			}
			props.setCategories(categoriesCopy)
			props.fetchChannels(categoriesCopy, filters)
		}

		if (level === 'Channel') {
			let channelsCopy = JSON.parse(JSON.stringify(props.channels))
			for (const channel of channelsCopy) {
				if (channel.channelId === id) {
					channel.toggleValue = value
				}
			}

			let payload = { channels: channelsCopy, filters: filters }

			props.setChannels(payload)
			props.fetchVideos(channelsCopy, props.categories)
		}

		if (level === 'Video') {
			let videosCopy = JSON.parse(JSON.stringify(props.videos))
			for (const video of videosCopy) {
				if (video.videoId === id) {
					video.toggleValue = value
				}
			}
			props.setVideos(videosCopy)
		}
	}

	const getSelectedCount = (items) => {
		let mycount = 0
		for (const item of items) {
			if (item.toggleValue && item.toggleValue.length > 1) {
				mycount = mycount + 1
			}
		}
		return mycount
	}

	const getAverage = (items, field) => {
		//get targeted only
		let itemsCopy = JSON.parse(JSON.stringify(items))
		let targetedItems = []
		for (const itemCopy of itemsCopy) {
			if (itemCopy.toggleValue === 'Target') {
				targetedItems.push(itemCopy)
			}
		}

		var total = 0
		for (const item of targetedItems) {
			total = total + item[field]
		}

		let avg = numeral(total / targetedItems.length).format('$00.00')

		return avg
	}

	const selectedCounts = (items) => {
		let myCount = {
			target: {
				items: 0
			},
			monitor: {
				items: 0
			},
			block: {
				items: 0
			}
		}
		for (const item of items) {
			if (item.toggleValue === 'Target') {
				myCount.target.items = myCount.target.items + 1
			}
			if (item.toggleValue === 'Monitor') {
				myCount.monitor.items = myCount.monitor.items + 1
			}
			if (item.toggleValue === 'Block') {
				myCount.block.items = myCount.block.items + 1
			}
		}
		return myCount
	}

	const selectedCategoriesCount = React.useMemo(
		() => getSelectedCount(props.categories),
		[props.categories]
	)
	const selectedChannelsCount = React.useMemo(
		() => getSelectedCount(props.channels),
		[props.channels]
	)
	const selectedVideosCount = React.useMemo(
		() => getSelectedCount(props.videos),
		[props.videos]
	)

	const avgCpm = React.useMemo(() => getAverage(props.videos, 'averageCPM'), [
		props.videos
	])
	const avgCpc = React.useMemo(() => getAverage(props.videos, 'averageCPC'), [
		props.videos
	])
	const avgCpv = React.useMemo(() => getAverage(props.videos, 'averageCPV'), [
		props.videos
	])

	const videosCount = React.useMemo(() => selectedCounts(props.videos), [
		props.videos
	])
	const channelsCount = React.useMemo(() => selectedCounts(props.channels), [
		props.channels
	])

	const disableFilters = true //tabIndex > 0 ? false : true

	const CustomInputGroup = ({ placeholder, ...props }) => (
		<InputGroup {...props}>
			<Input placeholder={placeholder} />
			<InputGroup.Addon style={{ backgroundColor: neutralColor }}>
				<Icon icon='search' style={{ backgroundColor: neutralColor }} />
			</InputGroup.Addon>
		</InputGroup>
	)

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={12} md={3}></Grid>
			<Grid item xs={12} sm={12} md={9}>
				<Button
					color='primary'
					onClick={downloadClick}
					style={{ width: '100%', height: '100%', margin: 0, pading: 0 }}
				>
					<SaveAlt />
					Save & Download List
				</Button>
			</Grid>
			{/**end dropdown and button top header */}
			{/**begin filters */}
			<Grid item xs={12} sm={12} md={3}>
				<Grid container spacing={1} style={styles.col}>
					<Grid item xs={12} sm={12} md={12}></Grid>
					<Grid item xs={12} sm={12} md={12}></Grid>
					<Grid item xs={10}></Grid>
					<Grid item xs={2}>
						<FilterList style={{ color: whiteColor }} fontSize='large' />
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<InputPicker
							style={{ width: '100%' }}
							placeholder={'Country'}
							options={countries}
							onChange={(e) => {
								handleFilterChange(e, 'Country')
							}}
							disabled={disableFilters}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<InputPicker
							style={{ width: '100%' }}
							placeholder={'Video Language'}
							options={languages}
							disabled={disableFilters}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<InputPicker
							style={{ width: '100%' }}
							placeholder={'Category'}
							disabled={disableFilters}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<InputPicker
							style={{ width: '100%' }}
							placeholder={'Kids Content'}
							options={boolOptions}
							disabled={disableFilters}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<InputPicker
							style={{ width: '100%' }}
							placeholder={'Disabled Comments'}
							options={boolOptions}
							disabled={disableFilters}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<InputPicker
							style={{ width: '100%' }}
							placeholder={'Channel Filter'}
							disabled={disableFilters}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<InputPicker
							style={{ width: '100%' }}
							placeholder={'Creator Type'}
							disabled={disableFilters}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<InputPicker
							style={{ width: '100%' }}
							placeholder={'Alignment Score'}
							disabled={disableFilters}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<InputPicker
							style={{ width: '100%' }}
							placeholder={'Clean Rating Score'}
							disabled={disableFilters}
						/>
					</Grid>
				</Grid>
			</Grid>{' '}
			{/**end filters */}
			{/**begin main table */}
			<Grid item xs={12} sm={12} md={9}>
				<div style={styles.col}>
					{/**begin summary */}
					<Grid
						container
						align='center'
						justify='center'
						alignItems='center'
						style={styles.summaryBody}
					>
						<Grid item xs={12} sm={12} md={4}>
							<ListItemText
								primary={'Averages'}
								secondary={
									'CPM: ' + avgCpm + ', CPC: ' + avgCpc + ', CPV: ' + avgCpv
								}
								secondaryTypographyProps={{ color: 'initial' }}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={3}>
							<ListItemText
								primary={'Channel Count'}
								secondary={
									'Target: ' +
									channelsCount.target.items +
									', Monitor: ' +
									channelsCount.monitor.items +
									', Block: ' +
									channelsCount.block.items
								}
								secondaryTypographyProps={{ color: 'initial' }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={3}>
							<ListItemText
								primary={'Video Count'}
								secondary={
									'Target: ' +
									videosCount.target.items +
									', Monitor: ' +
									videosCount.monitor.items +
									', Block: ' +
									videosCount.block.items
								}
								secondaryTypographyProps={{ color: 'initial' }}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={2}>
							<CustomInputGroup size='lg' placeholder='Search...' disabled />
						</Grid>
					</Grid>
					{/**end summary */}

					<Tabs
						bodyHeight={bodyHeight}
						borderRad={borderRad}
						categories={props.categories}
						channels={props.channels}
						videos={props.videos}
						handleButtonGroupChange={handleButtonGroupChange}
						selectedCategoriesCount={selectedCategoriesCount}
						selectedChannelsCount={selectedChannelsCount}
						selectedVideosCount={selectedVideosCount}
						changeTabIndex={(index) => {
							setTabIndex(index)
						}}
					/>
				</div>
			</Grid>{' '}
			{/**end main table */}
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
