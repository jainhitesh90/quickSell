import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class CustomButton extends Component {
  render() {
    const { id, label, onClick, color, style, type, className } = this.props;
    return (
      <Button
        className={'button-' + type}
        style={style}
        onClick={onClick}
        // className={className}
        id={id}
        color={color}
      >{label}
      </Button>
    );
  }
}