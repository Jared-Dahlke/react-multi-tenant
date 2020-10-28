import React from 'react'
import { Formik } from 'formik'
import FormikInput from '../../../../components/CustomInput/FormikInput'
import Panel from 'rsuite/lib/Panel'
import Button from 'rsuite/lib/Button'
import { dangerColor } from '../../../../assets/jss/material-dashboard-react.js'
import * as v from '../../../../validations'
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
import styles from '../../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Save from '@material-ui/icons/Save'
import FormHelperText from '@material-ui/core/FormHelperText'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const competitorHeaders = ['Name', 'Twitter Profile', 'Website', '']

export default function TopCompetitors(props) {
	const classes = useStyles()
	const tableClasses = useTableStyles()
	const tableCellClasses = classnames(classes.tableCell, {
		[classes.tableCellRTL]: false
	})

	const [addingNew, setAddingNew] = React.useState(false)

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
		<Panel header='Competitors' bordered>
			<Button disabled={addingNew} onClick={() => setAddingNew(true)}>
				Add New Competitor
			</Button>

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
										tableClasses.tableCell + ' ' + tableClasses.tableHeadCell
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
											inputProps={{}}
											startAdornmentText={'https://twitter.com/'}
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
														classes.tableActionButtonIcon + ' ' + classes.close
													}
												/>
											</IconButton>
										</Tooltip>
										{Object.keys(newCompetitorFormik.errors).length === 0 &&
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
														classes.tableActionButtonIcon + ' ' + classes.save
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
													classes.tableActionButtonIcon + ' ' + classes.close
												}
											/>
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</Panel>
	)
}
