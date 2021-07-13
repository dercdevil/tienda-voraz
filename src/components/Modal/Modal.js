import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import { container } from "assets/jss/material-kit-react.js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import { title } from "assets/jss/material-kit-react.js";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  const useStyles = makeStyles((theme) => ({
    // root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    // },
    h4: {
      margin: "10px",
    },
    title: {
      ...title,
      display: "inline-block",
      position: "relative",
      marginTop: "30px",
      minHeight: "32px",
      textDecoration: "none",
    },
    container: {
      ...container,
      zIndex: "2",
      position: "relative",
      paddingTop: "20vh",
      color: "#FFFFFF",
      paddingBottom: "200px",
    },
    cardHidden: {
      opacity: "0",
      transform: "translate3d(0, -60px, 0)",
    },
    form: {
      margin: "0",
    },
    cardHeader: {
      width: "auto",
      textAlign: "center",
      marginLeft: "20px",
      marginRight: "20px",
      marginTop: "-40px",
      padding: "20px 0",
      marginBottom: "15px",
    },
    socialIcons: {
      maxWidth: "24px",
      marginTop: "0",
      width: "100%",
      transform: "none",
      left: "0",
      top: "0",
      height: "100%",
      lineHeight: "41px",
      fontSize: "20px",
    },
    divider: {
      marginTop: "30px",
      marginBottom: "0px",
      textAlign: "center",
    },
    cardFooter: {
      paddingTop: "10px",
      border: "0",
      borderRadius: "6px",
      justifyContent: "center !important",
    },
    cardList: {
      // paddingTop: "10px",
      border: "0",
      borderRadius: "6px",
      // justifyContent: "center !important",
    },
    socialLine: {
      marginTop: "1rem",
      textAlign: "center",
      padding: "0",
    },
    inputIconsColor: {
      color: "#495057",
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      justifyContent: "center !important",
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
  
    imgFluid: {
      // marginLeft: "-30px",
      maxWidth: "100%",
      height: "auto",
    },
    imgRounded: {
      borderRadius: "6px !important",
    },
    imgRoundedCircle: {
      borderRadius: "50% !important",
    },
    imgRaised: {
      boxShadow:
        "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
    imgGallery: {
      width: "100%",
      marginBottom: "2.142rem",
    },
    imgCardTop: {
      width: "100%",
      borderTopLeftRadius: "calc(.25rem - 1px)",
      borderTopRightRadius: "calc(.25rem - 1px)",
    },
    imgCardBottom: {
      width: "100%",
      borderBottomLeftRadius: "calc(.25rem - 1px)",
      borderBottomRightRadius: "calc(.25rem - 1px)",
    },
    imgCard: {
      width: "100%",
      borderRadius: "calc(.25rem - 1px)",
    },
    imgCardOverlay: {
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      padding: "1.25rem",
    },
    title1: {
      fontSize: "14px",
      marginTop: "5px"
    },
    quantity:{
      fontSize: "12px",
      marginTop: "-5px"
    },
    price: {
      fontSize: "12px",
      marginTop: "-5px",
      "&,&:hover,&:focus": {
        color: "#000000"
      },
      fontWeight: "bold"
    },
    date:{
      fontSize: "10px",
      marginTop: "-5px"
    }
  }));

export default function RModal ({open, close, children, action, onClick }) {
    
    const classes = useStyles();
    
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={10} lg={6}>
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal,
            }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
             {children}
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button onClick={() => onClick()} color="primary" >
                {action}
              </Button>
              <Button onClick={close} color="danger" simple>
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </GridItem>
      </GridContainer>
    );
  };