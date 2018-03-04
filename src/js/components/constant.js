import React from "react"
import { connect } from "react-redux"
import { 
  updateConstantName,
  updateConstantValue
 } from "../actions"

const mapDispatchToProps = dispatch => ({
  updateConstantName: (id, text) => ( dispatch( updateConstantName(id, text) ) ),
  updateConstantValue: (id, float) => ( dispatch( updateConstantValue(id, float) ) )
})

class ConnectedValue extends React.Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
   const constant = this.props.constant
    this.props.updateConstantValue(this.props.index, event.target.value) 
  }

  render(){
    const constant = this.props.constant
    return (
      <div>
        <input value={ constant.value } onChange={ this.handleChange }/>
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
  }

  toggleEdit(){
    this.setState({ editing: !this.state.editing })
  }

  handleNameChange(event){
    this.props.updateConstantName(this.props.index, event.target.value)
  }

  render(){
    const constant = this.props.constant
    return this.state.editing ? ( 
      <div>
        <Value constant={ constant } index={this.props.index} />
        <input value={ constant.name } onChange={ this.handleNameChange } />
        <button onClick={ this.toggleEdit }>Save</button>
      </div>
      ): (
      <div>
        <Value constant={ constant } index={this.props.index} />
        <h3>{ constant.name }</h3>
        <p>{ constant.label }</p>
        <button onClick={ this.toggleEdit }>Edit</button>
      </div>
    )
  }
}

const Constant = connect(null, mapDispatchToProps)(ConnectedVariable)


export default Constant