
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People"
import AccountTree from "@material-ui/icons/AccountTree"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import Users from "./views/Users/Users";
import RolesPermissions from "./views/RolesPermissions/RolesPermissions";

const settingsRoutes = [
  {
    path: "/profile",
    name: "My Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/accounts",
    name: "Accounts",
    icon: AccountTree,
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    icon: People,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/rolesPermissions",
    name: "Roles",
    icon: LockOpenIcon,
    component: RolesPermissions,
    layout: "/admin"
  }
];

export default settingsRoutes;
