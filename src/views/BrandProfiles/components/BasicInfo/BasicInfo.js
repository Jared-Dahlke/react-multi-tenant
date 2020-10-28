import React from 'react'
import GridItem from '../../../../components/Grid/GridItem.js'
import Panel from 'rsuite/lib/Panel'
import FormikInput from '../../../../components/CustomInput/FormikInput'
import FormikSelect from '../../../../components/CustomSelect/FormikSelect'
import TopCompetitors from './TopCompetitors'
import Grid from '@material-ui/core/Grid'

export default function BasicInfo(props) {
	return (
		<div>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={6} md={8}>
					<Panel header='Brand Information' bordered>
						<GridItem xs={12} sm={12} md={12}>
							<FormikInput
								name='basicInfoProfileName'
								labelText='Brand Profile Name'
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12}>
							<FormikInput name='basicInfoWebsiteUrl' labelText='Website' />
						</GridItem>

						<GridItem xs={12} sm={12} md={12}>
							<FormikSelect
								id='industryVertical'
								name='basicInfoIndustryVerticalId'
								label='Industry Vertical'
								placeholder='Industry Vertical'
								optionLabel='industryVerticalName'
								optionValue='industryVerticalId'
								options={props.industryVerticals}
								value={props.values.basicInfoIndustryVerticalId}
								onChange={props.setFieldValue}
								onBlur={props.setFieldTouched}
								validateField={props.validateField}
								validateForm={props.validateForm}
								touched={props.touched.basicInfoIndustryVerticalId}
								error={props.errors.basicInfoIndustryVerticalId}
							/>
						</GridItem>

						<GridItem xs={12} sm={12} md={12}>
							<FormikInput
								name='basicInfoTwitterProfile'
								labelText='Twitter Profile'
								startAdornmentText={'https://twitter.com/'}
							/>
						</GridItem>
					</Panel>
				</Grid>
				<Grid item xs={12} sm={8} md={10}>
					<TopCompetitors
						setFieldValue={props.setFieldValue}
						errors={props.errors}
						competitors={props.values.topCompetitors}
						values={props.values}
					/>
				</Grid>
			</Grid>
		</div>
	)
}
