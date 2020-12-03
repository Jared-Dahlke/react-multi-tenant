import React from 'react'
import BasicInfo from './BasicInfo'
import GridContainer from '../../../components/Grid/GridContainer'
import GridItem from '../../../components/Grid/GridItem'
/*import Topics from './components/Topics/Topics'
import Categories from './components/Categories/Categories'
import Scenarios from './components/Scenarios/Scenarios'
import TopCompetitors from './components/Competitors/TopCompetitors'*/
import { useSpring, animated } from 'react-spring'
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
import { accentColor } from '../../../assets/jss/colorContants.js'
import { GridList } from '@material-ui/core'
import { useScroll } from 'react-scroll-hooks'
import Steps from 'rsuite/lib/Steps'
import Loader from 'rsuite/lib/Loader'

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

function BrandProfile(props) {
	const containerRef = React.useRef()
	const categoriesRef = React.useRef()
	const topicsRef = React.useRef()
	const scenariosRef = React.useRef()
	const competitorsRef = React.useRef()
	const brandInformationRef = React.useRef()
	const scrollSpeed = 40
	const { scrollToElement, scrollToY } = useScroll({
		scrollSpeed,
		containerRef,
		verticalOffset: 0
	})

	const [isCreated, setIsCreated] = React.useState(false)

	const [competitorsValid, setCompetitorsValid] = React.useState(false)

	const [categoriesValid, setCategoriesValid] = React.useState(false)

	const [topicsValid, setTopicsValid] = React.useState(false)

	const [scenariosValid, setScenariosValid] = React.useState(false)

	const springProps = useSpring({
		opacity: props.brandProfileCreated ? 1 : 0,
		marginTop: props.brandProfileCreated ? 30 : 500
	})

	const handleStepsClick = (ref) => {
		scrollToElement(ref)
	}

	const getBrandProfileById = (brandProfiles, brandProfileId) => {
		console.log(brandProfiles, brandProfileId)
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

	React.useEffect(() => {
		if (props.brandProfiles.length > 0) {
			let bp = getBrandProfileById(
				props.brandProfiles,
				Number(props.match.params.brandProfileId)
			)
			setBrandProfile(bp)
		}
	}, [props.brandProfiles])

	return (
		<div>
			<GridContainer justify='center' style={{ paddingTop: 20 }}>
				<Grid item xs={2}>
					<Steps vertical>
						<Steps.Item
							title='Brand Information'
							onClick={() => handleStepsClick(brandInformationRef)}
							style={{ cursor: 'pointer' }}
							status={isCreated ? 'finish' : 'wait'}
						/>
						<Steps.Item
							title='Competitors'
							onClick={() => handleStepsClick(competitorsRef)}
							style={{ cursor: 'pointer' }}
							status={competitorsValid ? 'finish' : 'wait'}
						/>
						<Steps.Item
							title='Categories'
							onClick={() => handleStepsClick(categoriesRef)}
							style={{ cursor: 'pointer' }}
							status={categoriesValid ? 'finish' : 'wait'}
						/>
						<Steps.Item
							title='Topics'
							onClick={() => handleStepsClick(topicsRef)}
							style={{ cursor: 'pointer' }}
							status={topicsValid ? 'finish' : 'wait'}
						/>
						<Steps.Item
							title='Scenarios'
							onClick={() => handleStepsClick(scenariosRef)}
							style={{ cursor: 'pointer' }}
							status={scenariosValid ? 'finish' : 'wait'}
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

								<BasicInfo
									brandProfile={brandProfile}
									industryVerticals={props.industryVerticals}
								/>

								{/**	<div ref={competitorsRef} />
								{props.brandProfileCreated && (
									<animated.div style={springProps}>
										<TopCompetitors setCompetitorsValid={setCompetitorsValid} />

										<div ref={categoriesRef} style={{ marginTop: 30 }} />

										<Categories
											categoriesValid={categoriesValid}
											setCategoriesValid={setCategoriesValid}
										/>

										<div ref={topicsRef} style={{ marginTop: 30 }} />

										<Topics setTopicsValid={setTopicsValid} />

										<div ref={scenariosRef} style={{ marginTop: 30 }} />
										<Scenarios setScenariosValid={setScenariosValid} />
									</animated.div>
								)} */}
							</div>
						</GridItem>
					</GridList>
				</Grid>
			</GridContainer>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandProfile)
