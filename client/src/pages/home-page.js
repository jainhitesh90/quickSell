import React, { Component } from 'react';
import {isNil} from 'lodash';

import CustomSpinner from '../components/custom-spinner';
import ApiHelper from '../utilities/api-helper';

export default class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSpinner: true
        }
        this.getProductList = this.getProductList.bind(this);
    }

    componentWillMount() {
        this.getProductList();
    }

    render() {
        if (this.state.showSpinner) {
            return <CustomSpinner />
        }
        return <div>
            <div className='title'>Homepage!!!</div>
            <div>{this.state.message}</div>
        </div>
    }

    getProductList = async () => {
        const res = await ApiHelper.getData('/products/getAllProducts');
        if (!isNil(res.data.products)) {
            this.setState({
                products: res.data.products,
                error: null,
                showSpinner: false,
                message: res.data.message
            })
        } else {
            this.setState({
                products: [],
                message: res.data.error,
                showSpinner: false
            })
        }
    }
}