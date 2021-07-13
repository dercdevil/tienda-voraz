import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";
import image from "assets/img/bg7.jpg";
import EmailIcon from "@material-ui/icons/Email";
import Logo from "assets/img/brand.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {api} from "constans";

const useStyles = makeStyles(styles);
const url = api+'/auth_recovery_pass';

export default function ResetPassword() {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [values, setValues] = useState({
    email: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const showButton = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    values.email
  )
    ? false
    : true;
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  const notify = (content, type) => {
    if (type === "success") {
      toast.success(content, { position: toast.POSITION.TOP_CENTER });
    } else {
      toast.error(content, { position: toast.POSITION.TOP_CENTER });
    }
  };
  const auth_recovery_pass = async () => {
    await axios
      .post(url, values)
      .then((response) => {
        notify(response.data.message, "success");
      })
      .catch((error) => {
        notify(error.response.data.message);
      });
  };
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          width: "100%",
          height: "100vh",
          position: "fixed",
          overflow: "auto",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader className={classes.cardHeader}>
                  <img src={Logo} alt="..." className={classes.imgFluid} />
                </CardHeader>
                <h4 className={classes.divider}>Recuperar Contraseña</h4>
                <div>
                  <Link className={classes.link} to="/">
                    <Button simple color="primary">
                      <ArrowBackIcon />
                      Volver
                    </Button>
                  </Link>
                </div>

                <p className={classes.divider1}>
                  Ingresa tu Correo Electronico para recuperar tu Contraseña
                </p>
                <CardBody>
                  <CustomInput
                    labelText="Correo"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: values.email,
                      name: "email",
                      onChange: handleChange("email"),
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button
                    color="primary"
                    size="lg"
                    disabled={showButton}
                    onClick={() => auth_recovery_pass()}
                  >
                    Recuperar Contraseña
                  </Button>
                  <ToastContainer />
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
