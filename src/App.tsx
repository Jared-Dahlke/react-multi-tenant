import React, { Suspense, lazy } from 'react';
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute.js'
import { Provider } from 'react-redux'
import configureStore from './redux/store/index.js'
import Main from '../src/layouts/Main.js'
import { routes } from './routes'
import Loading from '../src/views/Loading.js'


//lazy load component
const AdminLayout = lazy(() => import('../src/layouts/AdminLayout.js'));

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
					<Suspense fallback={<Loading/>}>
						<Route
							path={routes.admin.path}
							component={AdminLayout}
						/>
					</Suspense>

					<PrivateRoute path={routes.app.path} component={Main} />
				</div>
			</Router>
		</Provider>
	)
}

export default App
