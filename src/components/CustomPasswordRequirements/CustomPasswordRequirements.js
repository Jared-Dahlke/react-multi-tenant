import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CheckCircle from "@material-ui/icons/CheckCircle";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import * as v from "../../validations";

const useStyles = makeStyles((theme) => ({
  minWidth: {
    minWidth: "30px",
  },
  green: {
    color: "green",
  },
}));

export default function CustomPassword(props) {
  const classes = useStyles();

  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListSubheader>Password requirements</ListSubheader>
      {v.invalidPasswordObject(props.password).map((prop, key) => {
        return (
          <ListItem key={key}>
            <ListItemIcon className={classes.minWidth}>
              <CheckCircle
                fontSize="small"
                className={prop.satisfied ? classes.green : ""}
              />
            </ListItemIcon>
            {prop.text}
          </ListItem>
        );
      })}
    </List>
  );
}
