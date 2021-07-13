import {
  container,
  title,
  primaryColor,
} from "assets/jss/material-kit-react.js";

import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const profilePageStyle = {
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  h4: {
    margin: "0px",
    marginTop: "10px",
    marginRight: "10px",
  },
  h4bold: {
    margin: "10px",
    fontWeight: "bold",
  },
  h4top: {
    marginTop: "40px",
  },
  large: {
    width: "100px",
    height: "100px",
    justifyContent: "center !important",
    fontSize: "30px",
    color: "#00000",
  },
  cardFooter: {
    paddingTop: "0px",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
  },
  container,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      // transform: "translate3d(0, -50%, 0)"
    },
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important",
  },
  name: {
    marginTop: "-80px",
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "80px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999",
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center",
  },
  i: {
    color: "#F15A22",
    marginLeft: "5px",
  },
  input: {
    display: "none",
  },
  switchBase: {
    color: "#F15A22 !important",
  },
  switchIcon: {
    boxShadow: "0 1px 3px 1px rgba(0, 0, 0, 0.4)",
    color: "#FFFFFF !important",
    border: "1px solid rgba(0, 0, 0, .54)",
  },
  switchBar: {
    width: "30px",
    height: "15px",
    backgroundColor: "rgb(80, 80, 80)",
    borderRadius: "15px",
    opacity: "0.7!important",
  },
  switchChecked: {
    "& + $switchBar": {
      backgroundColor: "rgba(241, 90, 34)!important",
    },
    "& $switchIcon": {
      borderColor: "#F15A22",
    },
  },
  switchRoot: {
    height: "48px",
  },
  icon: {
    color: "#F15A22",
    marginTop: "5px",
  },
  underline: {
    // fontSize: "14px",
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: primaryColor,
    },
  },
  formControl: {
    width: "60%",
    position: "relative",
    color: "#AAAAAA",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057",
    },
  },

  top: {
    padding: "15px 15px",
  },

  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

export default profilePageStyle;
