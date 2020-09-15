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
import {usersFetchData} from '../../redux/actions/users.js'
import {connect} from 'react-redux'
import styles from "../../assets/jss/material-dashboard-react/components/tasksStyle.js";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import { useHistory } from "react-router-dom";


const useTableStyles = makeStyles(tableStyles);

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return {
    users: state.users.data,
    hasErrored: state.usersHasErrored
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersData: () => dispatch(usersFetchData()),
    //setCurrentlyEditingUserGlobally: (user) => dispatch(setCurrentlyEditingUser(user))
  }
}

function Users(props) {

  let history = useHistory();
  const classes = useStyles();
  const tableClasses = useTableStyles();

  const {fetchUsersData} = props

  React.useEffect(() => { 
    fetchUsersData()
  }, [fetchUsersData])


  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: false
  });

  const userHeaders = ['First Name','Last Name', 'Company','Email','Internal','']

  const handleEditUserClick= () => {
    
    history.push('/admin/users/edit')
    // set global currentEditingUserState then navigate to the edit user url
    // href={'/admin/users/edit?' + encodeParams(user)}
  }


  return (                                   
 
    <GridContainer spacing={2}>
      
            
      <Grid container justify="flex-end">

        <GridItem >
          <Button href="/admin/users/create" color="primary">Create New User</Button>
        </GridItem>
        
        
      </Grid>
            
              
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          
          <CardBody>
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
                {props.users && props.users.map(user => (
                  <TableRow key={user.userId} className={classes.tableRow}>
                   
                    <TableCell className={tableCellClasses}>{user.firstName}</TableCell>
                    <TableCell className={tableCellClasses}>{user.lastName}</TableCell>
                    <TableCell className={tableCellClasses}>{user.company}</TableCell>
                    <TableCell className={tableCellClasses}>{user.email}</TableCell>
                    <TableCell className={tableCellClasses}>{user.internal}</TableCell>
                    
                    <TableCell className={classes.tableActions}>
                      <Tooltip
                        id="tooltip-top"
                        title="Edit Task"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          aria-label="Edit"
                          className={classes.tableActionButton}
                          onClick={handleEditUserClick}
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
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
    

           
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)