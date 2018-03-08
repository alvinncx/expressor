import React from "react"
import { connect } from "react-redux"
import { 
  updateVariableName,
  updateVariableValue,
  deleteVariable
 } from "../actions"

const mapDispatchToProps = dispatch => ({
  updateVariableName: (id, text) => ( dispatch( updateVariableName(id, text) ) ),
  updateVariableValue: (id, float) => ( dispatch( updateVariableValue(id, float) ) ),
  deleteVariable: (id, float) => ( dispatch( deleteVariable(id, float) ) )
})

class ConnectedValue extends React.Component {
  constructor(){
    super()
    this.increase = this.increase.bind(this)
    this.decrease = this.decrease.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  increase(){
    const variable = this.props.variable
    this.props.updateVariableValue(this.props.index, variable.value + variable.step)
  }

  decrease(){
    const variable = this.props.variable
    this.props.updateVariableValue(this.props.index, variable.value - variable.step)
  }

  handleChange(event){
    this.props.updateVariableValue(this.props.index, event.target.value) 
  }

  render(){
    const variable = this.props.variable
    return (
      <div>
        <button onClick={ this.increase }>Increase +</button>
        <input value={ variable.value } onChange={ this.handleChange }/>
        <button onClick={ this.decrease }>Decrease -</button>
      </div>
    )
  }
}

const Value = connect(null, mapDispatchToProps)(ConnectedValue)

class ConnectedVariable extends React.Component {
  constructor(){
    super()
    this.state = { editing: false }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleClickDelete = this.handleClickDelete.bind(this)
  }

  toggleEdit(){
    this.setState({ editing: !this.state.editing })
  }

  handleNameChange(event){
    this.props.updateVariableName(this.props.index, event.target.value)
  }

  handleClickDelete(){
    this.props.deleteVariable(this.props.index)
  }

  render(){
    const variable = this.props.variable
    return this.state.editing ? ( 
      <div>
        <Value variable={ variable } index={this.props.index} />
        <input value={ variable.name } onChange={ this.handleNameChange } />
        <button onClick={ this.toggleEdit }>Save</button>
        <button onClick={ this.handleClickDelete }>Delete</button>
      </div>
      ): (
      <div>
        <Value variable={ variable } index={this.props.index} />
        <h3>{ variable.name }</h3>
        <p>{ variable.label }</p>
        <button onClick={ this.toggleEdit }>Edit</button>
      </div>
    )
  }
}

const Variable = connect(null, mapDispatchToProps)(ConnectedVariable)


export default Variable