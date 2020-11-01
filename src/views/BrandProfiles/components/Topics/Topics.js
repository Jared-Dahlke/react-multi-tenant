import React from 'react'
import debounce from 'just-debounce-it'
import Input from 'rsuite/lib/Input'
import Tree from 'rsuite/lib/Tree'
import * as _ from 'lodash'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import {
	dangerColor,
	whiteColor
} from '../../../../assets/jss/material-dashboard-react'
import { perms, userCan } from '../../../../Can'

const Node = (props) => {
	console.log('node props')
	console.log(props)
	const nodeProps = props.nodeProps

	const handleClick = (e, val) => {
		e.preventDefault()
		let newTopics = JSON.parse(JSON.stringify(props.formikValues.topics))
		setTopicAction(nodeProps.topicId, val, newTopics)
		props.setFieldValue('topics', newTopics)
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
			if (topic.children && topic.children.length > 0)
				markAllChildren(topic, value)
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

export default class AsynExample extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			dataCopy: [],
			values: [],
			loadingValues: [],
			count: 0,
			searched: false,
			searching: false,
			searchTerm: '',
			expandedValues: []
		}
	}

	handleExpand(val) {
		this.setState({ expandedValues: val })
	}

	filterTree = (filter, list) => {
		return _.filter(list, (item) => {
			if (_.includes(_.toLower(item.topicName), _.toLower(filter))) {
				return true
			} else if (item.children) {
				item.children = this.filterTree(filter, item.children)
				return !_.isEmpty(item.children)
			}
		})
	}

	handleSearch(val) {
		this.setState({ searchTerm: val }, () => {
			this.fn1()
		})
	}

	getValues(topics) {
		let tab = []

		for (const topic of topics) {
			tab.push(topic.topicId)

			if (topic.children && topic.children.length > 0) {
				tab = tab.concat(this.getValues(topic.children))
			}
		}
		return tab
	}

	fn1 = debounce(() => {
		if (this.state.searchTerm.length > 1) {
			this.setState({ searching: true })
		} else {
			this.setState({ searching: false })
		}

		console.log('inside debounce')
		let copyTopics2 = JSON.parse(JSON.stringify(this.props.formikValues.topics))
		let end = this.filterTree(this.state.searchTerm, copyTopics2)
		if (this.state.searchTerm.length > 0) {
			let vals = this.getValues(end)
			this.setState({ expandedValues: vals })
		} else {
			this.setState({ expandedValues: [] })
		}

		this.props.updateTopics(end)
	}, 800)

	render() {
		return (
			<div>
				<Input
					value={this.state.searchTerm}
					onChange={(val) => this.handleSearch(val)}
				/>
				<Tree
					name='topics'
					labelKey='topicName'
					valueKey='topicId'
					placeholder={'Select one or more Topics'}
					data={this.props.treeTopics}
					virtualized={true}
					searchable={false}
					expandItemValues={this.state.expandedValues}
					onExpand={(val) => this.handleExpand(val)}
					disabledItemValues={this.props.allValues}
					renderTreeNode={(nodeProps) => {
						return (
							<Node
								nodeProps={nodeProps}
								formikValues={this.props.formikValues}
								setFieldValue={this.props.setFieldValue}
							/>
						)
					}}
				/>
			</div>
		)
	}
}
