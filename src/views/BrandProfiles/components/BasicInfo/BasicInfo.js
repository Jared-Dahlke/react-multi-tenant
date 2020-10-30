import React from 'react'
import GridItem from '../../../../components/Grid/GridItem.js'
import Panel from 'rsuite/lib/Panel'
import FormikInput from '../../../../components/CustomInput/FormikInput'
import FormikSelect from '../../../../components/CustomSelect/FormikSelect'
import TopCompetitors from './TopCompetitors'
import Grid from '@material-ui/core/Grid'

import { UserCan, perms, userCan } from '../../../../Can'

export default function BasicInfo(props) {
	console.log('basic info props')
	console.log(props)
	return (
		<div>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={6} md={10}>
					<Panel header='Brand Information' bordered>
						<Grid container>
							<GridItem xs={12} sm={12} md={6}>
								<FormikInput
									name='basicInfoProfileName'
									labelText='Brand Profile Name'
									formikValue={props.values.basicInfoProfileName}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={6}>
								<FormikInput
									name='basicInfoWebsiteUrl'
									labelText='Website'
									formikValue={props.values.basicInfoWebsiteUrl}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={6}>
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
									isDisabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
								/>
							</GridItem>

							<GridItem xs={12} sm={12} md={6}>
								<FormikInput
									name='basicInfoTwitterProfile'
									labelText='Twitter Profile'
									formikValue={props.values.basicInfoTwitterProfile}
									startAdornmentText={'https://twitter.com/'}
									disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
								/>
							</GridItem>
						</Grid>
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
