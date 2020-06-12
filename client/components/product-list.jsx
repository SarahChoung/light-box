import React from 'react';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    fetch('./api/products')
      .then(res => res.json())
      .then(products => console.log(products));
  }

  render() {
    return (
      <div>Hi</div>
    );
  }
}
