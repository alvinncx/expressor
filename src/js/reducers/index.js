import { ADD_ARTICLE, UPDATE_TITLE, UPDATE_DESCRIPTION } from "../constants/actionTypes"


const initialState = {
  meta: {
    title: "Calculator",
    description: "This is a general calcultor"
  },
  articles: [
    {id: 1, title: 'wtf is this'}
  ]
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
    default:
      return state
  }
}


export default rootReducer