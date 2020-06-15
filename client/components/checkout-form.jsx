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
    this.props.placeOrder(orderObject);
  }

  render() {
    return (
      <div>
        <div>
          <h3>My Cart</h3>
          <p>Order Total: </p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label htmlFor="credit-card">Credit Card</label>
          <input
            type="text"
            name="creditCard"
            id="credit-card"
            value={this.state.creditCard}
            onChange={this.handleChange}
          />

          <label htmlFor="shipping-address">Shipping Address</label>
          <textarea
            type="text"
            name="shippingAddress"
            id="shipping-address"
            value={this.state.shippingAddress}
            onChange={this.handleChange}
          >
          </textarea>

          <button type="submit">Submit</button>
        </form>
      </div>

    );
  }
}
