import React, { Component } from 'react';
import './App.css';
import VariableList  from './js/components/list'
import Meta from './js/components/meta'
import { Expression, Result } from './js/components/expression'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class MainAppBar extends Component {
  state = {
    anchorEl: null,
    dialogOpen: false,
    dialogOpenFeedback: false,
    dialogOpenRequest: false,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickHow = () => {
    this.setState({ anchorEl: null, dialogOpen: true });
  };
  handleClickFeedback = () => {
    this.setState({ anchorEl: null, dialogOpenFeedback: true });
  };
  handleClickRequest = () => {
    this.setState({ anchorEl: null, dialogOpenRequest: true });
  };
  handleCloseDialog = () => {
    this.setState({ dialogOpen: false, dialogOpenFeedback: false, dialogOpenRequest: false})
  }
  
  render(){
    const { anchorEl } = this.state;

    return (
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography 
            style={{ flex: 1}}
            variant="title" color="inherit">
            Expressor.io
          </Typography>
          <IconButton 
            onClick={this.handleClick}
            color="inherit" aria-label="Menu">
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}>
          <MenuItem onClick={this.handleClickHow}>How It Works</MenuItem>
          <MenuItem onClick={this.handleClickFeedback}>Bugs & Feedback</MenuItem>
          <MenuItem onClick={this.handleClickRequest}>Request A Calculator!</MenuItem>
        </Menu>
        </Toolbar>

        <Dialog 
          open={this.state.dialogOpen}
          onClose={this.handleCloseDialog}>
          <DialogTitle>Welcome to Expressor!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Expressor allows you to create resuable calculators using expressions, variables & conditions.
              <br/>
              First, type in an expression you want to evaluate. An expression is like a formula. Standard list of functions are included (arithmetic, sqrts, ^, etc).
              <br/>
              Next define the variables and constants. Use variables for symbols that you will vary in value for calculations. Use constants when you need it to change according to rules or conditions.
              <br/>
              Once you are done, simply hit the button on the bottom left to get the answer!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
                Cool! Let's get started!
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog 
          open={this.state.dialogOpenFeedback}
          onClose={this.handleCloseDialog}>
          <DialogTitle>Bugs & Feedback</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">I hope you found expressor useful and would love to hear feedback to help make it more useful for you!
              Please email me at <a href='mailto:alvinng15@gmail.com'>alvinng15@gmail.com</a>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
                Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog 
          open={this.state.dialogOpenRequest}
          onClose={this.handleCloseDialog}>
          <DialogTitle>Request A Calculator!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              I would love to help you build a calculator with expressor.io!
              Please email me at <a href='mailto:alvinng15@gmail.com'>alvinng15@gmail.com</a>!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
                Close
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App" style={{ paddingBottom: '100px'}}>
        <MainAppBar />
        <div style={{ height: "4em"}}></div>
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
