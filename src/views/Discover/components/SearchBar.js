import React from 'react'
import SearchBar from "material-ui-search-bar";
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import Search from '@material-ui/icons/Search'

import Select, { components } from 'react-select';
import { whiteColor } from '../../../assets/jss/material-dashboard-react';
import { Checkbox, FormControlLabel, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'



const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Search />
      </components.DropdownIndicator>
    )
  );
};

export default function ListBuilderSearchBar (props) {
  return (
    <GridContainer style={{backgroundColor: whiteColor,  height: 50, alignItems: 'center'}}>

        <Grid item xs={false} sm={8} md={4} style={{paddingLeft: 12}}>  
         {/** <FormControlLabel
            value="end"
            control={<Checkbox style={{paddingRight: 24}}/>}
            label="Select All"
            labelPlacement="end"
          />     */} 
          
        </Grid>


        <GridItem xs={false} sm={8} md={4}>       
          
        </GridItem>

        <GridItem xs={12} sm={4} md={4}>                          
          <Select
            components={{ DropdownIndicator }}
            placeholder='Search...'
            isDisabled
            // pass other props
           
          />
        </GridItem>

    </GridContainer>
  )

}