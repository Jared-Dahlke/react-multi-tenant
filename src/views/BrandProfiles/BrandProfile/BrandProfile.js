import React from 'react'
import BasicInfo from './components/BasicInfo'
import GridContainer from '../../../components/Grid/GridContainer'
import GridItem from '../../../components/Grid/GridItem'
import Topics from './components/Topics'
import Categories from './components/Categories/Categories'
import IabCategories from './components/IabCategories/IabCategories'
import Scenarios from './components/Scenarios/Scenarios'
import Opinions from './components/Opinions/Opinions'
import Questions from './components/Questions/Questions'
import TopCompetitors from './components/Competitors'
import Outcomes from './components/Outcomes'
import { useSpring, animated } from 'react-spring'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import GridList from '@material-ui/core/GridList'
import { useScroll } from 'react-scroll-hooks'
import Steps from 'rsuite/lib/Steps'
import useOnScreen from './useOnScreen'
import Loader from 'rsuite/lib/Loader'
import { perms, userCan, UserCan } from '../../../Can'
import useDeepCompareEffect from 'use-deep-compare-effect'

const mapStateToProps = (state) => {
	return {
		brandProfileCreated: state.brandProfileCreated,
		brandProfileCreating: state.brandProfileCreating,
		brandProfileSaved: state.brandProfileSaved,
		brandProfileSaving: state.brandProfileSaving,
		brandProfile: state.brandProfileUnderEdit
	}
}

const brandProfileSteps = {
	brandInformation: 'brandInformation',
	outcomes: 'outcomes',
	competitors: 'competitors',
	categories: 'categories',
	iabCategories: 'iabCategories',
	topics: 'topics',
	questions: 'questions',
	opinions: 'opinions',
	scenarios: 'scenarios'
}

