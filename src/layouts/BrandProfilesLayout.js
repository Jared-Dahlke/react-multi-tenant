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
				</>
			)}
		/>
	)
}

export default BrandProfilesLayout
