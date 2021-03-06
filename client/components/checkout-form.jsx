import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const orderObject = this.state;
    if (orderObject.name !== '' && orderObject.creditCard !== '' && orderObject.shippingAddess !== '') {
      this.props.placeOrder(orderObject);
    }
  }

  render() {
    const cartList = this.props.cart;
    let itemTotal = 0;
    if (cartList.length > 0) {
      cartList.forEach(cartItem => {
        itemTotal += cartItem.price;
      });
      itemTotal = convertToPrice(itemTotal);
    }

    let submitDisabled = true;
    if (this.state.name && this.state.creditCard && this.state.shippingAddress) {
      submitDisabled = false;
    }

    return (
      <div className="checkout-container p-5">
        <div>
          <h3>My Cart</h3>
          <p className="price font-weight-bold mt-3">{`Order Total: $${itemTotal}`} </p>
        </div>
        <form
          onSubmit={this.handleSubmit}
          className="order-form">
          <div>
            <label htmlFor="name">Name*</label><br />
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="credit-card">Credit Card*</label><br />
            <input
              type="text"
              name="creditCard"
              id="credit-card"
              value={this.state.creditCard}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="shipping-address">Shipping Address*</label><br />
            <textarea
              type="text"
              name="shippingAddress"
              id="shipping-address"
              value={this.state.shippingAddress}
              onChange={this.handleChange}
            >
            </textarea>
          </div>
          <div className="d-flex justify-content-between">
            <button onClick={() => this.props.setView('catalog', {})} className="btn btn-link pl-0" type="button">&lt; Return to Shopping</button>
            <button disabled={submitDisabled} className="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
    );

    function convertToPrice(rawPrice) {
      const priceArray = rawPrice.toString().split('');
      priceArray.splice(priceArray.length - 2, 0, '.');
      return priceArray.join('');
    }
  }
}
