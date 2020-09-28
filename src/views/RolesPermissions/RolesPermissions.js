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

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { blackColor, whiteColor, grayColor, grayCardHeader, primaryColor } from "../../assets/jss/material-dashboard-react.js";

const useMStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  background: {
    backgroundColor: blackColor,
    color: whiteColor
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: grayColor[0],
  },
  accordianIcons: {
    color: primaryColor[0]
  }
}));


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
    fetchRolesPermissions: (accountId) => dispatch(rolesPermissionsFetchData(accountId))
  }
}


function RolesPermissions(props) {

  const mclasses = useMStyles();

  const {fetchRolesPermissions} = props

  const tableClasses = useTableStyles();
  const classes = useStyles();

  React.useEffect(() => {
    let currentAccountId = localStorage.getItem('currentAccountId')
    fetchRolesPermissions(currentAccountId)
  }, [fetchRolesPermissions])


  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: false
  });

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const headers = ['Permission','Permission Description', 'Module']


  return (                                   
 
    <GridContainer >
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          
          <CardBody>

              {props.rolesPermissions && props.rolesPermissions.length > 0 ?
              
              
            
              <div className={mclasses.root}>
                {props.rolesPermissions && props.rolesPermissions.length > 0 && props.rolesPermissions.map(role=>{
                  return (

                    <Accordion className={mclasses.background} key={role.roleId} expanded={expanded === role.roleId} onChange={handleChange(role.roleId)}>

                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className={mclasses.accordianIcons} />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={mclasses.heading}>{role.roleName}</Typography>
                        <Typography className={mclasses.secondaryHeading}>{role.roleDescription}</Typography>
                      </AccordionSummary>

                      <AccordionDetails>
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
                        {role.permissions && role.permissions.length > 0 && role.permissions.map(permission=> (

                            <TableRow key={role.roleId} className={classes.tableRow}>

                            <TableCell className={tableCellClasses}>{permission.moduleName}</TableCell>
                            <TableCell className={tableCellClasses}>{permission.permissionName}</TableCell>
                            <TableCell className={tableCellClasses}>{permission.permissionDescription}</TableCell>


                          </TableRow>

                          )
                          

                        )}
                        </TableBody>
                      </Table>
                    </AccordionDetails>

                  </Accordion>

                  )
                  
                  


                })}
              </div>   
              
                
              
              

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
