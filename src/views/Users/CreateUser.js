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


const apiBase = config.apiGateway.MOCKURL;

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
      items: state.items,
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

  const {fetchData} = props
  
  React.useEffect(() => {
      console.log('inside use Effect')
      let url =  apiBase + '/users?page=2'
      fetchData(url)
  }, [fetchData]);
  

  const classes = useStyles();
  const taskClasses = useTaskStyles();


  const [age] = React.useState('');


  const [chipData, setChipData] = React.useState([{key: 1, label: 'first'}]);


  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleRoleSelect = (event) => {
    console.log('handle role sel')
    console.log(event)
    let current = [...chipData]

  let blah = {}
   blah.key = 5
   blah.label = 'test'


    current[1] = blah
    setChipData(current)
   
  };


  return (
    <Card>

      
      <CardBody>
   
    <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <div>
              test
              hasErrored: {props.hasErrored ? 'errored':'success'}
              isLoading: {props.isLoading ? 'loading' : 'not loading'}
              items: {JSON.stringify(props.items.data)}
            </div>
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

                
                <Paper component="ul" className={classes.root}>
                  {chipData.map((data) => {
                    let icon;

                    if (data.label === 'React') {
                     // icon = <TagFacesIcon />;
                    }

                    return (
                      <li key={data.key}>
                        <Chip
                          icon={icon}
                          label={data.label}
                          onDelete={handleDelete(data)}
                          className={classes.chip}
                        />
                      </li>
                    );
                  })
                }
                </Paper>

                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleRoleSelect}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                          

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