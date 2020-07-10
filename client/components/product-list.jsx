import React from 'react';
import ProductListItem from './product-list-item';
import Carousel from './carousel';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('./api/products')
      .then(res => res.json())
      .then(products => this.setState({
        products: products
      }));
  }

  render() {
    const productsList = this.state.products;
    const listElements = productsList.map(product => {
      return (
        <ProductListItem
          setView={this.props.setView}
          key={product.productId}
          productId={product.productId}
          image={product.image}
          name={product.name}
          price={product.price}
          shortDescription={product.shortDescription}
        ></ProductListItem>
      );
    });
    return (
      <div>
        <Carousel />
        <div className="list-container">
          {listElements}
        </div>
      </div>
    );
  }
}
