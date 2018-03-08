import math from "mathjs"
import { createAction } from 'redux-actions';
import { 
  getScope,
  getConstants,
  getExpression
 } from '../selectors'
import store from "../store"
import { resolveConditions } from '../utils'
import { 
  UPDATE_TITLE, 
  UPDATE_DESCRIPTION,
  UPDATE_EXPRESSION,
  EVAL_EXPRESSION,
  UPDATE_VARIABLE_NAME,
  UPDATE_VARIABLE_VALUE,
  UPDATE_CONSTANT_VALUE,
  UPDATE_CONSTANT_NAME,
  UPDATE_CONDITION_EXPRESSION,
  UPDATE_CONDITION_STATEMENT,
  RESOLVE_CONSTANT_VALUE,
  RESOLVE_ALL_CONSTANT_VALUE
} from "../constants/actionTypes"

// Actions are payloads of information that send data 
// from your application to your store. 
// 
// They are the only source of information for the store.
// You send them to the store using store.dispatch().

const updateTitle = (text) => {
  return {
    type: UPDATE_TITLE,
    payload: text
  }
}

const updateDescription = (text) => {
  return {
    type: UPDATE_DESCRIPTION,
    payload: text
  }
}

const updateExpression = (text) => {
  return {
    type: UPDATE_EXPRESSION,
    payload: text
  }
}

const updateVariableName = (index, text) => {
  return {
    type: UPDATE_VARIABLE_NAME,
    index: index,
    payload: text 
  }
}

const updateVariableValue = (index, float) => {
  return {
    type: UPDATE_VARIABLE_VALUE,
    index: index,
    payload: float
  }
}

const updateConstantName = (index, text) => {
  return {
    type: UPDATE_CONSTANT_NAME,
    index: index,
    payload: text 
  }
}

const updateConstantValue = (index, float) => {
  return {
    type: UPDATE_CONSTANT_VALUE,
    index: index,
    payload: float
  }
}

const resolveConstantValue = createAction(
  RESOLVE_CONSTANT_VALUE,
  function(index){
    const state = store.getState()
    const constants = getConstants(state)
    const scope = getScope(state)
    return {
      ...resolveConditions(constants[index], scope),
      index: index,
    }
  }
)

const resolveAllConstantValue = createAction(
  RESOLVE_ALL_CONSTANT_VALUE,
  function(index){
    const state = store.getState()
    const constants = getConstants(state)
    const scope = getScope(state)
    return {
      constants: constants.map((constant, index) => {
        return {
          ...resolveConditions(constant, scope),
          index: index
        }
      }),
    }
  }
)

const updateConditionStatement = createAction(
  UPDATE_CONDITION_STATEMENT,
  function(index_cond, index_const, text){
    return {
      index_cond: index_cond,
      index_const: index_const,
      statement: text
    }
  }
)

const updateConditionExpression = createAction(
  UPDATE_CONDITION_EXPRESSION,
  function(index_cond, index_const, text){
    return {
      index_cond: index_cond,
      index_const: index_const,
      expression: text
    }
  }
)

const evaluateExpression = createAction(
  EVAL_EXPRESSION,
  // payload
  function(){
    const state = store.getState()
    const constants = getConstants(state)
    const scope = getScope(state)
    
    // to do, spilt into 2.
    //  stablise the state of constants first
    // then evaluate expression

    return {
      expression: {
        result: math.eval(getExpression(state), getScope(state))
      }
    }
  }
)

export { 
  updateTitle, 
  updateDescription,
  updateExpression,
  evaluateExpression,
  updateVariableName,
  updateVariableValue,
  updateConstantName,
  updateConstantValue,
  resolveConstantValue,
  resolveAllConstantValue,
  updateConditionExpression,
  updateConditionStatement,
}