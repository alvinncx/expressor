import React from 'react';
import { connect } from "react-redux";


const mapStateToProps = (state) => {
  return { 
    articles: state.articles
  }
}

// Functional component React
const ConnectedList = ({ articles }) => (
  articles.length == 0 
  ? 
  // No articles found
  <p>No articles</p> 
  :
  // Articles found
  <ul>
    { articles.map(el => (
        <li key={el.id}>
          { el.title }
        </li>
          )
      ) }
  </ul>

)


const List = connect(mapStateToProps)(ConnectedList);


export { List };