import React from "react";
import Button from "@material-ui/core/Button"
import { useAuth } from "../context/auth";

function Admin(props: any) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  
  return (
    <Button onClick={logOut}>Log out</Button>
  )
}

export default Admin;