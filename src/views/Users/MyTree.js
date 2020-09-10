
import './index.less'
import React from 'react'
import Tree, { TreeNode } from 'rc-tree'
import GridList from '@material-ui/core/GridList'
import { gData, getRadioSelectKeys } from './dataUtils'
import "rc-tree/assets/index.css"
import Edit from "@material-ui/icons/Edit"
import {defaultFont, grayColor} from "../../assets/jss/material-dashboard-react"
import CustomInput from "../../components/CustomInput/CustomInput.js"
import Card from "../../components/Card/Card.js"
import CardBody from "../../components/Card/CardBody.js"
import CardHeader from "../../components/Card/CardHeader.js"
import { makeStyles } from "@material-ui/core/styles"
import { withStyles } from '@material-ui/core/styles'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  alignRight: {
    float: "right",
    
  },
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: .5,
    margin: .5,
  },
  chip: {
    margin: .5,
  },
}



class Demo extends React.Component {
  static defaultProps = {
    multiple: true,
  }

  

  state = {
    // expandedKeys: getFilterExpandedKeys(gData, ['0-0-0-key']),
    expandedKeys: [],
    autoExpandParent: true,
    // checkedKeys: ['0-0-0-0-key', '0-0-1-0-key', '0-1-0-0-key'],
    checkedKeys: ['0-0-0-key'],
    checkStrictlyKeys: { checked: ['0-0-1-key'], halfChecked: [] },
    selectedKeys: [],
    treeData: [],
    inputValue: ''
  }

  

  onExpand = expandedKeys => {
    this.filterKeys = undefined
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded chilren keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  onCheck = checkedKeys => {
    this.setState({
      checkedKeys,
    })
  }


  filterTreeNode = treeNode => {
    return this.filterFn(treeNode.props.eventKey)
  }

  filterFn = key => {
    if (this.state.inputValue && key.indexOf(this.state.inputValue) > -1) {
      return true
    }
    return false
  }

  onSelect = (selectedKeys, info) => {
    this.setState({
      selectedKeys,
    })
  }



  onChange = event => {
    this.filterKeys = []
    this.setState({
      inputValue: event.target.value,
    })
  }

  triggerChecked = () => {
    this.setState({
      checkedKeys: [`0-0-${parseInt(Math.random() * 3, 10)}-key`],
    })
  }

  

  render() {

    
    const loop = data =>
      data.map(item => {
        if (this.filterKeys && this.filterFn(item.key)) {
          this.filterKeys.push(item.key)
        }
        if (item.children) {
          return (
            <TreeNode style={{fontFamily: defaultFont.fontFamily, fontWeight: defaultFont.fontWeight, lineHeight: defaultFont.lineHeight}} key={item.key} title={item.title} disableCheckbox={item.key === '0-0-0-key'}>
              {loop(item.children)}
            </TreeNode>
          )
        }
        return <TreeNode style={{fontFamily: defaultFont.fontFamily, fontWeight: defaultFont.fontWeight, lineHeight: defaultFont.lineHeight}} key={item.key} title={item.title} />
      })
    let { expandedKeys } = this.state
    let { autoExpandParent } = this.state
    if (this.filterKeys) {
      expandedKeys = this.filterKeys
      autoExpandParent = true
    }

    const { classes } = this.props

    
    return (

      <Card>

        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Account Access</h4>
          <p className={classes.cardCategoryWhite}></p>
        </CardHeader>

        <CardBody>

          <CustomInput
            labelText="Search"
            id="treeSearch"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: false,
              value: this.state.inputValue,
              onChange: this.onChange
            }}       
          />

          <GridList cellHeight={150}  cols={1}>
    
            <Tree
              checkable
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              onSelect={this.onSelect}
              selectedKeys={this.state.selectedKeys}
              filterTreeNode={this.filterTreeNode}
              style={{}}
            >
              {loop(gData)}
            </Tree>


          </GridList>

        </CardBody>

      </Card>
        

    )
  }
}

export default withStyles(styles)(Demo)