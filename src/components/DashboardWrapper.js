import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import PlaceIcon from "@mui/icons-material/Place";
import RowingIcon from "@mui/icons-material/Rowing";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import AccountMenu from "./AccountMenu";
import { Typography } from "@mui/material";
import SearchBar from "./general/SearchBar";
import PersonIcon from "@mui/icons-material/Person";
import { getCurrentUser, getUser } from "../utils.js/apicalls";
import useMediaQuery from "@mui/material/useMediaQuery";
import { capitalize } from "../utils.js/format";

const drawerWidth = 300;

const DashboardWrapper = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const { window } = rest;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profileData, setProfileData] = React.useState({});
  const isSmallScreen = useMediaQuery("(max-width:1200px)");

  const navBarItems = ["Overview", "Destinations", "Activities", "Account"];

  if (
    localStorage.getItem("role") === "ADMIN" ||
    localStorage.getItem("role") === "MODERATOR"
  ) {
    navBarItems.push("Users");
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const iconStyles = {
    color: "#fff",
  };

  const loadCurrentUser = async () => {
    const currentUser = await getCurrentUser();
    currentUser.firstName = capitalize(currentUser.firstName);
    currentUser.lastName = capitalize(currentUser.lastName);

    setProfileData(currentUser);
  };

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  const drawer = (
    <div
      style={{
        width: drawerWidth,
        height: "100%",
        backgroundColor: "#2D3E50",
        paddingTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Typography
        variant="h6"
        style={{ color: "#fff", fontSize: "36px", marginTop: "30px" }}
      >
        Planify
      </Typography>
      <Divider
        style={{
          marginBottom: "100px",
        }}
      />
      <List>
        {navBarItems.map((text, index) => (
          <ListItem
            target="_blank"
            key={text}
            disablePadding
            sx={{
              color: "#FFF",
            }}
          >
            <ListItemButton
              onClick={() => {
                const page = "/" + text.toLowerCase();
                navigate(page);
              }}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <DashboardIcon style={iconStyles} />
                ) : index === 1 ? (
                  <RowingIcon style={iconStyles} />
                ) : index === 2 ? (
                  <PlaceIcon style={iconStyles} />
                ) : index === 3 ? (
                  <PersonIcon style={iconStyles} />
                ) : (
                  index === 4 && <PeopleIcon style={iconStyles} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className="maions-parent" sx={{ display: "flex", minHeight: "95vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#F9FAFC",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ border: "none", boxShadow: "none" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              paddingBottom: "15px",
              alignItems: "center",
              position: "relative",
            }}
          >
            {!isSmallScreen && <SearchBar />}
            <Box
              style={{ cursor: "pointer", position: "absolute", right: "0px" }}
            >
              <AccountMenu data={profileData} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        className="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#F9FAFC",
          minHeight: "100%",
          // maxHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardWrapper;
