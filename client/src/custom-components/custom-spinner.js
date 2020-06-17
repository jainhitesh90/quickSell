import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

export default class CustomSpinner extends Component {
    render() {
        return (
            <Spinner color={this.props.color || 'white'} className={'small-spinner '} />
        );
    }
}