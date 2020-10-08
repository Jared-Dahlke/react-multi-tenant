import React, { Component } from "react";
import Select from "react-select";
import { blackColor, whiteColor, dangerColor } from "../../assets/jss/material-dashboard-react";
import FormHelperText from '@material-ui/core/FormHelperText'

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: blackColor,
    color: whiteColor,

    // match with the menu
    //borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    // Overwrittes the different states of border
     borderColor: state.isFocused ? null : null,
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    //"&:hover": {
      // Overwrittes the different states of border
    //  borderColor: state.isFocused ? "red" : "blue"
   // }
  }),
  
  menu: base => ({
    ...base,
  
    color: blackColor
  }),
  menuList: base => ({
    ...base,
    // override border radius to match the box
    
    color: blackColor
  }),
  
  
  singleValue: (provided, state) => ({
    ...provided,
    color: whiteColor,
    backgroundColor: blackColor
  })
  
};

export default class SelectField extends Component {
  handleChange = value => {
    if(!value) value = []
    //this.props.validateForm()
    console.log('handle change')
    console.log(value)
    
    
    const { onChange, name } = this.props;

    onChange(name, value);

  };

  handleBlur = () => {
    const { onBlur, name } = this.props;
    onBlur(name, true);
  };

  render() {
    const {
      id,
      name,
      label,
      placeholder,
      options,
      value,
      isMulti,
      isDisabled,
      touched,
      error,
      isClearable,
      backspaceRemovesValue
    } = this.props;

    return (
      <div className="input-field-wrapper">
        {label && (
          <h5 className="input-label" htmlFor={name} error={error}>
            {label}
          </h5>
        )}

        <Select
          id={id}
          getOptionLabel ={(option)=>option[this.props.optionLabel]}
          getOptionValue ={(option)=>option[this.props.optionValue]}
          placeholder={placeholder}
          options={options}
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          touched={touched}
          error={error}
          isMulti={isMulti}
          isDisabled={isDisabled}
          isClearable={isClearable}
          backspaceRemovesValue={backspaceRemovesValue}
          components={{ ClearIndicator: null }}
          styles={customStyles}
        />

          <FormHelperText 
              id="component-helper-text" 
              style={{
                color: dangerColor[0], 
                position: 'absolute',
                bottom: '-1'
              }}
            >
              {error}
            </FormHelperText>
        
        
      </div>
    );
  }
}

