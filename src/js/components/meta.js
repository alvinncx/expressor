import React from "react"
import { connect } from "react-redux"
import { updateTitle, updateDescription } from "../actions"

import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';




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
        <TextField 
          type="text" 
          fullWidth
          label="Title"
          value={this.props.meta.title} 
          onChange={this.handleTitleChange} 
          margin="normal"
          />
        <br />
        <TextField
          multiline
          fullWidth 
          label="Description"
          value={this.props.meta.description} 
          onChange={this.handleDescChange} 
          margin="normal"

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
      <Card>
        <CardHeader 
          action={
            <Switch 
              checked={this.state.editing}
              onChange={this.toggleEdit}
            />
            }
          title={ meta.title }
          />

        <CardContent>
          <MetaForm meta={meta} />
        </CardContent>
      </Card>
    ) : (
      <Card>
        <CardHeader 
        action={
          <Switch 
            checked={this.state.editing}
            onChange={this.toggleEdit}
          />
          }
        title={ meta.title }
        />
        <CardContent>
          <Typography variant="body1">{ meta.description }</Typography>
        </CardContent>
      </Card>
      )
  }
}

const Meta = connect(mapStateToProps, mapDispatchToProps)(ConnectedMeta)

export default Meta