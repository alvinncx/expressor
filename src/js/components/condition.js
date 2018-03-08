import React from "react"
import { connect } from "react-redux"
import { 
  updateConditionExpression,
  updateConditionStatement,
  deleteCondition,
 } from "../actions"

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
      <input value={ condition.statement } onChange={ this.handleStatementChange } />
      <input value={ condition.expression } onChange={ this.handleExpressionChange } />
      <button onClick={ this.handleClickDelete }>X</button>
      </div>
    )
  }
}

const Condition = connect(null, mapDispatchToProps)(ConnectedCondition)


export default Condition