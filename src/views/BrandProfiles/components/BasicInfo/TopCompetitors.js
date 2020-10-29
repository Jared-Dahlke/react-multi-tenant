import React from 'react'
import {
	Formik,
	FieldArray,
	ErrorMessage,
	Field,
	useFormikContext
} from 'formik'
import Panel from 'rsuite/lib/Panel'
import Button from 'rsuite/lib/Button'
import {
	dangerColor,
	defaultFont
} from '../../../../assets/jss/material-dashboard-react.js'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import Grid from '@material-ui/core/Grid'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classnames from 'classnames'
import styles from '../../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import FormHelperText from '@material-ui/core/FormHelperText'
import debounce from 'just-debounce-it'
import Label from '../../../../components/CustomInputLabel/CustomInputLabel'
import IconButton from 'rsuite/lib/IconButton'
import Icon from 'rsuite/lib/Icon'

import { neutralColor } from '../../../../assets/jss/colorContants'
import * as Yup from 'yup'
const urlRegex = require('url-regex')

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const competitorHeaders = ['Name', 'Twitter Profile', 'Website', '']

export default function TopCompetitors(props) {
	const classes = useStyles()
	const tableClasses = useTableStyles()
	const tableCellClasses = classnames(classes.tableCell, {
		[classes.tableCellRTL]: false
	})

	const handleSaveNew = (values) => {
		let newComps = []
		for (const competitor of values.competitors) {
			let newCompetitor = {
				competitorId: (Math.random() * 10000000000) | 0,
				competitorName: competitor.competitorName,
				twitterProfileUrl: competitor.twitterProfileUrl,
				websiteUrl: competitor.websiteUrl
			}
			newComps.push(newCompetitor)
		}

		props.setFieldValue('topCompetitors', newComps)
	}

	const handleAddNew = (values, setFieldValue) => {
		console.log(values)
		let old = JSON.parse(JSON.stringify(values.competitors))
		console.log(old)
		old.push({
			competitorName: '',
			websiteUrl: '',
			twitterProfileUrl: ''
		})
		setFieldValue('competitors', old)
	}

	const handleDeleteCompetitor = (
		competitorIdToDelete,
		arrayHelpers,
		index
	) => {
		arrayHelpers.remove(index)
		let newComps = [
			...props.competitors.filter(
				({ competitorId }) => competitorId !== competitorIdToDelete
			)
		]
		props.setFieldValue('topCompetitors', newComps)
	}

	const schema = Yup.object().shape({
		competitors: Yup.array()
			.typeError('Wrong type')
			.min(1, 'At least one competitor is required')
			.of(
				Yup.object()
					.shape({
						competitorName: Yup.string()
							.min(2, 'Must be greater than 1 character')
							.max(50, 'Must be less than 50 characters')
							.required('Required'),
						websiteUrl: Yup.string()
							.test(
								'urlTest',
								'Valid URL required (e.g. google.com)',
								(websiteUrl) => {
									return urlRegex({ exact: true, strict: false }).test(
										websiteUrl
									)
								}
							)
							.required('Required'),

						twitterProfileUrl: Yup.string()
							.min(2, 'Must be greater than 1 character')
							.max(50, 'Must be less than 30 characters')
							.required('Required')
					})
					.transform((v) => (v === '' ? null : v))
			)
	})

	const CustomField = (props) => (
		<div style={{ position: 'relative' }}>
			<Field
				style={{
					color: 'white',
					backgroundColor: neutralColor,
					borderRadius: 5,
					border: '1px solid grey',
					position: 'relative'
				}}
				name={props.name}
			/>
			<ErrorMessage
				component='div'
				name={props.name}
				style={{
					color: dangerColor[0],
					position: 'absolute',
					top: 24,
					font: defaultFont
				}}
			/>
		</div>
	)

	const AutoSave = ({ debounceMs }) => {
		const formik = useFormikContext()
		const debouncedSubmit = React.useCallback(
			debounce(() => formik.submitForm(), debounceMs),
			[debounceMs, formik.submitForm]
		)

		React.useEffect(() => {
			if (formik.values !== formik.initialValues && formik.dirty)
				debouncedSubmit()
		}, [debouncedSubmit, formik.values])

		return null
	}

	return (
		<Formik
			enableReinitialize={true}
			validateOnMount={true}
			validationSchema={schema}
			onSubmit={(competitor) => handleSaveNew(competitor)}
			initialValues={{
				competitors:
					props.competitors && props.competitors.length > 0
						? props.competitors
						: [
								{
									competitorId: '',
									competitorName: '',
									websiteUrl: '',
									twitterProfileUrl: ''
								}
						  ]
			}}
		>
			{(formik) => (
				<Panel header='Competitors' bordered>
					<Grid container justify='center'>
						<Grid item>
							<Grid container justify='flex-end'>
								<Button
									size={'sm'}
									onClick={
										() => {
											handleAddNew(formik.values, formik.setFieldValue)
										}
										//	arrayHelpers
									} // insert an empty string at a position
								>
									Add
								</Button>
							</Grid>
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
									<TableRow>
										{competitorHeaders.map((prop, key) => {
											return (
												<TableCell
													style={{ padding: 4, margin: 4 }}
													className={tableCellClasses}
													key={key}
												>
													<Label label={prop} />
												</TableCell>
											)
										})}
									</TableRow>
								</TableHead>
								<FieldArray
									name='competitors'
									render={(arrayHelpers) => {
										const competitors = formik.values.competitors
										return (
											<TableBody>
												{competitors && competitors.length > 0
													? competitors.map((competitor, index) => (
															<TableRow key={index} style={{ border: 0 }}>
																<TableCell
																	style={{ padding: 4, margin: 4 }}
																	className={tableCellClasses}
																>
																	<CustomField
																		name={`competitors.${index}.competitorName`}
																	/>
																</TableCell>

																<TableCell
																	style={{ padding: 4, margin: 4 }}
																	className={tableCellClasses}
																>
																	<CustomField
																		name={`competitors.${index}.twitterProfileUrl`}
																	/>
																</TableCell>

																<TableCell
																	style={{ padding: 4, margin: 4 }}
																	className={tableCellClasses}
																>
																	<CustomField
																		name={`competitors.${index}.websiteUrl`}
																	/>
																</TableCell>

																<TableCell
																	style={{ padding: 4, margin: 4 }}
																	className={tableCellClasses}
																>
																	<Button
																		size={'sm'}
																		color='red'
																		appearance='link'
																		onClick={() =>
																			handleDeleteCompetitor(
																				competitor.competitorId,
																				arrayHelpers,
																				index
																			)
																		}
																	>
																		Remove
																	</Button>
																</TableCell>
															</TableRow>
													  ))
													: null}

												<AutoSave debounceMs={1000} />
											</TableBody>
										)
									}}
								/>
							</Table>
						</Grid>
					</Grid>
				</Panel>
			)}
		</Formik>
	)
}

