import React from 'react'

class MiniFormik extends React.Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    errors: {}
  }

  handleChangeBasicInfo=(e)=>{
    console.log('handle change basic info')
    console.log(e)
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  }

  render() {
    return this.props.children({...this.state, handleChange: this.handleChangeBasicInfo})
  }
}