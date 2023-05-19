import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import PostCard from "./PostCard";
import { Button } from "@mui/material";
import CreatePost from "./CreatePost";

export default function Posts() {
  const [posts, setPosts] = useState();
  const [openPostWindow, setOpenPostWindow] = useState(false);

  const token = JSON.parse(sessionStorage.getItem("token"));
  useEffect(() => {
    axios
      .get("https://redi-backend.azurewebsites.net/api/Post", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("this is post error ", err);
      });
  }, [token]);

  return (
    <div>
      {openPostWindow ? (
        <CreatePost open={openPostWindow} setOpen={setOpenPostWindow} />
      ) : (
        <>
          <Button
            onClick={() => setOpenPostWindow(true)}
            sx={{ margin: 5 }}
            variant="outlined"
          >
            {" "}
            Create a post{" "}
          </Button>
          {posts
            ? posts.map((post) => {
                return <PostCard post={post} />;
              })
            : null}
        </>
      )}
    </div>
  );
}
