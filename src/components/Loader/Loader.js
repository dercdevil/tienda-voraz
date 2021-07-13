import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ClassicSpinner } from "react-spinners-kit";
import Logo from "assets/img/brand.png";
const useStyles = makeStyles((theme) =>({
    loader:{
      display: "flex",
      flexDirection: "column",
      marginTop: "13%",
      alignItems: "center",
    },
    imgFluid: {
        maxWidth: "300px",
        height: "auto"
      },
  }));
const Loader = ({size}) => {
const classes = useStyles();
  return (
    <div className={classes.loader}>
        <img src={Logo} alt="..." className={classes.imgFluid} />
      <ClassicSpinner size={size} color="#F15A22" loading={true} />{" "}
    </div>
  );
};

export default Loader ;