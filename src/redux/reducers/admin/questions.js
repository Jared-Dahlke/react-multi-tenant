import {
  SET_ADMIN_QUESTIONS,
  SET_QUESTIONS_IS_LOADING,
  SET_QUESTION_ARCHIVING,
  SET_QUESTION_TO_ARCHIVE,
  SET_ADD_QUESTION,
  SET_QUESTION_SAVING,
  SET_QUESTION_TO_CREATE
} from '../../action-types/admin/questions'

export function questions(state = [], action) {
  switch (action.type) {
    case SET_ADMIN_QUESTIONS:
      return action.questions
    case SET_QUESTION_TO_ARCHIVE:
      let newState = [
        ...state.filter(
          ({ questionId }) => questionId !== action.questionId
        )
      ]
      return newState
    case SET_ADD_QUESTION:
      let stateData = []
      if (state && state.length > 0) {
        stateData = JSON.parse(JSON.stringify(state))
      }
      stateData.push(action.question)

      return stateData
    default:
      return state
  }
}

export function questionArchiving(state = '', action) {
  switch (action.type) {
    case SET_QUESTION_ARCHIVING:
      return action.questionArchiving
    default:
      return state
  }
}

export function questionsIsLoading(state = false, action) {
  switch (action.type) {
    case SET_QUESTIONS_IS_LOADING:
      return action.questionsIsLoading
    default:
      return state
  }
}

export function questionSaving(state = false, action) {
  switch (action.type) {
    case SET_QUESTION_SAVING:
      return action.questionSaving
    default:
      return state
  }
}

export function initQuestionAdd(state = false, action) {
  switch (action.type) {
    case SET_QUESTION_TO_CREATE:
      return action.initQuestionAdd
    default:
      return state
  }
}
