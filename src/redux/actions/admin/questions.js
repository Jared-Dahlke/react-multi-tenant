import {
  SET_ADMIN_QUESTIONS,
  SET_QUESTIONS_IS_LOADING,
  SET_QUESTION_ARCHIVING,
  SET_QUESTION_TO_ARCHIVE,
  SET_QUESTION_SAVING,
  SET_ADD_QUESTION,
  SET_QUESTION_TO_CREATE
} from '../../action-types/admin/questions'
import axios from '../../../axiosConfig'
import config from '../../../config.js'
import { brandScenarioObjValidation } from '../../../schemas/schemas'
import toast from 'react-hot-toast'

const apiBase = config.api.userAccountUrl

export function setAdminQuestions(questions) {
  return {
    type: SET_ADMIN_QUESTIONS,
    questions
  }
}

export function setQuestionArchiving(questionId) {
  return {
    type: SET_QUESTION_ARCHIVING,
    questionArchiving: questionId
  }
}

export function setQuestionToArchived(questionId) {
  return {
    type: SET_QUESTION_TO_ARCHIVE,
    questionId
  }
}

export function setInitQuestionAdd(bool) {
  return {
    type: SET_QUESTION_TO_CREATE,
    initQuestionAdd: bool
  }
}

export function setQuestionSaving(bool) {
  return {
    type: SET_QUESTION_SAVING,
    questionSaving: bool
  }
}

export function addQuestion(question) {
  return {
    type: SET_ADD_QUESTION,
    question
  }
}

export function setQuestionsIsLoading(bool) {
  return {
    type: SET_QUESTIONS_IS_LOADING,
    questionsIsLoading: bool
  }
}

export function setQuestions(questions) {
  return {
    type: SET_ADMIN_QUESTIONS,
    questions
  }
}

export function fetchAdminQuestions() {
  let url = apiBase + `/questions`
  return async (dispatch) => {
    dispatch(setQuestionsIsLoading(true))
    try {
      const result = await axios.get(url)
      if (result.status === 200) {
        let questions = result.data
        dispatch(setQuestions(questions))
        dispatch(setQuestionsIsLoading(false))
      }
    } catch (error) {
      alert(error)
    }
  }
}

export const createQuestion = (question) => {
  let url = apiBase + `/questions`
  return (dispatch, getState) => {
    dispatch(setQuestionSaving(true))
    axios
      .post(url, question)
      .then((response) => {
        dispatch(addQuestion(response.data[0]))
        dispatch(setQuestionSaving(false))
        toast.success('Question Created')
        dispatch(setInitQuestionAdd(false))
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }
}

export const archiveQuestion = (questionId) => {
  let url = apiBase + `/questions/${questionId}`
  return (dispatch) => {
    dispatch(setQuestionArchiving(questionId))
    axios
      .delete(url)
      .then((response) => {
        dispatch(setQuestionToArchived(questionId))
        dispatch(setQuestionArchiving(''))
        toast.success('Question Archived')
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        console.error(error)
      })
  }
}
