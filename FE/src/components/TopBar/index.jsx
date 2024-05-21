import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LogoutIcon from "@mui/icons-material/Logout";

import "./styles.css";
// import { useParams } from "react-router-dom";
import axios from "axios";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({
  title,
  userName,
  logout,
  isLogin,
  idOfMe,
  setGetDataPhoto,
  user,
  token,
}) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName("IMG");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(
        "http://localhost:8080/api/user/logout",
        {
          user: user,
        },
        config,
      );

      logout();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("myImage", file);
    formData.append("user_id", idOfMe);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/uploadimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      setGetDataPhoto(true);
      setFileName("");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setFile(null);
    }
  };

  return (
    <AppBar className="topbar-appBar">
      <Toolbar className="toolbar">
        <Typography variant="h4" color="inherit">
          {isLogin ? userName : "You are not logged in"}
        </Typography>

        <div className="logout" style={{ position: "absolute", right: 10 }}>
          {isLogin && (
            <Typography style={{ marginLeft: 10 }} variant="h5">
              {userName === title ? (
                <Typography variant="h5">
                  <HomeIcon /> Home Page
                </Typography>
              ) : (
                title
              )}
            </Typography>
          )}
          {isLogin && userName === title && (
            <form encType="multipart/form-data" method="POST">
              <Button variant="contained" color="primary" type="submit">
                <AddAPhotoIcon />
                <input
                  style={{ position: "absolute", opacity: 0, height: 40 }}
                  type="file"
                  name="myImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {fileName}
              </Button>

              {file && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginLeft: 10 }}
                  onClick={handleUpload}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              )}
            </form>
          )}
          {isLogin && (
            <Button
              style={{ marginLeft: 10 }}
              variant="contained"
              type="submit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
