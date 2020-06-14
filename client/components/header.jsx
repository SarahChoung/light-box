import React from 'react';

export default class Header extends React.Component {

  render() {
    let itemWord;
    if (this.props.cartItem === 1) {
      itemWord = 'Item';
    } else {
      itemWord = 'Items';
    }
    return (
      <header className="d-flex justify-content-between align-items-center">
        <div>
          <p className="logo"><i className="fas fa-dollar-sign"></i> Wicked Sales</p>
        </div>
        <div>
          <p className="m-0"><span>{this.props.cartItemCount}</span>{` ${itemWord} `}<i className="fas fa-shopping-cart fa-lg"></i></p>
        </div>
      </header>
    );
  }
}
