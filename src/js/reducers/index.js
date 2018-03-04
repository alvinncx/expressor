// reducers
import uuidv1 from "uuid"
import math from "mathjs"
import { 
  ADD_ARTICLE, 
  UPDATE_TITLE, 
  UPDATE_DESCRIPTION,
  UPDATE_EXPRESSION,
  EVAL_EXPRESSION
} from "../constants/actionTypes"



const initialState = {
  meta: {
    title: "Calculator",
    description: "This is an awesome programmable calculator!"
  },
  variables: [
    { 
      id: uuidv1(), 
      name: "t", 
      value: 30 , 
      label: 'Time',
      type: 'variable',
      config: {
        step: 10
      }
    },
    { 
      id: uuidv1(), 
      name: "C", 
      value: 1.45 , 
      label: 'Constant',
      type: 'conditional',
      // Only takes one configuration
      config: {
        conditions: [
          // Assess security of these statements, maybe escape
          { id: uuidv1(), statement: "d < 0", value: "0" },
          { id: uuidv1(), statement: "0 <= d < 100", value: "1.45 * t" },
          { id: uuidv1(), statement: "100 <= d < 500", value: "2.58" },
        ],
        current_true_id: undefined,
        default: "3 t"
      }
    }
  ],
  expression: {
    expression: "C * t",
    result: 0,
  }
}

function reduceScope (listOfVariables){
  let scope = {}
  listOfVariables.forEach(variable => {
    scope[variable.name] = Number(variable.value)
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
          result: math.eval(state.expression.expression, reduceScope(state.variables))
        }
      }
    default:
      return state
  }
}


export default rootReducer