import React from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import Table from "../../components/Table/Table.js";
import {rolesPermissionsFetchData} from '../../redux/actions/roles.js'
import {connect} from 'react-redux'


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

  React.useEffect(() => {
    fetchRolesPermissions()
  }, [fetchRolesPermissions])


  return (                                   
 
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          {JSON.stringify(props.rolesPermissions)}
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Role", "Permission", "Description", "Test"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
    

           
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesPermissions)
