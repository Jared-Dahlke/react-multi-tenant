import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { blackColor, grayColor, whiteColor } from '../../../assets/jss/material-dashboard-react';

import {Table, TableCell, TableBody, TableRow, TableHead} from '@material-ui/core'
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import tableStyle from '../../../assets/jss/material-dashboard-react/components/tableStyle';

import ListBuilderRow from './ListBuilderRow'

export default function ListBuilderTable(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      //backgroundColor: 'yellow', //theme.palette.background.paper,
     padding: 0
    },
  }));

  const tableClasses= useStyles(tableStyle)

  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      
      <Table className={classes.table}>
        <TableBody style={{height: props.bodyHeight}}>

          {props.data && props.data.length > 0 && props.data.map((item, index)=>{

            return (

              <ListBuilderRow 
              rowStyle={classes.tableRow}
              item={item}
              key={index}
              />          

            )
          })}
 
            

          </TableBody>
        </Table>
      
    </div>
  );
}