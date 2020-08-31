import React from "react";
import Button from "@material-ui/core/Button"
// import { useAuth } from "../context/auth";
import { useHistory } from "react-router-dom";

function Home(props: any) {
  //const { setAuthTokens } = useAuth();
  const history = useHistory();

  function logOut() {
    //setAuthTokens();
    history.push("/login");
  }


  return (
    <div>

      Super Secret Home Page

      <Button onClick={logOut}>Log out</Button>

    </div>
   
  )
}

export default Home;