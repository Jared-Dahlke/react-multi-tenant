import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import { TagPicker } from 'rsuite';
import Loader from 'rsuite/lib/Loader'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classnames from 'classnames'
import {
    fetchAdminBrandPermissions,
    fetchAllBrandPermissions,
    insertPermissions,
    removePermissions,
    setPermissionsArchived,
    setPermissionsRemoved
} from '../../../redux/actions/brandProfilesAdmin/permissions'
import { connect } from 'react-redux'
import styles from '../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
    return {
        permissionsArchived: state.brandProfilesAdmin.permissionsArchived,
        permissionsRemoved: state.brandProfilesAdmin.permissionsRemoved,
        permissionsArchiving: state.brandProfilesAdmin.permissionsArchiving,
        adminPermissions: state.brandProfilesAdmin.permissions,
        allPermissions: state.brandProfilesAdmin.permissions_list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAdminBrandPermissions: () => dispatch(fetchAdminBrandPermissions()),
        fetchAllBrandPermissions: () => dispatch(fetchAllBrandPermissions()),
        insertPermissions: (roleId, p, adminPermissions) => dispatch(insertPermissions(roleId, p, adminPermissions)),
        removePermissions: (roleId, p, adminPermissions) => dispatch(removePermissions(roleId, p, adminPermissions)),
        setPermissionsArchived: (bol) => dispatch(setPermissionsArchived(bol)),
        setPermissionsRemoved: (bol) => dispatch(setPermissionsRemoved(bol))
    }
}

function Permissions(props) {

    const classes = useStyles()
    const tableClasses = useTableStyles()

    const { fetchAdminBrandPermissions, adminPermissions } = props
    React.useEffect(() => {
        if (adminPermissions.length === 0) {
            fetchAdminBrandPermissions();
        }
    })

    const { fetchAllBrandPermissions, allPermissions } = props
    React.useEffect(() => {
        if (allPermissions.length === 0) {
            fetchAllBrandPermissions();
        }
    })

    const tableCellClasses = classnames(classes.tableCell, {
        [classes.tableCellRTL]: false
    })

    const userHeaders = ['Role name', 'User type', 'Default', '']


    const permissionsChange = (v, e, index) => {
        var p = adminPermissions[index].captured_permissions;
        var roleId = adminPermissions[index].roleId
        var insert = v.filter(x => !p.includes(x));
        var remove = p.filter(x => !v.includes(x));
        if (insert[0]) {
            console.log("permission is inserted", insert[0])
            adminPermissions[index].captured_permissions = v
            props.insertPermissions(roleId, insert[0], adminPermissions)
        }
        else if (remove[0]) {
            console.log("permission is removed", remove[0])
            adminPermissions[index].captured_permissions = v
            props.removePermissions(roleId, remove[0], adminPermissions)
        }
        else {
            console.log("no change")
        }
    }

    return (
        <Grid container justify='center'>
            <Loader size='sm' content='Updating...'
                style={{
                    display: props.permissionsArchiving ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20px',
                    width: '100%',
                    color: 'white'
                }} />
            <Snackbar
                autoHideDuration={2000}
                place='bc'
                open={props.permissionsArchived}
                onClose={() => props.setPermissionsArchived(false)}
                color='success'
            >
                <Alert
                    onClose={() => props.setPermissionsArchived(false)}
                    severity='success'
                >
                    Permissions Archived
				</Alert>
            </Snackbar>
            <Snackbar
                autoHideDuration={2000}
                place='bc'
                open={props.permissionsRemoved}
                onClose={() => props.setPermissionsRemoved(false)}
                color='success'
            >
                <Alert
                    onClose={() => props.setPermissionsRemoved(false)}
                    severity='success'
                >
                    Permissions Removed
				</Alert>
            </Snackbar>

            <GridItem xs={12} sm={12} md={8}>
                {adminPermissions && adminPermissions.length > 0 ? (
                    <div>
                        <Table className={classes.table}>
                            <TableHead className={tableClasses['primaryTableHeader']}>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    {userHeaders.map((prop, key) => {
                                        return (
                                            <TableCell
                                                className={
                                                    tableClasses.tableCell +
                                                    ' ' +
                                                    tableClasses.tableHeadCell
                                                }
                                                key={key}
                                            >
                                                {prop}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {adminPermissions &&
                                    adminPermissions.map((permissions, index) => (
                                        <TableRow
                                            key={permissions.roleId || 'placeholder'}
                                            className={classes.tableRow}
                                        >
                                            <TableCell className={tableCellClasses}>
                                                {permissions.roleName}
                                            </TableCell>
                                            <TableCell className={tableCellClasses}>
                                                {permissions.userType}
                                            </TableCell>
                                            <TableCell className={tableCellClasses}>
                                                {permissions.default ? 'True' : 'False'}
                                            </TableCell>

                                            <TableCell className={classes.tableActions}>
                                                <TagPicker id={permissions.roleId || 'placeholder'}
                                                    cleanable={false}
                                                    data={allPermissions} groupBy="moduleName"
                                                    labelKey="permissionName" valueKey="permissionId"
                                                    defaultValue={permissions.captured_permissions}
                                                    onChange={(v, e) => permissionsChange(v, e, index)}
                                                    style={{ width: 500 }} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : ''}
            </GridItem>
        </Grid>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)
