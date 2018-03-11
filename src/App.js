import React, { Component } from 'react';
import './App.css';
import VariableList  from './js/components/list'
import Meta from './js/components/meta'
import { Expression, Result } from './js/components/expression'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


class App extends Component {
  render() {
    return (
      <div className="App" style={{ 'padding-bottom': '100px'}}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Calculator.io
            </Typography>
          </Toolbar>
        </AppBar>
        <Meta />
        <Typography variant="subheading" color="inherit" style={{ padding: "1em"}}>
          Expression to evaluate
        </Typography>
        <Expression />
        <VariableList />
        <Result />
      </div>
    );
  }
}

export default App;
