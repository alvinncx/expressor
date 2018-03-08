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