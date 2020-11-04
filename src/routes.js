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
	admin: {
		path: '/admin',
		component: Admin,
		engage: {
			lists: {
				lists: {
					path: '/admin/engage/lists',
					component: Lists,
					name: 'Lists'
				},
				uploadList: {
					path: '/admin/engage/lists/uploadList',
					component: UploadList,
					name: 'Upload List'
				},
				listBuilder: {
					path: '/admin/engage/lists/listBuilder',
					name: 'List Builder',
					component: ListBuilder
				}
			}
		},

		discover: {
			channelResearch: {
				path: '/admin/discover/channelResearch',
				name: 'Channel Research',
				component: ChannelResearchTemp
			}
		},

		settings: {
			profile: {
				path: '/admin/settings/profile',
				name: 'Profile',
				component: UserProfile
			},
			account: {
				path: '/admin/settings/account',
				name: 'Account',
				component: Account
			},
			users: {
				path: '/admin/settings/users',
				component: Users,
				edit: {
					path: '/admin/settings/users/edit/:user',
					name: 'Edit',
					component: EditUser
				},
				create: {
					path: '/admin/settings/users/create',
					name: 'Create',
					component: CreateUser
				}
			},
			brandProfiles: {
				path: '/admin/settings/brandProfiles',
				name: 'Brand Profiles',
				component: BrandProfiles,

				create: {
					path: '/admin/settings/brandProfiles/create',
					name: 'Create',
					component: CreateBrandProfile
				},
				edit: {
					path: '/admin/settings/brandProfiles/edit/:brandProfileId',
					name: 'Edit',
					component: EditBrandProfile
				}
			},
			brandMentality: {
				path: '/admin/settings/brandMentality',
				name: 'Brand Mentality',
				component: BrandMentality
			}
		}
	}
}
