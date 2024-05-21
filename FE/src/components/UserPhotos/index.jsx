import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

import axios from "axios";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Button,
  TextField,
  CardMedia
} from "@mui/material";

import Photo from "./Photo"

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos({ userIdMe,isGetDataPhoto,setGetDataPhoto, token }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]); 


  const getUser = async () => {
    
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    };
    try {
      const res = await axios.get("hhttp://localhost:8080/api/user/list",config);
      console.log(res.data)
      setUsers(res.data);
    } 
    catch (e) {
      console.log("Error: ",e);
    }
  };


  const getData = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    };
    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/photosOfUser/${userId}`,
        config 
      );


      setPhotos(res.data);
      console.log(res.data);
    } catch (e) {
      console.log("Error: ",e);
    }
  
  };
  
  useEffect(()=>{
    if(isGetDataPhoto){
      getData()
      setGetDataPhoto(false)
    }
  },[isGetDataPhoto])
  
  const getUserInfo = (userId) => {
    for (const user of users) {
      if (user._id === userId) {
      
        return { userFirstName: user.first_name, userLastName: user.last_name };
      }
    }
    return { userFirstName: "", userLastName: "" }; // Trả về giá trị mặc định nếu không tìm thấy
  };



  const { userFirstName , userLastName } = getUserInfo(userId);


  useEffect(()=>{
    getUser();
  }, [])


  useEffect(() => {
    getData();
  }, [userId]);

  if (!photos || photos.length === 0) {
    return <Typography variant="body1">Loading</Typography>;
  }


  return (
    <div>
          
      <Typography variant="h4" gutterBottom>
        Photos of {userFirstName} {userLastName} 
        
      </Typography>
      <List style={{display:'flex',flexWrap:"wrap",justifyContent:'center'}}>
          
          {console.log("users: ",users)}
          {console.log("photos: ",photos)}

          {photos && (
            photos.map((photos)=>(
              <Photo key={photos._id} photos={photos} users={users} userIdMe={userIdMe} handleUpdatePhotos={getData} code={photos.encode_image} token={token} />
            ))
          )}



      </List>
      <Button
              component={Link}
              to={`/users/${userId}`}
              variant="contained"
              color="primary"
            >
             Back to User Detail
            </Button>
    </div>
  );
}
export default UserPhotos;
