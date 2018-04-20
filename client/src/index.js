import React from 'react';
import ReactDOM from 'react-dom';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import './index.css';
import App from './App';
import Landing from './Landing';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Landing />, document.getElementById('root'));
registerServiceWorker();
