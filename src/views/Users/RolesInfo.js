import React from "react";
import { Modal, Table } from "rsuite";
const { Column, HeaderCell, Cell,  } = Table;
const { Title,Body, Header} = Modal

const RolesInfo = (props) => {
  let { show, handleDialog, title, data: rolesData, userType } = props;
  if(!rolesData) return null
  rolesData = Array.from(rolesData).sort((a,b) => a.roleId - b.roleId)
  // console.log('rolesData',rolesData)

  let tableHeight = 0 //sets the table height to avoid hidden overflow
  rolesData.map(({permissions}) => { 
    tableHeight+=35*permissions.length
  })

  const body = (
    <Table
      data={rolesData}
      minHeight={tableHeight}
      cellBordered
      autoHeight
      bordered
      wordWrap
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
      overflow
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
