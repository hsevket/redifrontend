import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authcontext/AuthContext";
import axios from "axios";
export default function MenuAppBar() {
  const { token } = useAuth();
  const [user, setUser] = React.useState()
  React.useEffect(() => {
    axios
    .get("https://redi-backend.azurewebsites.net/api/Account", {
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
    .then((res) => {
      console.log(res.data);
      setUser(res.data);
    })
    .catch((err) => {
      console.log("this is post error ", err);
    });
  }, [token]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/"> Post-it </NavLink>
          </Typography>
          <Typography variant="h6" component="div" sx={{ justifysel: "flex-end", flexGrow: 1 }}>
            Welcome {user ? user.username : ''} !!!
          </Typography>

          <div>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <NavLink to="/profile">Profile</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/editprofile">Edit Profile</NavLink>
              </MenuItem>
            </Menu>

          </div>

        </Toolbar>

      </AppBar>
    </Box>
  );
}
