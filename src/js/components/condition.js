import React from "react"
import { connect } from "react-redux"
import { 
  updateConditionExpression,
  updateConditionStatement
 } from "../actions"

const mapDispatchToProps = dispatch => ({
  updateConditionStatement: (index_cond,index_const,text) => ( dispatch( updateConditionStatement(index_cond,index_const, text) ) ),
  updateConditionExpression: (index_cond,index_const,text) => ( dispatch( updateConditionExpression(index_cond,index_const, text) ) )
})

class ConnectedCondition extends React.Component {
  constructor(){
    super()
    this.handleStatementChange = this.handleStatementChange.bind(this)
    this.handleExpressionChange = this.handleExpressionChange.bind(this)
  }

  handleStatementChange(event){
    this.props.updateConditionStatement(this.props.index_cond,this.props.index_const, event.target.value)
  }
  handleExpressionChange(event){
    this.props.updateConditionExpression(this.props.index_cond,this.props.index_const, event.target.value)
  }

  render(){
    const condition = this.props.condition
    return (
      <div>
      <input value={ condition.statement } onChange={ this.handleStatementChange } />
      <input value={ condition.expression } onChange={ this.handleExpressionChange } />
      </div>
    )
  }
}

const Condition = connect(null, mapDispatchToProps)(ConnectedCondition)


export default Condition