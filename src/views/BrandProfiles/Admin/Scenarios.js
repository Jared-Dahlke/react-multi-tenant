import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import Button from 'rsuite/lib/Button'
import ButtonToolbar from 'rsuite/lib/ButtonToolbar'
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
	archiveScenario
} from '../../../redux/actions/admin/scenarios'
import { connect } from 'react-redux'
import styles from '../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import { FormLoader } from '../../../components/SkeletonLoader'
import { routes } from '../../../routes'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		scenariosIsLoading: state.admin.scenariosIsLoading,
		scenarioArchiving: state.admin.scenarioArchiving,
		adminScenarios: state.admin.scenarios
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAdminBrandScenarios: () => dispatch(fetchAdminBrandScenarios()),
		archiveScenario: (scenarioId) => dispatch(archiveScenario(scenarioId))
	}
}

function Scenarios(props) {
	let history = useHistory()

	const classes = useStyles()
	const tableClasses = useTableStyles()

	const { fetchAdminBrandScenarios, adminScenarios } = props
	React.useEffect(() => {
		if (adminScenarios.length === 0) {
			fetchAdminBrandScenarios()
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
		let url = routes.admin.scenarios.create.path
		history.push(url)
	}

	const handleConfigureLabelsClick = () => {
		let url = routes.admin.scenarios.labels.path
		history.push(url)
	}

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={10}>
				{adminScenarios && adminScenarios.length > 0 ? (
					<div>
						<ButtonToolbar>
							<Button appearance='primary' onClick={handleCreateScenarioClick}>
								Create Scenario
							</Button>
							<Button appearance='primary' onClick={handleConfigureLabelsClick}>
								Configure Labels
							</Button>
						</ButtonToolbar>

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
