import React, { Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute.js'
import { Provider } from 'react-redux'
import configureStore from './redux/store/index.js'
import { neutralColor } from './assets/jss/colorContants'
//import Admin from '../src/layouts/Admin.js'

const Admin = lazy(() => import('../src/layouts/Admin'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const ChangePassword = lazy(() => import('./pages/ChangePassword'))
const Login = lazy(() => import('./pages/Login'))

const store = configureStore()

const LoaderPage = () => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: neutralColor,
			height: '100vh',
			color: 'white'
		}}
	>
		<div>Loading...</div>
	</div>
)

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Suspense fallback={<LoaderPage />}>
						<Route exact path='/' component={Login} />
						<Route path='/login' component={Login} />
					</Suspense>

					<Suspense fallback={<LoaderPage />}>
						<Route path='/resetPassword' component={ResetPassword} />
					</Suspense>

					<Suspense fallback={<LoaderPage />}>
						<Route
							path='/changePassword/:userId/:token'
							render={({ match }) => (
								<ChangePassword
									userId={match.params.userId}
									token={match.params.token}
								/>
							)}
						/>
					</Suspense>
					<Suspense fallback={<LoaderPage />}>
						<PrivateRoute path='/admin' component={Admin} />
					</Suspense>
				</div>
			</Router>
		</Provider>
	)
}

export default App
