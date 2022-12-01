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

const drawerWidth = 240;

const DashboardWrapper = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const { window } = rest;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const iconStyles = {
    color: process.env.REACT_APP_PRIMARY_COLOR,
  };

  const drawer = (
    <div>
      <Divider
        style={{
          marginBottom: "100px",
        }}
      />
      <List>
        {["Acivities", "Destinations", "Account"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                //redirect to the page
                const page = index === 0 ? "/" : "/" + text.toLowerCase();
                navigate(page);
              }}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <RowingIcon style={iconStyles} />
                ) : index === 1 ? (
                  <PlaceIcon style={iconStyles} />
                ) : (
                  index === 2 && <PeopleIcon style={iconStyles} />
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
    <Box sx={{ display: "flex" }}>
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
              justifyContent: "flex-end",
            }}
          >
            <Box style={{ cursor: "pointer" }}>
              <AccountMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#F9FAFC",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardWrapper;
