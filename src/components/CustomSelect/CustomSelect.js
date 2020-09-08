import React from "react";
import classNames from "classnames";
// @material-ui/core components
import Input from "@material-ui/core/Input"
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select"
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle.js"
import dropdownStyles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js"

const useStyles = makeStyles(styles);
const useDropdownStyles = makeStyles(dropdownStyles)
export default function CustomSelect(props) {
  const classes = useStyles();
  const dropDownClasses = useDropdownStyles()
  const {
    formControlProps,
    labelText,
    value,
    multiple,
    handleItemSelect
  } = props;

  const marginTop = classNames({
    [classes.marginTop]: null === undefined,
  
  });

  const underlineClasses = classNames({
  //  [classes.underlineError]: false,
  //  [classes.underlineSuccess]: true && !false,
    [classes.underline]: true
  });

  const labelClasses = classNames({
    [" " + classes.labelRootError]: false,
    [" " + classes.labelRootSuccess]: true && !false
  });
 

  
  return (
    <FormControl className={classes.formControl} {...formControlProps}>
      <InputLabel
        className={classes.labelRoot + labelClasses} 
      >
        {labelText}
      </InputLabel>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        input={<Input
          classes={{
            underline: underlineClasses
          }}
          />}
        value={value}
        onChange={handleItemSelect}
        multiple={multiple}
        classes={{
          root: marginTop,
          disabled: classes.disabled
        }}
      >

        
        {props.roles && props.roles.map(role=>{
          return (
          <MenuItem 
          key={role.roleId} 
          value={role.roleId}
          className={dropDownClasses.dropdownItem}
          >
            {role.roleName}
          </MenuItem>

          )})
        }
        
        
      </Select>
      
    </FormControl>
  );
}

