export const userCan = (event) => {
	const myperms = localStorage.getItem('permissions')
	if (!myperms) return false
	return myperms.includes(event)
}

export const UserCan = (props) => {
	const myperms = localStorage.getItem('permissions')
	if (!myperms) return null
	const couldShow = myperms.includes(props.i)
	return couldShow ? props.children : null
}

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
