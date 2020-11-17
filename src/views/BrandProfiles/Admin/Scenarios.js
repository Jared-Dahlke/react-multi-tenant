import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import Button from 'rsuite/lib/Button'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import {
	fetchAdminBrandScenarios,
	archiveScenario,
	setScenarioArchived
} from '../../../redux/actions/brandProfilesAdmin/scenarios'
import { connect } from 'react-redux'
import styles from '../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { FormLoader } from '../../../components/SkeletonLoader'
import { routes } from '../../../routes'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		scenariosIsLoading: state.brandProfilesAdmin.scenariosIsLoading,
		scenarioArchived: state.brandProfilesAdmin.scenarioArchived,
		scenarioArchiving: state.brandProfilesAdmin.scenarioArchiving,
		adminScenarios: state.brandProfilesAdmin.scenarios
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAdminBrandScenarios: () => dispatch(fetchAdminBrandScenarios()),
		archiveScenario: (scenarioId) => dispatch(archiveScenario(scenarioId)),
		setScenarioArchived: (bool) => dispatch(setScenarioArchived(bool))
	}
}

function Scenarios(props) {
	let history = useHistory()

	const classes = useStyles()
	const tableClasses = useTableStyles()

	const { fetchAdminBrandScenarios, adminScenarios } = props
	React.useEffect(() => {
		if (adminScenarios.length === 0) {
			fetchAdminBrandScenarios();
		}
	})

	const tableCellClasses = classnames(classes.tableCell, {
		[classes.tableCellRTL]: false
	})

	const userHeaders = ['Scenario Name', 'Archived', '']

	const handleArchiveScenarioClick = (scenarioId) => {
		props.archiveScenario(scenarioId)
	}

	const handleCreateScenarioClick = () => {
		let url = routes.app.settings.brandProfiles.admin.scenarios.create.path
		history.push(url)
	}

	return (
		<Grid container justify='center'>
			<Snackbar
				autoHideDuration={2000}
				place='bc'
				open={props.scenarioArchived}
				onClose={() => props.setScenarioArchived(false)}
				color='success'
			>
				<Alert
					onClose={() => props.setScenarioArchived(false)}
					severity='success'
				>
					Scenario Archived
				</Alert>
			</Snackbar>

			<GridItem xs={12} sm={12} md={6}>
				{adminScenarios && adminScenarios.length > 0 ? (
					<div>
						<Button appearance='primary' onClick={handleCreateScenarioClick}>
							Create Scenario
						</Button>

						<Table className={classes.table}>
							<TableHead className={tableClasses['primaryTableHeader']}>
								<TableRow className={tableClasses.tableHeadRow}>
									{userHeaders.map((prop, key) => {
										return (
											<TableCell
												className={
													tableClasses.tableCell +
													' ' +
													tableClasses.tableHeadCell
												}
												key={key}
											>
												{prop}
											</TableCell>
										)
									})}
								</TableRow>
							</TableHead>

							<TableBody>
								{adminScenarios &&
									adminScenarios.map((scenario) => (
										<TableRow
											key={scenario.scenarioId || 'placeholder'}
											className={classes.tableRow}
										>
											<TableCell className={tableCellClasses}>
												{scenario.scenarioName}
											</TableCell>
											<TableCell className={tableCellClasses}>
												{scenario.archived ? 'True' : 'False'}
											</TableCell>

											<TableCell className={classes.tableActions}>
												{!scenario.archived && (
													<Button
														appearance='link'
														loading={
															props.scenarioArchiving === scenario.scenarioId
														}
														onClick={() => {
															handleArchiveScenarioClick(scenario.scenarioId)
														}}
													>
														Archive
													</Button>
												)}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>
				) : props.scenariosIsLoading ? (
					<FormLoader />
				) : (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',

									height: 'calc(100vh - 200px)',
									color: 'white'
								}}
							>
								<Button appearance='primary' onClick={handleCreateScenarioClick}>
									Create Scenario
						</Button>
							</div>
						)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Scenarios)
