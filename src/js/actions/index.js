import { 
  ADD_ARTICLE, 
  UPDATE_TITLE, 
  UPDATE_DESCRIPTION,
  UPDATE_EXPRESSION,
  EVAL_EXPRESSION
} from "../constants/actionTypes"

// Actions are payloads of information that send data 
// from your application to your store. 
// 
// They are the only source of information for the store.
// You send them to the store using store.dispatch().

const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    payload: article
  }
}

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

const evaluateExpression = () => {
  return {
    type: EVAL_EXPRESSION
  }
}

export { 
  addArticle, 
  updateTitle, 
  updateDescription,
  updateExpression,
  evaluateExpression
}