import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/all/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setVideos(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchVideos();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {videos &&
        videos.map((video) => (
          <p key={video.id}>
            {video.user} {video.video_id} {video.text}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
