import React from 'react'
import GridItem from '../../../components/Grid/GridItem.js'
import GridContainer from '../../../components/Grid/GridContainer.js'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as v from '../../../validations'
import {
	grayColor,
	dangerColor
} from '../../../assets/jss/material-dashboard-react.js'
import { Formik } from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'
import Grid from '@material-ui/core/Grid'
import Button from '../../../components/CustomButtons/Button.js'
import Card from '../../../components/Card/Card.js'
import CardBody from '../../../components/Card/CardBody.js'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import Close from '@material-ui/icons/Close'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import styles from '../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Save from '@material-ui/icons/Save'
import { default as UUID } from 'node-uuid'
import FormHelperText from '@material-ui/core/FormHelperText'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const competitorHeaders = ['Name', 'Twitter Profile', 'Website', '']

export default function TopCompetitors(props) {
	const [addingNew, setAddingNew] = React.useState(false)

	const classes = useStyles()
	const tableClasses = useTableStyles()

	const tableCellClasses = classnames(classes.tableCell, {
		[classes.tableCellRTL]: false
	})

	const handleSaveNew = (values) => {
		setAddingNew(false)
		let newCompetitor = {
			competitorId: (Math.random() * 10000000000) | 0,
			competitorName: values.competitorName,
			twitterProfileUrl: values.twitterProfileUrl,
			websiteUrl: values.websiteUrl
		}
		let newComps = JSON.parse(JSON.stringify(props.values.topCompetitors))
		newComps.push(newCompetitor)
		props.setFieldValue('topCompetitors', newComps)
	}

	const handleDeleteCompetitor = (competitorIdToDelete) => {
		let newComps = [
			...props.competitors.filter(
				({ competitorId }) => competitorId !== competitorIdToDelete
			)
		]
		props.setFieldValue('topCompetitors', newComps)
	}

	return (
		<GridContainer spacing={2}>
			<Grid container justify='flex-end'>
				<GridItem>
					<Button
						disabled={addingNew}
						onClick={() => setAddingNew(true)}
						color='primary'
					>
						Add New Competitor
					</Button>
				</GridItem>
			</Grid>

			<GridItem xs={12} sm={12} md={12}>
				<Card>
					<CardBody>
						{props.errors.topCompetitors ? (
							<FormHelperText
								id='component-helper-text'
								style={{
									color: dangerColor[0],
									fontSize: '16px'
								}}
							>
								{props.errors.topCompetitors}
							</FormHelperText>
						) : null}

						<Table className={classes.table}>
							<TableHead className={tableClasses['primaryTableHeader']}>
								<TableRow className={tableClasses.tableHeadRow}>
									{competitorHeaders.map((prop, key) => {
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
								{addingNew ? (
									<Formik
										validateOnMount={true}
										initialValues={{
											competitorName: '',
											twitterProfileUrl: '',
											websiteUrl: ''
										}}
									>
										{(newCompetitorFormik) => (
											<TableRow
												key={'newlyAdded'}
												className={classes.tableRow}
												style={{ height: '160px' }}
											>
												<TableCell className={tableCellClasses}>
													<FormikInput
														name='competitorName'
														labelProps={{ shrink: true }}
														labelText='Competitor Name'
														validate={v.isBrandProfileNameError}
													/>
												</TableCell>
												<TableCell className={tableCellClasses}>
													<FormikInput
														name='twitterProfileUrl'
														labelProps={{ shrink: true }}
														inputProps={{
															startAdornment: (
																<InputAdornment position='start'>
																	<div style={{ color: grayColor[3] }}>
																		https://twitter.com/
																	</div>
																</InputAdornment>
															)
														}}
														labelText='Competitor Twitter'
														validate={v.isTwitterProfileError}
													/>
												</TableCell>

												<TableCell className={tableCellClasses}>
													<FormikInput
														labelProps={{ shrink: true }}
														name='websiteUrl'
														labelText='Competitor Website'
														validate={v.isWebsiteUrlError}
													/>
												</TableCell>

												<TableCell className={tableCellClasses}>
													<Tooltip
														id='tooltip-top-start'
														title='Remove'
														placement='top'
														classes={{ tooltip: classes.tooltip }}
													>
														<IconButton
															aria-label='Close'
															className={classes.tableActionButton}
															onClick={() => {
																setAddingNew(false)
															}}
														>
															<Close
																className={
																	classes.tableActionButtonIcon +
																	' ' +
																	classes.close
																}
															/>
														</IconButton>
													</Tooltip>
													{Object.keys(newCompetitorFormik.errors).length ===
														0 &&
													newCompetitorFormik.errors.constructor === Object ? (
														<IconButton
															aria-label='Save'
															className={classes.tableActionButton}
															onClick={() => {
																handleSaveNew(newCompetitorFormik.values)
															}}
														>
															<Save
																className={
																	classes.tableActionButtonIcon +
																	' ' +
																	classes.save
																}
															/>
														</IconButton>
													) : null}
												</TableCell>
											</TableRow>
										)}
									</Formik>
								) : null}

								{props.competitors &&
									props.competitors.length > 0 &&
									props.competitors.map((competitor) => (
										<TableRow
											key={competitor.competitorId}
											className={classes.tableRow}
										>
											<TableCell className={tableCellClasses}>
												{competitor.competitorName}
											</TableCell>
											<TableCell className={tableCellClasses}>
												{competitor.twitterProfileUrl}
											</TableCell>

											<TableCell className={tableCellClasses}>
												{competitor.websiteUrl}
											</TableCell>

											<TableCell className={classes.tableActions}>
												<Tooltip
													id='tooltip-top-start'
													title='Remove'
													placement='top'
													classes={{ tooltip: classes.tooltip }}
												>
													<IconButton
														aria-label='Close'
														className={classes.tableActionButton}
														onClick={() => {
															handleDeleteCompetitor(competitor.competitorId)
														}}
													>
														<Close
															className={
																classes.tableActionButtonIcon +
																' ' +
																classes.close
															}
														/>
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</CardBody>
				</Card>
			</GridItem>
		</GridContainer>
	)
}
