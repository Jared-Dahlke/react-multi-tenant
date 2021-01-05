import React from 'react'
import BasicInfo from './components/BasicInfo'
import GridContainer from '../../../components/Grid/GridContainer'
import GridItem from '../../../components/Grid/GridItem'
import Topics from './components/Topics'
import Categories from './components/Categories/Categories'
import Scenarios from './components/Scenarios/Scenarios'
import Opinions from './components/Opinions/Opinions'
import Questions from './components/Questions/Questions'
import TopCompetitors from './components/Competitors'
import { useSpring, animated } from 'react-spring'
import Grid from '@material-ui/core/Grid'
import { setBrandProfileUnderEdit } from '../../../redux/actions/brandProfiles'
import { connect } from 'react-redux'
import { GridList } from '@material-ui/core'
import { useScroll } from 'react-scroll-hooks'
import Steps from 'rsuite/lib/Steps'
import useOnScreen from './useOnScreen'
import Loader from 'rsuite/lib/Loader'

const mapDispatchToProps = (dispatch) => {
	return {
		setBrandProfileUnderEdit: () => dispatch(setBrandProfileUnderEdit(null))
	}
}

const mapStateToProps = (state) => {
	return {
		industryVerticals: state.industryVerticals,
		brandProfileCreated: state.brandProfileCreated,
		brandProfileCreating: state.brandProfileCreating,
		brandProfileSaved: state.brandProfileSaved,
		brandProfileSaving: state.brandProfileSaving,
		brandProfile: state.brandProfileUnderEdit
	}
}

const brandProfileSteps = {
	brandInformation: 'brandInformation',
	competitors: 'competitors',
	categories: 'categories',
	topics: 'topics',
	scenarios: 'scenarios',
	opinions: 'opinions',
	questions: 'questions'
}

