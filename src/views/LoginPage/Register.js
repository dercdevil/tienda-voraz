import React, { useState } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { FormatRut } from "utils/FormatRut";
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
import ContactMailIcon from "@material-ui/icons/ContactMail";
import Logo from "assets/img/brand.png";
import FormHelperText from "@material-ui/core/FormHelperText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {api} from "constans";

const url = api+`/users`;

const useStyles = makeStyles(styles);


export default function ResetPassword() {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [values, setValues] = useState({
    password: "",
    password_repeat: "",
    rut: "",
    role: "VENDEDOR",
  });
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]:
        prop === "rut" ? FormatRut(event.target.value) : event.target.value,
    });
  };
  const showButton =
    values.rut.length &&
    values.password.length &&
    values.password === values.password_repeat
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

  const register = async () => {
    await axios
      .post(url, values)
      .then((response) => {
        notify("Usuario Creado con Exito", "success");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response);
        notify("El rut ingresado, se encuentra registrado en el sistema");
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
                <form className={classes.form}>
                  <CardHeader className={classes.cardHeader}>
                    <img src={Logo} alt="..." className={classes.imgFluid} />
                  </CardHeader>
                  <h4 className={classes.divider}>Registro</h4>
                  <div>
                    <Link className={classes.link} to="/">
                      <Button simple color="primary">
                        <ArrowBackIcon />
                        Volver
                      </Button>
                    </Link>
                  </div>

                  <p className={classes.divider1}>
                    Ingresa tu Rut y Contraseña para Registrate
                  </p>
                  <CardBody>
                    <CustomInput
                      labelText="Rut"
                      id="rut"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        name: "rut",
                        value: values.rut,
                        placeholder: "12345678-9",
                        onChange: handleChange("rut"),
                        // inputComponent: TextMaskCustom,
                        endAdornment: (
                          <InputAdornment position="end">
                            <ContactMailIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText id="component-helper-text">
                      Asegurate de tener un rut válido
                    </FormHelperText>
                    <CustomInput
                      labelText="Contraseña"
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        name: "password",
                        value: values.password,
                        onChange: handleChange("password"),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Contraseña"
                      id="password_repeat"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        name: "password_repeat",
                        value: values.password_repeat,
                        onChange: handleChange("password_repeat"),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <FormHelperText id="component-helper-text">
                      Asegurate de tener una contraseña con un mínimo de 7
                      caracteres
                    </FormHelperText>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      color="primary"
                      size="lg"
                      disabled={showButton}
                      onClick={() => register()}
                    >
                      Registrar
                    </Button>
                    <ToastContainer />
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
