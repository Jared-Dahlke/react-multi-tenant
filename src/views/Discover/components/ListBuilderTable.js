import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import tableStyle from '../../../assets/jss/material-dashboard-react/components/tableStyle'

import ListBuilderRow from './ListBuilderRow'
import SearchBar from './SearchBar'
import GridItem from '../../../components/Grid/GridItem'

import { FixedSizeList as List } from 'react-window'

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
			<List
				height={props.bodyHeight - 100}
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
