import React from 'react';

export default function CartSummaryItem(props) {

  return (
    <div className="cart-summary-item-card">
      <div className="summary-image-container">
        <img src={props.image} />
      </div>
      <div className = "summary-info">
        <h4 className="name">{props.name}</h4>
        <p className="price">{props.price}</p>
        <p className="short-description">{props.shortDescription}</p>
      </div>
    </div>
  );
}
