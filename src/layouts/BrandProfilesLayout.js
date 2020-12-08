import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import { Route } from 'react-router-dom'
import { routes } from '../routes'
import { userCan, perms } from '../Can'

const BrandProfilesLayout = () => {
	return (
		<Route
			path={routes.app.settings.brandProfiles.path}
			render={({ match: { url } }) => (
				<>
					<ProtectedRoute
						path={routes.app.settings.brandProfiles.path}
						component={routes.app.settings.brandProfiles.component}
						canView={userCan(perms.BRAND_PROFILE_READ)}
						exact
					/>

					<ProtectedRoute
						path={routes.app.settings.brandProfiles.brandProfile.path}
						component={routes.app.settings.brandProfiles.brandProfile.component}
						canView={userCan(perms.BRAND_PROFILE_READ)}
					/>

					<Route
						path={routes.app.settings.brandProfiles.admin.path}
						render={({ match: { url } }) => (
							<>
								<ProtectedRoute
									path={routes.app.settings.brandProfiles.admin.path}
									component={routes.app.settings.brandProfiles.admin.component}
									canView={userCan(perms.ADMIN_READ)}
									exact
								/>

								<Route
									path={routes.app.settings.brandProfiles.admin.scenarios.path}
									render={({ match: { url } }) => (
										<>
											<ProtectedRoute
												path={
													routes.app.settings.brandProfiles.admin.scenarios.path
												}
												component={
													routes.app.settings.brandProfiles.admin.scenarios
														.component
												}
												canView={userCan(perms.ADMIN_READ)}
												exact
											/>
											<ProtectedRoute
												path={
													routes.app.settings.brandProfiles.admin.scenarios
														.create.path
												}
												component={
													routes.app.settings.brandProfiles.admin.scenarios
														.create.component
												}
												canView={userCan(perms.ADMIN_READ)}
											/>
										</>
									)}
								/>

								<Route
									path={routes.app.settings.brandProfiles.admin.opinions.path}
									render={({ match: { url } }) => (
										<>
											<ProtectedRoute
												path={
													routes.app.settings.brandProfiles.admin.opinions.path
												}
												component={
													routes.app.settings.brandProfiles.admin.opinions
														.component
												}
												canView={userCan(perms.ADMIN_READ)}
												exact
											/>
											<ProtectedRoute
												path={
													routes.app.settings.brandProfiles.admin.opinions
														.create.path
												}
												component={
													routes.app.settings.brandProfiles.admin.opinions
														.create.component
												}
												canView={userCan(perms.ADMIN_READ)}
											/>
										</>
									)}
								/>

								<Route
									path={routes.app.settings.brandProfiles.admin.permissions.path}
									render={({ match: { url } }) => (
										<>
											<ProtectedRoute
												path={
													routes.app.settings.brandProfiles.admin.permissions.path
												}
												component={
													routes.app.settings.brandProfiles.admin.permissions
														.component
												}
												canView={userCan(perms.ADMIN_READ)}
												exact
											/>
										</>
									)}
								/>
							</>
						)}
					/>
				</>
			)}
		/>
	)
}

export default BrandProfilesLayout
