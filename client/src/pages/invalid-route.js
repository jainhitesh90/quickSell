import React, { Component } from 'react';
import { Label } from 'reactstrap';
import invalidRouteImage from "../resources/invalid_route.jpg";

export default class InvalidRoute extends Component {
    render() {
        return (
            <div className='error-page'>
                <img className='invalid-route-image' src={invalidRouteImage} alt={'invalid-route'}></img>
                <Label onClick={() => this.props.history.push('/')} className='back-to-home'>Back To Homepage!!!</Label>
            </div>
        );
    }
}