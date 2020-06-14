import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    const view = { ...this.state.view };
    view.name = name;
    view.params = params;
    this.setState({ view });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {

    if (this.state.isLoading) {
      return <h1>Testing connections...</h1>;
    }

    const view = this.state.view.name;
    if (view === 'catalog') {
      return (
        <div>
          <Header />
          <ProductList setView={this.setView}/>
        </div>
      );
    } else if (view === 'details') {
      return (
        <div>
          <Header />
          <ProductDetails
            params={this.state.view.params}
            setView={this.setView}/>
        </div>
      );
    }
  }
}
