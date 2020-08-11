import React, { useState } from 'react';

export default function Slider() {
  const sliderArr = ['/images/slide1.mp4', '/images/slide2.mp4', '/images/slide3.mp4'];
  const [x, setX] = useState(0);
  const goLeft = () => {
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  };
  const goRight = () => {
    (x === -100 * (sliderArr.length - 1)) ? setX(0) : setX(x - 100);
  };
  const goToSlide = () => {
    // setX(this.index * -100);
    setX((event.target.className.charAt(0) * -100));
  };

  return (
    < div className="slider" >
      {sliderArr.map((item, index) => {
        return (
          <div key={index} className="slide"
            style={{ transform: `translateX(${x}%)` }}>
            <video className="banner-img" height='100%' loop autoPlay muted>
              <source src={item} type="video/mp4" />
              <source src={item} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      })}
      <button id="goLeft" onClick={goLeft}><i className="fas fa-chevron-left chevron"></i></button>
      <button id="goRight" onClick={goRight}><i className="fas fa-chevron-right chevron"></i></button>
      <div className="dots-container">
        {sliderArr.map((item, index) => {
          return (
            <span key={index} className={`${index} circle ${index * -100 === x ? 'active' : 'null'}`}
              onClick={goToSlide}>

            </span>
          );
        })}
      </div>
    </div >
  );
}
