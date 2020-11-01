import React from 'react'
import debounce from 'just-debounce-it'
import Input from 'rsuite/lib/Input'
import Tree from 'rsuite/lib/Tree'
import * as _ from 'lodash'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import { perms, userCan } from '../../../../Can'
import InputGroup from 'rsuite/lib/InputGroup'
import Icon from 'rsuite/lib/Icon'
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor } from '../../../../assets/jss/material-dashboard-react'

const Node = (props) => {
	const nodeProps = props.nodeProps

	const handleClick = (e, val) => {
		e.preventDefault()
		let newTopics = JSON.parse(JSON.stringify(props.formikTopics))
		setTopicAction(nodeProps.topicId, val, newTopics)
		props.setFieldValue('topics', newTopics)

		//get filtered if any then set displayed
		let copiedTopics = JSON.parse(JSON.stringify(newTopics))
		if (props.searchTerm && props.searchTerm.length > 0) {
			copiedTopics = filterTree(props.searchTerm, copiedTopics)
		}
		props.setDisplayedTopics(copiedTopics)
	}

	function setTopicAction(topicId, value, topics) {
		for (const topic of topics) {
			markSelected(topicId, value, topic)
		}
	}

	function markSelected(topicId, value, topic) {
		if (topic.topicId == topicId) {
			if (topic.topicResponseId === value) {
				value = 3
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
						onClick={(e) => handleClick(e, 1)}
						color={nodeProps.topicResponseId == 1 ? 'green' : 'blue'}
					>
						Include
					</Button>
					<Button
						disabled={!userCan(perms.BRAND_PROFILE_UPDATE)}
						id='test'
						key='1'
						onClick={(e) => handleClick(e, 2)}
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
	return _.filter(list, (item) => {
		if (_.includes(_.toLower(item.topicName), _.toLower(filter))) {
			return true
		} else if (item.children) {
			item.children = filterTree(filter, item.children)
			return !_.isEmpty(item.children)
		}
	})
}

export default function TopicsTree(props) {
	const [searchTerm, setSearchTerm] = React.useState('')
	const [receivedTopics, setReceivedTopics] = React.useState(false)
	const [allTopicIds, setAllTopicIds] = React.useState([])
	const [displayedTopics, setDisplayedTopics] = React.useState(
		props.formikTopics
	)

	React.useEffect(() => {
		fn1()
	}, [searchTerm])

	const fn1 = debounce(() => {
		let copyTopics2 = JSON.parse(JSON.stringify(props.formikTopics))
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
		if (props.formikTopics.length > 0 && !receivedTopics) {
			setDisplayedTopics(props.formikTopics)
			setReceivedTopics(true)
			setAllTopicIds(getTopicValues(props.formikTopics))
		}
	}, [props.formikTopics])

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

	const handleUnselectAll = () => {
		let newTopics = JSON.parse(JSON.stringify(props.formikTopics))
		unselectAll(newTopics)
		props.setFieldValue('topics', newTopics)

		//get filtered if any then set displayed
		let copiedTopics = JSON.parse(JSON.stringify(newTopics))
		if (props.searchTerm && props.searchTerm.length > 0) {
			copiedTopics = filterTree(props.searchTerm, copiedTopics)
		}
		setDisplayedTopics(copiedTopics)
	}

	function unselectAll(topics) {
		for (const topic of topics) {
			topic.topicResponseId = 3
			if (topic.children && topic.children.length > 0) {
				unselectAll(topic.children)
			}
		}
	}

	return (
		<div>
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
							nodeProps={nodeProps}
							formikTopics={props.formikTopics}
							setFieldValue={props.setFieldValue}
							setDisplayedTopics={setDisplayedTopics}
							searchTerm={searchTerm}
						/>
					)
				}}
			/>

			<FormHelperText
				id='component-helper-text'
				style={{
					color: dangerColor[0]
				}}
			>
				{props.errors.topics ? props.errors.topics : ' '}
			</FormHelperText>

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
		</div>
	)
}
