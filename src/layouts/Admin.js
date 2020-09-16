import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbars/Navbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import routes from "../routes.js"
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "../assets/img/sightly_image.jpg";
import logo from "../assets/img/sightly_icon.png";
import UserProfile from "../views/UserProfile/UserProfile.js";
import TableList from "../views/TableList/TableList.js";
import Users from "../views/Users/Users";
import CreateUser from "../views/Users/CreateUser.js";
import RolesPermissions from "../views/RolesPermissions/RolesPermissions.js";
import { connect } from "react-redux";
import {usersFetchData} from '../redux/actions/users.js'
import EditUser from '../views/Users/EditUser'

let ps;

const switchRoutes = (
  <Switch>
    <Route
      path='/admin/profile'
      component={UserProfile}
    />
    <Route
      path='/admin/accounts'
      component={TableList}
    />
    <Route
      path='/admin/users'
      render={({ match: { url } }) => (
        <>
          <Route path={`${url}/`} component={Users} exact />
          <Route path={`${url}/create`} component={CreateUser} />      
          <Route path={`${url}/edit`} component={EditUser} />   
        </>
      )}
    />

    <Route
      path='/admin/RolesPermissions'
      component={RolesPermissions}
    />
    
    <Redirect from="/admin" to="/admin/profile" />
  </Switch>
);

const useStyles = makeStyles(styles);

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersData: () => dispatch(usersFetchData())
  }
}


function Admin({ ...rest }) {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  const {fetchUsersData} = rest

  React.useEffect(() => {
    fetchUsersData()
  }, [fetchUsersData])




  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Sightly"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        
      </div>
    </div>
  );
}

export default connect(null,mapDispatchToProps)(Admin)
