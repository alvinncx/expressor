import { 
  updateKeyInArray,
  updateKey,
} from '../utils'
import { 
  ADD_VARIABLE,
  DELETE_VARIABLE,
  UPDATE_VARIABLE_NAME,
  UPDATE_VARIABLE_VALUE,
} from "../constants/actionTypes"


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