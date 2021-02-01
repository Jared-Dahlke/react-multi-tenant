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
	fetchAdminQuestions,
	createQuestion,
	archiveQuestion,
	setInitQuestionAdd
} from '../../../redux/actions/admin/questions'
import { connect } from 'react-redux'
import Loader from 'rsuite/lib/Loader'

const mapStateToProps = (state) => {
	return {
		questionsIsLoading: state.admin.questionsIsLoading,
		initQuestionAdd: state.admin.initQuestionAdd,
		questionSaving: state.admin.questionSaving,
		questionArchiving: state.admin.questionArchiving,
		adminQuestions: state.admin.questions
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAdminQuestions: () => dispatch(fetchAdminQuestions()),
		createQuestion: (question) => dispatch(createQuestion(question)),
		archiveQuestion: (questionId) => dispatch(archiveQuestion(questionId)),
		setInitQuestionAdd: (bool) => dispatch(setInitQuestionAdd(bool))
	}
}

function Questions(props) {
	let form

	const [formValues, setFormValues] = useState()

	const { StringType } = Schema.Types
	const model = Schema.Model({
		question: StringType().isRequired('Question is required.')
	})

	const ActionCell = ({ rowData, dataKey, ...props }) => {
		return (
			<Table.Cell {...props} style={{ padding: 1 }}>
				{!rowData.archived && (
					<Button
						appearance='link'
						loading={props.questionArchiving === rowData.questionId}
						onClick={() => {
							handleArchiveQuestionClick(rowData.questionId)
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
			props.createQuestion(formValues)
		}
	}

	const { fetchAdminQuestions, adminQuestions } = props
	React.useEffect(() => {
		if (adminQuestions.length === 0) {
			fetchAdminQuestions()
		}
	})

	const handleArchiveQuestionClick = (questionId) => {
		props.archiveQuestion(questionId)
	}

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={10}>
				{adminQuestions && adminQuestions.length > 0 ? (
					<div>
						<Button
							appearance='primary'
							onClick={() => props.setInitQuestionAdd(true)}
						>
							Create Long Form Question
						</Button>

						<Modal
							show={props.initQuestionAdd}
							onHide={() => props.setInitQuestionAdd(false)}
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
									<Modal.Title>Add Question</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<FormGroup>
										<ControlLabel>Long Form Question</ControlLabel>
										<FormControl name='question' />
										<HelpBlock>Required</HelpBlock>
									</FormGroup>
								</Modal.Body>
								<Modal.Footer>
									<Button
										loading={props.questionSaving}
										onClick={() => handleSubmit()}
										appearance='primary'
									>
										Save
									</Button>
									<Button
										onClick={() => props.setInitQuestionAdd(false)}
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
							data={adminQuestions}
							shouldUpdateScroll={false}
						>
							<Table.Column verticalAlign={'middle'} width={500}>
								<Table.HeaderCell>Question</Table.HeaderCell>
								<Table.Cell dataKey='question' style={{ color: 'grey' }} />
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
				) : props.questionsIsLoading ? (
					<Loader center size='lg' content='Loading...' vertical />
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
							onClick={() => props.setInitQuestionAdd(true)}
						>
							Create long form Question
						</Button>
					</div>
				)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions)
