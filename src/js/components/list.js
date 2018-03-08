import React from 'react';
import { connect } from "react-redux";
import { 
  addVariable,
  addConstant
} from '../actions'
import Variable from './variable'
import Constant from './constant'

const mapStateToProps = (state) => {
  return { 
    variables: state.variables,
    constants: state.constants
  }
}

const mapDispatchToProps = dispatch => ({
  // Inner props  :  external actions to dispatch
  addVariable: () => ( 
    dispatch(addVariable())
  ),  
  addConstant: () => ( 
    dispatch(addConstant())
  ),
})

class ConnectedVariableList extends React.Component {
  constructor(){
    super()
    this.handleClickAddVariable = this.handleClickAddVariable.bind(this)
    this.handleClickAddConstant = this.handleClickAddConstant.bind(this)
  }

  handleClickAddVariable(){
    this.props.addVariable()
  }  

  handleClickAddConstant(){
    this.props.addConstant()
  }

  render(){
    return (<div>
        <div>
          { this.props.variables.map( (el, index) => (
              <Variable variable={el} key={el.id} index={index} />
                )
            ) }
          <button onClick={ this.handleClickAddVariable }>Add Variable</button>
        </div>
        <div>
          { this.props.constants.map( (el, index) => (
              <Constant constant={el} key={el.id} index={index} />
                )
            ) }
          <button onClick={ this.handleClickAddConstant }>Add Constant</button>
        </div>
      </div>
    )
  }
}

const VariableList = connect(mapStateToProps, mapDispatchToProps)(ConnectedVariableList);


export default VariableList