import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { List } from './js/components/list'
import { Form } from './js/components/form'
import Meta from './js/components/meta'
import { Expression, Result } from './js/components/expression'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Meta />
        <Expression />
        <Result />
      </div>
    );
  }
}

export default App;
