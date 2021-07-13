import {
  defaultFont,
  whiteColor,
} from "assets/jss/material-kit-react.js";

import dropdownStyle from "assets/jss/material-kit-react/dropdownStyle.js";

const headerLinksStyle = (theme) => ({
  ...dropdownStyle(theme),
  search: {
    "& > div": {
      marginTop: "0",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px !important",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: whiteColor,
      },
    },
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px",
  },
  buttonLink: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "0px 0px 0",
      width: "-webkit-fill-available",
      "& svg": {
        width: "24px",
        height: "30px",
        marginRight: "0px",
        marginLeft: "0px",
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "24px",
        lineHeight: "30px",
        width: "24px",
        height: "30px",
        marginRight: "0px",
        marginLeft: "0px",
      },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%",
      },
    },
  },
  searchButton: {
    [theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "22px",
      float: "right",
    },
  },
  margin: {
    zIndex: "4",
    margin: "0",
  },
  searchIcon: {
    width: "17px",
    zIndex: "4",
  },
  notifications: {
    zIndex: "4",
    position: "absolute",
    top: "2px",
    right: "0PX",
    fontSize: "12px",
    background: "#C10012",
    color: whiteColor,
    minWidth: "20px",
    height: "20px",
    borderRadius: "10px",
    textAlign: "center",
    lineHeight: "20px",
    verticalAlign: "middle",
    display: "block",

    [theme.breakpoints.down("sm")]: {
      ...defaultFont,
      top: "3px",
      fontSize: "14px",
      marginRight: "22px",
    },
  },
  manager: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    display: "inline-block",
  },
  searchWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "10px 15px 0",
    },
    display: "inline-block",
  },
});

export default headerLinksStyle;
