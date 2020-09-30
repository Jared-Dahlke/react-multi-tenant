
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People"
import AccountTree from "@material-ui/icons/AccountTree"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import Business from '@material-ui/icons/Business'
import UserProfile from "./views/UserProfile/UserProfile.js";
import Account from "./views/Account/Account";
import Users from "./views/Users/Users";
import RolesPermissions from "./views/RolesPermissions/RolesPermissions";
import Assignment from '@material-ui/icons/Assignment'

const settingsRoutes = [
  {
    path: "/settings/profile",
    name: "My Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    hide: true
  },
  {
    path: "/settings/account",
    name: "Account",
    icon: AccountTree,
    component: Account,
    layout: "/admin",
    hide: true
  },
  {
    path: "/settings/users",
    name: "Users",
    icon: People,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/settings/rolesPermissions",
    name: "Roles",
    icon: LockOpenIcon,
    component: RolesPermissions,
    layout: "/admin"
  },
  {
    path: "/settings/brandProfiles",
    name: "Brand Profiles",
    icon: Business,
    component: '',
    layout: "/admin"
  },
  {
    path: "/settings/brandMentality",
    name: "Brand Mentality",
    icon: Assignment,
    component: '',
    layout: "/admin"
  },
];

export default settingsRoutes;
