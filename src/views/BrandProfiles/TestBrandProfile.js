import React from "react";
import Grid from "@material-ui/core/Grid"
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import {Table, TableCell, TableBody, TableRow, TableHead} from '@material-ui/core'
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {fetchBrandProfiles} from '../../redux/actions/brandProfiles.js'
import {connect} from 'react-redux'
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
//import { useHistory } from "react-router-dom";
import { Facebook } from 'react-content-loader'
import CustomAlert from '../../components/CustomAlert.js'
import Snackbar from '../../components/Snackbar/Snackbar'
import Success from "@material-ui/icons/Check";
import Error from '@material-ui/icons/Error'
import {Link} from 'react-router-dom'

import Hidden from "@material-ui/core/Hidden";

import styles from "../../assets/jss/material-dashboard-react/views/iconsStyle.js";

const useStyles = makeStyles(styles);




function BrandProfiles(props) {


  const classes = useStyles();
 


  return (                                   
 
    <CardBody>
    <Hidden only={["sm", "xs"]}>

<iframe
                className={classes.iframe}
                src="https://form.jotform.com/202726463369158"
                title="Brand Mentality"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
</Hidden>
   </CardBody>

            

    

           
  );
}

export default BrandProfiles