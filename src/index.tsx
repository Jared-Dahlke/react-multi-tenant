import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Material UI v4 has a known warning bug when using some menus components, such as the menu items on the AdminNavBarLinks component. Without using this ThemeProvider wrapper, AdminNavBarLinks component
// will issue a "Warning: findDOMNode is deprecated in StrictMode" warning when those menus are used. Per https://github.com/mui-org/material-ui/issues/13394, Material UI
// plans to fix this bug in V5, at which point we can upgrade to v5 then remove this wrapper. -Jared
import { unstable_createMuiStrictModeTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
