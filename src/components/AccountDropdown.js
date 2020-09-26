import React from 'react';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '../components/CustomButtons/Button';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { blackColor, whiteColor, defaultFont, primaryColor, grayColor } from '../assets/jss/material-dashboard-react';
import { withStyles } from '@material-ui/core/styles'
import Card from './Card/Card'
import CardBody from './Card/CardBody'

const useStyles = makeStyles({
  root: {
    //height: 216,
    maxHeight: 215,
    flexGrow: 1,
    maxWidth: 400,
  },
  popoverContent: {
    padding: '15px',
    //margin:'15px',
    width: '300px',
    backgroundColor: blackColor,
    color: whiteColor
  },
  selected: {
    "&::selected": {
      backgroundColor:'yellow'
    }
  }



});

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //fetchRolesPermissions: () => dispatch(rolesPermissionsFetchData())
  }
}

const Tree = (props)=>{

  const classes = useStyles();

  const StyledTreeItem = withStyles({
    label: {
      //backgroundColor: "green",
     // color: primaryColor[0],
      "&.Mui-selected": {
        color: "yellow"
      }
    },
    root:{
      "&.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label": {
        color: primaryColor[0],
        backgroundColor: blackColor + '!important'
      },
      "&.Mui-selected > .MuiTreeItem-content": {
       
      }
    }
  })(TreeItem);


  const loop = (data) => 
 
      data.map(item => {   
         
      if (item.children) {
        return (
          <StyledTreeItem   
            style={{font: defaultFont, color: whiteColor}} 
            key={item.accountId} 
            nodeId={String(item.accountId)} 
            label={item.accountName} 
           
           
          >
            {loop(item.children)}
          </StyledTreeItem>
        )
      }
      return ( 
      <StyledTreeItem 
        style={{fontSize: 16, fontFamily: defaultFont.fontFamily, color:'white'}} 
        nodeId={String(item.accountId)} 
        key={item.accountId} 
        label={item.accountName} 
      
      />
      )
  })

  
  
  

  return(
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={props.expanded}
      selected={props.selected}
      onNodeToggle={props.handleToggle}
      onNodeSelect={props.handleSelect}
    >
      {props.data && props.data.length > 0 && loop(props.data)}
      
    </TreeView>
  )
}

function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  //popover stuff:
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  //tree stuff:
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'accounts-popover' : undefined;

  //const [selectedAccount, setSelectedAccount] = React.useState([])
 

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        {selected}
      </Button>
      <Popover
        id={id}
        open={open}
        
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          style:{backgroundColor: blackColor}
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.popoverContent}>
        

          <Tree
            expanded={expanded}
            selected={selected}
            handleToggle={handleToggle}
            handleSelect={handleSelect}
            data={props.accounts.data}
          />
        
          
         
        </div>
       
      </Popover>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SimplePopover)
