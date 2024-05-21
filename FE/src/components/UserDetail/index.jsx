import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function UserDetail({ changeTitle, idOfMe }) {
  const { userId } = useParams();
  const [user, setUser] = useState();

  const getData = async () => {
    try {
      const url = userId
        ? `http://localhost:8080/api/user/${userId}`
        : `http://localhost:8080/api/user/${idOfMe}`;
      const res = await axios.get(url);
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [userId]);

  useEffect(() => {
    if (user) {
      changeTitle(user.first_name, user.last_name);
    }
  }, [user]);

  return (
    <>
      {user && (
        <div>
          <Typography variant="body1">ID: {user._id}</Typography>
          <Typography variant="body1">First Name: {user.first_name}</Typography>
          <Typography variant="body1">Last Name: {user.last_name}</Typography>
          <Typography variant="body1">Location: {user.location}</Typography>
          <Typography variant="body1">
            Description:
            {user.description}
          </Typography>
          <Typography variant="body1">Occupation: {user.occupation}</Typography>
          <Typography variant="body1">
            <Button
              component={Link}
              to={`/photos/${user._id}`}
              variant="contained"
              color="primary"
            >
              See Photos
            </Button>
          </Typography>
        </div>
      )}
    </>
  );
}

export default UserDetail;
