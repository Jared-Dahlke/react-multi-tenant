import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import Button from 'rsuite/lib/Button'
import {
	fetchBrandProfiles,
	fetchBrandProfile,
	deleteBrandProfile,
	setBrandProfileDeleted,
	removeBrandProfile
} from '../../../redux/actions/brandProfiles.js'
import { connect } from 'react-redux'
import { FormLoader } from '../../../components/SkeletonLoader'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../routes'
import Panel from 'rsuite/lib/Panel'
import Checkbox from 'rsuite/lib/Checkbox'
import Label from '../../../components/CustomInputLabel/CustomInputLabel'
import numeral from 'numeral'
import Icon from 'rsuite/lib/Icon'
import IconButton from 'rsuite/lib/IconButton'
import { fetchLists } from '../../../redux/actions/engage/lists'

const mapStateToProps = (state) => {
	return {
		lists: state.engage.lists
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLists: () => dispatch(fetchLists())
	}
}

function Lists(props) {
	const history = useHistory()

	let fetchLists = props.fetchLists
	React.useEffect(() => {
		fetchLists()
	}, [fetchLists])

	const handleUploadNewList = () => {
		history.push(routes.app.engage.lists.uploadList.path)
	}

	const ListVersion = (props) => {
		return <div key={Math.random()}>{props.version.createdBy}</div>
	}

	const panelStyle = {
		border: '1px solid #565656',
		borderRadius: '6px',
		height: 100,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}

	const MyHeader = (props) => {
		return (
			<div>
				<Grid container alignItems='center' spacing={1}>
					<Grid item xs={4} style={panelStyle}>
						<Grid container>
							<Grid item xs={4}>
								<Grid item xs={12}>
									<Grid container justify='center'>
										<Label label={'Name'} />
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='center'>
										{props.data.smartListName}
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={4}>
								<Grid item xs={12}>
									<Grid container justify='center'>
										<Label label={'Objective'} />
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='center'>
										{props.data.objectiveName}
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={4}>
								<Grid item xs={12}>
									<Grid container justify='center'>
										<Label label={'Status'} />
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='center'>
										Active
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={5} style={panelStyle}>
						<Grid container>
							<Grid item xs={4}>
								<Grid item xs={12}>
									<Grid container justify='center'>
										<Icon size='lg' icon='tv' />
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='center'>
										<Label label={'Channels'} />
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='center'>
										{props.data.channelCount}
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={4}>
								<Grid item xs={12}>
									<Grid container justify='center'>
										<Icon size='lg' icon='youtube-play' />
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='center'>
										<Label label={'Videos'} />
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='center'>
										{props.data.videoCount}
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={4}>
								<Grid item xs={12}>
									<Grid container justify='center'>
										<Icon size='lg' icon='group' />
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='center'>
										<Label label={'Subscribers'} />
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='center'>
										{props.data.subscriberCount}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2} style={panelStyle}>
						<IconButton
							appearance='ghost'
							icon={<Icon icon={'file-download'} size='lg' />}
							size='lg'
							onClick={(e) => {
								e.preventDefault()
							}}
						>
							Download
						</IconButton>
					</Grid>
				</Grid>
			</div>
		)
	}

	const MyList = (props) => {
		let activeVersion = {}
		for (const version of props.list.versions) {
			if (version.active) activeVersion = version
		}
		console.log('active version')
		console.log(activeVersion)
		return (
			<Grid item xs={12}>
				<Panel shaded header={<MyHeader data={activeVersion} />} bordered>
					<Button
						appearance='link'
						onClick={() => props.handleViewAll(props.list)}
					>
						View all versions
					</Button>
					{props.list.viewAll &&
						props.list.versions &&
						props.list.versions.length > 0 &&
						props.list.versions.map((version, index) => {
							return <ListVersion version={version} />
						})}
				</Panel>
			</Grid>
		)
	}

	//let subscribers = numeral(item.channelSubscribers).format('0.0a')

	const handleViewAll = (list) => {}

	return (
		<Grid container justify='center'>
			<GridItem xs={12} sm={12} md={12}>
				<Grid item xs={12} sm={12} md={12}>
					<Grid container justify='flex-end' style={{ marginBottom: 30 }}>
						<Button onClick={handleUploadNewList}>Upload a new list</Button>
					</Grid>
				</Grid>
				{props.lists && props.lists.length > 0 ? (
					<Grid container spacing={2}>
						{props.lists &&
							props.lists.map((list, index) => (
								<MyList list={list} key={index} handleViewAll={handleViewAll} />
							))}
					</Grid>
				) : (
					<FormLoader />
				)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
