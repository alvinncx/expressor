import { 
  ADD_ARTICLE, 
  UPDATE_TITLE, 
  UPDATE_DESCRIPTION,
  UPDATE_EXPRESSION,
  EVAL_EXPRESSION,
  UPDATE_VARIABLE_NAME,
  UPDATE_VARIABLE_VALUE
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
  evaluateExpression,
  updateVariableName,
  updateVariableValue
}