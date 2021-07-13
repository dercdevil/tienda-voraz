import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications";

// core components
import Button from "components/CustomButtons/Button.js";
import { useOrder } from "hoocks";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const Notification = () => {
  const classes = useStyles();
  const { order } = useOrder();
  const [openNotification, setOpenNotification] = useState(null);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    if(window.location.pathname !== "/home/Record"){
      window.location.href = "/home/Record";
    }
    setOpenNotification(null);
  };
  const close = () => {
    setOpenNotification(null);
  };
  const filter = () => {
    return order.filter((item) => item.status.includes("IN-PROGRESS"));
  };
  return (
    <div className={classes.manager}>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple
        aria-owns={openNotification ? "notification-menu-list-grow" : null}
        aria-haspopup="true"
        onClick={handleClickNotification}
        className={classes.buttonLink}
      >
        <Notifications fontSize={"large"} />
        {filter().length === 0 ? null : (
          <span className={classes.notifications}>{filter().length}</span>
        )}
      </Button>
      <Poppers
        open={Boolean(openNotification)}
        anchorEl={openNotification}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="notification-menu-list-grow"
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={close}>
                <MenuList role="menu">
                  {filter().map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Nueva Orden por un monto de {item.total}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </div>
  );
};

export default Notification;
