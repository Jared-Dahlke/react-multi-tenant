import React from "react"
import "./RolesInfo.css"
import Modal from "rsuite/lib/Modal"
import Table from "rsuite/lib/Table"
const { Column, HeaderCell, Cell,  } = Table;
const { Title,Body, Header} = Modal

const RolesInfo = (props) => {
  console.log('rendering RolesInfo')
  let { show, handleDialog, title, data: rolesData, userType } = props;
  if(!rolesData) return null

  const body = (
    <Table
      data={rolesData}
      minHeight={400}
      cellBordered
      wordWrap
      autoHeight
      affixHeader
    >

      <Column width={200}>
        <HeaderCell>Role Name</HeaderCell>
        <Cell dataKey="roleName" />
      </Column>

      {userType === 'Internal' && 
      (<Column width={200}>
        <HeaderCell >User Type</HeaderCell>
        <Cell dataKey="userType" />
      </Column>)}

      <Column width={200}>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="roleDescription" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Permissions</HeaderCell>

        <Cell>
          {({ permissions }) => {
            return (<div style={{minHeight:'40px',maxHeight:20*permissions.length}}> {permissions.map((perm) => (
            perm.permissionId && <div key={perm.permissionId}><strong key={perm.permissionId}>{perm.permissionName} </strong>: {perm.permissionDescription}</div> 
            ))}</div>);
          }}
        </Cell>
      </Column>
    </Table>
  );

  const instance = (
    <Modal
      show={show}
      full
      onHide={() => {
        handleDialog(false);
      }}
    >
      <Header>
        <Title>{title}</Title>
      </Header>
      <Body>{body}</Body>
    </Modal>
  );

  return instance;
};

export default RolesInfo;
