// reducers
import initialState from '../store/init'
import math from "mathjs"
import { 
  reduceScope,
  resolveConditions
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

const resolveConstantValues = (state, action) => (
  {
    ...state,
    constants: state.constants.map((item, index) => {
      if (index !== action.index) return item
      return {
        ...resolveConditions(item, reduceScope(state.variables, state.constants)),
      }
    })
  }
)

function updateObjectInCollection(state, collection, key, value, index) {
  return {
    ...state,
    [collection]: state[collection].map((item, index_in) => {
      if (index_in !== index) return item
      return {
        ...item,
        [key]: value
      }
    })
  }
}


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
      return updateObjectInCollection(state, 'variables', 'name', action.payload, action.index) 
    case UPDATE_VARIABLE_VALUE:
      return updateObjectInCollection(state, 'variables', 'value', action.payload, action.index) 
    case UPDATE_CONSTANT_NAME:
      return updateObjectInCollection(state, 'constants', 'name', action.payload, action.index) 
    case RESOLVE_CONSTANT_VALUE: 
      return resolveConstantValues(state, action)
    default:
      return state
  }
}


export default rootReducer