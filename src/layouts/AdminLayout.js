import React from 'react'
import { Switch, Route } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Navbar from '../components/Navbars/Navbar.js'
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js'
import { connect } from 'react-redux'
import { setUserId, setLoggedInUserPermissions } from '../redux/actions/auth.js'
import { fetchSiteData } from '../redux/actions/accounts.js'
import AdminLayoutRoutes from './AdminLayoutRoutes'
var encryptor = require('simple-encryptor')(
    process.env.REACT_APP_LOCAL_STORAGE_KEY
)

const switchRoutes = (
    <Switch>
        <Route path='/admin' component={AdminLayoutRoutes} />
    </Switch>
)

const useStyles = makeStyles(styles)

const mapDispatchToProps = (dispatch) => {
    return {
        setUserId: (userId) => dispatch(setUserId(userId)),
        fetchSiteData: () => dispatch(fetchSiteData()),
        setLoggedInUserPermissions: (permissions) =>
            dispatch(setLoggedInUserPermissions(permissions))
    }
}

export function AdminLayout({ ...rest }) {
    const classes = useStyles()
    const mainPanel = React.createRef()
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    var userId = rest.userId
    if (!userId) {
        let userId = localStorage.getItem('userId')
        if (userId) {
            rest.setUserId(userId)
        }
    }

    let permissions = encryptor.decrypt(localStorage.getItem('permissions'))
    if (permissions) {
        let parsedPerms = JSON.parse(permissions)
        rest.setLoggedInUserPermissions(parsedPerms)
    }

    //preload critical data into the application
    const { fetchSiteData } = rest
    React.useEffect(() => {
        fetchSiteData()
    }, [fetchSiteData])

    return (
        <div className={classes.wrapper}>
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar handleDrawerToggle={handleDrawerToggle} {...rest} />
                <div className={classes.content}>
                    <div className={classes.container}>{switchRoutes}</div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(AdminLayout)
