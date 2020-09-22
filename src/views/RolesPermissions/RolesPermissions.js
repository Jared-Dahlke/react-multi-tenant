import React from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import {rolesPermissionsFetchData} from '../../redux/actions/roles.js'
import {connect} from 'react-redux'
import {Table, TableCell, TableBody, TableRow, TableHead} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import styles from "../../assets/jss/material-dashboard-react/components/tasksStyle.js";
import classnames from "classnames";
import { Facebook } from 'react-content-loader'

const MyFacebookLoader = () => <Facebook />

const useTableStyles = makeStyles(tableStyles);
const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return {
    rolesPermissions: state.rolesPermissions.data,
    hasErrored: state.rolesPermissionsHasErrored
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRolesPermissions: () => dispatch(rolesPermissionsFetchData())
  }
}


function RolesPermissions(props) {

  const {fetchRolesPermissions} = props

  const tableClasses = useTableStyles();
  const classes = useStyles();

  React.useEffect(() => {
    fetchRolesPermissions()
  }, [fetchRolesPermissions])

  const headers = ['Role',' Role Description', 'Module', 'Permission','Permission Description']


  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: false
  });


  return (                                   
 
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          
          <CardBody>
            
            {props.rolesPermissions ?
              

              <Table className={classes.table}>

          
                <TableHead className={tableClasses["primaryTableHeader"]}>
                  <TableRow className={tableClasses.tableHeadRow}>
                    {headers.map((prop, key) => {
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
                  {props.rolesPermissions && props.rolesPermissions.map(role => (
                    <TableRow key={role.roleId} className={classes.tableRow}>
                    
                      <TableCell className={tableCellClasses}>{role.roleName}</TableCell>
                      <TableCell className={tableCellClasses}>{role.roleDescription}</TableCell>
                      <TableCell className={tableCellClasses}>{role.moduleName}</TableCell>
                      <TableCell className={tableCellClasses}>{role.permissionName}</TableCell>
                      <TableCell className={tableCellClasses}>{role.permissionDescription}</TableCell>
                    
                      
                      {/*<TableCell className={classes.tableActions}>
                        <Tooltip
                          id="tooltip-top"
                          title="Edit User"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Edit"
                            className={classes.tableActionButton}
                            onClick={()=>handleEditUserClick(user)}
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
                            onClick={()=>{handleDeleteUserClick(user)}}
                          >
                            <Close
                              className={
                                classes.tableActionButtonIcon + " " + classes.close
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>*/}
                      

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

export default connect(mapStateToProps, mapDispatchToProps)(RolesPermissions)
