import React, { useState } from 'react';

export default function Slider() {
  // const sliderArr = ['/images/iroh1.gif', '/images/iroh2.gif', '/images/slide3.gif', '/images/slide3alt.gif', 5];
  const sliderArr = ['/images/slide3.mp4', 5];
  const [x, setX] = useState(0);
  const goLeft = () => {
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  };
  const goRight = () => {
    (x === -100 * (sliderArr.length - 1)) ? setX(0) : setX(x - 100);
  };

  return (
    < div className="slider" >
      {sliderArr.map((item, index) => {
        return (
          <div key={index} className="slide"
            style={{ transform: `translateX(${x}%)` }}>
            <video className="banner-img" width='100%' controls autoPlay>
              <source src={item} type="video/mp4" />
            </video>
          </div>
        );
      })}
      <button id="goLeft" onClick={goLeft}><i className="fas fa-chevron-left"></i></button>
      <button id="goRight" onClick={goRight}><i className="fas fa-chevron-right"></i></button>
    </div >
  );
}
