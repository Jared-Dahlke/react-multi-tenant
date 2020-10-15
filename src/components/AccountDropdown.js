import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import TreePicker from 'rsuite/lib/TreePicker'
import { fetchSiteData, clearSiteData } from '../redux/actions/accounts'
import { getCurrentAccount } from '../utils'

import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import ControlLabel from 'rsuite/lib/ControlLabel'
import FormGroup from 'rsuite/lib/FormGroup'
import FormControl from 'rsuite/lib/FormControl'
import Form from 'rsuite/lib/Form'

import styles from '../assets/jss/material-dashboard-react/components/customInputStyle.js' //"assets/jss/material-dashboard-react/components/customInputStyle.js";
const useStyles = makeStyles(styles)

const mapStateToProps = (state) => {
	return { accounts: state.accounts, currentAccountId: state.currentAccountId }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSiteData: (accountId) => dispatch(fetchSiteData(accountId)),
		clearSiteData: () => dispatch(clearSiteData())
	}
}

function SimplePopover(props) {
	const classes = useStyles()

	const labelClasses = classNames({
		[' ' + classes.labelRootError]: false,
		[' ' + classes.labelRootSuccess]: true
	})

	const marginTop = classNames({
		[classes.marginTop]: true
	})

	const [selectedAccount, setSelectedAccount] = React.useState({
		accountId: '',
		accountName: ''
	})

	const handleSelect = (accountId, e) => {
		e.persist()
		setSelectedAccount({
			accountId: accountId,
			accountName: e.target.innerText
		})

		props.clearSiteData()
		props.fetchSiteData(accountId)
	}

	let accountId = props.currentAccountId
	if (!accountId) {
		accountId = localStorage.getItem('currentAccountId')
	}

	let currentAccount = React.useMemo(() => {
		let current = getCurrentAccount(props.accounts.data)
		if (!current) {
			return selectedAccount
		}
		return current
	}, [props.accounts.data])

	return (
		<div style={{ marginTop: '30px', marginBottom: '15px' }}>
			<Form>
				<FormGroup>
					<ControlLabel>Active Account</ControlLabel>

					<TreePicker
						classes={{ root: marginTop }}
						defaultExpandAll
						data={props.accounts.data}
						style={{ width: '100%' }}
						name='accounts'
						labelKey='accountName'
						valueKey='accountId'
						value={currentAccount.accountId}
						onChange={(e, v) => handleSelect(e, v)}
						cleanable={false}
					></TreePicker>
				</FormGroup>
			</Form>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SimplePopover)
