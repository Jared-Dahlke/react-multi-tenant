import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select"
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle.js" //"assets/jss/material-dashboard-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomSelect(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    items,
    value,
    handleItemSelect
  } = props;

  const marginTop = classNames({
    [classes.marginTop]: null === undefined
  });

  const underlineClasses = classNames({
    [classes.underlineError]: false,
    [classes.underlineSuccess]: true && !false,
    [classes.underline]: true
  });

  const labelClasses = classNames({
    [" " + classes.labelRootError]: false,
    [" " + classes.labelRootSuccess]: true && !false
  });

  
  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        className={classes.labelRoot + labelClasses} 
      >
        {labelText}
      </InputLabel>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleItemSelect}
        classes={{
          root: marginTop,
          disabled: classes.disabled,    
        }}
      >
        
        {items && items.map(item=>{
          return (
          <MenuItem key={item.roleId} value={item.roleId}>{item.roleName}</MenuItem>
          )})
        }
        
        
      </Select>
      
    </FormControl>
  );
}

