import React from 'react';
import { connect } from "react-redux";
import Variable from './variable'
import Constant from './constant'

const mapStateToProps = (state) => {
  return { 
    variables: state.variables,
    constants: state.constants
  }
}

// Functional component React
const ConnectedVariableList = ({ variables, constants }) => (
  <div>
    <div>
      { variables.map( (el, index) => (
          <Variable variable={el} key={el.id} index={index} />
            )
        ) }
    </div>
    <div>
      { constants.map( (el, index) => (
          <Constant constant={el} key={el.id} index={index} />
            )
        ) }
    </div>
  </div>

)

const VariableList = connect(mapStateToProps)(ConnectedVariableList);


export default VariableList