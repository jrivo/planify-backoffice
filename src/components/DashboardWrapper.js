import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home";
import RowingIcon from "@mui/icons-material/Rowing";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
const drawerWidth = 240;

const DashboardWrapper = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const { window } = rest;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
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
                  <RowingIcon />
                ) : index === 1 ? (
                  <PlaceIcon />
                ) : (
                  index === 2 && <PeopleIcon />
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
          // background color transparent
          // backgroundColor: "#fff",
          backgroundColor: "#F9FAFC",
          boxShadow: "none",
        }}
        // elevation={0}
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
              <Avatar name="john doe" sx={{ cursor: "pointer" }} />
            </Box>
          </Box>

          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "#000" }}
          >
            toolbar
          </Typography> */}
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

DashboardWrapper.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashboardWrapper;
