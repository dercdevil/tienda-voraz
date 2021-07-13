import React, { lazy } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Avatar from "@material-ui/core/Avatar";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import FormHelperText from "@material-ui/core/FormHelperText";
import { usePosition } from "use-position";
import { api } from "constans";
import { Map } from "components/Maps/Map";
import { CodigArea } from "utils/CodigArea";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { notify } from "utils/notify";
const Sidebar = lazy(() => import("components/Sidebar/Sidebar.js"));

const useStyles = makeStyles(styles);

const url = api;

export default function Profiles() {
  const classes = useStyles();
  const { latitude, longitude, error } = usePosition({
    watch: true,
    enableHighAccuracy: true,
  });
  const [values, setValues] = React.useState({
    name: "",
    name_store: "",
    last_name: "",
    filename: "",
    email: "",
    phone: "",
    address: "",
    addresses: {},
    api_key: "",
    secret_key: "",
  });
  const [digit, setDigit] = React.useState("");
  const [addresses, setAddresses] = React.useState({
    latitude: "",
    longitude: "",
    description: "",
    address: "",
    city: "",
  });
  const [file, setFile] = React.useState(null);
  const showButton =
    values.name.length &&
    values.name_store.length &&
    values.last_name.length &&
    values.last_name.length &&
    addresses.address.length
      ? false
      : true;
  const handlechangedigit = (event) => {
    setDigit(event.target.value);
  };
  const handleChangeaddress = (prop) => (event) => {
    setAddresses({
      ...addresses,
      [prop]:
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1),
    });
  };
  const handleChangeaddressMap = (obj) => {
    setAddresses({
      latitude: obj.latitude,
      longitude: obj.longitude,
      address: obj.address,
      city: obj.city,
      description: addresses.description,
    });
    hiden();
  };

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]:
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1),
    });
  };
  const handleimg = (prop) => (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setValues({ ...values, [prop]: reader.result });
      }
    };
    setFile(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
  };

  const savePofiles = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", values.name);
    formData.append("name_store", values.name_store);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("phone", digit + "-" + values.phone);
    formData.append("address", addresses);
    formData.append("api_key", values.api_key);
    formData.append("secret_key", values.secret_key);
    let pass = true;
    if (!file) {
      setFile(null);
      pass = false;
      notify(
        "Upps ocurrio un error, Verifica si colocaste una imagen de la tienda "
      );
    }
    if (!addresses.latitude || !addresses.longitude) {
      pass = false;
      notify(
        "Upps ocurrio un error, Verifica haber seleccionado una direccion"
      );
    }
    const token = localStorage.getItem("token");
    if (pass) {
      await axios
        .post(url + "/profile", formData, {
          headers: {
            "x-access-token": token,
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          notify(response.data, "success");
          axios
            .post(url + "/user-addresses", addresses, {
              headers: { "x-access-token": token },
            })
            .then((response) => {
              console.log(response);
              notify("Perfil Creado Con Exito", "success");
              window.location.href = "/home/ProfilePage";
            })
            .catch((error) => console.log(error.response.data));
        })
        .catch((error) => notify(error.response.data.message));
    }
  };
  const [visible, setVisible] = React.useState(false);
  const show = () => setVisible(true);
  const hiden = () => setVisible(false);
  return visible ? (
    <Map
      latitude={latitude}
      longitude={longitude}
      error={error}
      handleChangeaddressMap={handleChangeaddressMap}
    />
  ) : (
    <Sidebar>
      <div className={classes.root}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <CardBody>
                      <div style={{ textAlign: "center" }}>
                        <h2 className={classes.title}> Configura tu Perfil </h2>
                      </div>
                      {/* <Divider variant="middle" /> */}
                      <CardFooter className={classes.cardFooter}>
                        <h4 className={classes.h4}>Tienda</h4>
                        <StoreMallDirectoryIcon className={classes.icon} />
                      </CardFooter>
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={6}>
                          <CardFooter className={classes.cardFooter}>
                            <Avatar
                              alt="Store"
                              src={values.filename}
                              className={classes.large}
                            />
                          </CardFooter>
                          <CardFooter className={classes.cardFooter}>
                            <input
                              accept="image/*"
                              className={classes.input}
                              id="contained-button-file"
                              name="file"
                              type="file"
                              onChange={handleimg("filename")}
                            />

                            <label htmlFor="contained-button-file">
                              <Button
                                simple
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                Subir Imagen
                              </Button>
                            </label>
                          </CardFooter>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Nombre de la Tienda"
                            id="name_store"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: values.name_store,
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

                          <CustomInput
                            labelText="Descripcion"
                            id="description"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: addresses.description,
                              onChange: handleChangeaddress("description"),
                              multiline: true,
                              rows: 2,
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

                      <CardFooter className={classes.cardFooter}>
                        <Button
                          aria-label="add"
                          onClick={() => show()}
                          color="primary"
                        >
                          Agregar Dirección
                        </Button>
                      </CardFooter>

                      <div>
                        <GridContainer justify="center">
                          {/* <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                              labelText="Latitude"
                              id="latitude"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                disabled: !error ? true : false,
                                value: addresses.latitude,
                                name: "latitude",
                                onChange: handleChangeaddress("latitude"),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <ExploreIcon
                                      className={classes.inputIconsColor}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                              labelText="Longitud"
                              id="longitude"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                disabled: !error ? true : false,
                                value: addresses.longitude,
                                name: "longitude",
                                onChange: handleChangeaddress("longitude"),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <ExploreIcon
                                      className={classes.inputIconsColor}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </GridItem>  */}

                          <GridItem xs={12} sm={12} md={4}>
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
                                name: "city",
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
                          <GridItem xs={12} sm={12} md={8}>
                            <CustomInput
                              labelText="Direccion"
                              id="addresses"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                disabled: true,
                                value: addresses.address,
                                onChange: handleChangeaddress("address"),
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
                      </div>

                      <CardFooter className={classes.cardFooter}>
                        <h4 className={classes.h4}>Datos Personales</h4>
                        <ContactMailIcon className={classes.icon} />
                      </CardFooter>
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={2}>
                          <CustomInput
                            labelText="Nombre"
                            id="name"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: values.name,
                              name: "name",
                              onChange: handleChange("name"),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <PersonIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Apellidos"
                            id="last_name"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: values.last_name,
                              onChange: handleChange("last_name"),
                              name: "last_name",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <PersonIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Correo"
                            id="email"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: values.email,
                              onChange: handleChange("email"),
                              name: "email",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <EmailIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                          <CustomInput
                            labelText="Teléfono"
                            id="phone"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: values.phone,
                              error:
                                values.phone.length < 7 ||
                                values.phone.length > 8
                                  ? true
                                  : false,
                              // helperText: values.phone.length > 9 ? "Numero no valido" : "",
                              onChange: handleChange("phone"),
                              name: "phone",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <PhoneAndroidIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                              startAdornment: (
                                <FormControl className={classes.formControl}>
                                  <Select
                                    id="phone"
                                    value={digit}
                                    onChange={handlechangedigit}
                                    renderValue={(value) => `${value}`}
                                    className={classes.underline}
                                  >
                                    {CodigArea.map((item, index) => (
                                      <MenuItem key={index} value={item.value}>
                                        {item.value + " - " + item.region}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ),
                            }}
                          />
                          {values.phone.length < 7 ||
                          values.phone.length > 8 ? (
                            <FormHelperText error={true}>
                              {" "}
                              Numero de Teléfono no valido{" "}
                            </FormHelperText>
                          ) : null}
                        </GridItem>
                      </GridContainer>

                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Api Key"
                            id="api_key"
                            formControlProps={{
                              fullWidth: true,
                              margin: "dense",
                            }}
                            inputProps={{
                              //  value:  values.api_key,
                              onChange: handleChange("api_key"),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <CreditCardIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Secret Key"
                            id="secret_key"
                            formControlProps={{
                              fullWidth: true,
                              margin: "dense",
                            }}
                            inputProps={{
                              //  value: values.secret_key,
                              onChange: handleChange("secret_key"),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <CreditCardIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        {/* <GridItem xs={12} sm={12} md={5}>
                          <CustomInput
                            labelText="Direccion"
                            id="address"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: values.address,
                              onChange: handleChange("address"),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <StoreMallDirectoryIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem> */}
                      </GridContainer>
                      <div
                        className={classes.top}
                        style={{ textAlign: "center" }}
                      >
                        <Button
                          color="primary"
                          size="lg"
                          disabled={showButton}
                          onClick={savePofiles}
                        >
                          Guardar Datos
                        </Button>
                      </div>
                    </CardBody>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
          </GridContainer>
          <div className={classes.top} />
        </div>
      </div>
    </Sidebar>
  );
}
