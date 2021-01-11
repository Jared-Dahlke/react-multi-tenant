import Main from './layouts/Main'
import EditUser from './views/Users/EditUser'
import CreateUser from './views/Users/CreateUser'
import BrandMentality from './views/BrandMentality/BrandMentality'
import ChannelResearchTemp from './views/Discover/ChannelResearchTemp'
import ListBuilder from './views/Engage/Lists/ListBuilder/ListBuilder.js'
import Lists from './views/Engage/Lists/Lists.js'
import Users from './views/Users/Users'
import BrandProfiles from './views/BrandProfiles/BrandProfiles.js'
import UserProfile from './views/UserProfile/UserProfile.js'
import Account from './views/Account/Account'
import UploadList from './views/Engage/Lists/UploadList'
import CreateList from './views/Engage/Lists/CreateList'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'
import Login from './pages/Login'
import Scenarios from './views/BrandProfiles/Admin/Scenarios.js'
import CreateScenario from './views/BrandProfiles/Admin/CreateScenario.js'
import Opinions from './views/BrandProfiles/Admin/Opinions.js'
import CreateOpinion from './views/BrandProfiles/Admin/CreateOpinion.js'
import { userCan, perms } from './Can'
import HomePage from './views/HomePage'
import MeasurePage from './views/MeasurePage'
import Permissions from './views/BrandProfiles/Admin/Permissions.js'
import BrandProfile from './views/BrandProfiles/BrandProfile/BrandProfile'

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
		component: Main,
		engage: {
			lists: {
				lists: {
					path: '/app/engage/lists',
					component: Lists,
					name: 'SmartLists'
				},
				uploadList: {
					path: '/app/engage/lists/uploadList',
					component: UploadList,
					name: 'Upload List'
				},
				createList: {
					path: '/app/engage/lists/createList',
					component: CreateList,
					name: 'Create List'
				},
				listBuilder: {
					path: '/app/engage/lists/listBuilder/:versionId',
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
				brandProfile: {
					path: '/app/settings/brandProfiles/brandProfile/:brandProfileId',
					name: 'Brand Profile',
					component: BrandProfile
				}
			},
			brandMentality: {
				path: '/app/settings/brandMentality',
				name: 'Brand Mentality',
				component: BrandMentality
			}
		},
		homepage: {
			path: '/app/home',
			name: '',
			component: HomePage
		},
		measure: {
			path: '/app/measure',
			name: 'Measure',
			component: MeasurePage
		}
	},
	admin: {
		path: '/admin',
		scenarios: {
			path: '/admin/scenarios',
			name: 'Brand Profiles Scenarios',
			component: Scenarios,
			create: {
				path: '/admin/scenarios/create',
				name: 'Create',
				component: CreateScenario
			}
		},
		opinions: {
			path: '/admin/opinions',
			name: 'Brand Profiles Opinions',
			component: Opinions,
			create: {
				path: '/admin/opinions/create',
				name: 'Create',
				component: CreateOpinion
			}
		},
		permissions: {
			path: '/admin/permissions',
			name: 'Permissions',
			component: Permissions
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
		component: Main,
		subRoutes: {
			engage: {
				path: '/app/engage/lists',
				component: Lists,
				name: 'SmartLists',
				userCan: userCan(perms.ENGAGE_READ),
				subRoutes: [
					{
						path: '/app/engage/lists/createList',
						component: CreateList,
						name: 'Create List'
					},
					{
						path: '/app/engage/lists/uploadList',
						component: UploadList,
						name: 'Upload List'
					},
					{
						path: '/app/engage/lists/listBuilder/:versionId',
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
			settings_profile: {
				path: '/app/settings/profile',
				name: 'Profile',
				component: UserProfile
			},
			settings_account: {
				path: '/app/settings/account',
				name: 'Account',
				component: Account
			},
			settings_users: {
				path: '/app/settings/users',
				component: Users,
				name: 'Users',
				subRoutes: [
					{
						path: '/app/settings/users/edit/:user',
						name: 'Edit',
						component: EditUser
					},
					{
						path: '/app/settings/users/create',
						name: 'Create',
						component: CreateUser,
						userCan: userCan(perms.USER_CREATE)
					}
				]
			},
			settings_brandProfiles: {
				path: '/app/settings/brandProfiles',
				name: 'Brand Profiles',
				component: BrandProfiles,
				subRoutes: [
					{
						path: '/app/settings/brandProfiles/brandProfile/:brandProfileId',
						name: 'Brand Profile',
						component: BrandProfile
					}
				]
			},
			settings_brandMentality: {
				path: '/app/settings/brandMentality',
				name: 'Brand Mentality',
				component: BrandMentality,
				userCan: userCan(perms.BRAND_MENTALITY_READ)
			},
			homepage: {
				path: '/app/home',
				name: '',
				component: HomePage
			},
			measure: {
				path: '/app/measure',
				name: 'Measure',
				component: MeasurePage
			}
		}
	},
	admin: {
		path: '/admin',
		subRoutes: {
			scenarios: {
				path: '/admin/scenarios',
				name: 'Scenarios',
				component: Scenarios,
				subRoutes: [
					{
						path: '/admin/scenarios/create',
						name: 'Create',
						component: CreateScenario
					}
				]
			},
			opinions: {
				path: '/admin/opinions',
				name: 'Opinions',
				component: Opinions,
				subRoutes: [
					{
						path: '/admin/opinions/create',
						name: 'Create',
						component: CreateOpinion
					}
				]
			},
			permissions: {
				path: '/admin/permissions',
				name: 'Permissions',
				component: Permissions
			}
		}
	}
}
