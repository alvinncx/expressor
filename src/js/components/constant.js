import React from "react"
import { connect } from "react-redux"
import { 
  updateConstantName,
  updateConstantValue,
  updateConstantDefault,
  updateConstantLabel,
  resolveConstantValue,
  deleteConstant,
  addCondition
 } from "../actions"
import Condition from "./condition"

import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch'
import Collapse from 'material-ui/transitions/Collapse';
import Button from 'material-ui/Button'



const mapDispatchToProps = dispatch => ({
  updateConstantName: (index, text) => ( dispatch( updateConstantName(index, text) ) ),
  updateConstantValue: (index, float) => ( dispatch( updateConstantValue(index, float) ) ),
  updateConstantDefault: (index, text) => ( dispatch( updateConstantDefault(index, text) ) ),
  updateConstantLabel: (index, text) => ( dispatch( updateConstantLabel(index, text) ) ),
  resolveConstantValue: (index) => ( dispatch(resolveConstantValue(index)) ),
  deleteConstant: (index) => ( dispatch(deleteConstant(index)) ),
  addCondition: (index) => ( dispatch(addCondition(index)) ),
})

const Value = ({ constant }) => (
  <h3>{ constant.value }</h3>
)

const CurrentCondition = ({ constant }) => (
  // Show current that is true, or show default.
  constant.trueConditionId ? (
    // Has true
    <div>
      {
        constant.conditions.find(condition => {
          return condition.id === constant.trueConditionId
        }).statement 
      }
    </div>
  ) : (
    <div>Default: { constant.default }</div>
  )
)

class ConnectedConstant extends React.Component {
  constructor(){
    super()
    this.state = { editing: false }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDefaultChange = this.handleDefaultChange.bind(this)
    this.handleLabelChange = this.handleLabelChange.bind(this)
    this.handleClickDelete = this.handleClickDelete.bind(this)
    this.handleClickAdd = this.handleClickAdd.bind(this)
  }

  componentDidMount(){
    // Check all conditions
    this.props.resolveConstantValue(this.props.index)
  }

  toggleEdit(){
    this.setState({ editing: !this.state.editing })
  }

  handleNameChange(event){
    this.props.updateConstantName(this.props.index, event.target.value)
  }  

  handleDefaultChange(event){
    this.props.updateConstantDefault(this.props.index, event.target.value)
  }

  handleClickDelete(){
    this.props.deleteConstant(this.props.index)
  }

  handleClickAdd(){
    this.props.addCondition(this.props.index)
  }

  handleLabelChange(event){
    this.props.updateConstantLabel(this.props.index, event.target.value)
  }

  render(){
    const constant = this.props.constant
    return <Card>
        <CardHeader 
          action={
            <Switch 
              checked={this.state.editing}
              onChange={this.toggleEdit}
            />
            }
          avatar={<Avatar>{ constant.name }</Avatar>}
          title={ constant.label }
          subheader={<CurrentCondition constant={constant} />}
        />
        <Collapse in={this.state.editing} timeout="auto" unmountOnExit>
          <CardContent>
            <TextField 
              label='Label'
              value={ constant.label }
              onChange={ this.handleLabelChange }
              />
            <TextField 
            label='Default Expression'
            value={ constant.default } onChange={ this.handleDefaultChange } />
            
            <TextField 
            label='Constant Name'
            value={ constant.name } onChange={ this.handleNameChange } />
            { 
              constant.conditions.map((condition, index) => {
            return <Condition condition={condition} key={condition.id} index_cond={index} index_const={this.props.index} />
              }) 
            }
            <Button color='secondary' onClick={ this.handleClickDelete }>Delete Constant</Button>
            <Button onClick={ this.handleClickAdd }>Add Condition</Button>
          </CardContent>
        </Collapse>
      </Card>
  }
}

const Constant = connect(null, mapDispatchToProps)(ConnectedConstant)


export default Constant