import React from "react"
import { connect } from "react-redux"
import { 
  updateVariableName,
  updateVariableValue,
  updateVariableLabel,
  deleteVariable
 } from "../actions"

import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch'
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import AddIcon from 'material-ui-icons/Add';
import MinusIcon from 'material-ui-icons/Remove';



const mapDispatchToProps = dispatch => ({
  updateVariableName: (id, text) => ( dispatch( updateVariableName(id, text) ) ),
  updateVariableValue: (id, float) => ( dispatch( updateVariableValue(id, float) ) ),
  updateVariableLabel: (id, text) => ( dispatch( updateVariableLabel(id, text) ) ),
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
        <IconButton onClick={ this.decrease} >
          <MinusIcon />
        </IconButton>
        <TextField 
          label='Value'
          value={ variable.value } onChange={ this.handleChange }/>
        <IconButton onClick={ this.increase} >
          <AddIcon />
        </IconButton>
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
    this.handleChangeLabel = this.handleChangeLabel.bind(this)
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
  handleChangeLabel(event){
    this.props.updateVariableLabel(this.props.index, event.target.value)
  }

  render(){
    const variable = this.props.variable
    return <Card>
        <CardHeader 
          action={
            <Switch 
              checked={this.state.editing}
              onChange={this.toggleEdit}
            />
            }
          avatar={<Avatar>{ variable.name }</Avatar>}
          title={ variable.label }
        />
        <CardContent>
          { this.state.editing ? (
              <div>
                <TextField 
                  label='Variable name'
                  value={ variable.name } 
                  onChange={ this.handleNameChange } />
                <TextField 
                  label='Label'
                  value={ variable.label }
                  onChange={ this.handleChangeLabel } />
                <Button color='secondary' onClick={ this.handleClickDelete }>Delete Variable</Button> </div>) 
            : <Value variable={ variable } index={this.props.index} />
          }
        </CardContent>
      </Card>
    
  }
}

const Variable = connect(null, mapDispatchToProps)(ConnectedVariable)


export default Variable