import React from 'react'
import CheckTreePicker from 'rsuite/lib/CheckTreePicker'
import 'rsuite/dist/styles/rsuite-default.css';
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor } from '../../assets/jss/material-dashboard-react';





export default function SuiteTree(props) {

  

  const handleChange=(val)=>{
    console.log(val)
    props.onChange('accounts', val)
  }

  return (
    <div style={{marginTop: 27}}>
      <CheckTreePicker 
        defaultExpandAll 
        data={props.data} 
        style={{ width: 280 }} 
        labelKey={props.labelKey}
        valueKey={props.valueKey}
        value={props.value}
        onChange={handleChange}
        cascade={props.cascade}     
      />
      <FormHelperText 
        id="component-helper-text" 
        style={{
          color: dangerColor[0], 
          position: 'absolute',
          bottom: '-1'
        }}
      >
        {props.error}
      </FormHelperText>
    </div>
  )
}