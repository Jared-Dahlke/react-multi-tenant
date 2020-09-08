import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import {connect} from 'react-redux'
import {rolesFetchData} from '../../redux/actions/roles'
import config from '../../config.js'
import CustomCheckbox from "../../components/CustomCheckbox/Checkbox"
import CustomSelect from "../../components/CustomSelect/CustomSelect.js";


const apiBase = config.apiGateway.URL;

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
    roles: state.roles.data,
    hasErrored: state.rolesHasErrored,
    isLoading: state.rolesIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(rolesFetchData(url))
  };
};

function CreateUser  (props) {

  const {fetchData} = props
  
  React.useEffect(() => {
    let url =  apiBase + '/role'
    fetchData(url)
  }, [fetchData]);
  

  const classes = useStyles();
  const [selectedRoles, setSelectedRoles] = React.useState([]);
  const [internalUserChecked, setInternalUserChecked] = React.useState(false)

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
                    <CustomSelect
                      roles={props.roles}
                      labelText='Role'
                      handleItemSelect={handleRoleSelect}
                      value={selectedRoles}
                      multiple={true}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>


                  <GridItem xs={12} sm={12} md={12}>
                    <CustomCheckbox
                      checked={internalUserChecked}
                      //tabIndex={-1}
                      changed={()=>setInternalUserChecked(!internalUserChecked)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelText="Internal User"                 
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