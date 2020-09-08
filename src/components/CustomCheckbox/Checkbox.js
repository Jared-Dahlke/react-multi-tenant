import React from "react";
// nodejs library that concatenates classes
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"
import InputLabel from "@material-ui/core/InputLabel"
import classNames from "classnames";
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
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    formControlProps,
    labelText,
    checked,
    handleChange,
    ...rest
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: false,
    [" " + classes.labelRootSuccess]: true && !false
  });

  return (
    
   /**<Checkbox
    // checked={checked.indexOf(value) !== -1}
     //tabIndex={-1}
     //onClick={() => handleToggle(value)}
     checkedIcon={<Check className={taskClasses.checkedIcon} />}
     icon={<Check className={taskClasses.uncheckedIcon} />}
     classes={{
       checked: taskClasses.checked,
       root: taskClasses.root
     }}
     label
   />
 */
   <FormControlLabel
        control={
          <Checkbox
          checkedIcon={<Check className={taskClasses.checkedIcon} />}
          icon={<Check className={taskClasses.uncheckedIcon} />}
            checked={checked}
            onChange={handleChange}
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
