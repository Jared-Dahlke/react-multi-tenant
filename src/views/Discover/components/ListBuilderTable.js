import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	blackColor,
	grayColor,
	whiteColor
} from '../../../assets/jss/material-dashboard-react'

import {
	Table,
	TableCell,
	TableBody,
	TableRow,
	TableHead,
	GridList
} from '@material-ui/core'
import tableStyle from '../../../assets/jss/material-dashboard-react/components/tableStyle'

import ListBuilderRow from './ListBuilderRow'
import SearchBar from './SearchBar'
import GridItem from '../../../components/Grid/GridItem'

import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

export default function ListBuilderTable(props) {
	const [categorySearch, setCategorySearch] = React.useState('')

	const useStyles = makeStyles((theme) => ({
		root: {
			//backgroundColor: 'yellow', //theme.palette.background.paper,
			padding: 0
		}
	}))

	const tableClasses = useStyles(tableStyle)

	const classes = useStyles()

	const Row = ({ index, style, data }) => {
		const item = data.data[index]
		const props = { ...data }

		return (
			<div style={style} key={index}>
				<ListBuilderRow
					rowStyle={classes.tableRow}
					item={item}
					key={index}
					handleButtonGroupChange={props.handleButtonGroupChange}
					level={props.level}
					levelId={props.levelId}
					selectedCategoriesCount={props.selectedCategoriesCount}
					selectedChannelsCount={props.selectedChannelsCount}
					selectedVideosCount={props.selectedVideosCount}
				/>
			</div>
		)
	}

	return (
		<div>
			<GridItem style={{ paddingLeft: 0 }}>
				<SearchBar
					value={categorySearch}
					handleChange={(val) => setCategorySearch(val)}
					onRequestSearch={console.log('searched')}
				/>
			</GridItem>

			<List
				height={props.bodyHeight - 150}
				itemCount={props.data.length}
				itemSize={140}
				width={'100%'}
				itemData={props}
			>
				{Row}
			</List>
		</div>
	)
}
