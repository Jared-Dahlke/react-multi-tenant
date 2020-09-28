
import React from 'react'

export default class PrettyJson extends React.Component {
  render(props) {
    return <pre style={{color: 'white'}}>{JSON.stringify(props.data,null,2)}</pre>
  }
}