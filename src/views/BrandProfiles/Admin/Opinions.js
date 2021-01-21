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
	fetchAdminBrandOpinions,
	archiveOpinion
} from '../../../redux/actions/admin/opinions'
import { connect } from 'react-redux'
import styles from '../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import { FormLoader } from '../../../components/SkeletonLoader'
import { routes } from '../../../routes'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		opinionsIsLoading: state.admin.opinionsIsLoading,
		opinionArchiving: state.admin.opinionArchiving,
		adminOpinions: state.admin.opinions
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAdminBrandOpinions: () => dispatch(fetchAdminBrandOpinions()),
		archiveOpinion: (opinionId) => dispatch(archiveOpinion(opinionId))
	}
}

function Opinions(props) {
	let history = useHistory()

	const classes = useStyles()
	const tableClasses = useTableStyles()

	const { fetchAdminBrandOpinions, adminOpinions } = props
	React.useEffect(() => {
		if (adminOpinions.length === 0) {
			fetchAdminBrandOpinions()
		}
	})

	const tableCellClasses = classnames(classes.tableCell, {
		[classes.tableCellRTL]: false
	})

	const userHeaders = ['Question', 'Opinion Type', 'Archived', '']

	const handleArchiveOpinionClick = (opinionId) => {
		props.archiveOpinion(opinionId)
	}

	const handleCreateOpinionClick = () => {
		let url = routes.admin.opinions.create.path
		history.push(url)
	}

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={6}>
				{adminOpinions && adminOpinions.length > 0 ? (
					<div>
						<Button appearance='primary' onClick={handleCreateOpinionClick}>
							Create Opinion
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
								{adminOpinions &&
									adminOpinions.map((opinion) => (
										<TableRow
											key={opinion.opinionId || 'placeholder'}
											className={classes.tableRow}
										>
											<TableCell className={tableCellClasses}>
												{opinion.question}
											</TableCell>
											<TableCell className={tableCellClasses}>
												{opinion.opinionType}
											</TableCell>
											<TableCell className={tableCellClasses}>
												{opinion.archived ? 'True' : 'False'}
											</TableCell>

											<TableCell className={classes.tableActions}>
												{!opinion.archived && (
													<Button
														appearance='link'
														loading={
															props.opinionArchiving === opinion.opinionId
														}
														onClick={() => {
															handleArchiveOpinionClick(opinion.opinionId)
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
				) : props.opinionsIsLoading ? (
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
						<Button appearance='primary' onClick={handleCreateOpinionClick}>
							Create Opinion
						</Button>
					</div>
				)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Opinions)
