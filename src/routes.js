import Admin from './layouts/Admin'
import EditUser from './views/Users/EditUser'
import CreateUser from './views/Users/CreateUser'
import BrandMentality from './views/BrandMentality/BrandMentality'
import ChannelResearchTemp from './views/Discover/ChannelResearchTemp'
import ListBuilder from './views/Engage/Lists/ListBuilder/ListBuilder.js'
import Lists from './views/Engage/Lists/Lists.js'
import Users from './views/Users/Users'
import BrandProfiles from './views/BrandProfiles/BrandProfiles.js'
import CreateBrandProfile from './views/BrandProfiles/CreateBrandProfile.js'
import EditBrandProfile from './views/BrandProfiles/EditBrandProfile.js'
import UserProfile from './views/UserProfile/UserProfile.js'
import Account from './views/Account/Account'
import UploadList from './views/Engage/Lists/UploadList'

import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'
import Login from './pages/Login'

import Scenarios from './views/BrandProfiles/Admin/Scenarios.js'
import CreateScenario from './views/BrandProfiles/Admin/CreateScenario.js'
import BrandProfilesAdmin from './views/BrandProfiles/Admin/BrandProfilesAdmin.js'

import { userCan, perms } from './Can'

export const routes = {
	login: {
		path: '/login',
		component: Login,
		name: 'Log In'
	},
	resetPassword: {
		path: '/resetPassword',
		component: ResetPassword,
		name: 'Reset Password'
	},
	changePassword: {
		path: '/changePassword/:userId/:token',
		component: ChangePassword,
		name: 'Change Password'
	},
	app: {
		path: '/app',
		component: Admin,
		engage: {
			lists: {
				lists: {
					path: '/app/engage/lists',
					component: Lists,
					name: 'Lists'
				},
				uploadList: {
					path: '/app/engage/lists/uploadList',
					component: UploadList,
					name: 'Upload List'
				},
				listBuilder: {
					path: '/app/engage/lists/listBuilder',
					name: 'List Builder',
					component: ListBuilder
				}
			}
		},

		discover: {
			channelResearch: {
				path: '/app/discover/channelResearch',
				name: 'Channel Research',
				component: ChannelResearchTemp
			}
		},

		settings: {
			profile: {
				path: '/app/settings/profile',
				name: 'Profile',
				component: UserProfile
			},
			account: {
				path: '/app/settings/account',
				name: 'Account',
				component: Account
			},
			users: {
				path: '/app/settings/users',
				component: Users,
				edit: {
					path: '/app/settings/users/edit/:user',
					name: 'Edit',
					component: EditUser
				},
				create: {
					path: '/app/settings/users/create',
					name: 'Create',
					component: CreateUser
				}
			},
			brandProfiles: {
				path: '/app/settings/brandProfiles',
				name: 'Brand Profiles',
				component: BrandProfiles,

				create: {
					path: '/app/settings/brandProfiles/create',
					name: 'Create',
					component: CreateBrandProfile
				},
				edit: {
					path: '/app/settings/brandProfiles/edit/:brandProfileId',
					name: 'Edit',
					component: EditBrandProfile
				},
				admin: {
					path: '/app/settings/brandProfiles/admin',
					name: 'Brand Profiles Admin',
					component: BrandProfilesAdmin,
					scenarios: {
						path: '/app/settings/brandProfiles/admin/scenarios',
						name: 'Brand Profiles Scenarios',
						component: Scenarios,

						create: {
							path: '/app/settings/brandProfiles/admin/scenarios/create',
							name: 'Create',
							component: CreateScenario
						}
					}
				}
			},
			brandMentality: {
				path: '/app/settings/brandMentality',
				name: 'Brand Mentality',
				component: BrandMentality
			}
		}
	}
}

export const modifiedRoutes = {
	login: {
		path: '/login',
		component: Login,
		name: 'Log In'
	},
	resetPassword: {
		path: '/resetPassword',
		component: ResetPassword,
		name: 'Reset Password'
	},
	changePassword: {
		path: '/changePassword/:userId/:token',
		component: ChangePassword,
		name: 'Change Password'
	},
	app: {
		path: '/app',
		component: Admin,
		subRoutes: {
			engage: {
						path: '/app/engage/lists',
						component: Lists,
						name: 'Lists',
						subRoutes:[
							{
								path: '/app/engage/lists/uploadList',
								component: UploadList,
								name: 'Upload List'
							},
							{
								path: '/app/engage/lists/listBuilder',
								name: 'List Builder',
								component: ListBuilder
							}

						]
			},
			discover: {
						path: '/app/discover/channelResearch',
						name: 'Channel Research',
						component: ChannelResearchTemp
			},
			settings_profile : {
				path: '/app/settings/profile',
				name: 'Profile',
				component: UserProfile
			},
			settings_account: {
				path: '/app/settings/account',
				name: 'Account',
				component: Account
			},
			settings_users:{
				path: '/app/settings/users',
				component: Users,
				subRoutes:[
					 {
						path: '/app/settings/users/edit/:user',
						name: 'Edit',
						component: EditUser
					},
					{
						path: '/app/settings/users/create',
						name: 'Create',
						component: CreateUser,
						userCan : userCan(perms.USER_CREATE)
					}
				]
			},
			settings_brandProfiles: {
				path: '/app/settings/brandProfiles',
				name: 'Brand Profiles',
				component: BrandProfiles,
		
				subRoutes: [
					{
						path: '/app/settings/brandProfiles/create',
						name: 'Create',
						component: CreateBrandProfile,
						userCan: userCan(perms.BRAND_PROFILE_CREATE)
					},
					{
						path: '/app/settings/brandProfiles/edit/:brandProfileId',
						name: 'Edit',
						component: EditBrandProfile
					},
					{
						path: '/app/settings/brandProfiles/admin',
						name: 'Brand Profiles Admin',
						component: BrandProfilesAdmin,
						subRoutes:[

							{
							path: '/app/settings/brandProfiles/admin/scenarios',
							name: 'Brand Profiles Scenarios',
							component: Scenarios,
							subRoutes: [
								{
									path: '/app/settings/brandProfiles/admin/scenarios/create',
									name: 'Create',
									component: CreateScenario
								}
							]
						}
						]
					}
				]
			},
			settings_brandMentality: {
				path: '/app/settings/brandMentality',
				name: 'Brand Mentality',
				component: BrandMentality,
				userCan: userCan(perms.BRAND_MENTALITY_READ)
			}
		}
	}
}