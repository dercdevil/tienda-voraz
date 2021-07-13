import React, { useState } from "react";
import { FormatRut } from "utils/FormatRut";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import FormHelperText from "@material-ui/core/FormHelperText";
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
import ContactMailIcon from "@material-ui/icons/ContactMail";
import image from "assets/img/bg7.jpg";
import Logo from "assets/img/brand.png";
import { useAuth } from "hoocks";
const useStyles = makeStyles(styles);


export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [values, setValues] = useState({
    password: "",
    rut: "",
  });
  const { isLoading, signIn } = useAuth();
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]:
        prop === "rut" ? FormatRut(event.target.value) : event.target.value,
    });
  };
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

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
                  <h4 className={classes.divider}>Iniciar Sesión</h4>
                  <CardBody>
                    <CustomInput
                      labelText="Rut"
                      id="rut"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.rut,
                        onChange: handleChange("rut"),
                        // inputComponent: TextMaskCustom,
                        placeholder: "12345678-9",
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
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
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
                    {/* <FormHelperText id="component-helper-text">Asegurate de tener una contraseña con un mínimo de 7 caracteres</FormHelperText> */}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      color="primary"
                      size="lg"
                      isLoading={isLoading}
                      disabled={isLoading}
                      onClick={() => signIn(values)}
                    >
                      Iniciar Sesión
                    </Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    <Link className={classes.link} to="/ResetPassword">
                      {" "}
                      Olvidaste tu contraseña?
                    </Link>
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
