import React from 'react'
import BasicInfo from './components/BasicInfo'
import GridContainer from '../../../components/Grid/GridContainer'
import GridItem from '../../../components/Grid/GridItem'
import Topics from './components/Topics'
import Categories from './components/Categories/Categories'
import Scenarios from './components/Scenarios/Scenarios'
import Opinions from './components/Opinions/Opinions'
import TopCompetitors from './components/Competitors'
import { useSpring, animated } from 'react-spring'
import { accentColor } from '../../../assets/jss/colorContants'
import Grid from '@material-ui/core/Grid'
import {
	createBrandProfile,
	setBrandProfileCreated,
	setBrandProfileSaved,
	setBrandProfileSaving,
	removeBrandProfile,
	setBrandProfileUnderEdit
} from '../../../redux/actions/brandProfiles'
import { connect } from 'react-redux'
import { GridList } from '@material-ui/core'
import { useScroll } from 'react-scroll-hooks'
import Steps from 'rsuite/lib/Steps'
import useOnScreen from './useOnScreen'

const mapDispatchToProps = (dispatch) => {
	return {
		createBrandProfile: (brandProfile) =>
			dispatch(createBrandProfile(brandProfile)),
		setBrandProfileCreated: (bool) => dispatch(setBrandProfileCreated(bool)),
		setBrandProfileSaved: (bool) => dispatch(setBrandProfileSaved(bool)),
		setBrandProfileSaving: (bool) => dispatch(setBrandProfileSaving(bool)),
		removeBrandProfile: (brandProfileId) =>
			dispatch(removeBrandProfile(brandProfileId)),
		setBrandProfileUnderEdit: () => dispatch(setBrandProfileUnderEdit(null))
	}
}

const mapStateToProps = (state) => {
	return {
		industryVerticals: state.industryVerticals,
		topics: state.topics,
		categories: state.brandCategories,
		scenarios: state.scenarios,
		currentAccountId: state.currentAccountId,
		brandProfileCreated: state.brandProfileCreated,
		brandProfileCreating: state.brandProfileCreating,
		brandProfileSaved: state.brandProfileSaved,
		brandProfileSaving: state.brandProfileSaving,
		brandProfiles: state.brandProfiles
	}
}

const brandProfileSteps = {
	brandInformation: 'brandInformation',
	competitors: 'competitors',
	categories: 'categories',
	topics: 'topics',
	scenarios: 'scenarios',
	opinions: 'opinions'
}

