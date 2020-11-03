import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { neutralColor } from '../../assets/jss/colorContants'
import { whiteColor } from '../../assets/jss/material-dashboard-react'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: neutralColor
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    width: '100%',
    color: 'white !important'
  },
  container: {
    position: 'relative',
    height: '100vh',
    marginTop:'60px',
    backgroundColor: neutralColor,
  },
  header: {
    backgroundColor:theme.palette.background.default,
    textTransform:'uppercase'
  },
  cell:{
    color: whiteColor
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const RolesInfoFullScreen = (props) => {
  let { show, handleDialog, title, data: rolesData, userType } = props
  let columns = [
    { id: 'roleName', label: 'Role Name', minWidth: 170 },
    {
      id: 'roleDescription',
      label: 'Description',
      minWidth: 170,
    },
    {
      id: 'permissions',
      label: 'Permissions',
      minWidth: 200,
    },
  ]
  if(userType==='Internal') columns.push({ id: 'userType', label: 'User Type', minWidth: 170 })
  const classes = useStyles()

  return (
    <div>
      <Dialog
        fullScreen
        open={show}
        onClose={() => {
          handleDialog(false)
        }}
        TransitionComponent={Transition}

      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => {
                handleDialog(false)
              }}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead className={classes.header}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      <strong key={column.id}>{column.label}</strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rolesData.map((row) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.roleId}
                    >
                      {columns.map((column) => {
                        const value = row[column.id]
                        if (column.id === 'permissions') {
                          return (
                            <TableCell key={column.id} className={classes.cell}>
                              {value.map(
                                (perm) =>
                                  perm.permissionId && (
                                    <div key={perm.permissionId}>
                                      <strong key={perm.permissionId}>
                                        {perm.permissionName}{' '}
                                      </strong>
                                      : {perm.permissionDescription}
                                    </div>
                                  )
                              )}
                            </TableCell>
                          )
                        }
                        return (
                          <TableCell key={column.id} className={classes.cell}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Dialog>
    </div>
  )
}

export default RolesInfoFullScreen
