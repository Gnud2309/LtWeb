import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList({ isLogin, title, token }) {
  const [users, setUsers] = useState([]);

  const getUserListData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        "http://localhost:8080/api/user/list",
        config,
      );

      setUsers(res.data);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    getUserListData();
  }, [isLogin]);

  return (
    <div>
      <Typography variant="body1">
        {isLogin
          ? "Welcome! Please select one of the users from the list below to see their information and photos."
          : "Login to view users."}
      </Typography>
      {isLogin && (
        <Typography
          variant="body1"
          align="center"
          style={{ fontSize: 20, fontWeight: "600" }}
        >
          This is the user list
        </Typography>
      )}

      {isLogin && (
        <List>
          {users && users.length > 0 ? (
            users.map((user) => (
              <>
                {!(title === `${user.first_name} ${user.last_name}`) ? (
                  <>
                    <ListItem
                      key={user._id}
                      button
                      component={Link}
                      to={`/users/${user._id}`}
                    >
                      <ListItemText
                        primary={`${user.first_name} ${user.last_name}`}
                      />
                    </ListItem>

                    <Divider />
                  </>
                ) : (
                  <>
                    <ListItem
                      key={user._id}
                      button
                      component={Link}
                      to={`/users/${user._id}`}
                      style={{ backgroundColor: "#cccc" }}
                    >
                      <ListItemText
                        primary={`${user.first_name} ${user.last_name}`}
                      />
                    </ListItem>

                    <Divider />
                  </>
                )}
              </>
            ))
          ) : (
            <Typography variant="body1">Loading ...</Typography>
          )}
        </List>
      )}
    </div>
  );
}

export default UserList;
