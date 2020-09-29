import React from "react";
// core components

import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Tree from 'react-d3-tree';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";


//import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
//import Button from '../../components/CustomButtons/Button';
//import Typography from '@material-ui/core/Typography';
import { grayColor, whiteColor, blackColor } from "../../assets/jss/material-dashboard-react.js";
import IconButton from '@material-ui/core/IconButton'
import Details from '@material-ui/icons/Details'
import {Link} from 'react-router-dom'

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    backgroundColor: whiteColor,
    justify: "center"
  }
});

 function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <GridContainer justify='center'>

       
        <CardContent>
          <Typography   variant="h5" component="h3">
            Lizard
          </Typography>
          
        </CardContent>
     
      <CardActions>
        <Button size="small" style={{color:blackColor}}>
          View Details
        </Button>
        
      </CardActions>
      </GridContainer>
    </Card>
  );
}

const debugData = [
  {
    name: "Sightly",
    attributes: {
      title: "Card title",
      subtitle: "Card subtitle",
      text: "Some text to build on the card."
    },
    children: [
      {
        name: "Horizon",
        attributes: {
          title: "Card title",
          subtitle: "Card subtitle",
          text: "Some text to build on the card."
        },
        children: [
          {
            name: "VitaCoco",
            attributes: {
              title: "child2",
              subtitle: "Card subtitle",
              text: "Some text to build on the card."
            }
          },
          {
            name: "Guya",
            attributes: {
              title: "child3",
              subtitle: "Card subtitle",
              text: "Some text to build on the card."
            }
          }
        ]
      },
      {
        name: "Burger King",
        attributes: {
          title: "Card title",
          subtitle: "Card subtitle",
          text: "Some text to build on the card."
        }
      },
      {
        name: "TacoBell",
        attributes: {
          title: "Card title",
          subtitle: "Card subtitle",
          text: "Some text to build on the card."
        }
      }
    ]
  }
];
const containerStyles = {
  width: "100%",
  height: "100vh"
};

const handleViewAccount=()=>{
  alert('clicked')
}

const CardComp = ({ nodeData }) => (
  <Card style={{borderRadius:'5px'}}>
    
      <div className="card-body" style={{backgroundColor: whiteColor, margin:'6px'}}>
        <h5 style={{ margin: "5px" }} className="card-title">
          <a>
            {nodeData.name}
          </a>
          
        </h5>
       
        <p style={{ margin: "5px" }} className="card-text">
          {nodeData.attributes.text}
        </p>

        {/** <IconButton
          aria-label="Details"
          //className={classes.tableActionButton}
          onClick={()=>handleViewAccount()}
        >
          <Details
           
          />
        </IconButton> */}

       <Button color="secondary" small>View Details</Button>
       
      </div>
  
  </Card>
);


export default class CenteredTree extends React.PureComponent {
  state = {};
  height = 150;
  width = 150;
  yOffset = 80;
  yClearance = 150;

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    console.log('dimensions')
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: this.yOffset
      }
    });
  }

  click = event => {
    console.log(event);
  };

  over = event => {
    console.log(event);
  };

  render() {
    return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree
          data={debugData}
         // collapsible={false}
          translate={this.state.translate}
          scaleExtent={{ min: 1, max: 3 }}
          allowForeignObjects
         // pathFunc="elbow"
          orientation="vertical"
          nodeSvgShape={{ shape: "none" }}
          nodeSize={{ x: 200, y: this.yClearance }}
          onClick={e => this.click(e)}
          onMouseOver={e => this.over(e)}
          nodeLabelComponent={{
            render: <MediaCard />,
            foreignObjectWrapper: {
              style: {
             
                
                width: this.width.toString() + "px",
                height: this.height.toString() + "px",
                x: this.width / -2,
                y: this.height / -2
              }
            }
          }}
        />
      </div>
    );
  }
}
