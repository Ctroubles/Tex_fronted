import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store';
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_DOMAIN_AUTH0;
const clientId = process.env.REACT_APP_CLIENT_ID_AUTH0;


const options = {
   logo: "https://res.cloudinary.com/dmv0gnlcu/image/upload/v1679787401/Tex_logos/LOGO_MINIMAL_euywjz.png",
};
 

ReactDOM.render(
  <Provider store={store}>
     <React.StrictMode>
      <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={document.referrer}
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

