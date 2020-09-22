//The below 2 warnings exist when using the rc-tree component. They both appear to be related to AntDesign which is used in this component. 
//Warning: `children` of Tree is deprecated. Please use `treeData` instead.
//Warning: Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.
import './index.less'
import React from 'react'
import Tree, { TreeNode } from 'rc-tree'
import GridList from '@material-ui/core/GridList'
import "rc-tree/assets/index.css"
import {defaultFont} from "../../assets/jss/material-dashboard-react"
import CustomInput from "../CustomInput/CustomInput.js"
import Card from "../Card/Card.js"
import CardBody from "../Card/CardBody.js"
import CardHeader from "../Card/CardHeader.js"
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import classNames from "classnames";
import inputStyles from "../../assets/jss/material-dashboard-react/components/customInputStyle.js" //"assets/jss/material-dashboard-react/components/customInputStyle.js";

//const useStyles = makeStyles(styles);

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


const labelClasses = classNames({
  [" " + inputStyles.labelRootError]: false,
  [" " + inputStyles.labelRootSuccess]: true
});

class Demo extends React.Component {
  static defaultProps = {
    multiple: true,
  }

  

  state = {
    expandedKeys: [],
    autoExpandParent: true,
    selectedKeys: [],
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

  onFocus=()=>{
    console.log('focused')
    this.setState({showTree: true})
  }
  onBlur=()=>{
    console.log('blured')
    //this.setState({showTree: false})
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
            <TreeNode style={{fontFamily: defaultFont.fontFamily, fontWeight: defaultFont.fontWeight, lineHeight: defaultFont.lineHeight}} key={item.key} title={item.title} disableCheckbox={item.key === 'mydisabledkey'}>
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

      <Card >
        <CardBody>

       <InputLabel
          classes={inputStyles.labelRoot + ' ' + inputStyles.labelClasses}
          //htmlFor={id}
         // {...labelProps}
        >
          {this.props.title}
        </InputLabel>

        


          {this.props.search ?
          
            <CustomInput
              
              labelText={"Search"}
              id="treeSearch"

              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: false,
                value: this.state.inputValue,
                onChange: this.onChange,             
              }}       
            />

            :
          
            null
          
          }

        
         
         <GridList style={{marginTop: 10}} cellHeight={this.props.treeContainerHeight}  cols={1}>
    
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
              {loop(this.props.data)}
            </Tree>


          </GridList>
        
       

          </CardBody>

      </Card>
        

    )
  }
}

export default withStyles(styles)(Demo)