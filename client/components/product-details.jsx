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
      const longDescription = addBreaks(product.longDescription);

      return (
        <div className="description-container">
          <div className="pt-2 pb-3">
            <button
              onClick={() => this.props.setView('catalog', {})}
              className="btn btn-link pl-0"
            >&lt; Back to catalog</button>
          </div>
          <div className="description-image-container">
            <img className="description-image" src={product.image} />
          </div>
          <div className="description-info-container">
            <h4 className="name">{product.name}</h4>
            <p className="price">{`$${price}`}</p>
            <p>{product.shortDescription}</p>
            <div className="w-100" id="details-add">
              <button
                id="detail-button"
                className="btn btn-primary"
                onClick={() => this.props.addToCart(product)}
              >Add to Cart</button>
            </div>
          </div>
          <p className="long-description clear">{longDescription}</p>
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

    function addBreaks(rawLongDescription) {
      return rawLongDescription.split('\\n.').map((item, index) => {
        if (item[item.length - 1] !== '.') {
          item += '.';
        }
        return (
          <span key={index}>
            {item}
            <br />
            <br />
          </span>
        );
      });
    }

  }
}
