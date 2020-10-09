import React from 'react'
import CheckTreePicker from 'rsuite/lib/CheckTreePicker'
//import 'rsuite/dist/styles/rsuite-default.css';
//import 'rsuite/dist/styles/rsuite-dark.css';
import 'rsuite/lib/styles/index.less';
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor, blackColor } from '../../assets/jss/material-dashboard-react';
import './custom-theme.less';

const styles = {
  ".rs-picker-default .rs-btn, .rs-picker-input .rs-btn, .rs-picker-default .rs-picker-toggle, .rs-picker-input .rs-picker-toggle": {
    backgroundColor: 'black'
  }
}


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