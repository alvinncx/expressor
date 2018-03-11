import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from "./js/store/index"
import Reboot from 'material-ui/Reboot';


ReactDOM.render(
  <Provider store={store}>
    <div>
    <Reboot />
    <App />
    </div>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
