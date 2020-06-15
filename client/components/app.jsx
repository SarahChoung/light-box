import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: [],
      total: 0
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(name, params) {
    const view = { ...this.state.view };
    view.name = name;
    view.params = params;
    this.setState({ view });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cartItems => this.setState({
        cart: cartItems
      }))
      .catch(err => console.error(err));
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', req)
      .then(res => res.json())
      .then(cartItems => {
        const cartList = this.state.cart;
        const updatedCartList = cartList.concat(cartItems);
        this.setState({
          cart: updatedCartList
        });
      })
      .catch(err => console.error(err));
  }

  placeOrder({ name, creditCard, shippingAddress }) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, creditCard, shippingAddress })
    };
    fetch('/api/orders', req)
      .then(res => res.json())
      .then(res => {
        const view = { ...this.state.view };
        view.name = 'catalog';
        view.params = {};
        this.setState(
          {
            cart: [],
            view
          }
        );
      });

  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Testing connections...</h1>;
    }

    const view = this.state.view.name;
    let pageBody;
    if (view === 'catalog') {
      pageBody = <ProductList setView={this.setView} />;
    } else if (view === 'details') {
      pageBody = <ProductDetails
        addToCart={this.addToCart}
        params={this.state.view.params}
        setView={this.setView} />;
    } else if (view === 'cart') {
      pageBody = <CartSummary
        cart={this.state.cart}
        setView={this.setView} />;
    } else if (view === 'checkout') {
      pageBody = <CheckoutForm
        cart={this.state.cart}
        placeOrder = {this.placeOrder}
        setView={this.setView} />;
    }
    return (
      <div>
        <Header
          cartItemCount={this.state.cart.length}
          setView={this.setView}
        />
        <div className="non-header">
          {pageBody}
        </div>
      </div>
    );
  }
}
