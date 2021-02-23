import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../routes'
import ChannelsTable from './components/ChannelsTable'
import Button from 'rsuite/lib/Button'
import ChannelVideosModal from './components/ChannelVideosModal'
import { withRouter } from 'react-router-dom'
import VideosTable from './components/VideosTable'
import Grid from '@material-ui/core/Grid'
import Icon from 'rsuite/lib/Icon'
import BulkOperationsModal from './components/BulkOperationsModal'
import Toggle from 'rsuite/lib/Toggle'
import Stats from './components/Stats'
import {
	fetchVideos,
	fetchChannels,
	fetchChannelVideos,
	setVideos,
	removeAllVideos,
	removeAllChannelVideos,
	removeAllChannels,
	setChannelsHasNextPage,
	setChannelVideosHasNextPage,
	setVideosHasNextPage,
	setVisibleChannelColumns,
	setVisibleVideoColumns
} from '../../../../redux/actions/engage/listBuilder'

import {
	patchVersionData,
	postVersionBulkAction,
	deleteVersionDataItem,
	downloadExcelList,
	fetchLists,
	patchListName,
	setSmartListStats,
	setSmartListStatsLoading
} from '../../../../redux/actions/engage/lists'
import toast from 'react-hot-toast'
import Loader from 'rsuite/lib/Loader'
import { FiltersSideBar } from './components/FiltersSideBar'
import ButtonToolbar from 'rsuite/lib/ButtonToolbar'
import Input from 'rsuite/lib/Input'
import InputGroup from 'rsuite/lib/InputGroup'
import { accentColor } from '../../../../assets/jss/colorContants'
import Panel from 'rsuite/lib/Panel'
import ControlLabel from 'rsuite/lib/ControlLabel'

const mapStateToProps = (state) => {
	return {
		visibleVideoColumns: state.engage.visibleVideoColumns,
		visibleChannelColumns: state.engage.visibleChannelColumns,
		smartListStats: state.engage.smartListStats,
		lists: state.engage.lists,
		videos: state.engage.videos,
		channelVideos: state.engage.channelVideos,
		channels: state.engage.channels,
		channelsIsLoading: state.engage.channelsIsLoading,
		videosIsLoading: state.engage.videosIsLoading,
		channelsHasNextPage: state.engage.channelsHasNextPage,
		videosHasNextPage: state.engage.videosHasNextPage,
		isDownloadingExcel: state.engage.isDownloadingExcel,
		isDownloadingExcelVersionId: state.engage.isDownloadingExcelVersionId,
		currentAccountId: state.currentAccountId,
		brandProfiles: state.brandProfiles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setVisibleChannelColumns: (arr) => dispatch(setVisibleChannelColumns(arr)),
		setVisibleVideoColumns: (arr) => dispatch(setVisibleVideoColumns(arr)),
		setSmartListStatsLoading: (bool) =>
			dispatch(setSmartListStatsLoading(bool)),
		setVideos: (videos) => dispatch(setVideos(videos)),
		setSmartListStats: (params) => dispatch(setSmartListStats(params)),
		fetchLists: (accountId) => dispatch(fetchLists(accountId)),
		patchListName: (payload) => dispatch(patchListName(payload)),
		fetchVideos: (params) => dispatch(fetchVideos(params)),
		fetchChannelVideos: (params) => dispatch(fetchChannelVideos(params)),
		fetchChannels: (params) => dispatch(fetchChannels(params)),
		patchVersionData: (params) => dispatch(patchVersionData(params)),
		postVersionBulkAction: (params) => dispatch(postVersionBulkAction(params)),
		removeAllVideos: () => dispatch(removeAllVideos()),
		removeAllChannels: () => dispatch(removeAllChannels()),
		removeAllChannelVideos: () => dispatch(removeAllChannelVideos()),
		setChannelsHasNextPage: (bool) => dispatch(setChannelsHasNextPage(bool)),
		setChannelVideosHasNextPage: (bool) =>
			dispatch(setChannelVideosHasNextPage(bool)),
		setVideosHasNextPage: (bool) => dispatch(setVideosHasNextPage(bool)),
		deleteVersionDataItem: (params) => dispatch(deleteVersionDataItem(params)),
		downloadExcelList: (payload) => dispatch(downloadExcelList(payload))
	}
}

