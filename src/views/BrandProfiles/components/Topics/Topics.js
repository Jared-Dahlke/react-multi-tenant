import React from 'react'
import debounce from 'just-debounce-it'
import Input from 'rsuite/lib/Input'
import Tree from 'rsuite/lib/Tree'
import * as _ from 'lodash'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import { perms, userCan } from '../../../../Can'

const Node = (props) => {
	const nodeProps = props.nodeProps

	const handleClick = (e, val) => {
		e.preventDefault()
		let newTopics = JSON.parse(JSON.stringify(props.formikTopics))
		setTopicAction(nodeProps.topicId, val, newTopics)
		props.setFieldValue('topics', newTopics)
		props.setDisplayedTopics(newTopics)
	}

	function setTopicAction(topicId, value, topics) {
		for (const topic of topics) {
			markSelected(topicId, value, topic)
		}
	}

	function markAllChildren(topic, value) {
		for (const child of topic.children) {
			child.topicResponseId = value
			if (child.children && child.children.length > 0) {
				markAllChildren(child, value)
			}
		}
	}

	function markSelected(topicId, value, topic) {
		if (topic.topicId == topicId) {
			if (topic.topicResponseId === value) {
				value = 3
			}
			topic.topicResponseId = value
			// if (topic.children && topic.children.length > 0)
			//	markAllChildren(topic, value)
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

	return (
		<div>
			<Input value={searchTerm} onChange={(val) => setSearchTerm(val)} />
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
						/>
					)
				}}
			/>
		</div>
	)
}
