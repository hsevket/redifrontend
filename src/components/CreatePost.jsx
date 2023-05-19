import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box, Select, MenuItem, InputLabel } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FormDialog({ open, setOpen }) {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState()

    const token = JSON.parse(sessionStorage.getItem("token"));
  useEffect(() => {
    axios
      .get("https://redi-backend.azurewebsites.net/api/Category", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("this is category error ", err);
      });
  }, [token]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const requestBody = { title: data.get("title"), content: data.get("content"), likes: 0, disLikes: 0, categoryId: category };
    axios
      .post("https://redi-backend.azurewebsites.net/api/Post", requestBody, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log("this is category error ", err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) =>{
    setCategory(e.target.value)
    console.log(category)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a post</DialogTitle>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogContent>
            <InputLabel id="categories">Categories</InputLabel>
            <Select
              labelId="categories"
              id="categories"
              value={category}
              fullWidth
              label="categories"
              onChange={handleChange}
            >
              {categories ? categories.map((cat) => {
               return <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              }): null}
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="content"
              name="content"
              label="Content"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
