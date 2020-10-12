import Person from '@material-ui/icons/Person'
import People from '@material-ui/icons/People'
import AccountTree from '@material-ui/icons/AccountTree'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import Business from '@material-ui/icons/Business'
import Assignment from '@material-ui/icons/Assignment'
import Book from '@material-ui/icons/Book'
import Build from '@material-ui/icons/Build'

export const SettingsRoutes = [
	{
		path: '/settings/profile',
		name: 'My Profile',
		icon: Person,
		layout: '/admin',
		hide: true
	},
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
		path: '/settings/rolesPermissions',
		name: 'Roles',
		icon: LockOpenIcon,
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
		path: '/discover/listBuilder',
		name: 'List Builder',
		icon: Build,
		layout: '/admin',
		hide: true
	},
	{
		path: '/discover/channelResearch',
		name: 'Chanel Research',
		icon: Book,
		layout: '/admin',
		hide: true
	}
]
