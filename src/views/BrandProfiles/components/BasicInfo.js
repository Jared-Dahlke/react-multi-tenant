import React from 'react'
import GridItem from '../../../components/Grid/GridItem.js'
import GridContainer from '../../../components/Grid/GridContainer.js'
import CustomInput from '../../../components/CustomInput/CustomInput.js'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as v from '../../../validations'
import {
	whiteColor,
	grayColor
} from '../../../assets/jss/material-dashboard-react.js'
import { Field, Formik } from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'
import FormikSelect from '../../../components/CustomSelect/FormikSelect'

export default function BasicInfo(props) {
	const [checkedKeys, setCheckedKeys] = React.useState([])

	const onCheck = (checkedKeys) => {
		setCheckedKeys(checkedKeys)

		let checked = []
		for (const item of checkedKeys) {
			checked.push({ item })
		}
		props.setFieldValue('basicInfoIndustry', checked)
	}

	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={8} md={4}>
					<FormikInput name='basicInfoProfileName' labelText='Profile Name' />
				</GridItem>
			</GridContainer>

			<GridContainer>
				<GridItem xs={12} sm={8} md={4}>
					<FormikInput name='basicInfoWebsiteUrl' labelText='Website' />
				</GridItem>
			</GridContainer>
			<GridContainer>
				<GridItem xs={12} sm={8} md={4}>
					<FormikInput
						name='basicInfoTwitterProfile'
						labelText='Twitter Profile'
						inputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<div style={{ color: grayColor[3] }}>
										https://twitter.com/
									</div>
								</InputAdornment>
							)
						}}
					/>
				</GridItem>
			</GridContainer>
			<GridContainer>
				<GridItem xs={10} sm={10} md={4}>
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
			</GridContainer>
		</div>
	)
}
