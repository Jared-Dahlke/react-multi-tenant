//The below 2 warnings exist when using the rc-tree component. They both appear to be related to AntDesign which is used in this component. 
//Warning: `children` of Tree is deprecated. Please use `treeData` instead.
//Warning: Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.
/*eslint-disable no-sequences */
import './index.less'
import React from 'react'
import Tree, { TreeNode } from 'rc-tree'
import GridList from '@material-ui/core/GridList'
import "rc-tree/assets/index.css"
import {defaultFont, whiteColor} from "../../assets/jss/material-dashboard-react"
import CustomInput from "../CustomInput/CustomInput.js"
import { withStyles } from '@material-ui/core/styles'
import AddBox from '@material-ui/icons/AddBoxSharp'
import MinusBox from '@material-ui/icons/IndeterminateCheckBox'

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
    expandedKeys: [],
    autoExpandParent: true,
    treeData: [],
    inputValue: '',
    showTree: false
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

  


  filterTreeNode = treeNode => {
    return this.filterFn(treeNode.props.eventKey)
  }

  filterFn = key => {
    if (this.state.inputValue && key.indexOf(this.state.inputValue) > -1) {
      return true
    }
    return false
  }




  onChange = event => {
    this.filterKeys = []
    this.setState({
      inputValue: event.target.value,
    })
  }


  render() {

    const switcherIcon = obj => {
      if (obj.isLeaf) {
        return (null)
      }
      if (obj.expanded) {
        return(<MinusBox  style={{ fontSize: 14, color: 'white', backgroundColor: 'black'}}/>) 
      }
      return (<AddBox style={{ fontSize: 14, color: 'white', backgroundColor: 'black'}}/>)
    };

    //const Icon = ({ selected }) => {
    //  return selected? <Checked></Checked> : <Unchecked></Unchecked>
    // }

    const TreeTitle = ({title}) => {
      return <div style={{font: defaultFont, marginLeft: 5, color: whiteColor}}>{title}</div>
    }
    

    
    const loop = data =>
      data.map(item => {
        if (this.filterKeys && this.filterFn(item.key)) {
          this.filterKeys.push(item.key)
        }
        if (item.children) {
          return (
            <TreeNode   style={{fontSize: 16, fontFamily: defaultFont.fontFamily}} key={item[this.props.keyProp]} title={<TreeTitle title={item[this.props.labelProp]}/>} disableCheckbox={item.key === 'mydisabledkey'}>
              {loop(item.children)}
            </TreeNode>
          )
        }
        return <TreeNode style={{fontSize: 16, fontFamily: defaultFont.fontFamily}} key={item[this.props.keyProp]} title={<TreeTitle title={item[this.props.labelProp]}/>} />
      })
    let { expandedKeys } = this.state
    let { autoExpandParent } = this.state
    if (this.filterKeys) {
      expandedKeys = this.filterKeys
      autoExpandParent = true
    }

    return (    
      <div>

        {this.props.search ?
        
          <CustomInput         
            labelText={this.props.title}
            id="treeSearch"
            formControlProps={{
              fullWidth: true,
              
            }}
            labelProps={{
              shrink: true
            }}
          
            inputProps={{
              disabled: false,
              value: this.state.inputValue,
              onChange: this.onChange, 
              variant: 'filled'      ,              
              placeholder:'Search....'
            }}       
          />

          :
        
          null
        
        }

      
        <GridList style={{marginTop: 10}} cellHeight={this.props.treeContainerHeight}  cols={1}>
  
          <Tree
            defaultExpandAll={true}
            checkStrictly
            showIcon={false}
            showLine={false}
            switcherIcon={switcherIcon}
            checkable
            onExpand={this.onExpand}
            //expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={this.props.onCheck}
            checkedKeys={this.props.checkedKeys}
            onSelect={this.props.onSelect}
            selectedKeys={this.props.selectedKeys}
            filterTreeNode={this.filterTreeNode}
          >
            {loop(this.props.data)}
          </Tree>


        </GridList>
      
      

      </div>

        

    )
  }
}

export default withStyles(styles)(Demo)