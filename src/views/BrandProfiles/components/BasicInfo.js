import React from 'react'
import GridItem from '../../../components/Grid/GridItem.js'
import GridContainer from '../../../components/Grid/GridContainer.js'
import CustomInput from '../../../components/CustomInput/CustomInput.js'
import CustomTree from '../../../components/Tree/CustomTree'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as v from '../../../validations'
import {
	whiteColor,
	grayColor
} from '../../../assets/jss/material-dashboard-react.js'
import { Field, Formik } from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'

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
					<FormikInput
						name='basicInfoProfileName'
						labelText='Profile Name'
						formControlProps={{
							fullWidth: true
						}}
					/>
				</GridItem>
			</GridContainer>

			<GridContainer>
				<GridItem xs={12} sm={8} md={4}>
					<FormikInput
						name='basicInfoWebsiteUrl'
						labelText='Website'
						formControlProps={{
							fullWidth: true
						}}
					/>
				</GridItem>
			</GridContainer>
			<GridContainer>
				<GridItem xs={12} sm={8} md={4}>
					<FormikInput
						name='basicInfoTwitterProfile'
						labelText='Twitter Profile'
						formControlProps={{
							fullWidth: true
						}}
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
				<GridItem xs={12} sm={8} md={6}></GridItem>
			</GridContainer>
		</div>
	)
}
