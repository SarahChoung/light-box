import React from 'react';

export default class Header extends React.Component {

  render() {
    let itemWord;
    if (this.props.cartItemCount === 1) {
      itemWord = 'Item';
    } else {
      itemWord = 'Items';
    }
    return (
      <header className="d-flex justify-content-between align-items-center fixed-top">
        <div className="logo d-flex align-items-center" onClick={() => this.props.setView('catalog', {})}>
          <img className="logo-img mr-1" src="/images/nightlight-icon-inverted.png" /><p className="logo"> Light Box</p>
        </div>
        <div
          onClick={() => this.props.setView('cart', {})}
          className="cart-nav">
          <p className="m-0"><span>{this.props.cartItemCount}</span>{` ${itemWord} `}<i className="fas fa-shopping-cart fa-lg"></i></p>
        </div>
      </header>
    );
  }
}
