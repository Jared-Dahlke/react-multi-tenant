import React from 'react'
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomTree from '../../../components/Tree/CustomTree'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as v from '../../../validations'
import { whiteColor, grayColor } from '../../../assets/jss/material-dashboard-react.js';
import {Field, Formik} from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'

const dummyVerticals = [
  {"title":"Dummy Automotive",
    "key":"0-0-key",
    "children":[{"title":"Car","key":"0-0-0-key",
      "children":[{"title":"0-0-0-0-label","key":"0-0-0-0-key"},{"title":"0-0-0-1-label","key":"0-0-0-1-key"},{"title":"0-0-0-2-label","key":"0-0-0-2-key"}]},{"title":"0-0-1-label","key":"0-0-1-key",
      "children":[{"title":"0-0-1-0-label","key":"0-0-1-0-key"},{"title":"0-0-1-1-label","key":"0-0-1-1-key"},{"title":"0-0-1-2-label","key":"0-0-1-2-key"}]},{"title":"0-0-2-label","key":"0-0-2-key"}]},
  {"title":"Eduction","key":"0-1-key",
    "children":[{"title":"Books","key":"0-1-0-key","children":[{"title":"0-1-0-0-label","key":"0-1-0-0-key"},{"title":"0-1-0-1-label","key":"0-1-0-1-key"},{"title":"0-1-0-2-label","key":"0-1-0-2-key"}]},{"title":"0-1-1-label","key":"0-1-1-key","children":[{"title":"0-1-1-0-label","key":"0-1-1-0-key"},{"title":"0-1-1-1-label","key":"0-1-1-1-key"},{"title":"0-1-1-2-label","key":"0-1-1-2-key"}]},{"title":"0-1-2-label","key":"0-1-2-key"}]},
  {"title":"Test","key":"0-2-key"}]




export default function BasicInfo (props) {

  console.log('basic info props')
  console.log(props)

  const [checkedKeys, setCheckedKeys] = React.useState([])
 
  const onCheck = checkedKeys => {
    setCheckedKeys(checkedKeys)

    console.log(checkedKeys)
    let checked = []
    for (const item of checkedKeys) {
      checked.push({item})
    }
    props.setFieldValue('basicInfoIndustry', checked)
  }

  return (
    <div>
      <GridContainer >
        <GridItem xs={12} sm={8} md={4}>
          <FormikInput 
            name="basicInfoProfileName" 
            labelText="Profile Name"           
            formControlProps={{
              fullWidth: true            
            }}            
          />     
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={8} md={4}>

          <FormikInput 
            name="basicInfoWebsiteUrl" 
            labelText="Website" 
            formControlProps={{
              fullWidth: true
            }}
          />


        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={8} md={4}>
          <FormikInput 
            name="basicInfoTwitterProfile" 
            labelText="Twitter Profile" 
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{            
              startAdornment: <InputAdornment position="start"><div style={{color: grayColor[3]}}>https://twitter.com/</div></InputAdornment>,       
            }}
          />

        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={8} md={6}>
          <CustomTree
            data={dummyVerticals}
            title='Industry'
            keyProp='key'
            labelProp='title'
            valueProp='key'
            search={true}
            treeContainerHeight={200}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            cascade={true}
            errors={props.errors}
            name="basicInfoIndustry"
          />       
        </GridItem>
      </GridContainer>
     </div>
  )
}