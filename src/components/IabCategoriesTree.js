import React from 'react'
import { connect } from 'react-redux'
import '../views/Engage/Lists/ListBuilder/components/listbuilder.css'
import Icon from 'rsuite/lib/Icon'
import Input from 'rsuite/lib/Input'
import Tree from 'rsuite/lib/Tree'
import Grid from '@material-ui/core/Grid'
import Button from 'rsuite/lib/Button'
import InputGroup from 'rsuite/lib/InputGroup'
import lodashFilter from 'lodash/filter'
import lodashIncludes from 'lodash/includes'
import lodashToLower from 'lodash/toLower'
import lodashIsEmpty from 'lodash/isEmpty'
import { listActions } from '../views/Engage/Lists/constants'
import toast from 'react-hot-toast'
import { iabCategoriesFilter, iabIds } from '../staticData/iabCategories'
import { accentColor, neutralColor } from '../assets/jss/colorContants'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import { patchBrandProfileIabCategories } from '../redux/actions/brandProfiles'
const filterSpacing = 1

const mapStateToProps = (state) => {
	return {
		brandProfile: state.brandProfileUnderEdit
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		patchBrandProfileIabCategories: (params) =>
			dispatch(patchBrandProfileIabCategories(params))
	}
}

function IabCategoriesTree(props) {
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
		let newCopy = JSON.parse(JSON.stringify(copy))
		let formatted = formatForApi(newCopy)
		let params = {
			iabCategories: formatted,
			brandProfileId: props.brandProfile.brandProfileId
		}
		props.patchBrandProfileIabCategories(params)
	}

	const formatForApi = (tree) => {
		//look through each item and if marked and has children then remove actionIds from all children
		for (const row of tree) {
			if (row.actionId && row.children) {
				for (const child of row.children) {
					child.actionId = null
				}
			}
		}

		for (const row of tree) {
			for (const child of row.children) {
				if (child.actionId && child.children) {
					for (const gChild of child.children) {
						gChild.actionId = null
					}
				}
			}
		}

		for (const row of tree) {
			for (const child of row.children) {
				if (child.children) {
					for (const gChild of child.children) {
						if (gChild.actionId && gChild.children) {
							for (const ggChild of gChild.children) {
								ggChild.actionId = null
							}
						}
					}
				}
			}
		}

		return tree
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

	const getActionsForEndpoint = () => {
		let iabTaxonomyCopy = JSON.parse(JSON.stringify(iabTaxonomy))
		let actions = []
		for (const item of iabTaxonomyCopy) {
			if (item.actionId) {
				//actions.push({ taxonomyId: item.id, actionId: item.actionId })
				if (item.children) {
					for (const child of item.children) {
						child.actionId = null
						if (child.children) {
						}
					}
				}
			}
			if (item.children) {
				for (const child of item.children) {
					if (child.actionId) {
						actions.push({ taxonomyId: child.id, actionId: child.actionId })
						if (child.children) {
							delete child.children
						}
					}
					if (child.children) {
						for (const gChild of child.children) {
							if (gChild.actionId) {
								actions.push({
									taxonomyId: gChild.id,
									actionId: gChild.actionId
								})
								if (gChild.children) {
									delete gChild.children
								}
							}
							if (gChild.children) {
								for (const ggChild of gChild.children) {
									if (ggChild.actionId) {
										actions.push({
											taxonomyId: ggChild.id,
											actionId: ggChild.actionId
										})
										if (ggChild.children) {
											delete ggChild.children
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return actions
	}

	const handleApplyBulkActionClick = () => {
		let actions = getActionsForEndpoint()

		if (actions.length < 1) {
			toast.error('Please make at least one selection and try again.')
			return
		}
		let params = {
			brandProfileId: props.brandProfileId,
			iabCategories: actions
		}

		console.log('starting save')
		//props.postVersionBulkAction(params)
	}

	return (
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
								<div style={{ textAlign: 'left', flex: 1, color: 'black' }}>
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
													item.actionId === listActions.target.actionId
														? accentColor
														: '',
												color:
													item.actionId === listActions.target.actionId
														? neutralColor
														: ''
											}}
											onClick={() => {
												handleActionButtonClick(
													listActions.target.actionId,
													item
												)
											}}
										>
											Target
										</Button>

										<Button
											appearance={'ghost'}
											//active={rowData.actionId === 2}
											style={{
												backgroundColor:
													item.actionId === listActions.block.actionId
														? accentColor
														: '',
												color:
													item.actionId === listActions.block.actionId
														? neutralColor
														: ''
											}}
											onClick={() => {
												handleActionButtonClick(
													listActions.block.actionId,
													item
												)
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
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(IabCategoriesTree)
