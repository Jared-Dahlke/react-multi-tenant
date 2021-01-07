import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../../../components/Grid/GridItem.js'
import { TagPicker, Modal, Button, Icon } from 'rsuite'
import Loader from 'rsuite/lib/Loader'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classnames from 'classnames'
import {
	fetchAdminRolePermissions,
	fetchAllPermissions,
	setAdminRolePermissions,
	insertPermissions,
	removePermissions,
	setPermissionsAdded,
	setPermissionSureToRemove,
	setPermissionsRemoved
} from '../../../redux/actions/admin/permissions'
import { connect } from 'react-redux'
import styles from '../../../assets/jss/material-dashboard-react/components/tasksStyle.js'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { FormLoader } from '../../../components/SkeletonLoader'

const useTableStyles = makeStyles(tableStyles)

const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return {
		permissionsIsLoading: state.admin.permissionsIsLoading,
		permissionsAdded: state.admin.permissionsAdded,
		permissionSureToRemove: state.admin.permissionSureToRemove,
		permissionsRemoved: state.admin.permissionsRemoved,
		permissionsUpdating: state.admin.permissionsUpdating,
		adminPermissions: state.admin.permissions,
		allPermissions: state.admin.permissions_list
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAdminRolePermissions: () => dispatch(fetchAdminRolePermissions()),
		fetchAllPermissions: () => dispatch(fetchAllPermissions()),
		setAdminRolePermissions: (permissions) =>
			dispatch(setAdminRolePermissions(permissions)),
		insertPermissions: (roleId, p, adminPermissions) =>
			dispatch(insertPermissions(roleId, p, adminPermissions)),
		removePermissions: (roleId, p, adminPermissions) =>
			dispatch(removePermissions(roleId, p, adminPermissions)),
		setPermissionsAdded: (bol) => dispatch(setPermissionsAdded(bol)),
		setPermissionSureToRemove: (pData) =>
			dispatch(setPermissionSureToRemove(pData)),
		setPermissionsRemoved: (bol) => dispatch(setPermissionsRemoved(bol))
	}
}

function Permissions(props) {
	const classes = useStyles()
	const tableClasses = useTableStyles()
	let permissionToRemove = {}

	const { fetchAdminRolePermissions, adminPermissions } = props
	React.useEffect(() => {
		if (adminPermissions.length === 0) {
			fetchAdminRolePermissions()
		}
	})

	const { fetchAllPermissions, allPermissions } = props
	React.useEffect(() => {
		if (allPermissions.length === 0) {
			fetchAllPermissions()
		}
	})

	const tableCellClasses = classnames(classes.tableCell, {
		[classes.tableCellRTL]: false
	})

	const userHeaders = ['Role name', 'User type', 'Default', '']

	const permissionsChange = (v, e, index) => {
		var p = adminPermissions[index].captured_permissions
		var roleId = adminPermissions[index].roleId
		var insert = v.filter((x) => !p.includes(x))
		var remove = p.filter((x) => !v.includes(x))
		if (insert[0]) {
			console.log('permission is inserted', insert[0])
			adminPermissions[index].captured_permissions = v
			props.insertPermissions(roleId, insert[0], adminPermissions)
		} else if (remove[0]) {
			console.log('permission is removed', remove[0])
			permissionToRemove = {
				show: true,
				roleId: roleId,
				remove: remove[0],
				index: index,
				captured_permissions: v
			}
			props.setPermissionSureToRemove(permissionToRemove)
		} else {
			console.log('no change')
		}
	}

	const confirmDelete = () => {
		if (props.permissionSureToRemove) {
			adminPermissions[
				props.permissionSureToRemove.index
			].captured_permissions = props.permissionSureToRemove.captured_permissions
			props.removePermissions(
				props.permissionSureToRemove.roleId,
				props.permissionSureToRemove.remove,
				adminPermissions
			)
			props.setPermissionSureToRemove({ show: false })
		} else {
			console.log('something wrong with', props.permissionSureToRemove)
			props.setPermissionSureToRemove({ show: false })
		}
	}

	const cancelDelete = () => {
		if (props.permissionSureToRemove) {
			adminPermissions[
				props.permissionSureToRemove.index
			].captured_permissions = props.permissionSureToRemove.captured_permissions
			props.setAdminRolePermissions(adminPermissions)
			adminPermissions[
				props.permissionSureToRemove.index
			].captured_permissions.push(props.permissionSureToRemove.remove)
			props.setAdminRolePermissions(adminPermissions)
			props.setPermissionSureToRemove({ show: false })
		} else {
			console.log('something wrong with', props.permissionSureToRemove)
			props.setPermissionSureToRemove({ show: false })
		}
	}

	return (
		<Grid container justify='center'>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '20px',
					width: '100%',
					color: 'white'
				}}
			>
				<Loader
					size='sm'
					content='Updating...'
					style={{
						display: props.permissionsUpdating ? 'flex' : 'none'
					}}
				/>
			</div>

			<Snackbar
				autoHideDuration={2000}
				place='bc'
				open={props.permissionsAdded}
				onClose={() => props.setPermissionsAdded(false)}
				color='success'
			>
				<Alert
					onClose={() => props.setPermissionsAdded(false)}
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
			<Modal
				backdrop='static'
				show={props.permissionSureToRemove.show}
				onHide={() => cancelDelete()}
				size='xs'
			>
				<Modal.Body>
					<Icon
						icon='remind'
						style={{
							color: '#ffb300',
							fontSize: 24
						}}
					/>
					{'  '}
					You are trying to remove a permission . Are you sure you want to
					proceed?
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => confirmDelete()} appearance='primary'>
						Ok
					</Button>
					<Button onClick={() => cancelDelete()} appearance='subtle'>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>

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
												<TagPicker
													id={permissions.roleId || 'placeholder'}
													cleanable={false}
													data={allPermissions}
													groupBy='moduleName'
													labelKey='permissionName'
													valueKey='permissionId'
													defaultValue={permissions.captured_permissions}
													onChange={(v, e) => permissionsChange(v, e, index)}
													style={{ width: 500 }}
												/>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>
				) : props.permissionsIsLoading ? (
					<FormLoader />
				) : (
					''
				)}
			</GridItem>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)
