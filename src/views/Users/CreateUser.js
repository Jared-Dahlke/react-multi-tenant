import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import {Checkbox, Select, FormControl, Paper, Chip, MenuItem} from "@material-ui/core"
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Check from "@material-ui/icons/Check";
// core components
import taskstyles from "../../assets/jss/material-dashboard-react/components/tasksStyle.js";
import {connect} from 'react-redux'
import {itemsFetchData} from '../../redux/actions/roles'
import config from '../../config.js'
import classNames from "classnames";

import inputstyles from "../../assets/jss/material-dashboard-react/components/customInputStyle.js" //"assets/jss/material-dashboard-react/components/customInputStyle.js";
import CustomSelect from "../../components/CustomSelect/CustomSelect.js";

const useInputStyles = makeStyles(inputstyles);

/*  {!props.isLoading ? props.items.data.map(item=>{
                        return (
                          <MenuItem value={20}>Twenty</MenuItem>
                        )
                        
                      })
                    : null
                    
                    }
                  */ 


const apiBase = config.apiGateway.URL;

const useTaskStyles = makeStyles(taskstyles);


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  alignRight: {
    float: "right",
    
  },
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: .5,
    margin: .5,
  },
  chip: {
    margin: .5,
  },
};

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return {
      items: state.items.data,
      hasErrored: state.itemsHasErrored,
      isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(itemsFetchData(url))
  };
};

function CreateUser  (props) {
  console.log('props from createUser')
  console.log(props)

  const {fetchData} = props
  
  React.useEffect(() => {
      console.log('inside use Effect')
      let url =  apiBase + '/role'
      fetchData(url)
  }, [fetchData]);
  

  const classes = useStyles();
  const taskClasses = useTaskStyles();

  
  const [selectedRoles, setSelectedRoles] = React.useState([]);


  const [chipData, setChipData] = React.useState([{key: 1, label: 'first'}]);


  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  

  const handleRoleSelect = (event) => {
    
    setSelectedRoles(event.target.value);

  };

  


  return (
    <Card>

      
      <CardBody>
   
    <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
           
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Invite a new user</h4>
              <p className={classes.cardCategoryWhite}></p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: false
                    }}
                  />
                </GridItem>
               

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>

                <Checkbox
               // checked={checked.indexOf(value) !== -1}
                //tabIndex={-1}
                //onClick={() => handleToggle(value)}
                checkedIcon={<Check className={taskClasses.checkedIcon} />}
                icon={<Check className={taskClasses.uncheckedIcon} />}
                classes={{
                  checked: taskClasses.checked,
                  root: taskClasses.root
                }}
              />

              Internal User
                 
                </GridItem>
               
               

                <GridItem xs={12} sm={12} md={12}>
                  <CustomSelect
                    items={props.items}
                    labelText='Role'
                    handleItemSelect={handleRoleSelect}
                    value={selectedRoles}
                    multiple={true}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />

                </GridItem>

               
                          

               
                

              </GridContainer>
            
              
              
            </CardBody>
            <CardFooter>
              <Button color="primary">Invite User</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>

        
      </CardBody>
    </Card>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);