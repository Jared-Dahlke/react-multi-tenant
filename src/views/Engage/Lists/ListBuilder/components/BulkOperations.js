import React from 'react'
import './listbuilder.css'
import Sidebar from 'rsuite/lib/Sidebar'
import Icon from 'rsuite/lib/Icon'
import Input from 'rsuite/lib/Input'
import Tree from 'rsuite/lib/Tree'
import Grid from '@material-ui/core/Grid'
import { useSpring, animated } from 'react-spring'
import PanelGroup from 'rsuite/lib/PanelGroup'
import SelectPicker from 'rsuite/lib/SelectPicker'
import CustomPanel from '../../../../../components/CustomPanel'
import Button from 'rsuite/lib/Button'
import ArrowLeft from '@material-ui/icons/ArrowLeftSharp'
import ArrowRight from '@material-ui/icons/ArrowRightSharp'
import InputGroup from 'rsuite/lib/InputGroup'
import InputNumber from 'rsuite/lib/InputNumber'
import DateRangePicker from 'rsuite/lib/DateRangePicker'
import FiltersLabel from './FiltersLabel'
import Panel from 'rsuite/lib/Panel'
import TreePicker from 'rsuite/lib/TreePicker'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import lodashFilter from 'lodash/filter'
import lodashIncludes from 'lodash/includes'
import lodashToLower from 'lodash/toLower'
import lodashIsEmpty from 'lodash/isEmpty'

import {
	iabCategoriesFilter,
	iabIds
} from '../../../../../staticData/iabCategories'
import TagPicker from 'rsuite/lib/TagPicker'
import Checkbox from 'rsuite/lib/Checkbox'
import {
	youtubeCategories,
	countriesOptions,
	languagesOptions
} from '../../../../../staticData/data'
import { neutralLightColor } from '../../../../../assets/jss/colorContants'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import { getNodeText } from '@testing-library/react'
var dayjs = require('dayjs')
const filterSpacing = 1

const actionIdOptions = [
	{ label: 'View Targeted Items', actionIds: [1], id: 1 },
	{ label: 'View Blocked Items', actionIds: [2], id: 2 },
	{ label: 'View Watched Items', actionIds: [3], id: 3 },
	{
		label: 'View Targeted, Watched, and Blocked Items',
		actionIds: [1, 2, 3],
		id: 4
	},
	{ label: 'View All Items', actionIds: [], id: 5 }
]

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
	const [iabTaxonomyOrig, setIabTaxonomyOrig] = React.useState(
		iabCategoriesFilter
	)

	const filterTree = (filter, list) => {
		if (search.length < 1) {
			return iabTaxonomyOrig
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

	const [inSearch, setInSearch] = React.useState(false)

	const [selections, setSelections] = React.useState([])

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

	const addressParent = (node, actionId) => {
		//	let parent = getTreeNodeById()
	}

	React.useEffect(() => {
		if (search.length < 1) {
			//	setExpandAll(false)
		} else {
			//	setExpandAll(true)
		}
	}, [search])

	const handleActionButtonClick = (actionId, item) => {
		let copy = JSON.parse(JSON.stringify(iabTaxonomyOrig))
		let node = getTreeNodeById(copy, item.id)
		if (node.actionId == actionId) {
			actionId = null
		}
		node.actionId = actionId
		markAllChildren(node, actionId)
		addressParent(node, actionId)
		setIabTaxonomy(copy)
		setIabTaxonomyOrig(copy)
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
		<PanelGroup>
			<CustomPanel header='IAB Categories'>
				<Grid container spacing={filterSpacing}>
					<Grid item xs={12}>
						<InputGroup>
							<Input
								value={search}
								onChange={(val) => setSearch(val)}
								//	onFocus={() => setInSearch(true)}
								onBlur={() => setInSearch(false)}
								//	onMouseOut={() => setInSearch(false)}
								onMouseOver={() => setInSearch(true)}
							/>

							<InputGroup.Button
								onClick={() => {}}
								style={{ backgroundColor: 'transparent' }}
							>
								<Icon style={{ color: '#0092d1' }} icon='search' />
							</InputGroup.Button>
						</InputGroup>

						<Tree
							expandAll={expandAll}
							placement='bottomStart'
							size={'xs'}
							virtualized={true}
							defaultExpandAll={false}
							data={fin}
							labelKey={'name'}
							valueKey={'id'}
							block
							disabledItemValues={iabIds}
							//	searchKeyword={search}
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
														backgroundColor: item.actionId === 1 ? 'blue' : ''
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
														backgroundColor: item.actionId === 3 ? 'blue' : ''
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
														backgroundColor: item.actionId === 2 ? 'blue' : ''
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
		</PanelGroup>
	)
}
