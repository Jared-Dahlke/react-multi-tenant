export function findAccountNodeByAccountId (accountId, array) {
  for (const node of array) {
    if (node.accountId == accountId) return node;
    if (node.children) {
      const child = findAccountNodeByAccountId(accountId, node.children);
      if (child) return child;
    }
  }
}