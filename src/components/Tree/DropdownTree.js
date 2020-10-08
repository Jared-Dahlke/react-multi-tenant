import React from 'react'
import ReactDOM from 'react-dom'

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import './index.css'

const data = [
  {
    label: 'Test1',
    value: 'test1Value',
    children:[
      {
        label: 'child1',
        value: 'child1Value'
    }
    ]
  }
]


const onChange = (currentNode, selectedNodes) => {
  console.log('onChange::', currentNode, selectedNodes)
}
const onAction = ({ action, node }) => {
  console.log(`onAction:: [${action}]`, node)
}
const onNodeToggle = currentNode => {
  console.log('onNodeToggle::', currentNode)
}

export default function TreeTest (props) {
  console.log('tree props')
  console.log(props)
  return (
    <DropdownTreeSelect data={props.data} onChange={props.onChange} onAction={onAction} onNodeToggle={onNodeToggle} className="mdl-demo"/>
  )
}