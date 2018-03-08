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


// The reducer is a pure function that 
// takes the previous state and an action, and returns the next state.
const constantsReducer = function(state=[], action){
  switch (action.type){
    case UPDATE_CONSTANT_NAME:
      return updateKeyInArray(state, 'name', action.payload, action.index)
    case UPDATE_CONSTANT_DEFAULT:
      return updateKeyInArray(state, 'default', action.payload.expression, action.payload.index)
    case RESOLVE_CONSTANT_VALUE: 
      return state.map((item, index) => {
        if (index !== action.payload.index) return item
        return {
          ...item,
          value: action.payload.value,
          trueConditionId: action.payload.trueConditionId
        }
      })
    case UPDATE_CONDITION_STATEMENT:
      return state.map((item, index_in) => {
        if (index_in !== action.payload.index_const ) return item
        return {
          ...item,
          conditions: updateKeyInArray(item.conditions, 'statement', action.payload.statement, action.payload.index_cond)
        }
      })
    case UPDATE_CONDITION_EXPRESSION:
      return state.map((item, index_in) => {
        if (index_in !== action.payload.index_const ) return item
        return {
          ...item,
          conditions: updateKeyInArray(item.conditions, 'expression', action.payload.expression, action.payload.index_cond)
        }
      })
    case RESOLVE_ALL_CONSTANT_VALUE:
      return state.map((constant, index) => {
        const found = action.payload.constants.find(item => {
          return item.index === index
        })
        if (!found) return constant
        return {
          ...constant,
          value: found.value,
          trueConditionId: found.trueConditionId
        }
      })
    case ADD_CONSTANT: 
      return [
        ...state,
        action.payload
      ]
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
    case ADD_VARIABLE:
      return [
        ...state,
        action.payload
      ]
    default:
      return state
  }
}

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