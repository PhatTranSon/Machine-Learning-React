import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Bulma
import 'bulma/css/bulma.min.css';
//Css files for carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