function BrandProfile(props) {
	const containerRef = React.useRef()
	const brandInformationRef = React.useRef()
	const outcomesRef = React.useRef()
	const categoriesRef = React.useRef()
	const iabCategoriesRef = React.useRef()
	const topicsRef = React.useRef()
	const scenariosRef = React.useRef()
	const opinionsRef = React.useRef()
	const questionsRef = React.useRef()
	const competitorsRef = React.useRef()
	const brandInformationVisible = useOnScreen(brandInformationRef)
	const outcomesVisible = useOnScreen(outcomesRef)
	const competitorsVisible = useOnScreen(competitorsRef)
	const categoriesVisible = useOnScreen(categoriesRef)
	const iabCategoriesVisible = useOnScreen(iabCategoriesRef)
	const topicsVisible = useOnScreen(topicsRef)
	const scenariosVisible = useOnScreen(scenariosRef)
	const opinionsVisible = useOnScreen(opinionsRef)
	const questionsVisible = useOnScreen(questionsRef)

	React.useEffect(() => {
		if (brandInformationVisible) {
			setActiveStep(brandProfileSteps.brandInformation)
			return
		}
		if (outcomesVisible) {
			setActiveStep(brandProfileSteps.outcomes)
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
		if (iabCategoriesVisible) {
			setActiveStep(brandProfileSteps.iabCategories)
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
		outcomesVisible,
		competitorsVisible,
		categoriesVisible,
		iabCategoriesVisible,
		topicsVisible,
		questionsVisible,
		opinionsVisible,
		scenariosVisible
	])

	const scrollSpeed = 100
	const { scrollToElement } = useScroll({
		scrollSpeed,
		containerRef,
		verticalOffset: 0
	})

	const [activeStep, setActiveStep] = React.useState(
		brandProfileSteps.brandInformation
	)

	const handleStepsClick = (step, ref) => {
		scrollToElement(ref)
	}

	const brandInfoProps = useSpring({
		config: { duration: 100 },
		opacity: props.brandProfile.brandName.length > 0 ? 1 : 0
	})

	return (
		<div>
			<GridContainer justify='center' style={{ paddingTop: 20 }}>
				<Grid item xs={2}>
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
							title='Outcomes'
							onClick={() =>
								handleStepsClick(brandProfileSteps.outcomes, outcomesRef)
							}
							style={{ cursor: 'pointer' }}
							status={
								activeStep === brandProfileSteps.outcomes ? 'process' : 'wait'
							}
						/>

						<Steps.Item
							title='Competitors'
							onClick={() =>
								handleStepsClick(brandProfileSteps.competitors, competitorsRef)
							}
							style={{ cursor: 'pointer' }}
							status={
								activeStep === brandProfileSteps.competitors
									? 'process'
									: 'wait'
							}
						/>

						{userCan(perms.BRAND_PROFILE_CATEGORIES_READ) && (
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
						)}

						{userCan(perms.BRAND_PROFILE_CATEGORIES_READ) && (
							<Steps.Item
								title='IAB Categories'
								onClick={() =>
									handleStepsClick(
										brandProfileSteps.iabCategories,
										iabCategoriesRef
									)
								}
								style={{ cursor: 'pointer' }}
								status={
									activeStep === brandProfileSteps.iabCategories
										? 'process'
										: 'wait'
								}
							/>
						)}

						{userCan(perms.BRAND_PROFILE_TOPICS_READ) && (
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
						)}
						<Steps.Item
							title='Questions'
							onClick={() =>
								handleStepsClick(brandProfileSteps.questions, questionsRef)
							}
							style={{ cursor: 'pointer' }}
							status={
								activeStep === brandProfileSteps.questions ? 'process' : 'wait'
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

						<Steps.Item
							title='Scenarios'
							onClick={() =>
								handleStepsClick(brandProfileSteps.scenarios, scenariosRef)
							}
							style={{ cursor: 'pointer' }}
							status={
								activeStep === brandProfileSteps.scenarios ? 'process' : 'wait'
							}
						/>
					</Steps>
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
							{props.brandProfile.brandName.length < 1 && (
								<div
									style={{
										textAlign: 'center',
										height: '100px',
										marginTop: 100
									}}
								>
									<Loader
										speed='fast'
										size='lg'
										content={'Loading...'}
										vertical
									/>
								</div>
							)}

							<animated.div style={brandInfoProps}>
								<div style={{ padding: 10 }}>
									<div ref={brandInformationRef} />

									<BasicInfo
										brandProfileId={props.match.params.brandProfileId}
									/>

									<div ref={outcomesRef} style={{ marginTop: 60 }}>
										<Outcomes
											brandProfileId={props.match.params.brandProfileId}
										/>
									</div>
									<div ref={competitorsRef} style={{ marginTop: 60 }}>
										<TopCompetitors
											brandProfileId={props.match.params.brandProfileId}
										/>
									</div>

									{userCan(perms.BRAND_PROFILE_CATEGORIES_READ) && (
										<div ref={categoriesRef} style={{ marginTop: 60 }}>
											<Categories
												brandProfileId={props.match.params.brandProfileId}
											/>
										</div>
									)}

									{userCan(perms.BRAND_PROFILE_CATEGORIES_READ) && (
										<div ref={iabCategoriesRef} style={{ marginTop: 60 }}>
											<IabCategories
												brandProfileId={props.match.params.brandProfileId}
											/>
										</div>
									)}

									{userCan(perms.BRAND_PROFILE_TOPICS_READ) && (
										<div ref={topicsRef} style={{ marginTop: 60 }}>
											<Topics
												brandProfileId={props.match.params.brandProfileId}
											/>
										</div>
									)}

									<div ref={questionsRef} style={{ marginTop: 60 }}>
										<Questions
											brandProfileId={props.match.params.brandProfileId}
										/>
									</div>

									<div ref={opinionsRef} style={{ marginTop: 60 }}>
										<Opinions
											brandProfileId={props.match.params.brandProfileId}
										/>
									</div>

									<div ref={scenariosRef} style={{ marginTop: 60 }}>
										<Scenarios
											brandProfileId={props.match.params.brandProfileId}
										/>
									</div>
								</div>
							</animated.div>
						</GridItem>
					</GridList>
				</Grid>
			</GridContainer>
		</div>
	)
}

export default connect(mapStateToProps, null)(BrandProfile)
