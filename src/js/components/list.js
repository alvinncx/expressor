import React from 'react';
import { connect } from "react-redux";
import Variable from './variable'

const mapStateToProps = (state) => {
  return { 
    variables: state.variables
  }
}

// Functional component React
const ConnectedVariableList = ({ variables }) => (
  variables.length == 0 
  ? 
  // No articles found
  <p>No variables</p> 
  :
  // Articles found
  <div>
    { variables.map( (el, index) => (
        <Variable variable={el} key={el.id} index={index} />
          )
      ) }
  </div>

)

const VariableList = connect(mapStateToProps)(ConnectedVariableList);


export default VariableList