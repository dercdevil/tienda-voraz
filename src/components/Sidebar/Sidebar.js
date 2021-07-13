import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import image from "assets/img/bg7.jpg";
import PersonIcon from "@material-ui/icons/Person";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import TocIcon from "@material-ui/icons/Toc";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AirplayIcon from "@material-ui/icons/Airplay";
import Notifications from "components/Notifications/Notifications";
const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: "#FFFFFF",
    background: "#F15A22",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      // content: '""',
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF",
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  listItem: {
    "&,&:hover": {
      color: "#F15A22",
    },
    "&,&:focus": {
      color: "#000000",
    },
  },
  imgFluid: {
    width: "40px",
    height: "auto",
  },
}));

export default function Sidebar({ children }) {
  const Data = [
    {
      title: "Pedidos",
      path: `/home/Orders`,
      icon: <LocalOfferIcon />,
    },

    {
      title: "Perfil",
      path: `/home/ProfilePage`,
      icon: <PersonIcon />,
    },
    {
      title: "Transportistas",
      path: `/home/Carriers`,
      icon: <LocalShippingIcon />,
    },
    {
      title: "Producto",
      path: `/home/Product`,
      icon: <AirplayIcon />,
    },
    {
      title: "Historial",
      path: `/home/Record`,
      icon: <TocIcon />,
    },
    {
      title: "Cerrar Sesión",
      path: `/logout`,
      icon: <ExitToAppIcon />,
    },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(10);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="primary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Voraz
          </Typography>
          <div>
            <Notifications />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        color="secondary"
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Data.map((item, index) => (
            <ListItemLink
              className={classes.listItem}
              to={item.path}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              key={index}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemLink>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div
          className={classes.pageHeader}
          style={{
            background: "url(" + image + ")",
            width: "100%",
            height: "100vh",
            position: "fixed",
            overflow: "auto",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}
