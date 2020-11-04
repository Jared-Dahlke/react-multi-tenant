import React from 'react'
import GridItem from '../../../components/Grid/GridItem'
import GridContainer from '../../../components/Grid/GridContainer'
import { whiteColor } from '../../../assets/jss/material-dashboard-react'
import Grid from '@material-ui/core/Grid'
import InputGroup from 'rsuite/lib/InputGroup'
import Input from 'rsuite/lib/Input'
import Icon from 'rsuite/lib/Icon'

const CustomInputGroup = ({ placeholder, ...props }) => (
	<InputGroup {...props}>
		<Input placeholder={placeholder} />
		<InputGroup.Addon>
			<Icon icon='search' />
		</InputGroup.Addon>
	</InputGroup>
)

export default function ListBuilderSearchBar(props) {
	return (
		<GridContainer
			style={{ backgroundColor: whiteColor, height: 50, alignItems: 'center' }}
		>
			<Grid item xs={false} sm={8} md={4} style={{ paddingLeft: 12 }}></Grid>

			<GridItem xs={false} sm={8} md={4}></GridItem>

			<GridItem xs={12} sm={4} md={4}>
				<CustomInputGroup placeholder='Search...' />
			</GridItem>
		</GridContainer>
	)
}
