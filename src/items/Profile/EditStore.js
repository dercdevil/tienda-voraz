import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import RoomIcon from "@material-ui/icons/Room";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import CreditCardIcon from "@material-ui/icons/CreditCard";

const useStyles = makeStyles(styles);
export const EditStore = ({
  values,
  handleChange,
  handleimg,
  addresses,
  handleChangeaddress,
  show,
  updatedProfile,
}) => {
  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <div className={classes.profile}>
          <CardFooter className={classes.cardFooter}>
            <Avatar alt="" src={values.img_profile} className={classes.large} />
          </CardFooter>
        </div>

        <CardFooter className={classes.cardFooter}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={handleimg("img_profile")}
          />
          <label htmlFor="contained-button-file">
            <Button simple variant="contained" color="primary" component="span">
              Cambiar Imagen
            </Button>
          </label>
        </CardFooter>

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Nombre de la Tienda"
              id="name_store"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: "name_store",
                type: "text",
                value: values && values.name_store,
                onChange: handleChange("name_store"),
                endAdornment: (
                  <InputAdornment position="end">
                    <StoreMallDirectoryIcon
                      className={classes.inputIconsColor}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Descripcion"
              id="description"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: addresses.description,
                onChange: handleChangeaddress("description"),
                // multiline: true,
                // rows: 2,
                name: "description",
                endAdornment: (
                  <InputAdornment position="end">
                    <StoreMallDirectoryIcon
                      className={classes.inputIconsColor}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Api Key Flow"
              id="api_key"
              formControlProps={{
                fullWidth: true,
                margin: "dense",
              }}
              inputProps={{
                value: values && values.api_key,
                onChange: handleChange("api_key"),
                endAdornment: (
                  <InputAdornment position="end">
                    <CreditCardIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Secret Key Flow"
              id="secret_key"
              formControlProps={{
                fullWidth: true,
                margin: "dense",
              }}
              inputProps={{
                value: values && values.secret_key,
                onChange: handleChange("secret_key"),
                endAdornment: (
                  <InputAdornment position="end">
                    <CreditCardIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
        </GridContainer>

        <CardFooter className={classes.cardFooter}>
          <Button
            aria-label="add"
            onClick={() => show()}
            color="primary"
          >
            Actualizar Dirección
          </Button>
        </CardFooter>

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Direccion"
              id="addresses"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled:true,
                value: addresses.address,
                onChange: handleChangeaddress("address"),
                endAdornment: (
                  <InputAdornment position="end">
                    <RoomIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Ciudad"
              id="city"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled: true,
                value: addresses.city,
                onChange: handleChangeaddress("city"),
                endAdornment: (
                  <InputAdornment position="end">
                    <RoomIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Longitud"
              id="Longitud"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                // name: "address",
                disabled: !error ? true : false,
                value: addresses.longitude,
                onChange: handleChangeaddress("longitude"),
                endAdornment: (
                  <InputAdornment position="end">
                    <RoomIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Latitud"
              id="Latitud"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                // name: "address",
                disabled: !error ? true : false,
                value: addresses.latitude,
                onChange: handleChangeaddress("latitude"),
                endAdornment: (
                  <InputAdornment position="end">
                    <RoomIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem> */}
        </GridContainer>
      </GridItem>
      <div className={classes.top}>
        <Button color="primary" size="lg" onClick={() => updatedProfile()}>
          Actualizar Tienda
        </Button>
      </div>
    </GridContainer>
  );
};
