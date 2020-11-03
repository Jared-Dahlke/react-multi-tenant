export const filteredRolesPermissions = (userType, userEmail, roles) => {
	if (!roles) return []

	let enhancedRoles = JSON.parse(JSON.stringify(roles))

	if (userType === 'External') {
		return Array.from(enhancedRoles).filter(
			(role) => role.userType === 'External'
		)
	}

	if (!userEmail) {
		// if there is no userEmail and user is Internal then return all
		for (const role of enhancedRoles) {
			role.roleName = role.roleName + ' (' + role.userType + ')'
		}
		return Array.from(enhancedRoles)
	}

	if (!userEmail.toLowerCase().includes('sightly.com')) {
		//if inviting user email is not sightly only show external
		return Array.from(enhancedRoles).filter(
			(role) => role.userType === 'External'
		)
	}

	return Array.from(enhancedRoles).filter(
		// if
		(role) => role.userType === 'Internal'
	)
}

export const filteredRolesPermissionsInfo = (userType, roles) => {
	if(!roles) return []
	if (userType === 'External') {
		return Array.from(roles).filter((role) => role.userType === 'External')
	}

	return Array.from(roles)
}

export const canAccessRoleId = (values, props) => {
	let roles = filteredRolesPermissions(
		props.userProfile && props.userProfile.userType,
		values.email,
		props.roles
	)

	for (const role of roles) {
		if (role.roleId === values.roleId) return true
	}
	return false
}
