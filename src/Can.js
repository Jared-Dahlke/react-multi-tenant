var encryptor = require('simple-encryptor')(
	process.env.REACT_APP_LOCAL_STORAGE_KEY
)

export const userCan = (event) => {
	const myperms = encryptor.decrypt(localStorage.getItem('permissions'))
	if (!myperms) return false
	return myperms.includes(event)
}

export const UserCan = (props) => {
	const myperms = encryptor.decrypt(localStorage.getItem('permissions'))
	if (!myperms) return null
	const couldShow = myperms.includes(props.do)
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
	BRAND_MENTALITY_READ: 'BRAND_MENTALITY_READ',
	ACCOUNT_READ: 'ACCOUNT_READ',
	USER_READ: 'USER_READ',
	BRAND_PROFILE_READ: 'BRAND_PROFILE_READ',
	BRAND_PROFILE_TOPICS_READ: 'BRAND_PROFILE_TOPICS_READ',
	BRAND_PROFILE_CATEGORIES_READ: 'BRAND_PROFILE_CATEGORIES_READ',
	DISCOVER_READ: 'DISCOVER_READ',
	ENGAGE_READ: 'ENGAGE_READ',
	HOME_READ: 'HOME_READ',
	ADMIN_READ: 'ADMIN_READ'
}
