import React, { Component } from 'react';
import { isNil } from 'lodash';
import CustomModal from '../custom-components/custom-modal';
import ApiHelper from '../utilities/api-helper';

export default class DeleteProductModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errorObject: {}
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        console.log('props', this.props);
        const { showModal, onCancel } = this.props;
        return <CustomModal
            title={'Are you sure you want to delete?'}
            showModal={showModal}
            actionButtonText={'Yes'}
            onClick={this.handleSubmit}
            onCancel={onCancel}
        />
    }

    handleSubmit() {
        this.deleteProduct(this.props.product._id);
    }

    deleteProduct = async (id) => {
        const route = '/products/' + id;
        const res = await ApiHelper.deleteData(route);
        if (!isNil(res.error)) {
            this.setState({
                errorMessage: res.error
            })
        } else {
            this.props.onSuccess();
        }
    }
}