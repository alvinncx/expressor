import React from 'react';
import { connect } from "react-redux";
import { 
  addVariable,
  addConstant
} from '../actions'
import ReactGA from 'react-ga';
import Variable from './variable'
import Constant from './constant'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

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
    ReactGA.event({ category: 'User', action: 'Add Variable' });
  }  

  handleClickAddConstant(){
    this.props.addConstant()
    ReactGA.event({ category: 'User', action: 'Add Constant' });
  }

  render(){
    return (<div>
        <Typography variant="subheading" color="inherit" style={{ padding: "1em"}}>
          Variables
        </Typography>
        <div>
          { this.props.variables.map( (el, index) => (
              <Variable variable={el} key={el.id} index={index} />
                )
            ) }
          <Button color="primary" onClick={ this.handleClickAddVariable }>Add New Variable</Button>
        </div>
        <Typography variant="subheading" color="inherit" style={{ padding: "1em"}}>
          Constants
        </Typography>
        <div>
          { this.props.constants.map( (el, index) => (
              <Constant constant={el} key={el.id} index={index} />
                )
            ) }
          <Button color="primary" onClick={ this.handleClickAddConstant }>Add New Constant</Button>
        </div>
      </div>
    )
  }
}

const VariableList = connect(mapStateToProps, mapDispatchToProps)(ConnectedVariableList);


export default VariableList