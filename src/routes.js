
//import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People"
import AccountTree from "@material-ui/icons/AccountTree"
import LockOpenIcon from "@material-ui/icons/LockOpen"
//import LibraryBooks from "@material-ui/icons/LibraryBooks";
//import BubbleChart from "@material-ui/icons/BubbleChart";
//import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
//import Unarchive from "@material-ui/icons/Unarchive";
//import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
//import DashboardPage from "./views/Dashboard/Dashboard.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import Users from "./views/Users/Users";
import RolesPermissions from "./views/RolesPermissions/RolesPermissions";

//import Icons from "./views/Icons/Icons.js";
// import NotificationsPage from "./views/Notifications/Notifications.js";
// core components/views for RTL layout


const dashboardRoutes = [
  /*{
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },*/
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
    name: "Roles and Permissions",
    icon: LockOpenIcon,
    component: RolesPermissions,
    layout: "/admin"
  }
  /*,
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }*/
];

export default dashboardRoutes;
