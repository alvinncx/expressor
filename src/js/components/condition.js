import React from "react"
import { connect } from "react-redux"
import { 
  updateConditionExpression,
  updateConditionStatement,
  deleteCondition,
} from "../actions"
import TextField from 'material-ui/TextField'
import DeleteIcon from 'material-ui-icons/Delete'
import IconButton from 'material-ui/IconButton'

const mapDispatchToProps = dispatch => ({
  updateConditionStatement: (index_cond,index_const,text) => ( dispatch( updateConditionStatement(index_cond,index_const, text) ) ),
  updateConditionExpression: (index_cond,index_const,text) => ( dispatch( updateConditionExpression(index_cond,index_const, text) ) ),
  deleteCondition: (index_cond, index_const) => ( dispatch( deleteCondition(index_cond,index_const) ) ),
})

class ConnectedCondition extends React.Component {
  constructor(){
    super()
    this.handleStatementChange = this.handleStatementChange.bind(this)
    this.handleExpressionChange = this.handleExpressionChange.bind(this)
    this.handleClickDelete = this.handleClickDelete.bind(this)
  }

  handleStatementChange(event){
    this.props.updateConditionStatement(this.props.index_cond,this.props.index_const, event.target.value)
  }
  handleExpressionChange(event){
    this.props.updateConditionExpression(this.props.index_cond,this.props.index_const, event.target.value)
  }
  handleClickDelete(){
    this.props.deleteCondition(this.props.index_cond, this.props.index_const)
  }

  render(){
    const condition = this.props.condition
    return (
      <div>
      <TextField 
        margin='normal'
        label='Condition'
        value={ condition.statement } onChange={ this.handleStatementChange } />
      <TextField 
        margin='normal'
        label='Expression'
        value={ condition.expression } onChange={ this.handleExpressionChange } />
      <IconButton onClick={ this.handleClickDelete }>
        <DeleteIcon />
      </IconButton>
      </div>
    )
  }
}

const Condition = connect(null, mapDispatchToProps)(ConnectedCondition)


export default Condition