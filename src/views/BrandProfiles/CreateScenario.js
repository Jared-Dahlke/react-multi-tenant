/*eslint-disable no-restricted-globals*/
import React from 'react'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Button from 'rsuite/lib/Button'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import AccountDropdown from '../../components/AccountDropdown'

import { userProfileFetchData } from '../../redux/actions/auth.js'
import { connect } from 'react-redux'
import { updateUserData } from '../../redux/actions/users.js'
import { withFormik, Form } from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import * as Yup from 'yup'
import { getCurrentAccount } from '../../utils'
import {
  createScenario,
  setScenarioCreated
} from '../../redux/actions/brandProfiles'

const mapStateToProps = (state) => {
  return {
    // currentAccountId: state.currentAccountId,
    // accounts: state.accounts,
    // accountTypes: state.accountTypes,
    // isSwitchingAccounts: state.isSwitchingAccounts,
    scenarioCreated: state.scenarioCreated,
    scenarioSaved: state.scenarioSaved,
    scenarioSaving: state.scenarioSaving,
    // rolesIsLoading: state.rolesIsLoading,
    // user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserProfile: () => dispatch(userProfileFetchData()),
    // updateUserData: (userData) => dispatch(updateUserData(userData)),
    // updateAccount: (account) => dispatch(updateAccount(account)),
    // deleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
    createScenario: (scenario) => dispatch(createScenario(scenario)),
    setScenarioCreated: (val) => dispatch(setScenarioCreated(val))
  }
}

const schemaValidation = Yup.object().shape({
  accountName: Yup.string()
    .required('Required')
    .min(2, 'Must be greater than 1 character')
    .max(50, 'Must be less than 50 characters'),
})

function Scenario(props) {
  const handleCreateChild = (current) => {
    let levelId = current.accountLevelId + 1
    if (levelId > 3) {
      levelId = 3
    }
    let childAccount = {
      accountName: 'New Child',
      accountTypeId: props.accountTypes[0].accountTypeId,
      accountLevelId: levelId,
      accountMargin: 0,
      contactName: 'placeholder',
      contactEmail: 'placeholder@placeholder.com',
      parentAccountId: current.accountId
    }
    props.createAccount(childAccount)
  }

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateForm,
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
    props.updateScenario(scenario)
  }
})(Scenario)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
