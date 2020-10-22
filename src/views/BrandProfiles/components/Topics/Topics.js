import React from 'react'
import CheckTreePicker from 'rsuite/lib/CheckTreePicker'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor } from '../../../../assets/jss/material-dashboard-react'

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
	if (topic.topicId === topicId) {
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

const Node = (props) => {
	const nodeProps = props.nodeProps

	const handleClick = (e, val) => {
		e.preventDefault()
		let newTopics = JSON.parse(JSON.stringify(props.formikValues.topics))
		setTopicAction(nodeProps.topicId, val, newTopics)
		props.setFieldValue('topics', newTopics)
	}

	return (
		<div style={{ display: 'flex', width: '700px' }}>
			<div style={{ flex: 1 }}>{nodeProps.topicName}</div>
			<div style={{ flex: 1 }}>
				<ButtonGroup size='xs'>
					<Button
						key='0'
						id='0'
						onClick={(e) => handleClick(e, 1)}
						color={nodeProps.topicResponseId == 1 ? 'green' : 'blue'}
					>
						Include
					</Button>
					<Button
						id='test'
						key='1'
						onClick={(e) => handleClick(e, 2)}
						color={nodeProps.topicResponseId == 2 ? 'red' : 'blue'}
					>
						Exclude
					</Button>

					<Button
						id='asdf'
						key='2'
						onClick={(e) => handleClick(e, 3)}
						color={nodeProps.topicResponseId == 3 ? 'yellow' : 'blue'}
					>
						No Action
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
}

export default function Topics(props) {
	const [searching, setSearching] = React.useState(false)
	const [searchWord, setSearchWord] = React.useState('')

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{props.formikValues.topics && props.formikValues.topics.length > 0 ? (
				<div style={{ display: 'flex' }}>
					{props.errors.topics ? (
						<FormHelperText
							id='component-helper-text'
							style={{
								color: dangerColor[0],
								fontSize: '16px',
								position: 'absolute',
								bottom: -20
							}}
						>
							{props.errors.topics}
						</FormHelperText>
					) : null}
					<CheckTreePicker
						data={props.formikValues.topics}
						style={{
							minWidth: 800,
							maxWidth: 1000,
							flex: 1,
							visibility: 'hidden'
						}}
						name='topics'
						labelKey='topicName'
						valueKey='topicId'
						placeholder={'Select one or more Topics'}
						cleanable={true}
						menuStyle={{ marginTop: -20 }}
						virtualized={searchWord.length < 2}
						open={true}
						disabledItemValues={props.allValues}
						expandItemValues={
							searching ? props.allValues : props.expandedTopicKeys
						}
						onExpand={(expandedKeys) => {
							props.updateExpandedKeys(expandedKeys)
						}}
						onSearch={(val, event) => {
							event.preventDefault()
							if (!searching) setSearching(true)
						}}
						renderTreeNode={(nodeProps) => {
							return (
								<Node
									nodeProps={nodeProps}
									formikValues={props.formikValues}
									setFieldValue={props.setFieldValue}
								/>
							)
						}}
						uncheckableItemValues={props.allValues}
					/>
				</div>
			) : null}
		</div>
	)
}