class ListBuilder extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			date: new Date(),
			didInitialFetch: false,
			showChannelVideosModal: false,
			viewingVideosForChannel: null,
			bulk: false,
			isEditingName: false,
			smartListName: '',
			viewingChannels: true,
			filtersExpanded: true,
			parsedVersionId: null,
			version: null,
			lists: [],
			currentPage: 1,
			currentVideosPage: 1,
			currentChannelVideosPage: 1,
			currentChannelsSort: {
				sortColumn: 'views',
				sortType: 'desc'
			},
			currentVideosSort: {
				sortColumn: 'views',
				sortType: 'desc'
			},
			currentChannelVideosSort: {
				sortColumn: 'views',
				sortType: 'desc'
			},
			filterState: {
				kids: false,
				iabCategories: [],
				countries: [],
				actionIds: null,
				uploadDate: null,
				categories: [],
				languages: [],
				views: {
					min: null,
					max: null
				},
				videoDurationSeconds: {
					min: null,
					max: null
				}
			}
		}
	}

	filters = {
		kids: 'kids',
		categories: 'categories',
		iabCategories: 'iabCategories',
		languages: 'languages',
		countries: 'countries',
		actionIds: 'actionIds',
		views: 'views',
		videoDurationSeconds: 'videoDurationSeconds',
		uploadDate: 'uploadDate'
	}

	componentDidMount() {
		let versionId = this.props.match.params.versionId
		this.setState({ parsedVersionId: versionId })
	}

	componentWillUnmount() {
		this.props.removeAllChannels()
		this.props.removeAllVideos()
		this.props.removeAllChannelVideos()
		this.props.setChannelsHasNextPage(true)
		this.props.setVideosHasNextPage(true)
		this.props.setChannelVideosHasNextPage(true)
		this.props.setSmartListStats({})
		this.setState({
			currentPage: 1,
			currentVideosPage: 1,
			currentChannelVideosPage: 1
		})
	}

	UNSAFE_componentWillReceiveProps(prevProps) {
		if (prevProps.lists.length > 0 && this.state.smartListName.length < 1) {
			this.setState({ lists: prevProps.lists }, () => {
				this.setSmartListUnderEdit()
			})
		}

		let stats = this.props.smartListStats

		if (stats.channelCount != null && !this.state.didInitialFetch) {
			let hasIds =
				(stats.channelCount && stats.channelCount > 0) ||
				(stats.videoCount && stats.videoCount > 0)
			if (hasIds) {
				this.setState(
					(prevState) => {
						let newState = {
							...prevState.filterState,
							actionIds: [1, 2, 3]
						}
						return {
							filterState: newState,
							didInitialFetch: true
						}
					},
					() => {
						this.fetchChannelsFunction()
					}
				)
			} else {
				this.setState(
					(prevState) => {
						let newState = {
							...prevState.filterState,
							actionIds: null
						}
						return {
							filterState: newState,
							didInitialFetch: true
						}
					},
					() => {
						this.fetchChannelsFunction()
					}
				)
			}
		}
	}

	setSmartListUnderEdit = () => {
		for (const version of this.state.lists) {
			if (
				version.versionId == this.props.match.params.versionId ||
				version.versionId === this.props.match.params.versionId
			) {
				this.setState({
					version: version,
					smartListName: version.smartListName,
					setPageIsLoading: false
				})
			}
		}
	}

	fetchChannelsFunction = () => {
		let params = {
			versionId: this.state.parsedVersionId,
			pageNumber: this.state.currentPage,
			filters: this.state.filterState,
			sort: this.state.currentChannelsSort
		}
		this.props.fetchChannels(params)
	}

	fetchVideosFunction = () => {
		let params = {
			versionId: this.state.parsedVersionId,
			pageNumber: this.state.currentVideosPage,
			filters: this.state.filterState,
			sort: this.state.currentVideosSort
		}
		this.props.fetchVideos(params)
	}

	fetchChannelVideosFunction = () => {
		let params = {
			versionId: this.state.parsedVersionId,
			pageNumber: this.state.currentChannelVideosPage,
			filters: {
				...this.state.filterState,
				channelId: this.state.viewingVideosForChannel.id
			},
			sort: this.state.currentChannelVideosSort
		}

		this.props.fetchChannelVideos(params)
	}

	handleChannelsToggle = (viewingVideos) => {
		if (this.props.videos.length < 1 && viewingVideos) {
			this.setState({ currentVideosPage: 1, videosHasNextPage: true }, () => {
				this.fetchVideosFunction()
			})
		}
		this.setState({ viewingChannels: !viewingVideos })
	}

	goToListsPage = () => {
		this.props.history.push(routes.app.engage.lists.lists.path)
	}

	handleNameChange = (e) => {
		e.preventDefault()
		this.setState({ isEditingName: false })

		let payload = {
			smartListName: e.target.value,
			smartListId: this.state.version.smartListId
		}

		toast.promise(this.props.patchListName(payload), {
			loading: 'Saving...',
			success: 'Saved!   ',
			error: <b>Could not delete.</b>
		})
	}

	handleDownloadClick = (versionId, smartListName) => {
		let payload = {
			versionId,
			smartListName
		}
		this.props.downloadExcelList(payload)
	}

	handleApplyFiltersButtonClick = () => {
		this.props.removeAllChannels()
		this.props.removeAllVideos()
		this.props.removeAllChannelVideos()
		this.props.setChannelsHasNextPage(true)
		this.props.setVideosHasNextPage(true)

		this.setState(
			{
				currentPage: 1,
				currentVideosPage: 1,
				currentChannelVideosPage: 1
			},
			() => {
				this.fetchChannelsFunction()
			}
		)
	}

	setCurrentChannelsSort = (val) => {
		this.props.removeAllChannels()
		this.props.removeAllChannelVideos()
		this.props.setChannelsHasNextPage(true)

		this.setState({ currentChannelsSort: val, currentPage: 1 }, () => {
			this.fetchChannelsFunction()
		})
	}

	setCurrentVideosSort = (val) => {
		this.props.removeAllVideos()
		this.props.setVideosHasNextPage(true)

		this.setState({ currentVideosSort: val, currentVideosPage: 1 }, () => {
			this.fetchVideosFunction()
		})
	}

	setCurrentChannelVideosSort = (val) => {
		this.props.removeAllChannelVideos()
		this.props.setChannelVideosHasNextPage(true)

		this.setState(
			{ currentChannelVideosSort: val, currentChannelVideosPage: 1 },
			() => {
				this.fetchChannelVideosFunction()
			}
		)
	}

	handleVideosClick = (channel) => {
		this.props.removeAllChannelVideos()
		this.setState({ viewingVideosForChannel: channel }, () => {
			this.fetchChannelVideosFunction()
		})
		this.setState({ showChannelVideosModal: true })
	}

	handleChannelVideosModalClose = () => {
		this.setState(
			{ showChannelVideosModal: false, currentChannelVideosPage: 1 },
			() => {
				this.setState({ viewingVideosForChannel: null })
				this.props.setChannelVideosHasNextPage(true)
				this.props.removeAllChannelVideos()
			}
		)
	}

	handleActionButtonClick = (actionId, item) => {
		this.props.setSmartListStatsLoading(true)
		let unSelecting = item.actionId === actionId
		let versionId = this.state.parsedVersionId

		if (unSelecting) {
			delete item.actionId
			let _args = {
				versionId: versionId,
				id: item.id
			}

			toast.promise(this.props.deleteVersionDataItem(_args), {
				loading: 'Deleting...',
				success: 'Deleted!   ',
				error: <b>Could not delete.</b>
			})
		} else {
			item.actionId = actionId
			let args = {
				versionId: versionId,
				data: [{ actionId: actionId, id: item.id }]
			}

			toast.promise(this.props.patchVersionData(args), {
				loading: 'Saving...',
				success: 'Saved!   ',
				error: <b>Could not save.</b>
			})
		}
	}

	handleFilterChange = (filter, value) => {
		switch (filter) {
			case this.filters.kids:
				this.setState((prevState) => {
					let newState = {
						...prevState.filterState,
						kids: value
					}

					return {
						filterState: newState
					}
				})

				break
			case this.filters.countries:
				let countries = []
				if (!value) {
					value = []
				}
				for (const country of value) {
					countries.push({ countryCode: country })
				}
				this.setState((prevState) => {
					let newState = {
						...prevState.filterState,
						countries
					}
					return {
						filterState: newState
					}
				})
				break
			case this.filters.languages:
				let languages = []
				if (!value) {
					value = []
				}
				for (const language of value) {
					languages.push({ languageCode: language })
				}
				this.setState((prevState) => {
					let newState = {
						...prevState.filterState,
						languages
					}
					return {
						filterState: newState
					}
				})
				break
			case this.filters.categories:
				let categories = []
				if (!value) {
					value = []
				}
				for (const category of value) {
					categories.push({ categoryId: Number(category) })
				}
				this.setState((prevState) => {
					let newState = {
						...prevState.filterState,
						categories
					}
					return {
						filterState: newState
					}
				})
				break

			case this.filters.iabCategories:
				let iabCategories = []
				if (!value) {
					value = []
				}
				for (const iabCategory of value) {
					iabCategories.push(iabCategory)
				}

				this.setState((prevState) => {
					let newState = {
						...prevState.filterState,
						iabCategories: iabCategories
					}

					return { filterState: newState }
				})
				break

			case this.filters.actionIds:
				let actionIds = []
				if (!value) {
					actionIds = null
				} else {
					for (const actionId of value) {
						actionIds.push(actionId)
					}
				}

				this.setState((prevState) => {
					let newState = {
						...prevState.filterState,
						actionIds
					}
					return {
						filterState: newState
					}
				})
				break

			case this.filters.views:
				if (!value) {
					value = {}
				}

				this.setState((prevState) => {
					let newState = {
						...prevState.filterState,
						views: value
					}
					return {
						filterState: newState
					}
				})
				break

			case this.filters.videoDurationSeconds:
				if (!value) {
					value = {}
				}

				this.setState((prevState) => {
					let newState = {
						...prevState.filterState,
						videoDurationSeconds: value
					}
					return {
						filterState: newState
					}
				})

				break

			case this.filters.uploadDate:
				if (!value) {
					value = {}
				}

				this.setState((prevState) => {
					let newState = {
						...prevState.filterState,
						uploadDate: value
					}
					return {
						filterState: newState
					}
				})

				break

			default:
				break
		}
	}

	tableHeight = 890

	render() {
		return (
			<>
				<BulkOperationsModal
					bulk={this.state.bulk}
					setBulk={(val) =>
						this.setState((prevState) => {
							return { bulk: val }
						})
					}
					parsedVersionId={this.state.parsedVersionId}
				/>
				<div style={{ display: 'flex' }}>
					<Panel
						style={{
							flex: 1,
							marginBottom: 15,
							backgroundColor: '#F7F7FA'
						}}
						header={
							<Grid container>
								<Grid item xs={6}>
									<ControlLabel>SmartList Name</ControlLabel>
									<InputGroup
										style={{
											borderColor: this.state.isEditingName
												? accentColor
												: '#F7F7FA'
										}}
									>
										<InputGroup.Button
											onClick={() => {
												this.setState({ isEditingName: true })
											}}
											style={{ backgroundColor: 'transparent' }}
										>
											<Icon style={{ color: '#0092d1' }} icon='pencil' />
										</InputGroup.Button>
										<Input
											style={{ backgroundColor: 'transparent', color: 'grey' }}
											onPressEnter={(e) => this.handleNameChange(e)}
											onBlur={(e) => {
												this.handleNameChange(e)
											}}
											onChange={(val) => {
												//	e.preventDefault()
												this.setState({ smartListName: val })
											}}
											disabled={!this.state.isEditingName}
											value={this.state.smartListName}
										/>
									</InputGroup>
								</Grid>
								<Grid item xs={6} align='right'>
									<ButtonToolbar>
										<Toggle
											onChange={this.handleChannelsToggle}
											size='xs'
											checkedChildren='Videos'
											unCheckedChildren='Channels'
											style={{ backgroundColor: accentColor }}
										/>

										<Button
											size='xs'
											loading={
												this.props.isDownloadingExcel &&
												this.props.isDownloadingExcelVersionId ===
													this.state.parsedVersionId
											}
											onClick={() =>
												this.handleDownloadClick(
													this.state.parsedVersionId,
													this.state.smartListName
												)
											}
										>
											Download
										</Button>

										<Button
											size='xs'
											onClick={() => {
												this.setState({ bulk: true })
											}}
										>
											Bulk Operations
										</Button>
										<Button size='xs' onClick={this.goToListsPage}>
											Done
										</Button>
									</ButtonToolbar>
								</Grid>
							</Grid>
						}
					>
						<div style={{ display: 'flex' }}>
							<div
								style={{
									display: 'flex',
									minWidth: 430
								}}
							>
								<div style={{ flex: 1 }}>
									<p>Brand Profile:</p>
									<p style={{ color: 'grey' }}>
										{this.state.version?.brandProfileName}
									</p>
									<p>Objective:</p>
									<p style={{ color: 'grey' }}>
										{this.state.version?.objectiveName}
									</p>
								</div>
							</div>
							<div
								style={{
									width: '100%'
								}}
							>
								<Stats
									parsedVersionId={this.props.match.params.versionId}
									smartListStats={this.props.smartListStats}
								/>
							</div>
						</div>
					</Panel>
				</div>

				<div style={{ display: 'flex' }}>
					<FiltersSideBar
						filters={this.filters}
						handleFilterChange={this.handleFilterChange}
						expand={this.state.filtersExpanded}
						handleToggle={() =>
							this.setState((prevState) => {
								return {
									filtersExpanded: !prevState.filtersExpanded
								}
							})
						}
						filterState={this.state.filterState}
						handleApplyFiltersButtonClick={this.handleApplyFiltersButtonClick}
					/>

					{this.state.viewingChannels && (
						<ChannelsTable
							tableHeight={this.tableHeight}
							setCurrentChannelsSort={this.setCurrentChannelsSort}
							currentChannelsSort={this.state.currentChannelsSort}
							channelsHasNextPage={this.props.channelsHasNextPage}
							channelsIsLoading={this.props.channelsIsLoading}
							items={this.props.channels}
							incrementPage={() => {
								if (!this.props.channelsIsLoading) {
									this.setState(
										(prevState) => {
											return {
												currentPage: prevState.currentPage + 1
											}
										},
										() => {
											this.fetchChannelsFunction()
										}
									)
								}
							}}
							handleActionButtonClick={this.handleActionButtonClick}
							handleVideosClick={this.handleVideosClick}
							visibleChannelColumns={this.props.visibleChannelColumns}
							setVisibleChannelColumns={this.props.setVisibleChannelColumns}
						/>
					)}

					{!this.state.viewingChannels && (
						<VideosTable
							tableHeight={this.tableHeight}
							setVisibleVideoColumns={this.props.setVisibleVideoColumns}
							currentVideosSort={this.state.currentVideosSort}
							setCurrentVideosSort={this.setCurrentVideosSort}
							videos={this.props.videos}
							videosIsLoading={this.props.videosIsLoading}
							visibleVideoColumns={this.props.visibleVideoColumns}
							handleActionButtonClick={this.handleActionButtonClick}
							incrementPage={() => {
								if (!this.props.videosIsLoading) {
									this.setState(
										(prevState) => {
											return {
												currentVideosPage: prevState.currentVideosPage + 1
											}
										},
										() => {
											this.fetchVideosFunction()
										}
									)
								}
							}}
						/>
					)}

					<ChannelVideosModal
						tableHeight={this.tableHeight - 400}
						visibleVideoColumns={this.props.visibleVideoColumns}
						setVisibleVideoColumns={this.props.setVisibleVideoColumns}
						currentVideosSort={this.state.currentChannelVideosSort}
						setCurrentVideosSort={this.setCurrentChannelVideosSort}
						show={this.state.showChannelVideosModal}
						close={this.handleChannelVideosModalClose}
						videos={this.props.channelVideos}
						incrementPage={() => {
							if (!this.props.videosIsLoading) {
								this.setState(
									(prevState) => {
										return {
											currentChannelVideosPage:
												prevState.currentChannelVideosPage + 1
										}
									},
									() => {
										this.fetchChannelVideosFunction()
									}
								)
							}
						}}
						handleActionButtonClick={this.handleActionButtonClick}
						channel={this.state.viewingVideosForChannel}
						videosIsLoading={this.props.videosIsLoading}
					/>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder)
