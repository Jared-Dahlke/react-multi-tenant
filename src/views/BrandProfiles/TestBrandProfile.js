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
import styles from "../../assets/jss/material-dashboard-react/components/tasksStyle.js";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
//import { useHistory } from "react-router-dom";
import { Facebook } from 'react-content-loader'
import CustomAlert from '../../components/CustomAlert.js'
import Snackbar from '../../components/Snackbar/Snackbar'
import Success from "@material-ui/icons/Check";
import Error from '@material-ui/icons/Error'
import {Link} from 'react-router-dom'


const MyFacebookLoader = () => <Facebook />
const useTableStyles = makeStyles(tableStyles);

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return {
    brandProfiles: state.brandProfiles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrandProfiles: () => dispatch(fetchBrandProfiles()),
    //deleteBrandProfile: (profileId) => dispatch(deleteBrandProfile(profileId))
  }
}

function BrandProfiles(props) {


  const classes = useStyles();
  const tableClasses = useTableStyles();
  //const [deleteUserAlertIsOpen, setDeleteUserAlertIsOpen] = React.useState(false)
  //const [userToDelete, setUserToDelete] = React.useState({})

  const {fetchBrandProfiles} = props

  React.useEffect(() => { 
    fetchBrandProfiles()
  }, [fetchBrandProfiles])


  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: false
  });

  const userHeaders = ['Profile Name','Website','']

  //const handleEditUserClick = (profile) => {
  //  let url = '/admin/settings/brandProfiles/edit/' + encodeURIComponent(JSON.stringify(profile))
  //  history.push(url)
  //}

  //const handleDeleteUserClick = (user) => {
  //handleOpenDeleteUserAlert(user)
  //setUserToDelete(user)
  //}

  //const handleCloseDeleteUserAlert =() =>{
  //setDeleteUserAlertIsOpen(false)
  //setUserToDelete({})
  //}

  //const handleOpenDeleteUserAlert = () => {
  //setDeleteUserAlertIsOpen(true)
  //}

  //const handleDeleteUser = () => {
  //setDeleteUserAlertIsOpen(false)
  //props.deleteUser(userToDelete.userId)
  //setUserToDelete({})
  //}

  return (                                   
 
    <GridContainer spacing={2}>

  
        <script type="text/javascript" src="https://form.jotform.com/jsform/202726463369158"></script>
   

     
    </GridContainer>
    

           
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandProfiles)