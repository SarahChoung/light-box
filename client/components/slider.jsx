import React, { useState } from 'react';

export default function Slider() {
  // const sliderArr = ['/images/iroh1.gif', '/images/iroh2.gif', '/images/slide3.gif', '/images/slide3alt.gif', 5];
  const sliderArr = ['/images/slide1.mp4', '/images/slide2.mp4', '/images/slide3.mp4'];
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
            <video className="banner-img" height='100%' loop autoPlay>
              <source src={item} type="video/mp4" />
              <source src={item} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      })}
      <button id="goLeft" onClick={goLeft}><i className="fas fa-chevron-left chevron"></i></button>
      <button id="goRight" onClick={goRight}><i className="fas fa-chevron-right chevron"></i></button>
    </div >
  );
}
