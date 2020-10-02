
import React from 'react'
import GridItem from "../Grid/GridItem";
import GridContainer from '../Grid/GridContainer'


import {FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Divider} from '@material-ui/core'
import { whiteColor, primaryColor, blackColor, grayColor } from '../../assets/jss/material-dashboard-react.js';
import { makeStyles } from "@material-ui/core/styles";

const styles = theme => ({
  radio: {
    '&$checked': {
      color: primaryColor[0]
    },
    color: whiteColor
  },
  checked: {}
})

const useStyles = makeStyles(styles);

export default function CustomRadio (props) {

  const handleChange=(name, index)=>{
    console.log('handle change')
    console.log(name)
    //delete props.errors[name][index]
  }

  const classes = useStyles();

  return (
    <GridContainer >

        <GridItem xs={6} sm={6} md={6}>
          <div style={{color: grayColor[4], fontSize: '16px', marginTop: '11px', float: "right"}}>{props.labelText}</div>
        </GridItem>

      
      
          <GridItem xs={6} sm={6} md={6}>
              <RadioGroup onChange={()=>handleChange(props.name, props.index)}  aria-label="position"  defaultValue="top" row>
                
                <FormControlLabel 
                  value="block" 
                  control={
                    <Radio classes={{root: classes.radio, checked: classes.checked}}/>
                  } 
                  label="Block" 
                  style={{color: whiteColor}} 
                />

                <FormControlLabel value="monitor" control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label="Monitor" style={{color: whiteColor}}/>
                <FormControlLabel value="target" control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label="Target" style={{color: whiteColor}}/>
                
              </RadioGroup>
              <div style={{color: blackColor, height: 15}}/>
          </GridItem>
      
      


    </GridContainer>

        



  )

}