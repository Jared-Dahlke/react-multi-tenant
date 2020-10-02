import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import config from './config.js'

// Material UI v4 has a known warning bug when using some menus components, such as the menu items on the AdminNavBarLinks component. Without using this ThemeProvider wrapper, AdminNavBarLinks component
// will issue a "Warning: findDOMNode is deprecated in StrictMode" warning when those menus are used. Per https://github.com/mui-org/material-ui/issues/13394, Material UI
// plans to fix this bug in V5, at which point we can upgrade to v5 then remove this wrapper. -Jared
import { unstable_createMuiStrictModeTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = unstable_createMuiStrictModeTheme();

if (config.environment !== 'development') {
  
  Sentry.init({
    dsn: "https://ec9bc948c2ff4bd882a2fd3bd680317a@o450548.ingest.sentry.io/5435111",
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
  });

}


ReactDOM.render(
  
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
