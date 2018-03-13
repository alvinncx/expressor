import React from "react"
import { connect } from "react-redux"
import { 
  updateExpression, 
  evaluateExpression,
  resolveAllConstantValue
} from "../actions"
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch'
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import SendIcon from 'material-ui-icons/Send'



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
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render(){
    return (
      <div>
        <Snackbar 
        open={this.state.open}
        autoHideDuration={5000}
        onClose={this.handleClose}
        message={<span id="message-id">Answer: { this.props.expression.result}</span>}
        />
        <Button 
          style={{
            position: 'fixed',
            bottom: "20px",
            right: "20px",
            zIndex: "10",
          }}
          variant="fab" 
          color="primary"
          onClick={ this.handleClick }>
          <SendIcon />
          </Button>
      </div>
      )
  }
}



const Expression = connect(mapStateToProps, mapDispatchToProps)(ConnectedExpression)
const Result = connect(mapStateToProps, mapDispatchToProps)(ConnectedResult)


export { Expression, Result }