import React from "react"
import { connect } from "react-redux"
import { 
  updateExpression, 
  evaluateExpression,
  resolveAllConstantValue
} from "../actions"
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import ReactGA from 'react-ga';

import TextField from 'material-ui/TextField'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Switch from 'material-ui/Switch'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import PlayIcon from 'material-ui-icons/PlayArrow'



const mapStateToProps = state => (
  // Inner props  :  external store state
  { 
    expression : state.expression,
    result: state.result
  }
)

const mapDispatchToProps = dispatch => ({
  // Inner props  :  external actions to dispatch
  updateExpression: text => ( 
    dispatch(updateExpression(text))
  ),
  evaluateExpression: () => ([
    dispatch(resolveAllConstantValue()),
    dispatch(evaluateExpression())
  ])
})

class ConnectedExpression extends React.Component {
  constructor(){
    super()
    this.state = {
      editing: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  toggleEdit(){
    this.setState({ editing: !this.state.editing })
    ReactGA.event({ category: 'User', action: 'Toggle Edit', label: 'Expression' })
  }

  handleChange(event){
    this.props.updateExpression(event.target.value)
  }

  render(){
    const exp = this.props.expression
    return <Card>
        <CardHeader 
          title={ exp.expression }
          action={
            <Switch 
              checked={this.state.editing}
              onChange={this.toggleEdit}
            />
          }
        />
        <CardContent>
        {this.state.editing ? (<TextField
          fullWidth
          label='Expression to evaluate'
         value={ exp.expression } onChange={ this.handleChange } />) :""}
        </CardContent>
      </Card>
  }
}

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 100
  },
  fabMoveUp: {
    transform: 'translate3d(0, -46px, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  fabMoveDown: {
    transform: 'translate3d(0, 0, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
});


class ConnectedResult extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      open: false
    }
  }

  handleClick(){
    this.props.evaluateExpression()
    this.setState({ open: true });
    ReactGA.event({ category: 'User', action: 'Evaluated' })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render(){
    const { classes } = this.props;
    const fabClassName = classNames(classes.fab, this.state.open ? classes.fabMoveUp : classes.fabMoveDown);

    return (
      <div>
        <Snackbar 
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={<span id="message-id">Answer: { this.props.expression.result}</span>}
        />
        <Button 
          className={fabClassName}
          variant="fab" 
          color="secondary"
          onClick={ this.handleClick }>
          <PlayIcon />
          </Button>
      </div>
      )
  }
}



const Expression = connect(mapStateToProps, mapDispatchToProps)(ConnectedExpression)
const ResultStyle = connect(mapStateToProps, mapDispatchToProps)(ConnectedResult)
const Result = withStyles(styles)(ResultStyle)

export { Expression,  Result}