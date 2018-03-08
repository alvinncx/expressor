import React from "react"
import { connect } from "react-redux"
import { 
  updateConstantName,
  updateConstantValue,
  updateConstantDefault,
  resolveConstantValue,
  deleteConstant,
  addCondition
 } from "../actions"
 import Condition from "./condition"

const mapDispatchToProps = dispatch => ({
  updateConstantName: (index, text) => ( dispatch( updateConstantName(index, text) ) ),
  updateConstantValue: (index, float) => ( dispatch( updateConstantValue(index, float) ) ),
  updateConstantDefault: (index, text) => ( dispatch( updateConstantDefault(index, text) ) ),
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
      Current statement: 
      {
        constant.conditions.find(condition => {
          return condition.id === constant.trueConditionId
        }).statement 
      }
    </div>
  ) : (
    <div>
      <p>Current statement: { constant.default }</p>
    </div>
  )
)

class ConnectedConstant extends React.Component {
  constructor(){
    super()
    this.state = { editing: false }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDefaultChange = this.handleDefaultChange.bind(this)
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

  render(){
    const constant = this.props.constant
    return this.state.editing ? ( 
      <div>
        <Value constant={ constant } index={this.props.index} />
        <input value={ constant.name } onChange={ this.handleNameChange } />
          { constant.conditions.map((condition, index) => {
            return <Condition condition={condition} key={condition.id} index_cond={index} index_const={this.props.index} />
          }) }
        <div>
          Default
          <input value={ constant.default } onChange={ this.handleDefaultChange } />
        </div>
        <button onClick={ this.toggleEdit }>Save</button>
        <button onClick={ this.handleClickDelete }>Delete</button>
        <button onClick={ this.handleClickAdd }>Add Condition</button>
      </div>
      ): (
      <div>
        <Value constant={ constant } index={this.props.index} />
        <h3>{ constant.name }</h3>
        <p>{ constant.label }</p>
        <CurrentCondition constant={constant} />
        <button onClick={ this.toggleEdit }>Edit</button>
      </div>
    )
  }
}

const Constant = connect(null, mapDispatchToProps)(ConnectedConstant)


export default Constant