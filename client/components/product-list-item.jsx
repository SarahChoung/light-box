import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className="product-card">
        <div className = "image-container shake-weight"></div>
        <div className="container">
          <h4 className = "name"> Shake Weight</h4>
          <p className ="price">$29.99</p>
          <p className="short-description">Dynamic Inertia technology</p>
        </div>
      </div>
    );
  }
}
