import React from "react"
import { connect } from "react-redux"
import { 
  updateExpression, 
  evaluateExpression,
  resolveAllConstantValue
} from "../actions"


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
  evaluateExpression: () => (
    dispatch(resolveAllConstantValue()),
    dispatch(evaluateExpression())
  )
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
    return this.state.editing ? (
      <div>
        <input value={ exp.expression } onChange={ this.handleChange } />
        <br />
        <button onClick={ this.toggleEdit }>Save</button>
      </div>
    ): (
      <div>
        <h2>{ exp.expression }</h2>
        <button onClick={ this.toggleEdit }>Edit</button>
      </div>
    )
  }
}

class ConnectedResult extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.evaluateExpression()
  }

  render(){
    return (
      <div>
        <h4>{ this.props.expression.result }</h4>
        <button onClick={ this.handleClick }>Evaluate</button>
      </div>
      )
  }
}



const Expression = connect(mapStateToProps, mapDispatchToProps)(ConnectedExpression)
const Result = connect(mapStateToProps, mapDispatchToProps)(ConnectedResult)


export { Expression, Result }