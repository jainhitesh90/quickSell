import React, { Component } from 'react';
import { Row, Col, Card, Label } from 'reactstrap';
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
                <Col xs={3} sm={3}>
                    <img className='product-image' src={product.path || placeholder} alt={'logo'}></img>
                </Col>
                <Col xs={9} sm={9}>
                    <Row>
                        <Col xs={10} sm={10}>
                            <p>{product.name}</p>
                            <p>Rs {product.price}</p>
                            <p>{product.description}</p>
                        </Col>
                        <Col xs={2} sm={2}>
                            <Label>{index + 1}</Label>
                        </Col>
                    </Row>

                </Col>
            </Row>
            {isAdmin ? <Label onClick={() => this.setState({ showEditProductModal: true })}>Edit</Label> : null}
            {isAdmin ? <Label onClick={() => this.setState({ showDeleteProductModal: true })}>Delete</Label> : null}
        </Card>
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