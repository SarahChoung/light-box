import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  render() {
    return (
      <div className="carousel text-center">
      </div>
    );
  }
}
