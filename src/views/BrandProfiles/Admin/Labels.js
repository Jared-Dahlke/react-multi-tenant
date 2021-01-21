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
  fetchAdminLabels,
  createLabel,
  deleteLabel,
  setInitLabelAdd
} from '../../../redux/actions/admin/scenarios'
import { connect } from 'react-redux'
import { FormLoader } from '../../../components/SkeletonLoader'

const mapStateToProps = (state) => {
  return {
    labelsIsLoading: state.admin.labelsIsLoading,
    initLabelAdd: state.admin.initLabelAdd,
    labelSaving: state.admin.labelSaving,
    labelDeleting: state.admin.labelDeleting,
    adminLabels: state.admin.labels
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminLabels: () => dispatch(fetchAdminLabels()),
    createLabel: (label) => dispatch(createLabel(label)),
    deleteLabel: (labelId) => dispatch(deleteLabel(labelId)),
    setInitLabelAdd: (bool) => dispatch(setInitLabelAdd(bool))
  }
}

function Labels(props) {
  let form;

  const [formValues, setFormValues] = useState();

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    labelName: StringType().isRequired('Label Name is required.')
  });

  const ActionCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Table.Cell {...props} style={{ padding: 1 }}>
        <Button
          appearance='link'
          loading={
            props.labelDeleting === rowData.labelId
          }
          onClick={() => {
            handleDeleteLabelClick(rowData.labelId)
          }}
        >
          Delete
        </Button>
      </Table.Cell>
    )
  }

  const handleSubmit = () => {
    if (!form.check()) {
      console.error('Form Error');
      return;
    }
    else {
      props.createLabel(formValues)
    }
  }

  const { fetchAdminLabels, adminLabels } = props
  React.useEffect(() => {
    if (adminLabels.length === 0) {
      fetchAdminLabels()
    }
  })

  const handleDeleteLabelClick = (labelId) => {
    props.deleteLabel(labelId)
  }

  return (
    <Grid container justify='center'>
      <GridItem xs={12} sm={12} md={10}>
        {adminLabels && adminLabels.length > 0 ? (
          <div>
            <Button appearance='primary' onClick={() => props.setInitLabelAdd(true)}>
              Create Label
						</Button>

            <Modal show={props.initLabelAdd} onHide={() => props.setInitLabelAdd(false)}>
              <Form
                fluid
                ref={ref => (form = ref)}
                model={model}
                onChange={formValue => {
                  setFormValues(formValue)
                }}
              >
                <Modal.Header>
                  <Modal.Title>Add Label</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <FormGroup>
                    <ControlLabel>Label Name</ControlLabel>
                    <FormControl name="labelName" />
                    <HelpBlock>Required</HelpBlock>
                  </FormGroup>

                </Modal.Body>
                <Modal.Footer>
                  <Button
                    loading={props.labelSaving}
                    onClick={() => handleSubmit()}
                    appearance="primary">
                    Save
                </Button>
                  <Button onClick={() => props.setInitLabelAdd(false)} appearance="subtle">
                    Cancel
                </Button>
                </Modal.Footer>
              </Form>
            </Modal>

            <Table
              virtualized
              height={500}
              rowHeight={50}
              data={adminLabels}
              shouldUpdateScroll={false}
            >
              <Table.Column verticalAlign={'middle'} width={500}>
                <Table.HeaderCell>Label Name</Table.HeaderCell>
                <Table.Cell dataKey='labelName' style={{ color: 'grey' }} />
              </Table.Column>
              <Table.Column verticalAlign={'middle'} width={60}>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <ActionCell />
              </Table.Column>
            </Table>
          </div>
        ) : props.labelsIsLoading ? (
          <FormLoader />
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
                <Button appearance='primary' onClick={() => props.setInitLabelAdd(true)}>
                  Create Label
						</Button>
              </div>
            )}
      </GridItem>
    </Grid >
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Labels)
