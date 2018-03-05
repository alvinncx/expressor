import React from "react"
import { connect } from "react-redux"
import { 
  updateConditionExpression,
 } from "../actions"

const mapDispatchToProps = dispatch => ({
  updateConditionExpression: (index_cond,index_const,text) => ( dispatch( updateConditionExpression(index_cond,index_const, text) ) ),
})

class ConnectedCondition extends React.Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    console.log(this.props)
    this.props.updateConditionExpression(this.props.index_cond,this.props.index_const, event.target.value)
  }

  render(){
    const condition = this.props.condition
    return (
      <input value={ condition.statement } onChange={ this.handleChange } />
    )
  }
}

const Condition = connect(null, mapDispatchToProps)(ConnectedCondition)


export default Condition