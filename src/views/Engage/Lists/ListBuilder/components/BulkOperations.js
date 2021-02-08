import React from 'react'
import './listbuilder.css'
import Icon from 'rsuite/lib/Icon'
import Input from 'rsuite/lib/Input'
import Tree from 'rsuite/lib/Tree'
import Grid from '@material-ui/core/Grid'
import CustomPanel from '../../../../../components/CustomPanel'
import Button from 'rsuite/lib/Button'
import InputGroup from 'rsuite/lib/InputGroup'
import lodashFilter from 'lodash/filter'
import lodashIncludes from 'lodash/includes'
import lodashToLower from 'lodash/toLower'
import lodashIsEmpty from 'lodash/isEmpty'

import {
	iabCategoriesFilter,
	iabIds
} from '../../../../../staticData/iabCategories'
import {
	accentColor,
	neutralColor
} from '../../../../../assets/jss/colorContants'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
const filterSpacing = 1

export const BulkOperations = ({
	expand,
	handleToggle,
	filterState,
	handleApplyFiltersButtonClick,
	handleFilterChange,
	filters
}) => {
	const [search, setSearch] = React.useState('')
	const [iabTaxonomy, setIabTaxonomy] = React.useState(iabCategoriesFilter)
	const filterTree = (filter, list) => {
		if (search.length < 1) {
			return iabTaxonomy
		}
		return lodashFilter(list, (item) => {
			if (lodashIncludes(lodashToLower(item.name), lodashToLower(filter))) {
				return true
			} else if (item.children) {
				item.children = filterTree(filter, item.children)
				return !lodashIsEmpty(item.children)
			}
		})
	}

	const [expandAll, setExpandAll] = React.useState(false)

	const getTreeNodeById = (tree, id) => {
		for (const item of tree) {
			if (item.id == id) return item
			if (item.children) {
				for (const child of item.children) {
					if (child.id == id) return child
					if (child.children) {
						for (const gChild of child.children) {
							if (gChild.id == id) return gChild
							if (gChild.children) {
								for (const ggChild of gChild.children) {
									if (ggChild.id == id) return ggChild
									if (ggChild.children) {
										for (const gggChild of ggChild.children) {
											if (gggChild.id == id) return gggChild
											if (gggChild.children) {
												for (const ggggChild of gggChild.children) {
													if (ggggChild.id == id) return ggggChild
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	const markAllChildren = (node, actionId) => {
		node.actionId = actionId
		if (node.children) {
			for (const child of node.children) {
				markAllChildren(child, actionId)
			}
		}
	}

	const addressParent = (node, actionId, tree) => {
		let parent = getTreeNodeById(tree, node.parentId)
		if (parent) {
			if (parent.actionId != actionId) {
				parent.actionId = null
			}
			let sibActionId = parent.children[0].actionId
			let childrenAllSame = true
			for (const sib of parent.children) {
				// if all children are the same then mark parent
				if (sib.actionId != sibActionId) {
					childrenAllSame = false
				}
			}
			if (childrenAllSame) {
				parent.actionId = sibActionId
			}
		}
	}

	const addressGrandParent = (node, actionId, tree) => {
		let parent = getTreeNodeById(tree, node.parentId)
		if (parent) {
			let grandParent = getTreeNodeById(tree, parent.parentId)
			if (grandParent) {
				if (grandParent.actionId != actionId) {
					grandParent.actionId = null
				}
				let sibActionId = grandParent.children[0].actionId
				let childrenAllSame = true
				for (const sib of grandParent.children) {
					// if all children are the same then mark parent
					if (sib.actionId != sibActionId) {
						childrenAllSame = false
					}
				}
				if (childrenAllSame) {
					grandParent.actionId = sibActionId
				}
			}
		}
	}

	const addressGreatGrandParent = (node, actionId, tree) => {
		let parent = getTreeNodeById(tree, node.parentId)
		if (parent) {
			let grandParent = getTreeNodeById(tree, parent.parentId)
			if (grandParent) {
				let greatGrandParent = getTreeNodeById(tree, grandParent.parentId)
				if (greatGrandParent) {
					if (greatGrandParent.actionId != actionId) {
						greatGrandParent.actionId = null
					}
					let sibActionId = greatGrandParent.children[0].actionId
					let childrenAllSame = true
					for (const sib of greatGrandParent.children) {
						// if all children are the same then mark parent
						if (sib.actionId != sibActionId) {
							childrenAllSame = false
						}
					}
					if (childrenAllSame) {
						greatGrandParent.actionId = sibActionId
					}
				}
			}
		}
	}

	const handleActionButtonClick = (actionId, item) => {
		let copy = JSON.parse(JSON.stringify(iabTaxonomy))
		let node = getTreeNodeById(copy, item.id)
		if (node.actionId == actionId) {
			actionId = null
		}
		node.actionId = actionId
		markAllChildren(node, actionId)
		addressParent(node, actionId, copy)
		addressGrandParent(node, actionId, copy)
		addressGreatGrandParent(node, actionId, copy)
		setIabTaxonomy(copy)
	}

	let fin = React.useMemo(() => {
		let iabTaxCopy = JSON.parse(JSON.stringify(iabTaxonomy))
		if (search.length < 1) {
			setExpandAll(false)
			return iabTaxonomy
		} else {
			setExpandAll(true)
			return filterTree(search, iabTaxCopy)
		}
	}, [search, iabTaxonomy])

	return (
		<CustomPanel header='IAB Categories'>
			<Grid container spacing={filterSpacing}>
				<Grid item xs={12}>
					<InputGroup>
						<Input value={search} onChange={(val) => setSearch(val)} />

						<InputGroup.Button
							onClick={() => {}}
							style={{ backgroundColor: 'transparent' }}
						>
							<Icon style={{ color: '#0092d1' }} icon='search' />
						</InputGroup.Button>
					</InputGroup>

					<Tree
						height={500}
						expandAll={expandAll}
						placement='bottomStart'
						virtualized={true}
						defaultExpandAll={false}
						data={fin}
						labelKey={'name'}
						valueKey={'id'}
						block
						disabledItemValues={iabIds}
						renderTreeNode={(item) => {
							return (
								<div style={{ display: 'flex', width: '100%' }}>
									<div style={{ textAlign: 'left', flex: 1 }}>
										{item.name + ' ' + item.id}
									</div>

									<div
										style={{
											textAlign: 'right',
											dispay: 'flex',
											alignItems: 'right',
											alignContent: 'right'
										}}
									>
										<ButtonGroup vertical={false} size='xs'>
											<Button
												appearance={'ghost'}
												//	active={rowData.actionId === 1}
												style={{
													backgroundColor:
														item.actionId === 1 ? accentColor : '',
													color: item.actionId === 1 ? neutralColor : ''
												}}
												onClick={() => {
													handleActionButtonClick(1, item)
												}}
											>
												Target
											</Button>
											<Button
												appearance={'ghost'}
												//	active={rowData.actionId === 3}
												style={{
													backgroundColor:
														item.actionId === 3 ? accentColor : '',
													color: item.actionId === 3 ? neutralColor : ''
												}}
												onClick={() => {
													handleActionButtonClick(3, item)
												}}
											>
												Watch
											</Button>
											<Button
												appearance={'ghost'}
												//active={rowData.actionId === 2}
												style={{
													backgroundColor:
														item.actionId === 2 ? accentColor : '',
													color: item.actionId === 2 ? neutralColor : ''
												}}
												onClick={() => {
													handleActionButtonClick(2, item)
												}}
											>
												Block
											</Button>
										</ButtonGroup>
									</div>
								</div>
							)
						}}
					/>
				</Grid>
			</Grid>
		</CustomPanel>
	)
}
