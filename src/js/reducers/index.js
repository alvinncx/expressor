// reducers
import initialState from '../store/init'
import { 
  updateKeyInArray,
  updateKey,
  resolveConstantValues
} from '../utils'
import { 
  UPDATE_TITLE, 
  UPDATE_DESCRIPTION,
  UPDATE_EXPRESSION,
  EVAL_EXPRESSION,
  UPDATE_VARIABLE_NAME,
  UPDATE_VARIABLE_VALUE,
  UPDATE_CONSTANT_NAME,
  RESOLVE_CONSTANT_VALUE,
} from "../constants/actionTypes"


// The reducer is a pure function that 
// takes the previous state and an action, and returns the next state.
const constantsReducer = function(state=[], action){
  switch (action.type){
    case UPDATE_CONSTANT_NAME:
      return updateKeyInArray(state, 'name', action.payload, action.index)
    case RESOLVE_CONSTANT_VALUE: 
      return updateKeyInArray(state, 'value', action.payload, action.index)
    case "UPDATE_CONDITION_EXPRESSION":
      return state.map((item, index_in) => {
        if (index_in !== action.index_const ) return item
        return {
          ...item,
          conditions: updateKeyInArray(item.conditions, 'statement', action.payload, action.index_cond)
        }
      })
    default:
      return state
  }
}

const variablesReducer = function(state=[], action){
  switch (action.type){
    case UPDATE_VARIABLE_NAME:
      return updateKeyInArray(state, 'name', action.payload, action.index)
    case UPDATE_VARIABLE_VALUE:
      return updateKeyInArray(state, 'value', action.payload, action.index)
    default:
      return state
  }
}

const expressionReducer = function(state={}, action){
  switch (action.type){
    case UPDATE_EXPRESSION:
      return updateKey(state, 'expression', action.payload)
    case EVAL_EXPRESSION:
      return updateKey(state, 'result', action.payload)
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
  console.log('[Action]', action.type, action.payload)
  return {
    ...state,
    meta: metaReducer(state.meta, action),
    expression: expressionReducer(state.expression, action),
    constants: constantsReducer(state.constants, action),
    variables: variablesReducer(state.variables, action)
  }
}


export default rootReducer