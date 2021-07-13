import React from "react";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { makeStyles } from "@material-ui/core/styles";
// import Footer from "components/Footer/Footer.js";ç
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import image from "assets/img/bg7.jpg";
import Logo from "assets/img/brand.png";
import Lottieimage from "components/Lottie/index";
import lottie from "assets/img/dona";
const useStyles = makeStyles(styles);

export default function PageNotFound() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
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
                <CardHeader className={classes.cardHeader}>
                  <img src={Logo} alt="..." className={classes.imgFluid} />
                </CardHeader>
                <CardHeader className={classes.cardHeader}>
                  <h4 style={{ marginTop: "20px" }}>
                    ¡Este Enlace no esta Disponible!
                  </h4>
                </CardHeader>
                <CardFooter className={classes.cardFooter}>
                  <Button color="primary" size="md" href={"/"}>
                    Volver
                  </Button>
                </CardFooter>
                <CardBody>
                  <Lottieimage image={lottie} height={250} width={250} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
