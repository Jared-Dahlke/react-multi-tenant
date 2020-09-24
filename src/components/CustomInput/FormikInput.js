import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle.js" //"assets/jss/material-dashboard-react/components/customInputStyle.js";
import {whiteColor} from '../../assets/jss/material-dashboard-react'
import {Field} from 'formik'
const useStyles = makeStyles(styles);



export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });

  
  
  return (
    <Field name={props.name} validate={props.validate}>
      {({field, form}) =>

      <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
        
      >



        
        {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}

        
        <Input
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          {...inputProps}
          {...field}
          style={{color: whiteColor}}
          autoComplete="adf"
        />
        {form.errors[field.name] && (field.value.length > 0 || form.touched[field.name]) ? (
          
          <div>
            <Clear className={classes.feedback + " " + classes.labelRootError}/>
          </div>
          /*<Clear className={classes.feedback + " " + classes.labelRootError} />*/
          
        ) : !form.errors[field.name] && field.value.length > 0  ? (
          <Check className={classes.feedback + " " + classes.labelRootSuccess} />
        ) : null}

         {/*<div style={{color:'white'}}>Form: {JSON.stringify(form,2,null)}</div>
          <div style={{color:'white'}}>Field: {JSON.stringify(field,2,null)}</div>*/}
       
      </FormControl>
    }
    </Field>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  handleClear: PropTypes.func,
  styling: PropTypes.object
};
