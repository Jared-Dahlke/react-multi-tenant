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

  console.log(props)
  //let history = useHistory();
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

      <CustomAlert
        open={false}
        //handleClose={handleCloseDeleteUserAlert}
        contentText={'Are you sure you want to delete this user?'}
        cancelText={'Cancel'}
        proceedText={'Yes'}
        titleText={'Delete User'}
        //handleConfirm={()=>{handleDeleteUser()}}
      />

      <Snackbar
        place="bc"
        color="success"
        icon={Success}
        message={"User succesfully deleted"}
        //open={props.userDeleted}
      />

      <Snackbar
        place="bc"
        color="danger"
        icon={Error}
        message={"There was an error deleting this user. Please try again later."}
        //open={props.userDeletedError}
      />
      
            
      <Grid container justify="flex-end">

        <GridItem >
          <Button href="/admin/settings/brandProfiles/create" color="primary">Create New Profile</Button>
        </GridItem>
        
        
      </Grid>
            
              
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          
          <CardBody>

            
         

            {props.brandProfiles ?
            

              <Table className={classes.table}>

          
                <TableHead className={tableClasses["primaryTableHeader"]}>
                  <TableRow className={tableClasses.tableHeadRow}>
                    {userHeaders.map((prop, key) => {
                      return (
                        <TableCell
                          className={tableClasses.tableCell + " " + tableClasses.tableHeadCell}
                          key={key}
                        >
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              

                <TableBody>
                  {props.brandProfiles && props.brandProfiles.map(profile => (
                    <TableRow key={profile.brandProfileId} className={classes.tableRow}>
                    
                      <TableCell className={tableCellClasses}>{profile.brandProfileName}</TableCell>
                      <TableCell className={tableCellClasses}>{profile.website}</TableCell>
                     
                      <TableCell className={classes.tableActions}>
                        <Tooltip
                          id="tooltip-top"
                          title="Edit User"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Edit"
                            className={classes.tableActionButton}
                            //onClick={()=>handleEditUserClick(user)}
                          >
                            <Edit
                              className={
                                classes.tableActionButtonIcon + " " + classes.edit
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          id="tooltip-top-start"
                          title="Remove"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Close"
                            className={classes.tableActionButton}
                            //onClick={()=>{handleDeleteUserClick(user)}}
                          >
                            <Close
                              className={
                                classes.tableActionButtonIcon + " " + classes.close
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              :

              <MyFacebookLoader/>

            }
          </CardBody>
        </Card>

        

         
      </GridItem>

   

     
    </GridContainer>
    

           
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandProfiles)