/*eslint-disable no-restricted-globals*/
import React from 'react'
import GridItem from '../../../components/Grid/GridItem.js'
import GridContainer from '../../../components/Grid/GridContainer.js'
import Button from 'rsuite/lib/Button'
import Card from '../../../components/Card/Card.js'
import CardBody from '../../../components/Card/CardBody.js'
import CardFooter from '../../../components/Card/CardFooter.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { connect } from 'react-redux'
import { withFormik, Form } from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'
import * as Yup from 'yup'
import {
  createScenario,
  setScenarioCreated
} from '../../../redux/actions/brandProfilesAdmin/scenarios'

const mapStateToProps = (state) => {
  return {
    scenarioCreated: state.brandProfilesAdmin.scenarioCreated,
    scenarioSaving: state.brandProfilesAdmin.scenarioSaving
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createScenario: (scenario) => dispatch(createScenario(scenario)),
    setScenarioCreated: (val) => dispatch(setScenarioCreated(val))
  }
}

const schemaValidation = Yup.object().shape({
  scenarioName: Yup.string()
    .required('Required')
    .min(2, 'Must be greater than 1 character')
    .max(50, 'Must be less than 50 characters'),
})

function Scenario(props) {

  const {
    values,
    isValid,
    dirty
  } = props

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <Form>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                  <FormikInput
                    name='scenarioName'
                    formikValue={values.scenarioName}
                    labelText='Scenario Name'
                    id='scenarioName'
                  />

                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter>
              <Button
                loading={props.scenarioSaving}
                disabled={!isValid || !dirty || props.scenarioSaving}
                type='submit'
              >
                Save
              </Button>
              <Snackbar
                autoHideDuration={2000}
                place='bc'
                open={props.scenarioCreated}
                onClose={() => props.setScenarioCreated(false)}
              >
                <Alert
                  onClose={() => props.setScenarioCreated(false)}
                  severity='success'
                >
                  Scenario created
                </Alert>
              </Snackbar>
            </CardFooter>
          </Form>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

const FormikForm = withFormik({
  mapPropsToValues: (props) => {
    return {
      scenarioName: ''
    }
  },
  enableReinitialize: true,
  validateOnMount: true,
  validateOnChange: true,
  validateOnBlur: true,
  validationSchema: schemaValidation,
  handleSubmit: (values, { props }) => {
    let scenario = {
      scenarioName: values.scenarioName,
    }
    props.createScenario(scenario)
  }
})(Scenario)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
