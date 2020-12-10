import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import { Route } from 'react-router-dom'
import { routes } from '../routes'
import { userCan, perms } from '../Can'

const AdminLayoutRoutes = () => {
    return (
        <Route
            path={routes.admin.path}
            render={({ match: { url } }) => (
                <>
                    <ProtectedRoute
                        path={routes.admin.path}
                        component={routes.admin.component}
                        canView={userCan(perms.ADMIN_READ)}
                        exact
                    />

                    <Route
                        path={routes.admin.scenarios.path}
                        render={({ match: { url } }) => (
                            <>
                                <ProtectedRoute
                                    path={routes.admin.scenarios.path}
                                    component={routes.admin.scenarios.component}
                                    canView={userCan(perms.ADMIN_READ)}
                                    exact
                                />
                                <ProtectedRoute
                                    path={routes.admin.scenarios.create.path}
                                    component={routes.admin.scenarios.create.component}
                                    canView={userCan(perms.ADMIN_READ)}
                                />
                            </>
                        )}
                    />

                    <Route
                        path={routes.admin.opinions.path}
                        render={({ match: { url } }) => (
                            <>
                                <ProtectedRoute
                                    path={routes.admin.opinions.path}
                                    component={routes.admin.opinions.component}
                                    canView={userCan(perms.ADMIN_READ)}
                                    exact
                                />
                                <ProtectedRoute
                                    path={routes.admin.opinions.create.path}
                                    component={routes.admin.opinions.create.component}
                                    canView={userCan(perms.ADMIN_READ)}
                                />
                            </>
                        )}
                    />

                    <Route
                        path={routes.admin.permissions.path}
                        render={({ match: { url } }) => (
                            <>
                                <ProtectedRoute
                                    path={routes.admin.permissions.path}
                                    component={routes.admin.permissions.component}
                                    canView={userCan(perms.ADMIN_READ)}
                                    exact
                                />
                            </>
                        )}
                    />
                </>
            )}
        />
    )
}

export default AdminLayoutRoutes