/**<TableRow
									key={'newlyAdded'}
									className={classes.tableRow}
									style={{ height: '140px' }}
								>
									<TableCell className={tableCellClasses}>
										<FormikInput
											name='competitorName'
											validate={v.isBrandProfileNameError}
											simple
										/>
									</TableCell>
									<TableCell className={tableCellClasses}>
										<FormikInput
											name='twitterProfileUrl'
											startAdornmentText={'https://twitter.com/'}
											validate={v.isTwitterProfileError}
											simple
										/>
									</TableCell>

									<TableCell className={tableCellClasses}>
										<FormikInput
											name='websiteUrl'
											validate={v.isWebsiteUrlError}
											simple
										/>
									</TableCell>

									<TableCell>
										<IconButton
											aria-label='Close'
											className={classes.tableActionButton}
											onClick={() => {
												setAddingNew(false)
											}}
											style={{ marginLeft: 10 }}
										>
											<Label label='Remove  ' color={accentColor} />
										</IconButton>
									</TableCell>
									<TableCell>
										{Object.keys(newCompetitorFormik.errors).length === 0 &&
										newCompetitorFormik.errors.constructor === Object ? (
											<IconButton
												aria-label='Save'
												className={classes.tableActionButton}
												onClick={() => {
													handleSaveNew(newCompetitorFormik.values)
												}}
											>
												<Label label='Save  ' color={accentColor} />
											</IconButton>
										) : null}
									</TableCell>
								</TableRow> */