function BrandProfile(props) {
	const containerRef = React.useRef()
	const brandInformationRef = React.useRef()
	const categoriesRef = React.useRef()
	const topicsRef = React.useRef()
	const scenariosRef = React.useRef()
	const opinionsRef = React.useRef()
	const questionsRef = React.useRef()
	const competitorsRef = React.useRef()
	const brandInformationVisible = useOnScreen(brandInformationRef)
	const competitorsVisible = useOnScreen(competitorsRef)
	const categoriesVisible = useOnScreen(categoriesRef)
	const topicsVisible = useOnScreen(topicsRef)
	const scenariosVisible = useOnScreen(scenariosRef)
	const opinionsVisible = useOnScreen(opinionsRef)
	const questionsVisible = useOnScreen(questionsRef)

	React.useEffect(() => {
		if (brandInformationVisible) {
			setActiveStep(brandProfileSteps.brandInformation)
			return
		}
		if (competitorsVisible) {
			setActiveStep(brandProfileSteps.competitors)
			return
		}
		if (categoriesVisible) {
			setActiveStep(brandProfileSteps.categories)
			return
		}
		if (topicsVisible) {
			setActiveStep(brandProfileSteps.topics)
			return
		}
		if (questionsVisible) {
			setActiveStep(brandProfileSteps.questions)
			return
		}
		if (scenariosVisible) {
			setActiveStep(brandProfileSteps.scenarios)
			return
		}
		if (opinionsVisible) {
			setActiveStep(brandProfileSteps.opinions)
			return
		}
	}, [
		brandInformationVisible,
		competitorsVisible,
		categoriesVisible,
		topicsVisible,
		questionsVisible,
		opinionsVisible,
		scenariosVisible
	])

	const scrollSpeed = 90
	const { scrollToElement, scrollToY } = useScroll({
		scrollSpeed,
		containerRef,
		verticalOffset: 0
	})

	const [competitorsValid, setCompetitorsValid] = React.useState(false)
	const [categoriesValid, setCategoriesValid] = React.useState(false)
	const [topicsValid, setTopicsValid] = React.useState(false)
	const [scenariosValid, setScenariosValid] = React.useState(false)
	const [opinionsValid, setOpinionsValid] = React.useState(false)
	const [questionsValid, setQuestionsValid] = React.useState(false)

	const [activeStep, setActiveStep] = React.useState(
		brandProfileSteps.brandInformation
	)

	const handleStepsClick = (step, ref) => {
		scrollToElement(ref)
	}

	const brandInfoProps = useSpring({
		opacity: props.brandProfile.brandName.length > 0 ? 1 : 0
	})

	const competitorsProps = useSpring({
		opacity: props.brandProfile.competitors ? 1 : 0
	})

	const categoriesProps = useSpring({
		opacity: props.brandProfile.categories ? 1 : 0
	})

	const topicsProps = useSpring({
		opacity: props.brandProfile.topics ? 1 : 0
	})

	const opinionsProps = useSpring({
		opacity: props.brandProfile.opinions ? 1 : 0
	})

	const scenariosProps = useSpring({
		opacity: props.brandProfile.scenarios ? 1 : 0
	})

	const questionsProps = useSpring({
		opacity: props.brandProfile.questions ? 1 : 0
	})

	return (
		<div>
			<GridContainer justify='center' style={{ paddingTop: 20 }}>
				<Grid item xs={2}>
					<animated.div style={brandInfoProps}>
						<Steps vertical>
							<Steps.Item
								title='Brand Information'
								onClick={() =>
									handleStepsClick(
										brandProfileSteps.brandInformation,
										brandInformationRef
									)
								}
								style={{ cursor: 'pointer' }}
								status={
									activeStep === brandProfileSteps.brandInformation
										? 'process'
										: 'wait'
								}
							/>

							<Steps.Item
								title='Competitors'
								onClick={() =>
									handleStepsClick(
										brandProfileSteps.competitors,
										competitorsRef
									)
								}
								style={{ cursor: 'pointer' }}
								status={
									activeStep === brandProfileSteps.competitors
										? 'process'
										: 'wait'
								}
							/>
							<Steps.Item
								title='Categories'
								onClick={() =>
									handleStepsClick(brandProfileSteps.categories, categoriesRef)
								}
								style={{ cursor: 'pointer' }}
								status={
									activeStep === brandProfileSteps.categories
										? 'process'
										: 'wait'
								}
							/>
							<Steps.Item
								title='Topics'
								onClick={() =>
									handleStepsClick(brandProfileSteps.topics, topicsRef)
								}
								style={{ cursor: 'pointer' }}
								status={
									activeStep === brandProfileSteps.topics ? 'process' : 'wait'
								}
							/>
							<Steps.Item
								title='Questions'
								onClick={() =>
									handleStepsClick(brandProfileSteps.questions, questionsRef)
								}
								style={{ cursor: 'pointer' }}
								status={
									activeStep === brandProfileSteps.questions
										? 'process'
										: 'wait'
								}
							/>
							<Steps.Item
								title='Scenarios'
								onClick={() =>
									handleStepsClick(brandProfileSteps.scenarios, scenariosRef)
								}
								style={{ cursor: 'pointer' }}
								status={
									activeStep === brandProfileSteps.scenarios
										? 'process'
										: 'wait'
								}
							/>
							<Steps.Item
								title='Opinions'
								onClick={() =>
									handleStepsClick(brandProfileSteps.opinions, opinionsRef)
								}
								style={{ cursor: 'pointer' }}
								status={
									activeStep === brandProfileSteps.opinions ? 'process' : 'wait'
								}
							/>
						</Steps>
					</animated.div>
				</Grid>

				<Grid item xs={12} sm={10} md={10}>
					<GridList
						style={{
							height: 670,
							position: 'relative'
						}}
						ref={containerRef}
					>
						<GridItem xs={12} sm={12} md={10}>
							{props.brandProfile.brandName.length === 0 && (
								<div
									style={{
										textAlign: 'center',
										height: '100px',
										marginTop: 100
									}}
								>
									<Loader speed='slow' size='lg' />
								</div>
							)}

							<div style={{ padding: 10 }}>
								<div ref={brandInformationRef} />
								<animated.div style={brandInfoProps}>
									<BasicInfo
										industryVerticals={props.industryVerticals}
										brandProfileId={props.match.params.brandProfileId}
									/>
								</animated.div>
								<div ref={competitorsRef} style={{ marginTop: 60 }}>
									<animated.div style={competitorsProps}>
										<TopCompetitors
											setCompetitorsValid={setCompetitorsValid}
											brandProfileId={props.match.params.brandProfileId}
										/>
									</animated.div>
								</div>
								<div ref={categoriesRef} style={{ marginTop: 60 }}>
									<animated.div style={categoriesProps}>
										<Categories
											categoriesValid={categoriesValid}
											setCategoriesValid={setCategoriesValid}
											brandProfileId={props.match.params.brandProfileId}
										/>
									</animated.div>
								</div>
								<div ref={topicsRef} style={{ marginTop: 60 }}>
									<animated.div style={topicsProps}>
										<Topics
											setTopicsValid={setTopicsValid}
											brandProfileId={props.match.params.brandProfileId}
										/>
									</animated.div>
								</div>
								<div ref={questionsRef} style={{ marginTop: 60 }}>
									<animated.div style={questionsProps}>
										<Questions
											brandProfileId={props.match.params.brandProfileId}
										/>
									</animated.div>
								</div>
								<div ref={scenariosRef} style={{ marginTop: 60 }}>
									<animated.div style={scenariosProps}>
										<Scenarios
											setScenariosValid={setScenariosValid}
											brandProfileId={props.match.params.brandProfileId}
										/>
									</animated.div>
								</div>
								<div ref={opinionsRef} style={{ marginTop: 60 }}>
									<animated.div style={opinionsProps}>
										<Opinions
											brandProfileId={props.match.params.brandProfileId}
										/>
									</animated.div>
								</div>
							</div>
						</GridItem>
					</GridList>
				</Grid>
			</GridContainer>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandProfile)
