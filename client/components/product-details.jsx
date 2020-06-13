import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('./api/products/1')
      .then(res => res.json())
      .then(product => {
        this.setState({
          product: product
        });
      });
  }

  render() {
    if (this.state.product) {
      const price = convertToPrice(this.state.product.price);
      return (
        <div>
          <p> &lt; Back to catalog</p>
          <h2>{this.state.product.name}</h2>
          <h3>{`$${price}`}</h3>
        </div>
      );
    } else {
      return (
        null
      );
    }

    function convertToPrice(rawPrice) {
      const priceArray = rawPrice.toString().split('');
      priceArray.splice(priceArray.length - 2, 0, '.');
      return priceArray.join('');
    }
  }
}
