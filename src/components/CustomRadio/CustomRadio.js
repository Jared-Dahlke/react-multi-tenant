
import React from 'react'
import GridItem from "../Grid/GridItem";
import GridContainer from '../Grid/GridContainer'


import {FormControlLabel, RadioGroup, Radio} from '@material-ui/core'
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


  const handleChange=(name, e)=>{
    e.persist()
    props.setFieldValue(name, e.target.value)
  }

  const classes = useStyles();

  return (
    <GridContainer >

        <GridItem xs={6} sm={6} md={6}>
          <div style={{color: grayColor[4], fontSize: '16px', marginTop: '11px', float: "right"}}>{props.labelText}</div>
        </GridItem>

      
      
          <GridItem xs={6} sm={6} md={6}>
              <RadioGroup 
                onChange={(e)=>handleChange(props.fieldName, e)}  
                aria-label="position"  
                defaultValue="top" 
                row
                value={props.values.fieldName}                     
              >
                
                <FormControlLabel 
                  value="block" 
                  control={
                    <Radio classes={{root: classes.radio, checked: classes.checked}}/>
                  } 
                  label="Block" 
                  style={{color: whiteColor}} 
                  name={props.fieldName}
                />

                <FormControlLabel name={props.fieldName} value="monitor" control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label="Monitor" style={{color: whiteColor}}/>
                <FormControlLabel name={props.fieldName} value="target" control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label="Target" style={{color: whiteColor}}/>
                
              </RadioGroup>
              <div style={{color: blackColor, height: 15}}/>
          </GridItem>
      
      


    </GridContainer>

        



  )

}