import { 
  updateKeyInArray,
} from '../utils'
import { 
  UPDATE_CONSTANT_NAME,
  RESOLVE_CONSTANT_VALUE,
  UPDATE_CONSTANT_DEFAULT,
  ADD_CONSTANT,
  DELETE_CONSTANT,
  RESOLVE_ALL_CONSTANT_VALUE,
  UPDATE_CONDITION_EXPRESSION,
  UPDATE_CONDITION_STATEMENT,
  ADD_CONDITION,
  DELETE_CONDITION
} from "../constants/actionTypes"

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
    case DELETE_CONSTANT:
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1)
      ]
    case DELETE_CONDITION:
      return state.map((item, index_in) => {
        if (index_in !== action.payload.index_const ) return item
        return {
          ...item,
          conditions: [
            ...item.conditions.slice(0, action.payload.index_cond),
            ...item.conditions.slice(action.payload.index_cond + 1)
          ]
        }
      })
    case ADD_CONDITION:
      return state.map((item, index_in) => {
        if (index_in !== action.payload.index ) return item
        return {
          ...item,
          conditions: [
            ...item.conditions,
            action.payload.condition
          ]
        }
      })
    default:
      return state
  }
}

export default constantsReducer