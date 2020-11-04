import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {
	fetchBrandProfiles,
	fetchBrandProfile,
	deleteBrandProfile,
	setBrandProfileDeleted,
	removeBrandProfile
} from '../../../redux/actions/brandProfiles.js'
import { connect } from 'react-redux'
import styles from '../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import { useHistory } from 'react-router-dom'

const mapStateToProps = (state) => {
	return {
		brandProfiles: state.brandProfiles,
		currentAccountId: state.currentAccountId,
		brandProfilesIsLoading: state.brandProfilesIsLoading,
		brandProfileDeleted: state.brandProfileDeleted,
		scenarios: state.scenarios,
		categories: state.brandCategories,
		topics: state.topics
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBrandProfiles: (accountId) => dispatch(fetchBrandProfiles(accountId)),
		deleteBrandProfile: (brandProfileId) =>
			dispatch(deleteBrandProfile(brandProfileId)),
		removeBrandProfile: (brandProfileId) =>
			dispatch(removeBrandProfile(brandProfileId)),
		setBrandProfileDeleted: (bool) => dispatch(setBrandProfileDeleted(bool)),
		fetchBrandProfile: (brandProfileId) =>
			dispatch(fetchBrandProfile(brandProfileId))
	}
}

function UploadList(props) {
	const history = useHistory()

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={12}>
				Upload Button
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadList)
