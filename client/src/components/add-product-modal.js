import React, { Component } from 'react';
import { isNil } from 'lodash';
import { Row, Col } from 'reactstrap';
import CustomModal from '../custom-components/custom-modal';
import CustomInput from '../custom-components/custom-input';
import CustomError from '../custom-components/custom-error';
import SpinnerComponent from '../custom-components/custom-spinner';
import ApiHelper from '../utilities/api-helper';
import Utility from '../utilities/utility';

export default class AddProductModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errorObject: {}
        }
        this.createProduct = this.createProduct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.priceRef = React.createRef();
    }

    componentWillMount() {
        const { product } = this.props;
        if (!isNil(product)) {
            this.setState({
                filePath: product.path
            })
        }
    }

    render() {
        const { product, showModal, onCancel } = this.props;
        return <CustomModal
            title={isNil(product) ? 'Add New Product' : 'Edit Product'}
            showModal={showModal}
            actionButtonText={isNil(product) ? 'Submit' : 'Update'}
            onClick={this.handleSubmit}
            onCancel={onCancel}
            body={this.renderForm()} />
    }

    renderForm() {
        const { errorObject, errorMessage } = this.state;
        const defaultName = (this.props.product || {}).name
        const defaultDescription = (this.props.product || {}).description
        const defaultPrice = (this.props.product || {}).price
        return (
            <div style={{ padding: '16px', background: 'lightgrey' }}>
                <Row>
                    <Col xs={12} sm={6} className={'offset-sm-3 offset-0'}>
                        <form noValidate autoComplete="off">
                            <CustomInput
                                label={"Name"}
                                id={"name"}
                                ref={this.nameRef}
                                mandatory={true}
                                prependAddon='fa-wpforms'
                                defaultValue={defaultName}
                                errorMessage={errorObject.nameError}
                            />
                            <CustomInput
                                label={"Description"}
                                id={"description"}
                                ref={this.descriptionRef}
                                mandatory={true}
                                prependAddon='fa-info'
                                defaultValue={defaultDescription}
                                errorMessage={errorObject.descriptionError}
                            />
                            <CustomInput
                                label={"Price"}
                                id={"price"}
                                ref={this.priceRef}
                                mandatory={true}
                                prependAddon='fa-inr'
                                defaultValue={defaultPrice}
                                errorMessage={errorObject.priceError}
                            />
                            {
                                this.renderFileSelector()
                            }
                            <CustomInput
                                id="productImage"
                                ref={(ref) => this.productImageRef = ref}
                                errorMessage={errorObject.productImageError}
                                hideInput={true}
                                onChange={this.onChangeFile.bind(this)}
                                type="file"
                            />
                            <CustomError errorMessage={errorMessage} />
                        </form>
                    </Col>
                </Row>
            </div>
        );
    }

    renderFileSelector() {
        if (this.state.showSpinner) {
            return <div className='select-product-container'>
                <SpinnerComponent />
            </div>
        } else
            return <div className='select-product-container'>
                <span className='select-product-image'
                    onClick={() => {
                        this.productImageRef.reference.current.click()
                    }}>{isNil(this.state.filePath) ? "Select Product Image" : "Update Product Image"}</span>
                <span className='selected-file-name'>{this.state.fileName}</span>
            </div>
    }

    onChangeFile(event) {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0]
        this.setState({
            showSpinner: true
        }, () => this.uploadFile(file));
    }

    uploadFile(file) {
        const self = this;
        var params = { Key: file.name, ContentType: file.type, Body: file };
        const bucket = Utility.getS3Bucket();
        bucket.upload(params, function (err, data) {
            if (err) {
                self.setState({
                    errorMessage: err,
                    showSpinner: false
                });
            } else {
                console.log(`File uploaded successfully. ${data.Location}`);
                self.setState({
                    filePath: data.Location,
                    fileName: file.name,
                    showSpinner: false
                });
            }
        });
    };

    handleSubmit() {
        const state = this.state;
        const errorObject = this.validateInputs();
        let error = !Object.values(errorObject).every(o => o === null);
        if (!error) {
            let payload = {};
            payload.name = this.nameRef.current['reference'].current.value;
            payload.description = this.descriptionRef.current['reference'].current.value;
            payload.price = this.priceRef.current['reference'].current.value;
            payload.path = this.state.filePath;
            this.createProduct(payload, (this.props.product || {})._id);
        } else {
            state.errorObject = errorObject;
            this.setState(state);
        }
    }

    validateInputs() {
        let errorObject = {};
        errorObject.nameError = Utility.validateInputFields('name', this.nameRef.current['reference'].current.value);
        errorObject.descriptionError = Utility.validateDataLength('description', this.descriptionRef.current['reference'].current.value);
        errorObject.priceError = Utility.validateInputFields('price', this.priceRef.current['reference'].current.value);
        errorObject.productImageError = Utility.validateInputFields('image', this.state.filePath);
        return errorObject;
    }

    createProduct = async (payload, id) => {
        const route = isNil(id) ? '/products/add' : ('/products/update/' + id);
        const res = await ApiHelper.postData(route, payload);
        if (!isNil(res.error)) {
            this.setState({
                errorMessage: res.error
            })
        } else {
            this.props.onSuccess();
        }
    }
}