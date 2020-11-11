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
import FormikSelect from '../../../components/CustomSelect/FormikSelect'
import * as Yup from 'yup'
import {
  createOpinion,
  setOpinionCreated
} from '../../../redux/actions/brandProfilesAdmin/opinions'

const mapStateToProps = (state) => {
  return {
    opinionCreated: state.opinionCreated,
    opinionSaving: state.opinionSaving
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createOpinion: (opinion) => dispatch(createOpinion(opinion)),
    setOpinionCreated: (val) => dispatch(setOpinionCreated(val))
  }
}

const schemaValidation = Yup.object().shape({
  question: Yup.string()
    .required('Required')
    .min(2, 'Must be greater than 1 character')
    .max(50, 'Must be less than 50 characters'),
  opinionType: Yup.string()
    .required('Required')
})

function Opinion(props) {

  const {
    isValid,
    dirty,
    values,
    setFieldValue,
    setFieldTouched,
    errors,
    validateField,
    validateForm,
    touched
  } = props

  const opinionTypeOptions = [{ id: "Sports", name: "Sports" }, { id: "Music", name: "Music" }]

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <Form>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                  <FormikInput
                    name='question'
                    formikValue={values.question}
                    labelText='Question'
                    id='question'
                  />

                  <FormikSelect
                    id='opinionType'
                    name='opinionType'
                    data-qa='opinionType'
                    label='Opinion Type'
                    placeholder='Opinion Type'
                    optionLabel='name'
                    optionValue='id'
                    options={opinionTypeOptions}
                    value={values.opinionType}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    validateField={validateField}
                    validateForm={validateForm}
                    touched={touched.opinionType}
                    error={errors.opinionType}
                    hideSearch
                  />

                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter>
              <Button
                loading={props.opinionSaving}
                disabled={!isValid || !dirty || props.opinionSaving}
                type='submit'
              >
                Save
              </Button>
              <Snackbar
                autoHideDuration={2000}
                place='bc'
                open={props.opinionCreated}
                onClose={() => props.setOpinionCreated(false)}
              >
                <Alert
                  onClose={() => props.setOpinionCreated(false)}
                  severity='success'
                >
                  Opinion created
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
      question: '',
      opinionType: ''
    }
  },
  enableReinitialize: true,
  validateOnMount: true,
  validateOnChange: true,
  validateOnBlur: true,
  validationSchema: schemaValidation,
  handleSubmit: (values, { props }) => {
    let opinion = {
      question: values.question,
      opinionType: values.opinionType
    }
    props.createOpinion(opinion)
  }
})(Opinion)

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm)
