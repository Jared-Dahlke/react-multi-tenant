import React from 'react'
import { connect } from 'react-redux'
import TreePicker from 'rsuite/lib/TreePicker'
import { fetchSiteData, clearSiteData } from '../redux/actions/accounts'
import { getCurrentAccount } from '../utils'
import styles from '../assets/jss/material-dashboard-react/components/sidebarStyle'

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
			<TreePicker
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
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SimplePopover)
