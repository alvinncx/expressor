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
  RESOLVE_CONSTANT_VALUE
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

const resolveConstantValue = (index) => {
  const state = store.getState()
  return {
    type: RESOLVE_CONSTANT_VALUE,
    index: index,
    payload: resolveConditions(
      getConstants(state)[index], 
      getScope(state)).value
  } 
}

const updateConditionExpression = (index_cond,index_const, text) => {
  return {
    type: "UPDATE_CONDITION_EXPRESSION",
    index_cond: index_cond,
    index_const: index_const,
    payload: text,
  } 
}

// ACTION CREATORS
const evaluateExpression = createAction(
  "EVAL_EXPRESSION",
  // payload
  function(){
    const state = store.getState()
    return math.eval(getExpression(state), getScope(state))
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
  updateConditionExpression
}