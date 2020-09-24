import React from 'react'
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomTree from '../../../components/Tree/CustomTree'
import InputAdornment from '@material-ui/core/InputAdornment'
import * as v from '../../../validations'

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

  const isValidForm=(props)=>{
    if(
      v.isBrandProfileNameSuccess(props.basicInfo.profileName) &&
      v.isWebsiteUrlSuccess(props.basicInfo.websiteUrl) &&
      v.isTwitterProfileSuccess(props.basicInfo.twitterProfile)
    ) {
      return true
    }
    return false
  }


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          {isValidForm(props) ? 'valid' : 'invalid'}
          <CustomInput
            labelText="Brand Profile Name"
            id="brand-profile-name"
            formControlProps={{
              fullWidth: true,
             
            }}
            inputProps={{
              value: props.basicInfo.profileName,
              name: "profileName",
              onChange: props.handleChange,
              disabled: false
            }}
            success={v.isBrandProfileNameSuccess(props.basicInfo.profileName)}
            error={v.isBrandProfileNameError(props.basicInfo.profileName)}
            handleClear={()=>props.handleClear('profileName', '')}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Website URL"
            id="website-url"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: props.basicInfo.websiteUrl,
              name: "websiteUrl",
              onChange: props.handleChange,
              disabled: false
            }}
            success={v.isWebsiteUrlSuccess(props.basicInfo.websiteUrl)}
            error={v.isWebsiteUrlError(props.basicInfo.websiteUrl)}
            handleClear={()=>props.handleClear('websiteUrl', '')}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Twitter Profile"
            id="twitter-profile"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: props.basicInfo.twitterProfile,
              startAdornment: <InputAdornment position="start">https://twitter.com/</InputAdornment>,
              name: "twitterProfile",
              onChange: props.handleChange,
            }}
            success={v.isTwitterProfileSuccess(props.basicInfo.twitterProfile)}
            error={v.isTwitterProfileError(props.basicInfo.twitterProfile)}
            handleClear={()=>props.handleClear('twitterProfile', '')}
          />
          {/*<FormHelperText id="my-helper-text">{'https://twitter.com/' + props.basicInfo.twitterProfile}</FormHelperText>*/}
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTree
            data={dummyVerticals}
            title='Industry'
            search={true}
            treeContainerHeight={200}
          />
        </GridItem>
      </GridContainer>
    </div>
  )
}