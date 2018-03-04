import React from "react"
import { connect } from "react-redux"
import { 
  updateConstantName,
  updateConstantValue,
  resolveConstantValue
 } from "../actions"

const mapDispatchToProps = dispatch => ({
  updateConstantName: (index, text) => ( dispatch( updateConstantName(index, text) ) ),
  updateConstantValue: (index, float) => ( dispatch( updateConstantValue(index, float) ) ),
  resolveConstantValue: (index) => ( dispatch(resolveConstantValue(index)) )
})

const Value = ({ constant }) => (
  <h3>{ constant.value }</h3>
)


class Condition extends React.Component {
  render(){
    const condition = this.props.condition
    return (
      <input value={ condition.statement } />
    )
  }
}

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
  }

  componentDidMount(){
    // Check all conditions
    console.log('constant component mount: check conditions', this.props.index)
    this.props.resolveConstantValue(this.props.index)
  }

  toggleEdit(){
    this.setState({ editing: !this.state.editing })
  }

  handleNameChange(event){
    this.props.updateConstantName(this.props.index, event.target.value)
  }

  render(){
    const constant = this.props.constant
    return this.state.editing ? ( 
      <div>
        <Value constant={ constant } index={this.props.index} />
        <input value={ constant.name } onChange={ this.handleNameChange } />
          { constant.conditions.map((condition, index) => {
            return <Condition condition={condition} key={condition.id} index={index} />
          }) }
        <div>
          Default
          <input value={ constant.default } />
        </div>
        <button onClick={ this.toggleEdit }>Save</button>
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