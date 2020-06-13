import React from 'react';

export default function ProductListItem(props) {
  // get image path
  const imgClass = props.name.toLowerCase().replace(' ', '-');
  const imgPath = './images/' + imgClass + '.jpg';

  // convert number to price notation
  const priceRaw = props.price.toString();
  const priceArray = priceRaw.split('');
  priceArray.splice(priceArray.length - 2, 0, '.');
  const price = priceArray.join('');

  return (
    <div className="product-card">
      <div className= "image-container">
        <img src={imgPath}></img>
      </div>
      <div className = "info-container">
        <h4 className="name">{props.name}</h4>
        <p className="price"> {`$${price}`}</p>
        <p className="short-description">{props.shortDescription}</p>
      </div>
    </div>
  );
}
