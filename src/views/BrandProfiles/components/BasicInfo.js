import React from 'react'
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomTree from '../../../components/Tree/CustomTree'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as v from '../../../validations'
import { whiteColor, grayColor } from '../../../assets/jss/material-dashboard-react.js';
import {Field} from 'formik'
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

  const [checkedKeys, setCheckedKeys] = React.useState([])
 
  const onCheck = checkedKeys => {
    setCheckedKeys(checkedKeys)
  }

  return (
    
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <FormikInput 
            name="basicInfoProfileName" 
            labelText="Profile Name" 
            
            validate={v.isBrandProfileNameError}
            formControlProps={{
              fullWidth: true
              
            }}
            
          />     
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>

          <FormikInput 
            name="basicInfoWebsiteUrl" 
            validate={v.isWebsiteUrlError}
            labelText="Website" 
            formControlProps={{
              fullWidth: true
            }}
          />


        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <FormikInput 
            name="basicInfoTwitterProfile" 
            validate={v.isTwitterProfileError}
            labelText="Twitter Profile" 
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{            
              startAdornment: <InputAdornment position="start"><div style={{color: grayColor[3]}}>https://twitter.com/</div></InputAdornment>,       
            }}
          />

          {/*<FormHelperText id="my-helper-text">{'https://twitter.com/' + props.basicInfo.twitterProfile}</FormHelperText>*/}
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
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
          />

          {/**<CustomTree
                        data={props.accounts.data}
                        title='Account Access'
                        keyProp='accountId'
                        labelProp='accountName'
                        valueProp='accountId'
                        search={true}
                        treeContainerHeight={150}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                      /> */}
        </GridItem>
      </GridContainer>
    </div>
    
  )
}