function BrandProfile(props) {
	const containerRef = React.useRef()
	const brandInformationRef = React.useRef()
	const categoriesRef = React.useRef()
	const topicsRef = React.useRef()
	const scenariosRef = React.useRef()
	const opinionsRef = React.useRef()
	const competitorsRef = React.useRef()
	const brandInformationVisible = useOnScreen(brandInformationRef)
	const competitorsVisible = useOnScreen(competitorsRef)
	const categoriesVisible = useOnScreen(categoriesRef)
	const topicsVisible = useOnScreen(topicsRef)
	const scenariosVisible = useOnScreen(scenariosRef)
	const opinionsVisible = useOnScreen(opinionsRef)

	const [state, toggle] = React.useState(true)
	const { x } = useSpring({
		from: { x: 0 },
		x: state ? 1 : 0,
		config: { duration: 1000 }
	})

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
		opinionsVisible,
		scenariosVisible
	])

	const scrollSpeed = 80
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

	const [activeStep, setActiveStep] = React.useState(
		brandProfileSteps.brandInformation
	)

	const handleStepsClick = (step, ref) => {
		//	setActiveStep(step)
		scrollToElement(ref)
	}

	const getBrandProfileById = (brandProfiles, brandProfileId) => {
		for (const brandProfile of brandProfiles) {
			if (brandProfile.brandProfileId === brandProfileId)
				return JSON.parse(JSON.stringify(brandProfile))
		}
	}

	const [brandProfile, setBrandProfile] = React.useState({
		brandName: '',
		websiteUrl: '',
		twitterProfileUrl: '',
		industryVerticalId: '',
		brandProfileId: ''
	})

	const brandInfoProps = useSpring({
		opacity: brandProfile.brandName.length > 0 ? 1 : 0
	})

	const competitorsProps = useSpring({
		opacity: brandProfile.competitors ? 1 : 0
		//	marginTop: brandProfile.competitors ? 20 : 500
	})

	const categoriesProps = useSpring({
		opacity: brandProfile.categories ? 1 : 0
		//	marginTop: brandProfile.categories ? 20 : 500
	})

	const topicsProps = useSpring({
		opacity: brandProfile.topics ? 1 : 0
		//	marginTop: brandProfile.categories ? 20 : 500
	})

	const opinionsProps = useSpring({
		opacity: brandProfile.opinions ? 1 : 0
		//	marginTop: brandProfile.categories ? 20 : 500
	})

	const scenariosProps = useSpring({
		opacity: brandProfile.scenarios ? 1 : 0
		//	marginTop: brandProfile.categories ? 20 : 500
	})

	React.useEffect(() => {
		if (props.brandProfiles.length > 0) {
			let bp = getBrandProfileById(
				props.brandProfiles,
				Number(props.match.params.brandProfileId)
			)
			setBrandProfile(bp)
		}
	}, [props.brandProfiles])

	const { brandProfileSaving, brandProfileSaved } = props

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
						<Steps.Item
							title='Categories'
							onClick={() =>
								handleStepsClick(brandProfileSteps.categories, categoriesRef)
							}
							style={{ cursor: 'pointer' }}
							status={
								activeStep === brandProfileSteps.categories ? 'process' : 'wait'
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
							title='Scenarios'
							onClick={() =>
								handleStepsClick(brandProfileSteps.scenarios, scenariosRef)
							}
							style={{ cursor: 'pointer' }}
							status={
								activeStep === brandProfileSteps.scenarios ? 'process' : 'wait'
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
				</Grid>

				<Grid item xs={12} sm={10} md={10}>
					<GridList
						style={{
							height: 600,
							position: 'relative'
						}}
						ref={containerRef}
					>
						<GridItem xs={12} sm={12} md={10}>
							<div style={{ padding: 10 }}>
								<div ref={brandInformationRef} />
								<animated.div style={brandInfoProps}>
									<BasicInfo
										brandProfile={brandProfile}
										industryVerticals={props.industryVerticals}
									/>
								</animated.div>

								<div ref={competitorsRef} style={{ marginTop: 60 }}>
									<animated.div style={competitorsProps}>
										<TopCompetitors
											setCompetitorsValid={setCompetitorsValid}
											brandProfile={brandProfile}
										/>
									</animated.div>
								</div>

								<div ref={categoriesRef} style={{ marginTop: 60 }}>
									<animated.div style={categoriesProps}>
										<Categories
											categoriesValid={categoriesValid}
											setCategoriesValid={setCategoriesValid}
											brandProfile={brandProfile}
										/>
									</animated.div>
								</div>

								<div ref={topicsRef} style={{ marginTop: 60 }}>
									<animated.div style={topicsProps}>
										<Topics
											setTopicsValid={setTopicsValid}
											brandProfile={brandProfile}
										/>
									</animated.div>
								</div>

								<div ref={scenariosRef} style={{ marginTop: 60 }}>
									<animated.div style={scenariosProps}>
										<Scenarios
											setScenariosValid={setScenariosValid}
											brandProfile={brandProfile}
										/>
									</animated.div>
								</div>
								<div ref={opinionsRef} style={{ marginTop: 60 }}>
									<animated.div style={opinionsProps}>
										<Opinions
											//setScenariosValid={setScenariosValid}
											brandProfile={brandProfile}
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
