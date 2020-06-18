import React, { Component } from 'react';
import { Row, Col, Card } from 'reactstrap';
import placeholder from "../placeholder_product.jpg";
import AddProductModal from './add-product-modal';
import DeleteProductModal from './delete-product-modal';

export default class ProductItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.onAddProducSuccessfully = this.onAddProducSuccessfully.bind(this);
        this.onDeleteProductSuccessfully = this.onDeleteProductSuccessfully.bind(this);
    }

    render() {
        return (
            <div>
                {this.renderEditProductModal()}
                {this.renderDeleteProductModal()}
                {this.renderSingleProduct()}
            </div>
        );
    }

    renderSingleProduct() {
        const { index, product, isAdmin } = this.props;
        return <Card className='product-item' key={index}>
            <Row>
                <Col xs={3} sm={2}>
                    <img className='product-image' src={product.path || placeholder} alt={'logo'}></img>
                </Col>
                <Col xs={9} sm={10}>
                    <div className='product-details'>
                        <div>
                            <p className='product-name'>{product.name}</p>
                            <p className='product-price'>Rs {product.price}</p>
                            <p className='product-description'>{product.description}</p>
                        </div>
                        <div>
                         {this.renderActionButtons(index)}
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    }

    renderActionButtons(index) {
        if (this.props.isAdmin) {
            return <div>
                  <p className="fa fa-edit product-action" onClick={() => this.setState({ showEditProductModal: true })}></p>
                  <p className="fa fa-trash product-action" onClick={() => this.setState({ showDeleteProductModal: true })}></p>
            </div>
        } else {
            return <p className='product-count'>{index + 1}</p>
        }
    }

    renderEditProductModal() {
        if (this.state.showEditProductModal) {
            return <AddProductModal
                product={this.props.product}
                showModal={this.state.showEditProductModal}
                onCancel={() => this.setState({
                    showEditProductModal: false
                })}
                onSuccess={this.onAddProducSuccessfully}
            />
        }
    }

    renderDeleteProductModal() {
        if (this.state.showDeleteProductModal) {
            return <DeleteProductModal
                product={this.props.product}
                showModal={this.state.showDeleteProductModal}
                onCancel={() => this.setState({
                    showDeleteProductModal: false
                })}
                onSuccess={this.onDeleteProductSuccessfully}
            />
        }
    }

    onAddProducSuccessfully() {
        this.setState({
            showEditProductModal: false
        }, this.props.refreshList);
    }

    onDeleteProductSuccessfully() {
        this.setState({
            showDeleteProductModal: false
        }, this.props.refreshList);
    }
}