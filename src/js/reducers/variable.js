import dotProp from'dot-prop-immutable'
import { 
  ADD_VARIABLE,
  DELETE_VARIABLE,
  UPDATE_VARIABLE_NAME,
  UPDATE_VARIABLE_VALUE,
} from "../constants/actionTypes"


const variablesReducer = function(state=[], action){
  switch (action.type){
    case UPDATE_VARIABLE_NAME:
      return dotProp.set(state, `${action.index}.name`, action.payload)
    case UPDATE_VARIABLE_VALUE:
      return dotProp.set(state, `${action.index}.value`, action.payload)
    case ADD_VARIABLE:
      return [
        ...state,
        action.payload
      ]
    case DELETE_VARIABLE:
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1)
      ]
    default:
      return state
  }
}


export default variablesReducer