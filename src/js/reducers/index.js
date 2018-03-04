// reducers
import initialState from '../store/init'
import math from "mathjs"
import { 
  ADD_ARTICLE, 
  UPDATE_TITLE, 
  UPDATE_DESCRIPTION,
  UPDATE_EXPRESSION,
  EVAL_EXPRESSION,
  UPDATE_VARIABLE_NAME,
  UPDATE_VARIABLE_VALUE,
  UPDATE_CONSTANT_VALUE,
  UPDATE_CONSTANT_NAME
} from "../constants/actionTypes"


function reduceScope (variables, constants){
  let scope = {}
  variables.forEach(variable => {
    scope[variable.name] = Number(variable.value)
  })
  constants.forEach(constant => {
    scope[constant.name] = Number(constant.value)
  })
  return scope
}

// The reducer is a pure function that 
// takes the previous state and an action, and returns the next state.

// Every reducer takes a state and action
const rootReducer = (state=initialState, action) => {
  console.log('action received', action)
  switch (action.type) {
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload ]
      }
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
    case UPDATE_VARIABLE_NAME:
      return {
        ...state,
        variables: state.variables.map((item, index) => {
          if (index !== action.index) return item
          return {
            ...item,
            name: action.payload
          }
        })
      }
    case UPDATE_VARIABLE_VALUE:
      return {
        ...state,
        variables: state.variables.map((item, index) => {
          if (index !== action.index) return item
          return {
            ...item,
            value: action.payload
          }
        })
      }
    case UPDATE_CONSTANT_NAME:
      return {
        ...state,
        constants: state.constants.map((item, index) => {
          if (index !== action.index) return item
          return {
            ...item,
            name: action.payload
          }
        })
      }
    case UPDATE_CONSTANT_VALUE:
      return {
        ...state,
        constants: state.constants.map((item, index) => {
          if (index !== action.index) return item
          return {
            ...item,
            value: action.payload
          }
        })
      }

    default:
      return state
  }
}


export default rootReducer