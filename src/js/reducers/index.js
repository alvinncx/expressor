// reducers
import initialState from '../store/init'
import { 
  updateKeyInArray,
  updateKey,
} from '../utils'
import { 
  UPDATE_TITLE, 
  UPDATE_DESCRIPTION,
  UPDATE_EXPRESSION,
  EVAL_EXPRESSION,
  ADD_VARIABLE,
  UPDATE_VARIABLE_NAME,
  UPDATE_VARIABLE_VALUE,
  UPDATE_CONSTANT_NAME,
  RESOLVE_CONSTANT_VALUE,
  UPDATE_CONSTANT_DEFAULT,
  ADD_CONSTANT,
  RESOLVE_ALL_CONSTANT_VALUE,
  UPDATE_CONDITION_EXPRESSION,
  UPDATE_CONDITION_STATEMENT
} from "../constants/actionTypes"
import constantsReducer from "./constant"
import variablesReducer from "./variable"


// The reducer is a pure function that 
// takes the previous state and an action, and returns the next state.

const expressionReducer = function(state={}, action){
  switch (action.type){
    case UPDATE_EXPRESSION:
      return updateKey(state, 'expression', action.payload)
    case EVAL_EXPRESSION:
      return updateKey(state, 'result', action.payload.expression.result)
    default:
      return state
  }
}

const metaReducer = function(state={}, action){
  switch (action.type) {
    case UPDATE_TITLE:
      return updateKey(state, 'title', action.payload)
    case UPDATE_DESCRIPTION:
      return updateKey(state, 'description', action.payload)
    default:
      return state
    }
}

// Every reducer takes a state and action
const rootReducer = (state=initialState, action) => {
  return {
    ...state,
    meta: metaReducer(state.meta, action),
    expression: expressionReducer(state.expression, action),
    constants: constantsReducer(state.constants, action),
    variables: variablesReducer(state.variables, action)
  }
}


export default rootReducer