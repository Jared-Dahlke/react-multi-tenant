import React from "react";
// nodejs library that concatenates classes
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
// nodejs library to set properties for components
import PropTypes from "prop-types";
import Check from "@material-ui/icons/Check";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/components/buttonStyle.js" //"../../material-dashboard-react/components/buttonStyle.js";
import { Checkbox } from "@material-ui/core";
import taskstyles from "../../assets/jss/material-dashboard-react/components/tasksStyle.js";
import inputStyles from "../../assets/jss/material-dashboard-react/components/customInputStyle.js"
const useStyles = makeStyles(styles);
const useTaskStyles = makeStyles(taskstyles);


const useInputStyles = makeStyles(inputStyles);
export default function RegularButton(props) {

  const taskClasses = useTaskStyles();

  const inputClasses = useInputStyles();


  
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    checked,
    changed
  } = props;

  return (
    
<FormControl
{...formControlProps}
className={formControlProps.className + " " + classes.formControl}
>
<FormControlLabel
        control={
          <Checkbox
          checked={checked}
          onClick={changed}
          checkedIcon={<Check className={taskClasses.checkedIcon} />}
          icon={<Check className={taskClasses.uncheckedIcon} />}
            name="checkedB"        
            classes={{
              checked: taskClasses.checked,
              root: taskClasses.root
            }}
          />
        }
        label={labelText}
        classes={{label: inputClasses.labelRoot}}
        
      />

</FormControl>
   


  );
}

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.object,
  children: PropTypes.node
};
