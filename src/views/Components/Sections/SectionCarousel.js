import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import image1 from "assets/img/bg.jpg";

import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel({ gallery, url }) {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            {gallery ? (
              <Carousel {...settings}>
                {gallery.map((item, index) => (
                  <div
                    key={index}
                    style={{ height: 250}}
                  >
                    <img
                      src={!url ? item.name : url + item.img_product}
                      alt={item.img_product}
                      style={{ width: "100%", height: 250, borderRadius: 20  }}
                      // className={classes.imgFluid}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Carousel {...settings}>
                <div>
                  <img
                    src={image1}
                    alt="First slide"
                    // className="slick-image"
                    className={classes.imgFluid}
                  />
                </div>
              </Carousel>
            )}
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
