import React from 'react'
import debounce from 'just-debounce-it'
import Input from 'rsuite/lib/Input'
import Tree from 'rsuite/lib/Tree'
import lodashFilter from 'lodash/filter'
import lodashIncludes from 'lodash/includes'
import lodashToLower from 'lodash/toLower'
import lodashIsEmpty from 'lodash/isEmpty'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import { perms, userCan } from '../../../../Can'
import InputGroup from 'rsuite/lib/InputGroup'
import Icon from 'rsuite/lib/Icon'
import Panel from '../../../../components/CustomPanel'

import { connect } from 'react-redux'
import {
	patchBrandProfileTopics,
	fetchBrandProfileTopics,
	setBrandProfiles
} from '../../../../redux/actions/brandProfiles'

const mapStateToProps = (state) => {
	return {
		currentAccountId: state.currentAccountId,
		brandProfiles: state.brandProfiles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileTopics: (data) => dispatch(patchBrandProfileTopics(data)),
		fetchBrandProfileTopics: (data) => dispatch(fetchBrandProfileTopics(data)),
		setBrandProfiles: (brandProfiles) =>
			dispatch(setBrandProfiles(brandProfiles))
	}
}

const Node = (props) => {
	const nodeProps = props.nodeProps

	const handleClick = (e, topicId, oldVal, newValProposed) => {
		e.preventDefault()
		props.setTopicsValid(true)
		let newTopics = JSON.parse(JSON.stringify(props.componentTopics))
		setTopicAction(nodeProps.topicId, newValProposed, newTopics)
		props.handleSetBrandProfiles(newTopics)
		props.setComponentTopics(newTopics)
		let newVal = getNewTopicsVal(newValProposed, nodeProps.topicResponseId)
		let params = {
			topics: [
				{
					topicId: nodeProps.topicId,
					topicResponseId: newVal
				}
			],
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileTopics(params)
		//get filtered if any then set displayed
		let copiedTopics = JSON.parse(JSON.stringify(newTopics))
		if (props.searchTerm && props.searchTerm.length > 0) {
			copiedTopics = filterTree(props.searchTerm, copiedTopics)
		}
		props.setDisplayedTopics(copiedTopics)
	}
	function getNewTopicsVal(newValProposed, oldVal) {
		console.log('get new topics val')
		console.log(newValProposed, oldVal)
		if (newValProposed == oldVal) return -1
		return newValProposed
	}

	function setTopicAction(topicId, value, topics) {
		for (const topic of topics) {
			markSelected(topicId, value, topic)
		}
	}

	function markSelected(topicId, value, topic) {
		if (topic.topicId == topicId) {
			if (topic.topicResponseId === value) {
				value = -1
			}
			topic.topicResponseId = value
		} else {
			if (topic.children && topic.children.length > 0) {
				for (const child of topic.children) {
					markSelected(topicId, value, child)
				}
			}
		}
	}

	return (
		<div style={{ display: 'flex', width: '700px' }}>
			<div style={{ flex: 1 }}>{nodeProps.topicName}</div>
			<div style={{ flex: 1 }}>
				<ButtonGroup size='xs'>
					<Button
						disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
						key='0'
						id='0'
						onClick={(e) =>
							handleClick(e, nodeProps.topicId, nodeProps.topicResponseId, 1)
						}
						color={nodeProps.topicResponseId == 1 ? 'green' : 'blue'}
					>
						Include
					</Button>
					<Button
						disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
						id='test'
						key='1'
						onClick={(e) =>
							handleClick(e, nodeProps.topicId, nodeProps.topicResponseId, 2)
						}
						color={nodeProps.topicResponseId == 2 ? 'red' : 'blue'}
					>
						Exclude
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
}

const filterTree = (filter, list) => {
	return lodashFilter(list, (item) => {
		if (lodashIncludes(lodashToLower(item.topicName), lodashToLower(filter))) {
			return true
		} else if (item.children) {
			item.children = filterTree(filter, item.children)
			return !lodashIsEmpty(item.children)
		}
	})
}

function TopicsTree(props) {
	const [fetched, setFetched] = React.useState(false)
	React.useEffect(() => {
		if (!fetched) {
			if (props.brandProfile && props.brandProfile.brandProfileId) {
				props.fetchBrandProfileTopics(props.brandProfile.brandProfileId)
				setFetched(true)
			}
		}
	}, [props.brandProfile])

	const [searchTerm, setSearchTerm] = React.useState('')
	const [receivedTopics, setReceivedTopics] = React.useState(false)
	const [allTopicIds, setAllTopicIds] = React.useState([])
	const [componentTopics, setComponentTopics] = React.useState(
		props.brandProfile.topics
	)
	const [displayedTopics, setDisplayedTopics] = React.useState(componentTopics)

	React.useEffect(() => {
		if (props.brandProfile.topics && props.brandProfile.topics.length > 0) {
			setComponentTopics(props.brandProfile.topics)
		}
	}, [props.brandProfile.topics])

	React.useEffect(() => {
		executeSearch()
	}, [searchTerm])

	const executeSearch = debounce(() => {
		if (!componentTopics) return
		let copyTopics2 = JSON.parse(JSON.stringify(componentTopics))
		let end = filterTree(searchTerm, copyTopics2)
		if (searchTerm.length > 0) {
			let vals = getValues(end)
			setExpandedValues(vals)
		} else {
			setExpandedValues([])
		}

		setDisplayedTopics(end)
	}, 800)

	React.useEffect(() => {
		if (componentTopics && componentTopics.length > 0 && !receivedTopics) {
			setDisplayedTopics(componentTopics)
			setReceivedTopics(true)
			setAllTopicIds(getTopicValues(componentTopics))
		}
	}, [componentTopics])

	React.useEffect(() => {
		return () => {
			//clean up on unmount
			setReceivedTopics(false)
		}
	}, [])

	function getTopicValues(topics) {
		let tab = []

		for (const topic of topics) {
			tab.push(topic.topicId)

			if (topic.children && topic.children.length > 0) {
				tab = tab.concat(getTopicValues(topic.children))
			}
		}
		return tab
	}

	const [expandedValues, setExpandedValues] = React.useState([])

	const getValues = (topics) => {
		let tab = []
		for (const topic of topics) {
			tab.push(topic.topicId)

			if (topic.children && topic.children.length > 0) {
				tab = tab.concat(getValues(topic.children))
			}
		}
		return tab
	}

	const handleSetBrandProfiles = (topics) => {
		let brandProfilesCopy = JSON.parse(JSON.stringify(props.brandProfiles))
		for (const brandProfile of brandProfilesCopy) {
			if (brandProfile.brandProfileId === props.brandProfile.brandProfileId) {
				brandProfile.topics = topics
			}
		}
		props.setBrandProfiles(brandProfilesCopy)
	}

	const handleUnselectAll = () => {
		let newTopics = JSON.parse(JSON.stringify(componentTopics))
		unselectAll(newTopics)
		handleSetBrandProfiles(newTopics)
		//props.setFieldValue('topics', newTopics)

		//get filtered if any then set displayed
		let copiedTopics = JSON.parse(JSON.stringify(newTopics))
		if (props.searchTerm && props.searchTerm.length > 0) {
			copiedTopics = filterTree(props.searchTerm, copiedTopics)
		}
		setDisplayedTopics(copiedTopics)

		let params = {
			topics: JSON.parse(JSON.stringify(newTopics)),
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileTopics(params)
	}

	function unselectAll(topics) {
		for (const topic of topics) {
			topic.topicResponseId = -1
			if (topic.children && topic.children.length > 0) {
				unselectAll(topic.children)
			}
		}
	}

	return (
		<Panel bordered header='Topics'>
			<InputGroup>
				<InputGroup.Addon>
					<Icon icon='search' />
				</InputGroup.Addon>
				<Input value={searchTerm} onChange={(val) => setSearchTerm(val)} />
			</InputGroup>

			<Tree
				name='topics'
				labelKey='topicName'
				valueKey='topicId'
				placeholder={'Select one or more Topics'}
				data={displayedTopics}
				virtualized={true}
				searchable={false}
				expandItemValues={expandedValues}
				onExpand={(val) => setExpandedValues(val)}
				disabledItemValues={allTopicIds}
				renderTreeNode={(nodeProps) => {
					return (
						<Node
							brandProfile={props.brandProfile}
							patchBrandProfileTopics={props.patchBrandProfileTopics}
							brandProfileIdUnderEdit={props.brandProfileIdUnderEdit}
							nodeProps={nodeProps}
							componentTopics={componentTopics}
							setComponentTopics={setComponentTopics}
							setDisplayedTopics={setDisplayedTopics}
							searchTerm={searchTerm}
							setTopicsValid={props.setTopicsValid}
							handleSetBrandProfiles={handleSetBrandProfiles}
						/>
					)
				}}
			/>

			<Button
				size={'sm'}
				appearance='link'
				onClick={() => setExpandedValues([])}
				style={{ marginTop: 10 }}
			>
				Collapse All
			</Button>

			<Button
				size={'sm'}
				appearance='link'
				onClick={() => handleUnselectAll()}
				style={{ marginTop: 10 }}
			>
				Unselect All
			</Button>
		</Panel>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsTree)
