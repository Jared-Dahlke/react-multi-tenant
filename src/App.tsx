import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute.js'
import { Provider } from 'react-redux'
import configureStore from './redux/store/index.js'
import Main from '../src/layouts/Main.js'
import { routes } from './routes'

const store = configureStore()

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Route exact path='/' component={routes.login.component} />
					<Route path={routes.login.path} component={routes.login.component} />

					<Route
						path={routes.resetPassword.path}
						component={routes.resetPassword.component}
					/>

					<Route
						path={routes.changePassword.path}
						component={routes.changePassword.component}
					/>

					<PrivateRoute path={routes.app.path} component={Main} />
				</div>
			</Router>
		</Provider>
	)
}

export default App
