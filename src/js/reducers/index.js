// reducers
import initialState from '../store/init'
import math from "mathjs"
import { 
  reduceScope,
  updateObjectInCollection,
  resolveConstantValues
} from '../utils'
import { 
  ADD_ARTICLE, 
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
      return updateObjectInCollection(state, 'constants', 'name', action.payload, action.index) 
    case RESOLVE_CONSTANT_VALUE: 
      return resolveConstantValues(state, action)
    default:
      return state
  }
}

const variablesReducer = function(state=[], action){
  switch (action.type){
    case UPDATE_VARIABLE_NAME:
      return updateObjectInCollection(state, 'variables', 'name', action.payload, action.index) 
    case UPDATE_VARIABLE_VALUE:
      return updateObjectInCollection(state, 'variables', 'value', action.payload, action.index) 
    default:
      return state
  }
}

const expressionReducer = function(state=[], action){
  switch (action.type){
    case UPDATE_EXPRESSION:
      return {
        ...state,
        expression: {
          ...state.expression,
          expression: action.payload
        }
      }
    case EVAL_EXPRESSION:
      return {
        ...state,
        expression: {
          ...state.expression,
          result: math.eval(state.expression.expression, reduceScope(state.variables, state.constants))
        }
      }
    default:
      return state
  }
}

const metaReducer = function(state=[], action){
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        meta: {
          ...state.meta,
          title: action.payload
        }
      }
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        meta: {
          ...state.meta,
          description: action.payload
        }
      }
    default:
      return state
    }
}

// Every reducer takes a state and action
const rootReducer = (state=initialState, action) => {
  console.log('[Action]', action.type, action.payload)
  return {
    ...state,
    meta: metaReducer(state, action).meta,
    expression: expressionReducer(state, action).expression,
    constants: constantsReducer(state, action).constants,
    variables: variablesReducer(state, action).variables
  }
}


export default rootReducer