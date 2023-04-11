import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store';
import { Auth0Provider } from "@auth0/auth0-react";
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.100.5:3001/';

const options = {
   logo: "https://res.cloudinary.com/dmv0gnlcu/image/upload/v1679787401/Tex_logos/LOGO_MINIMAL_euywjz.png",
 };
 
ReactDOM.render(
  <Provider store={store}>
     <React.StrictMode>
      <Auth0Provider
      domain="dev-7wln408r6z54drbc.us.auth0.com"
      clientId="uKUn6EjbNFacbwJYWQrRdqzJHhUTi0i0"
      redirectUri={window.location.origin}
      options={options}

      >
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Auth0Provider>
     </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

