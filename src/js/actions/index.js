import math from "mathjs"
import uuidv1 from "uuid"
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
  ADD_VARIABLE,
  DELETE_VARIABLE,
  UPDATE_VARIABLE_NAME,
  UPDATE_VARIABLE_VALUE,
  UPDATE_VARIABLE_LABEL,
  UPDATE_CONSTANT_VALUE,
  UPDATE_CONSTANT_NAME,
  UPDATE_CONSTANT_LABEL,
  ADD_CONSTANT,
  DELETE_CONSTANT,
  UPDATE_CONSTANT_DEFAULT,
  UPDATE_CONDITION_EXPRESSION,
  UPDATE_CONDITION_STATEMENT,
  ADD_CONDITION,
  DELETE_CONDITION,
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

// Variables action
const addVariable = createAction(
  ADD_VARIABLE,
  function(){
    return { 
      id: uuidv1(), 
      name: "d", 
      value: 10 ,
      label: 'Displacement',
      // Configurations
      step: 10
    }
  }
)

// Constants
const deleteVariable = createAction(
  DELETE_VARIABLE,
  function(index){
    return { 
      index: index, 
    }
  }
)

const updateVariableName = (index, text) => {
  return {
    type: UPDATE_VARIABLE_NAME,
    index: index,
    payload: text 
  }
}

const updateVariableLabel = createAction(
  UPDATE_VARIABLE_LABEL,
  function(index, label){
    return {
      index: index,
      label: label
    }
  }
)

const updateVariableValue = (index, float) => {
  return {
    type: UPDATE_VARIABLE_VALUE,
    index: index,
    payload: float
  }
}

const addConstant = createAction(
  ADD_CONSTANT,
  function(){
    return { 
      id: uuidv1(), 
      name: "v", 
      // Derived from conditions
      value: 1.45 , 
      label: 'Velocity',
      // Configurations
      conditions: [
        // Assess security of these statements, maybe escape
        { id: uuidv1(), statement: "t < 0", expression: "10000" },
        { id: uuidv1(), statement: "0 <= t < 100", expression: "2" },
        { id: uuidv1(), statement: "100 <= t < 500", expression: "3" },
      ],
      trueConditionId: undefined,
      default: "3 t"
    }
  }
)

// Constants
const deleteConstant = createAction(
  DELETE_CONSTANT,
  function(index){
    return { 
      index: index, 
    }
  }
)

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

const updateConstantLabel = createAction(
  UPDATE_CONSTANT_LABEL,
  function(index, label){
    return {
      index: index,
      label: label
    }
  }
)

const updateConstantDefault = createAction(
  UPDATE_CONSTANT_DEFAULT,
  function(index, text){
    return {
      index: index,
      expression: text
    }
  }
)


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

const addCondition = createAction(
  ADD_CONDITION,
  function(index){
    return {
      index: index,
      condition: {
        id: uuidv1(), 
        statement: "t < 0", 
        expression: "10000"
      }
    }
  }
)

const deleteCondition = createAction(
  DELETE_CONDITION,
  function(index_cond, index_const){
    return {
      index_cond: index_cond, 
      index_const: index_const
    }
  }
)

const evaluateExpression = createAction(
  EVAL_EXPRESSION,
  // payload
  function(){
    const state = store.getState()
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
  
  addVariable,
  deleteVariable,
  updateVariableName,
  updateVariableValue,
  updateVariableLabel,
  
  updateConstantName,
  updateConstantValue,
  updateConstantDefault,
  updateConstantLabel,
  
  addConstant,
  deleteConstant,
  resolveConstantValue,
  resolveAllConstantValue,

  updateConditionExpression,
  updateConditionStatement,
  addCondition,
  deleteCondition,
}