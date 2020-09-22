import React from 'react'
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";


export default function BasicInfo (props) {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
          <CustomInput
            labelText="Brand Profile Name"
            id="brand-profile-name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: false
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <CustomInput
            labelText="Website URL"
            id="website-url"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText="Twitter Profile"
            id="twitter-profile"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <div>Industry vertical tree</div>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <div>Industry sub vertical tree</div>
        </GridItem>
      </GridContainer>
    </div>
  )
}