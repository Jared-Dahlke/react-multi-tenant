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
import FormikInput from '../../../../components/CustomInput/FormikInput'

import { UserCan, perms, userCan } from '../../../../Can'

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
		let old = JSON.parse(JSON.stringify(values.competitors))
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
							.required('Required')
							.test('urlTest', 'Valid URL required', (websiteUrl) => {
								return urlRegex({ exact: true, strict: false }).test(websiteUrl)
							}),
						twitterProfileUrl: Yup.string()
							.min(2, 'Must be greater than 1 character')
							.max(50, 'Must be less than 30 characters')
							.required('Required')
					})
					.transform((v) => (v === '' ? null : v))
			)
	})

	const CustomField = (props) => {
		return (
			<FormikInput
				name={props.name}
				disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
				formikValue={props.formikValue}
				specialError={props.error}
				startAdornmentText={props.name.includes('twitter') && 'twitter.com/'}
				simple
			/>
		)
	}

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
								<UserCan i={perms.BRAND_PROFILE_UPDATE}>
									<Button
										size={'sm'}
										appearance='link'
										onClick={() => {
											handleAddNew(formik.values, formik.setFieldValue)
										}}
									>
										{formik.values.competitors.length < 1
											? 'Add a Competitor'
											: 'Add another'}
										Add another
									</Button>
								</UserCan>
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
												<TableCell className={tableCellClasses} key={key}>
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
																<TableCell className={tableCellClasses}>
																	<CustomField
																		name={`competitors.${index}.competitorName`}
																		formikValue={competitor.competitorName}
																		error={
																			formik.errors &&
																			formik.errors.competitors &&
																			formik.errors.competitors[index] &&
																			formik.errors.competitors[index]
																				.competitorName
																		}
																	/>
																</TableCell>

																<TableCell
																	style={{ padding: 4, margin: 4 }}
																	className={tableCellClasses}
																>
																	<CustomField
																		name={`competitors.${index}.twitterProfileUrl`}
																		formikValue={competitor.twitterProfileUrl}
																		error={
																			formik.errors &&
																			formik.errors.competitors &&
																			formik.errors.competitors[index] &&
																			formik.errors.competitors[index]
																				.twitterProfileUrl
																		}
																		//	error={competitor}
																	/>
																</TableCell>

																<TableCell
																	style={{ padding: 4, margin: 4 }}
																	className={tableCellClasses}
																>
																	<CustomField
																		name={`competitors.${index}.websiteUrl`}
																		formikValue={competitor.websiteUrl}
																		error={
																			formik.errors &&
																			formik.errors.competitors &&
																			formik.errors.competitors[index] &&
																			formik.errors.competitors[index]
																				.websiteUrl
																		}
																	/>
																</TableCell>

																<TableCell
																	style={{ padding: 4, margin: 4 }}
																	className={tableCellClasses}
																>
																	<UserCan i={perms.BRAND_PROFILE_UPDATE}>
																		<Button
																			size={'sm'}
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
																	</UserCan>
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
