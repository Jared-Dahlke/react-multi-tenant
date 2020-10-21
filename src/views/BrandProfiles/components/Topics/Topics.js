import React from 'react'
import CheckTreePicker from 'rsuite/lib/CheckTreePicker'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Button from 'rsuite/lib/Button'
import { brandTopicsActionSelect } from '../../../../redux/actions/brandProfiles'
import { connect } from 'react-redux'
import FormHelperText from '@material-ui/core/FormHelperText'
import { dangerColor } from '../../../../assets/jss/material-dashboard-react'

const mapDispatchToProps = (dispatch) => {
	return {
		brandTopicsActionSelect: (data) => dispatch(brandTopicsActionSelect(data))
	}
}

const Node = (props) => {
	const _props = props.props

	const handleClick = (e, val) => {
		e.preventDefault()
		props.handleActionSelect(_props.topicId, val)
	}

	return (
		<div style={{ display: 'flex', width: '700px' }}>
			<div style={{ flex: 1 }}>{_props.topicName}</div>
			<div style={{ flex: 1 }}>
				<ButtonGroup size='xs'>
					<Button
						key='0'
						id='0'
						onClick={(e) => handleClick(e, 1)}
						color={_props.topicResponseId == 1 ? 'green' : 'blue'}
					>
						Include
					</Button>
					<Button
						id='test'
						key='1'
						onClick={(e) => handleClick(e, 2)}
						color={_props.topicResponseId == 2 ? 'red' : 'blue'}
					>
						Exclude
					</Button>

					<Button
						id='asdf'
						key='2'
						onClick={(e) => handleClick(e, 3)}
						color={_props.topicResponseId == 3 ? 'yellow' : 'blue'}
					>
						No Action
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
}

function Topics(props) {
	const [searching, setSearching] = React.useState(false)
	const [searchWord, setSearchWord] = React.useState('')

	const handleActionSelect = (topicId, value) => {
		let data = { topicId: topicId, value: value }
		props.brandTopicsActionSelect(data)
	}

	React.useEffect(() => {
		props.setFieldValue('topics', props.topics)
	}, [props.topics])

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{props.topics && props.topics.length > 0 ? (
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
						data={props.topics}
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
						renderTreeNode={(props) => {
							return (
								<Node props={props} handleActionSelect={handleActionSelect} />
							)
						}}
						uncheckableItemValues={props.allValues}
					/>
				</div>
			) : null}
		</div>
	)
}

export default connect(null, mapDispatchToProps)(Topics)
