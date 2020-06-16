import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
  }

  render() {
    const cartList = this.props.cart;
    let listCartItems;
    let hide = 'd-none';
    let itemTotal = 0;
    if (cartList.length > 0) {
      hide = 'null';
      listCartItems = cartList.map(cartItem => {
        itemTotal += cartItem.price;
        return (
          <CartSummaryItem
            setView={this.props.setView}
            key={cartItem.cartItemId}
            name={cartItem.name}
            price={`$${convertToPrice(cartItem.price)}`}
            shortDescription={cartItem.shortDescription}
            image={cartItem.image}
          />
        );
      });
      itemTotal = convertToPrice(itemTotal);
    } else {
      listCartItems = <p>Your cart is empty</p>;
    }

    return (
      <div className="summary-container">
        <button
          className="btn btn-link pl-0 mb-1"
          onClick={() => this.props.setView('catalog', {})}
        > &lt; Back to catalog
        </button>
        <h3 className="mb-3">My Cart</h3>
        <div>
          {listCartItems}
        </div>
        <div className="d-flex justify-content-between">
          <h3>{`Item Total $${itemTotal}`}</h3>
          <button
            className={`btn btn-primary ${hide}`}
            onClick={() => this.props.setView('checkout', {})}>Checkout</button>
        </div>
      </div>
    );

    function convertToPrice(rawPrice) {
      const priceArray = rawPrice.toString().split('');
      priceArray.splice(priceArray.length - 2, 0, '.');
      return priceArray.join('');
    }
  }
}
