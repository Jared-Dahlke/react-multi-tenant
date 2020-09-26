
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People"
import AccountTree from "@material-ui/icons/AccountTree"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import Business from '@material-ui/icons/Business'
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import Users from "./views/Users/Users";
import RolesPermissions from "./views/RolesPermissions/RolesPermissions";

const settingsRoutes = [
  {
    path: "/settings/profile",
    name: "My Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/settings/accounts",
    name: "Account Profile",
    icon: AccountTree,
    component: TableList,
    layout: "/admin"
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
    component: RolesPermissions,
    layout: "/admin"
  }
];

export default settingsRoutes;
