import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

export default class CustomSpinner extends Component {
    render() {
        return (
            <div style={this.props.style}>
                <Spinner className='spinner' />
            </div>
        );
    }
}