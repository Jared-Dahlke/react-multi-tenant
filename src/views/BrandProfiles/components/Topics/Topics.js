import React from 'react'
import TreePicker from 'rsuite/lib/TreePicker'
import CheckTreePicker from 'rsuite/lib/CheckTreePicker'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import Tree from 'rsuite/lib/Tree'
import InputGroup from 'rsuite/lib/InputGroup'
import Input from 'rsuite/lib/Input'
import Icon from 'rsuite/lib/Icon'
import debounce from 'just-debounce-it'
import Grid from '@material-ui/core/Grid'
import Tag from 'rsuite/lib/Tag'
import TagGroup from 'rsuite/lib/TagGroup'
import CheckTree from 'rsuite/lib/CheckTree'
import { brandTopicsActionSelect } from '../../../../redux/actions/brandProfiles'
import { connect } from 'react-redux'

const styles = {
	marginBottom: 10
}

const mapDispatchToProps = (dispatch) => {
	return {
		brandTopicsActionSelect: (data) => dispatch(brandTopicsActionSelect(data))
	}
}

const CustomInputGroup = ({ placeholder, ...props }) => {
	const [word, setWord] = React.useState('')

	//const handleSetWord = (val) => {
	//		const oldWord = JSON.parse(JSON.stringify(word))
	//	setWord(val)
	//	if (val.length < oldWord.length) {
	//			props.executeSearch(val)
	//		}
	// }

	const handleSet = (val) => {
		setWord(val)
		handleSetWord(val)
	}

	const handleSetWord = debounce((val) => {
		//setWord(val)
		props.executeSearch(val)
	}, 1000)

	return (
		<InputGroup {...props} style={styles}>
			<Input
				size='sm'
				placeholder={placeholder}
				value={word}
				onChange={(val) => handleSet(val)}
				onFocus={console.log('focused')}
			/>
			<InputGroup.Addon>
				<Button size='xs' onClick={() => props.executeSearch(word)}>
					Search
				</Button>
			</InputGroup.Addon>
		</InputGroup>
	)
}

const Node = (props) => {
	//	console.log('tree node props:')
	//	console.log(props)
	const _props = props.props
	return (
		<div style={{ display: 'flex', width: '700px' }}>
			<div style={{ flex: 1 }}>{_props.topicName}</div>
			<div style={{ flex: 1 }}>
				<ButtonGroup size='xs'>
					<Button
						key='0'
						id='0'
						onClick={(e) => {
							props.handleActionSelect(
								_props.topicId,
								'Include',
								_props.topicName
							)
						}}
						color={_props.responseId == 'Include' ? 'green' : 'blue'}
					>
						Include
					</Button>
					<Button
						id='test'
						key='1'
						onClick={(e) => {
							props.handleActionSelect(
								_props.topicId,
								'Exclude',
								_props.topicName
							)
						}}
						color={_props.responseId == 'Exclude' ? 'red' : 'blue'}
					>
						Exclude
					</Button>
					<Button
						id='asdf'
						key='2'
						onClick={(e) => {
							props.handleActionSelect(
								_props.topicId,
								'NoAction',
								_props.topicName
							)
						}}
						color={_props.responseId == 'NoAction' ? 'yellow' : 'blue'}
					>
						No Action
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
}
const Value = (selectedNames) => {
	//	return JSON.stringify(selectedNames)
	if (selectedNames && selectedNames.length > 0) {
		let res = ''
		for (const name of selectedNames) {
			res = res + name
		}
		return res
	} else {
		return ''
	}
}

function Topics(props) {
	const [searching, setSearching] = React.useState(false)
	const [searchWord, setSearchWord] = React.useState('')
	const [selectedNames, setSelectedNames] = React.useState([])

	const handleActionSelect = (topicId, value, topicName) => {
		console.log('handle actions select')
		console.log(topicId)
		console.log(value)
		//console.log(topicId, action, topicName)
		let data = { topicId: topicId, value: value }
		props.brandTopicsActionSelect(data)
		let oldNames = JSON.parse(JSON.stringify(selectedNames))
		oldNames.push(data.topicName)
		setSelectedNames(oldNames)
	}

	return (
		<div>
			{props.topics && props.topics.length > 0 ? (
				<div>
					<CheckTreePicker
						data={props.topics}
						style={{ width: 1000 }}
						name='topics'
						labelKey='topicName'
						valueKey='topicId'
						placeholder={'Select one or more Topics'}
						//	value={'test'}
						//onChange={(e, v) => handleSelect(e, v)}
						cleanable={true}
						//	disabled

						virtualized={searchWord.length < 2}
						open={true}
						disabledItemValues={props.allValues}
						expandItemValues={
							searching ? props.allValues : props.expandedTopicKeys
						}
						onExpand={(expandedKeys) => {
							console.log('expand')
							console.log(expandedKeys)
							props.updateExpandedKeys(expandedKeys)
						}}
						onSearch={(val, event) => {
							event.preventDefault()
							if (!searching) setSearching(true)
						}}
						renderTreeNode={(props) => {
							return (
								<Node props={props} handleActionSelect={handleActionSelect} />
							)
						}}
						uncheckableItemValues={props.allValues}
						//renderValue={() => {
						//	return <Value selectedNames={selectedNames} />
						//	}}
						//		uncheckableItemValues={props.allValues}
						//	value={['3']}
						// renderTreeIcon={(props) => {
						//	return <div></div>
						//}}
					/>
				</div>
			) : null}
			}
		</div>
	)
}

