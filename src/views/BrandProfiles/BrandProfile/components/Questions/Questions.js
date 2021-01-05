import React from 'react'
import Question from './Question'
import { connect } from 'react-redux'
import {
	patchBrandProfileQuestions,
	fetchBrandProfileQuestions,
	setBrandProfileQuestions
} from '../../../../../redux/actions/brandProfiles'
import Panel from '../../../../../components/CustomPanel'

const mapStateToProps = (state) => {
	return {
		brandProfile: state.brandProfileUnderEdit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileQuestions: (data) =>
			dispatch(patchBrandProfileQuestions(data)),
		fetchBrandProfileQuestions: (data) =>
			dispatch(fetchBrandProfileQuestions(data)),
		setBrandProfileQuestions: (questions) =>
			dispatch(setBrandProfileQuestions(questions))
	}
}

function Questions(props) {
	const [fetched, setFetched] = React.useState(false)
	React.useEffect(() => {
		if (!fetched) {
			props.fetchBrandProfileQuestions(props.brandProfileId)
			setFetched(true)
		}
	}, [])

	React.useEffect(() => {
		return () => {
			setFetched(false)
		}
	}, [])

	const handleSetBrandProfiles = (questions) => {
		let questionsCopy = JSON.parse(JSON.stringify(questions))
		props.setBrandProfileQuestions(questionsCopy)
	}

	const handleQuestionResponse = (questionId, response) => {
		let data = {
			questionId: questionId,
			responseText: response
		}
		let newquestions = JSON.parse(JSON.stringify(props.brandProfile.questions))
		handleSetBrandProfiles(newquestions)

		let params = {
			questions: [data],
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileQuestions(params)
	}

	return (
		<Panel bordered header='Questions'>
			<div>
				{props.brandProfile.questions &&
					props.brandProfile.questions.length > 0 &&
					props.brandProfile.questions.map((question, index) => {
						return (
							<Question
								key={index}
								handleQuestionResponse={handleQuestionResponse}
								question={question}
							/>
						)
					})}
			</div>
		</Panel>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions)
