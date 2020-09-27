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
import CustomInput from './CustomInput/CustomInput';
import {fetchSiteData, clearSiteData} from '../redux/actions/accounts'
import {findAccountNodeByAccountId} from '../utils'

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
    accounts: state.accounts,
    currentAccountId: state.currentAccountId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSiteData: (accountId) => dispatch(fetchSiteData(accountId)),
    clearSiteData: ()=> dispatch(clearSiteData())
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
            //onIconClick={(event) => {event.preventDefault();}}
           //onLabelClick={(event) => {event.preventDefault();}}
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
        //onLabelClick={props.handleSelect}
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
  const [selectedAccountName, setSelectedAccountName] = React.useState('');


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
    event.persist()
    let iconClicked = event.target.closest(".MuiTreeItem-iconContainer")
    if(iconClicked) {
      setExpanded(nodeIds);
    }
  };

  const handleSelect = (event, accountId) => {
    event.persist()
    
    let iconClicked = event.target.closest(".MuiTreeItem-iconContainer")
    if(!iconClicked) {
      setSelected(accountId);
      setSelectedAccountName(event.target.textContent)
      setAnchorEl(null);
      props.clearSiteData()
      
      props.fetchSiteData(accountId)
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'accounts-popover' : undefined;

  let accountId = props.currentAccountId
  if(!accountId){
    accountId = localStorage.getItem('currentAccountId')
  }

  if(selectedAccountName.length < 1 && props.accounts && props.accounts.data) {
    setSelectedAccountName(props.accounts.data[0].accountName)
  }
 

  

  return (
    <div>
      <div aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        <CustomInput        
          formControlProps={{fullWidth: true}} 
          labelProps={{
            shrink: true
          }}
          labelText={'Selected Account'} 
          inputProps={{
            value: selectedAccountName, 
            disabled: true
          }}
          valueColor={primaryColor[0]}
        />
       
      </div>
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
