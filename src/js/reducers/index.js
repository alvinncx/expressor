// reducers
import initialState from '../store/init'
import math from "mathjs"
import { 
  reduceScope,
  updateObjectInCollection,
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
const constantsReducer = function(state=[], action, scope){
  switch (action.type){
    case UPDATE_CONSTANT_NAME:
      return updateObjectInCollection(state, 'name', action.payload, action.index)
    case RESOLVE_CONSTANT_VALUE: 
      return resolveConstantValues(state, action, scope)
    default:
      return state
  }
}

const variablesReducer = function(state=[], action){
  switch (action.type){
    case UPDATE_VARIABLE_NAME:
      return updateObjectInCollection(state, 'name', action.payload, action.index)
    case UPDATE_VARIABLE_VALUE:
      return updateObjectInCollection(state, 'value', action.payload, action.index)
    default:
      return state
  }
}

const expressionReducer = function(state=[], action, scope){
  switch (action.type){
    case UPDATE_EXPRESSION:
      return updateKey(state, 'expression', action.payload)
    case EVAL_EXPRESSION:
      return {
        ...state,
        result: math.eval(state.expression, scope)
      }
    default:
      return state
  }
}

const metaReducer = function(state=[], action){
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
  const scope = reduceScope(state.variables, state.constants)
  return {
    ...state,
    meta: metaReducer(state.meta, action),
    expression: expressionReducer(state.expression, action, scope),
    constants: constantsReducer(state.constants, action, scope),
    variables: variablesReducer(state.variables, action)
  }
}


export default rootReducer