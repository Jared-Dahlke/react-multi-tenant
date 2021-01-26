import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import Button from 'rsuite/lib/Button'
import Modal from 'rsuite/lib/Modal'
import Form from 'rsuite/lib/Form'
import FormGroup from 'rsuite/lib/FormGroup'
import FormControl from 'rsuite/lib/FormControl'
import ControlLabel from 'rsuite/lib/ControlLabel'
import HelpBlock from 'rsuite/lib/HelpBlock'
import Schema from 'rsuite/lib/Schema'
import Table from 'rsuite/lib/Table'
import {
  fetchAdminTypes,
  createType,
  archiveType,
  setInitTypeAdd
} from '../../../redux/actions/admin/scenarios'
import { connect } from 'react-redux'
import Loader from 'rsuite/lib/Loader'

const mapStateToProps = (state) => {
  return {
    typesIsLoading: state.admin.typesIsLoading,
    initTypeAdd: state.admin.initTypeAdd,
    typeSaving: state.admin.typeSaving,
    typeArchiving: state.admin.typeArchiving,
    adminTypes: state.admin.types
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminTypes: () => dispatch(fetchAdminTypes()),
    createType: (type) => dispatch(createType(type)),
    archiveType: (typeId) => dispatch(archiveType(typeId)),
    setInitTypeAdd: (bool) => dispatch(setInitTypeAdd(bool))
  }
}

function Types(props) {
  let form

  const [formValues, setFormValues] = useState()

  const { StringType } = Schema.Types
  const model = Schema.Model({
    typeName: StringType().isRequired('Type Name is required.')
  })

  const ActionCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Table.Cell {...props} style={{ padding: 1 }}>
        {!rowData.archived && (
          <Button
            appearance='link'
            loading={props.typeArchiving === rowData.typeId}
            onClick={() => {
              handleArchiveTypeClick(rowData.typeId)
            }}
          >
            Archive
          </Button>
        )}
      </Table.Cell>
    )
  }

  const handleSubmit = () => {
    if (!form.check()) {
      console.error('Form Error')
      return
    } else {
      props.createType(formValues)
    }
  }

  const { fetchAdminTypes, adminTypes } = props
  React.useEffect(() => {
    if (adminTypes.length === 0) {
      fetchAdminTypes()
    }
  })

  const handleArchiveTypeClick = (typeId) => {
    props.archiveType(typeId)
  }

  return (
    <Grid container justify='center'>
      <GridItem xs={12} sm={12} md={10}>
        {adminTypes && adminTypes.length > 0 ? (
          <div>
            <Button
              appearance='primary'
              onClick={() => props.setInitTypeAdd(true)}
            >
              Create Scenario Type
						</Button>

            <Modal
              show={props.initTypeAdd}
              onHide={() => props.setInitTypeAdd(false)}
            >
              <Form
                fluid
                ref={(ref) => (form = ref)}
                model={model}
                onChange={(formValue) => {
                  setFormValues(formValue)
                }}
              >
                <Modal.Header>
                  <Modal.Title>Add Scenario Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FormGroup>
                    <ControlLabel>Type Name</ControlLabel>
                    <FormControl name='typeName' />
                    <HelpBlock>Required</HelpBlock>
                  </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    loading={props.typeSaving}
                    onClick={() => handleSubmit()}
                    appearance='primary'
                  >
                    Save
									</Button>
                  <Button
                    onClick={() => props.setInitTypeAdd(false)}
                    appearance='subtle'
                  >
                    Cancel
									</Button>
                </Modal.Footer>
              </Form>
            </Modal>

            <Table
              virtualized
              height={500}
              rowHeight={50}
              data={adminTypes}
              shouldUpdateScroll={false}
            >
              <Table.Column verticalAlign={'middle'} width={500}>
                <Table.HeaderCell>Type Name</Table.HeaderCell>
                <Table.Cell dataKey='typeName' style={{ color: 'grey' }} />
              </Table.Column>
              <Table.Column verticalAlign={'middle'} width={100}>
                <Table.HeaderCell>Archived</Table.HeaderCell>
                <Table.Cell style={{ color: 'grey' }}>
                  {(rowData) => {
                    return rowData.archived ? 'True' : 'False'
                  }}
                </Table.Cell>
              </Table.Column>
              <Table.Column verticalAlign={'middle'} width={80}>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <ActionCell />
              </Table.Column>
            </Table>
          </div>
        ) : props.typesIsLoading ? (
          <Loader
            center
            size='lg'
            content='Loading...'
            vertical
          />
        ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                  height: 'calc(100vh - 200px)',
                  color: 'white'
                }}
              >
                <Button
                  appearance='primary'
                  onClick={() => props.setInitTypeAdd(true)}
                >
                  Create Scenario Type
						</Button>
              </div>
            )}
      </GridItem>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Types)
