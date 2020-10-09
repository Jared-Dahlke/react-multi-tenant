export function findAccountNodeByAccountId (accountId, array) {
  for (const node of array) {
    if (node.accountId == accountId) return node;
    if (node.children) {
      const child = findAccountNodeByAccountId(accountId, node.children);
      if (child) return child;
    }
  }
}

export function markAllAccountsAsCurrentFalse (array) {
  for (const node of array) {
    node.current = false
    if (node.children) {     
        markAllAccountsAsCurrentFalse(node.children)     
    }
  }
}

export function getCurrentAccount (accounts) {
 // console.log('get current account')
 if (accounts) {
  for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].current == true) {
          return accounts[i];
      }
      var found = getCurrentAccount(accounts[i].children);
      if (found) return found;
  }
}
}

export function getTopLevelChecked (checkedAccountIds, allAccounts) {
  console.log('get top level checked')
  console.log(checkedAccountIds)
  console.log(allAccounts)
  checkAllChecked(checkedAccountIds, allAccounts)
  console.log('already checked all checked')
  console.log(allAccounts)
  let finalListOfIds = getFinals(allAccounts)
  console.log('final list of ids')
  console.log(finalListOfIds)
  return finalListOfIds
}

function checkAllChecked(ids, accounts) {
  for (const id of ids) {
    //let numberId = Number(id)
    for (const account of accounts) {
      if(account.accountId == id) {
        account.checked = true
        delete account.children
      } else {
        if(account.children) checkAllChecked(ids, account.children)
      }
      
      
    }
  }
}
function getFinals (accounts) {
  let tab = []
  console.log('get finals')
  console.log(accounts)
  console.log(tab)
  for (const account of accounts) {
    if(account.checked) {
      tab.push(account.accountId)
    } else {
      if (account.children){
        tab = tab.concat(getFinals(account.children))
      }
      
    }
  }
  return tab
 }

