import React, { Component } from 'react';
import CustomError from './custom-error';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';

const inputStyle = {
  border: 0,
  borderRadius: 4
};

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.reference = React.createRef();
  }

  render() {
    const style = {
      marginTop: '10px'
    }
    return (
      <div style={style}>
        {this.renderInputSection()}
        {this.renderErrorSection()}
      </div>
    );
  }

  renderInputSection() {
    const { id, label, type, hideInput, placeholder, mandatory, prependAddon, autoComplete, defaultValue, onChange } = this.props;
    let prependAddonClassName = null;
    if (prependAddon) {
      prependAddonClassName = 'fa ' + prependAddon;
    }
    
    return <div style={hideInput ? {display: 'none'} : {}}>
      <Label className='input-label'>{label} {mandatory ? <sup style={{ color: 'red' }}>*</sup> : null}</Label>
        <InputGroup style={inputStyle}>
          {
            prependAddon ? <InputGroupAddon addonType="prepend"><InputGroupText>{<i className={prependAddonClassName + ' input-icon'}></i>}</InputGroupText></InputGroupAddon> : null
          }
          <Input
            autoComplete={autoComplete || 'off'}
            className='custom-input-focus'
            innerRef={this.reference}
            id={id}
            defaultValue={defaultValue}
            type={type || 'text'}
            placeholder={placeholder} 
            onChange={onChange}/>
        </InputGroup>
    </div>
  }

  renderErrorSection() {
    return <CustomError errorMessage={this.props.errorMessage} />
  }
}