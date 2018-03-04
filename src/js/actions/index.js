import { ADD_ARTICLE, UPDATE_TITLE, UPDATE_DESCRIPTION } from "../constants/actionTypes"

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

export { addArticle, updateTitle, updateDescription }