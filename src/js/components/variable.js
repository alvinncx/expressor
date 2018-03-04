import React from "react"
import { connect } from "react-redux"
import { updateVariableName } from "../actions"

const mapDispatchToProps = dispatch => ({
  updateVariableName: (id, text) => ( dispatch( updateVariableName(id, text) ) )
})


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
    this.props.updateVariableName(this.props.index, event.target.value)
  }

  render(){
    const variable = this.props.variable
    return this.state.editing ? ( 
      <div>
        <input value={ variable.name } onChange={ this.handleNameChange } />
        <button onClick={ this.toggleEdit }>Save</button>
      </div>
      ): (
      <div>
        <h3>{ variable.name }</h3>
        <p>{ variable.label }</p>
        <button onClick={ this.toggleEdit }>Edit</button>
      </div>
    )
  }
}

const Variable = connect(null, mapDispatchToProps)(ConnectedVariable)


export default Variable