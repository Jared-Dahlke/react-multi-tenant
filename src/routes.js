import People from '@material-ui/icons/PeopleOutlined'
import AccountTree from '@material-ui/icons/AccountTreeOutlined'
import Business from '@material-ui/icons/BusinessOutlined'
import Assignment from '@material-ui/icons/AssignmentOutlined'
import Book from '@material-ui/icons/BookOutlined'
import Build from '@material-ui/icons/BuildOutlined'

export const SettingsRoutes = [
	{
		path: '/settings/account',
		name: 'Account',
		icon: AccountTree,
		layout: '/admin',
		hide: true
	},
	{
		path: '/settings/users',
		name: 'Users',
		icon: People,
		layout: '/admin'
	},
	{
		path: '/settings/brandProfiles',
		name: 'Brand Profiles',
		icon: Business,
		layout: '/admin'
	},
	{
		path: '/settings/brandMentality',
		name: 'Brand Mentality',
		icon: Assignment,
		layout: '/admin'
	}
]

export const DiscoverRoutes = [
	{
		path: '/discover/channelResearch',
		name: 'Channel Research',
		icon: Book,
		layout: '/admin',
		hide: true
	}
]

export const EngageRoutes = [
	{
		path: '/engage/listBuilder',
		name: 'List Builder',
		icon: Build,
		layout: '/admin',
		hide: true
	}
]
