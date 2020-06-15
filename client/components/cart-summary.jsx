import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {
    const cartList = this.props.cart;
    let listCartItems;
    let hide = 'd-none';
    if (cartList.length > 0) {
      hide = 'null';
      listCartItems = cartList.map(cartItem => {
        return (
          <CartSummaryItem
            setView={this.props.setView}
            key={cartItem.cartItemId}
            name={cartItem.name}
            price={cartItem.price}
            shortDescription={cartItem.shortDescription}
            image={cartItem.image}
          />
        );
      });
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
        <div>
          <button
            className={`btn btn-primary ${hide}`}
            onClick={() => this.props.setView('checkout', {})}>Check Out</button>
        </div>
      </div>
    );

  }
}
