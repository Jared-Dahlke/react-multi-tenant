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
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import { whiteColor } from "../../assets/jss/material-dashboard-react.js";

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
    handleItemSelect,
    error,
    success
  } = props;

  const marginTop = classNames({
    [classes.marginTop]: null === undefined,
  
  });

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
 
  
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
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
          style={{color: whiteColor}}
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
            
              
            >
             {role.roleName}
            </MenuItem>

          )})
        }
        
        
      </Select>

      {error ? (
        
        <div onClick={() => props.handleClear()}>
          <Clear className={classes.feedback + " " + classes.labelRootError + " " + classes.clickable}/>
        </div>
        /*<Clear className={classes.feedback + " " + classes.labelRootError} />*/
        
      ) : success ? (
        <div style={{position: "absolute", right: -40}}>
          <Check className={classes.feedback + " " + classes.labelRootSuccess} />
        </div>
       
        
      ) : null}

      
    </FormControl>
  );
}

