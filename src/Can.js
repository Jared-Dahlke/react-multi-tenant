import React from 'react'

const ShowForPermissionComponent = (props) => {
	const permissions = localStorage.getItem('permissions')
	let myperms = React.useMemo(() => {
		return getPermsSimple(JSON.parse(permissions))
	}, [permissions])

	const couldShow = myperms.includes(props.i)
	return couldShow ? props.children : null
}

export const ShowForPermissionComponentTest = (props) => {
	const permissions = localStorage.getItem('permissions')
	let myperms = React.useMemo(() => {
		return getPermsSimple(JSON.parse(permissions))
	}, [permissions])

	const couldShow = myperms.includes(props.i)
	return couldShow ? true : false
}

const getPermsSimple = (permissions) => {
	console.log('running get perms simple')
	console.log(permissions)
	if (!permissions || permissions.length < 1) return []
	let permsFin = []
	for (const perm of permissions) {
		permsFin.push(perm.permissionName)
	}
	console.log('returning from get perms simple')
	console.log(permsFin)
	return permsFin
}

export const Can = ShowForPermissionComponent

const myperms = localStorage.getItem('permissions')
export const userPerms = getPermsSimple(JSON.parse(myperms))

export const perms = {
	ASSIGNED_ACCOUNT_UPDATE: 'ASSIGNED_ACCOUNT_UPDATE',
	ACCOUNT_CREATE: 'ACCOUNT_CREATE',
	ACCOUNT_UPDATE: 'ACCOUNT_UPDATE',
	ACCOUNT_DELETE: 'ACCOUNT_DELETE',
	USER_CREATE: 'USER_CREATE',
	USER_UPDATE: 'USER_UPDATE',
	USER_DELETE: 'USER_DELETE',
	BRAND_PROFILE_CREATE: 'BRAND_PROFILE_CREATE',
	BRAND_PROFILE_UPDATE: 'BRAND_PROFILE_UPDATE',
	BRAND_PROFILE_DELETE: 'BRAND_PROFILE_DELETE',
	BRAND_MENTALITY_READ: 'BRAND_MENTALITY_READ'
}
