import React from 'react'
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import CustomTree from '../../../components/Tree/CustomTree'
import Grid from '@material-ui/core/Grid'

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
  return (
    <div>
      <GridContainer justify="left">
        <GridItem xs={12} sm={12} md={6}>
          
          <CustomInput
            labelText="Brand Profile Name"
            id="brand-profile-name"
            formControlProps={{
              fullWidth: true,
             
            }}
            inputProps={{
              disabled: false
            }}
          />
        </GridItem>
      </GridContainer>

      <GridContainer justify="left">
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Website URL"
            id="website-url"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
      </GridContainer>
      <GridContainer justify="left">
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Twitter Profile"
            id="twitter-profile"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: "https://twitter.com/"
            }}
          />
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