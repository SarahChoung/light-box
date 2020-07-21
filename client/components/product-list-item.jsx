import React from 'react';

export default function ProductListItem(props) {
  const price = convertToPrice(props.price);
  return (
    <div className="product-card p-0" onClick={() => props.setView('details', { productId: props.productId })}>
      <div className="image-container">
        <img src={props.image}></img>
      </div>
      <div className="info-container">
        <h4 className="name">{props.name}</h4>
        <p className="price"> {`$${price}`}</p>
        <div className="short-description-container">
          <p className="short-description">{props.shortDescription}</p>
        </div>
      </div>
    </div>
  );

  function convertToPrice(rawPrice) {
    const priceArray = rawPrice.toString().split('');
    priceArray.splice(priceArray.length - 2, 0, '.');
    return priceArray.join('');
  }
}
