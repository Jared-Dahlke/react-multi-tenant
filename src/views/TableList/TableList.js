import React from "react";
// core components

import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Tree from 'react-d3-tree';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    color: 'black'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 10,
  },
});

function OutlinedCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
       
        <Typography  variant="h5" component="h2">
          {props.nodeData.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}



class NodeLabel extends React.PureComponent {
  
  render() {
    

    const {className, nodeData} = this.props
    return (

      <OutlinedCard nodeData={nodeData}/>
     

    )
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  };
};

const myTreeData = [
  {
    name: 'Sightly',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Horizon',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
      {
        name: 'VitaCoCo',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
    ],
  },
];



function TableList(props) {

  

  return (
    
      
        
      <div id="treeWrapper" style={{width: '50em', height: '20em'}}>
      
        <Tree 
        data={myTreeData} 
        allowForeignObjects={true}
        orientation="vertical"
        pathFunc="elbow"
        nodeLabelComponent={{
          render: <NodeLabel className='myLabelComponentInSvg' />,
          foreignObjectWrapper: {
            y: 24
          }
        }}
        />

      </div>

  
  );
}

export default connect(mapStateToProps, null)(TableList);
