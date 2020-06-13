import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const productId = this.props.params.productId;
    fetch(`./api/products/${productId}`)
      .then(res => res.json())
      .then(product => {
        this.setState({
          product: product
        });
      });
  }

  render() {
    if (this.state.product) {
      const product = this.state.product;
      const price = convertToPrice(product.price);
      return (
        <div className="description-container">
          <div className="pt-4">
            <button
              onClick={() => this.props.setView('catalog', {})}
              className="btn btn-link"
            >&lt; Back to catalog</button>
          </div>
          <div className="description-image-container">
            <img className="description-image" src={product.image}/>
          </div>
          <div className="description-info-container">
            <h4 className="name">{product.name}</h4>
            <p className="price">{`$${price}`}</p>
            <p className="short-description">{product.shortDescription}</p>
          </div>
          <p className="long-description clear">{product.longDescription}</p>
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