export default connect(null, mapDispatchToProps)(Topics)

/**<TreePicker
					data={props.topics}
					style={{ width: 1000 }}
					name='topics'
					labelKey='topicName'
					valueKey='topicId'
					//value={currentAccount.accountId}
					//onChange={(e, v) => handleSelect(e, v)}
					cleanable={false}
					virtualized={true}
					open={true}
					disabledItemValues={props.allValues}
					expandItemValues={searching ? props.allValues : []}
					onSearch={(val, event) => {
						event.preventDefault()
						if (!searching) setSearching(true)
					}}
					renderTreeNode={(props) => {
						return <Node props={props} />
					}}
        />
        
        
       <div>
					<CustomInputGroup
						searchWordHolder={searchWordHolder}
						executeSearch={executeSearch}
					/>
					<Tree
						data={props.topics}
						style={{ width: 1000 }}
						name='topics'
						labelKey='topicName'
						valueKey='topicId'
						virtualized={true}
						disabledItemValues={props.allValues}
						searchKeyword={searchWord}
						expandItemValues={searching ? props.allValues : null}
						//	expandAll={searching}
						renderTreeNode={(props) => {
							return <Node props={props} />
						}}
					/>
        </div>
        
        
        
        
        
        <CheckTreePicker
					data={props.topics}
					style={{ width: '50%' }}
					name='topics'
					labelKey='topicName'
					valueKey='topicId'
					//value={currentAccount.accountId}
					//onChange={(e, v) => handleSelect(e, v)}
					//cleanable={false}
					virtualized={true}
					//open={true}
					//disabledItemValues={props.allValues}
					//	expandItemValues={searching ? props.allValues : []}
					onSearch={(val, event) => {
						//	event.preventDefault()
						if (!searching) setSearching(true)
					}}
					renderTreeNode={(props) => {
						return <Node props={props} />
					}}
					renderTreeIcon={(props) => {
						return <div></div>
					}}
					cascade={false}
        />
        
        
        
        
        <CheckTreePicker
						data={props.topics}
						style={{ width: 1000 }}
						name='topics'
						labelKey='topicName'
						valueKey='topicId'
						placeholder={'Select one or more Topics'}
						//value={'test'}
						//onChange={(e, v) => handleSelect(e, v)}
						cleanable={true}
						virtualized={searchWord.length < 2}
						//	open={true}
						disabledItemValues={props.allValues}
						expandItemValues={
							searching ? props.allValues : props.expandedTopicKeys
						}
						onExpand={(expandedKeys) => {
							console.log('expand')
							console.log(expandedKeys)
							props.updateExpandedKeys(expandedKeys)
						}}
						onSearch={(val, event) => {
							event.preventDefault()
							if (!searching) setSearching(true)
						}}
						renderTreeNode={(props) => {
							return <Node props={props} />
						}}
						//		uncheckableItemValues={props.allValues}
						value={[3, 4]}
          />


          	<TagGroup>
							<Tag>Text</Tag>
							<Tag closable>Closable</Tag>
							<Tag>
								<a target='_blank' href='http://www.hypers.com'>
									Link
								</a>
							</Tag>
						</TagGroup>
          
          
          */
