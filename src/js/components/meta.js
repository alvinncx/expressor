import React from "react"
import { connect } from "react-redux"
import { updateTitle, updateDescription } from "../actions"

const mapStateToProps = (state) => (
  // Inner props  :  external store state
  { meta: state.meta }
)

const mapDispatchToProps = (dispatch) => (
  { 
    updateTitle: text => dispatch(updateTitle(text) ),
    updateDescription: text => dispatch(updateDescription(text) )
  }
)

class ConnectedMetaForm extends React.Component {
  constructor(props){
    super(props)
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
  }

  handleTitleChange(event){
    event.preventDefault()
    this.props.updateTitle(event.target.value)
  }
  handleDescChange(event){
    event.preventDefault()
    this.props.updateDescription(event.target.value)
  }

  render(){
    return (
      <div>
        <input 
          type="text" 
          value={this.props.meta.title} 
          onChange={this.handleTitleChange} 
          />
        <br />
        <textarea 
          value={this.props.meta.description} 
          onChange={this.handleDescChange} 
          />
      </div>
    )
  }
}

const MetaForm = connect(null, mapDispatchToProps)(ConnectedMetaForm)

class ConnectedMeta extends React.Component {
  constructor(){
    super()
    this.state = {
      editing: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit(){
    this.setState({ editing: !this.state.editing})
  }

  render(){
    const meta = this.props.meta
    return this.state.editing ? (
      <div>
        <MetaForm meta={meta} />
        <button onClick={this.toggleEdit} >Save</button>
      </div>
    ) : (
      <div>
        <h3>{ meta.title }</h3>
        <p>{ meta.description }</p>
        <button onClick={this.toggleEdit} >Edit</button>
      </div>
      )
  }
}

const Meta = connect(mapStateToProps, mapDispatchToProps)(ConnectedMeta)

export default Meta