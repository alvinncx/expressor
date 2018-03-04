import React, { Component } from 'react';
import './App.css';
import VariableList  from './js/components/list'
import Meta from './js/components/meta'
import { Expression, Result } from './js/components/expression'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Meta />
        <Expression />
        <VariableList />
        <Result />
      </div>
    );
  }
}

export default App;
