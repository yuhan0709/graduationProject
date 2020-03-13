import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import PageConfig from './page';
import './global.less';


ReactDOM.render(<Router config={PageConfig} />, document.getElementById("root"));