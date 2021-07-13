import React, { useEffect, lazy } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import PaymentIcon from "@material-ui/icons/Payment";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { container } from "assets/jss/material-kit-react.js";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Slide from "@material-ui/core/Slide";
import PhoneIcon from "@material-ui/icons/Phone";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import { title } from "assets/jss/material-kit-react.js";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { primaryColor } from "assets/jss/material-kit-react.js";
import RoomIcon from "@material-ui/icons/Room";
import FormHelperText from "@material-ui/core/FormHelperText";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import RModal from "components/Modal/Modal";
import { CodigArea } from "utils/CodigArea";
import { Map } from "components/Maps/Map";
import Hidden from "@material-ui/core/Hidden";
import { notify } from "utils/notify";
import { usePosition } from "use-position";
import { api } from "constans";
import { Digit } from "utils/Digit";

const Sidebar = lazy(() => import("components/Sidebar/Sidebar.js"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const url = api;
const km = [
  {
    value: "3",
    label: "3 Km",
  },
  {
    value: "4",
    label: "4 Km",
  },
  {
    value: "5",
    label: "5 Km",
  },
  {
    value: "6",
    label: "6 Km",
  },
  {
    value: "7",
    label: "7 Km",
  },
  {
    value: "8",
    label: "8 Km",
  },
  {
    value: "9",
    label: "9 Km",
  },
  {
    value: "10",
    label: "10 Km",
  },
];
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
  icon: {
    color: "#F15A22",
  },
  underline: {
    fontSize: "14px",
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: primaryColor,
    },
  },
  labelRoot: {
    color: "#AAAAAA",
    height: "unset",
    "&,&::placeholder": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1",
    },
    "&::placeholder": {
      color: "#AAAAAA",
    },
  },
  formControl: {
    width: "100%",
    marginTop: "13px",
    position: "relative",
    color: "#AAAAAA",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057",
    },
  },
  formControl2: {
    width: "100%",
    marginTop: "3px",
    position: "relative",
    color: "#AAAAAA",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057",
    },
  },
}));
const Modal = ({
  open,
  close,
  values,
  digit,
  handleChange,
  handlechangedigit,
  handleChangeaddress,
  addresses,
  saveProfiles,
  show,
  visible,
}) => {
  const classes = useStyles();
  const showButton =
    values.phone.length < 8 || values.phone.length > 8 ? true : false;
  return (
    <>
      {visible ? null : (
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} lg={6}>
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
                <form className={classes.form}>
                  <CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <h2 className={classes.title}>Transportista</h2>
                    </CardFooter>
                    <CardFooter className={classes.cardFooter}>
                      <h4 className={classes.h4}>Datos Personales</h4>
                      <ContactMailIcon className={classes.icon} />
                    </CardFooter>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={6}>
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
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Teléfono"
                          id="phone"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            value: values.phone,
                            error:
                              values.phone.length < 7 || values.phone.length > 8
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
                              <FormControl className={classes.formControl2}>
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
                        {values.phone.length < 7 || values.phone.length > 8 ? (
                          <FormHelperText error={true}>
                            {" "}
                            Numero de Teléfono no valido{" "}
                          </FormHelperText>
                        ) : null}
                      </GridItem>
                    </GridContainer>
                    <CardFooter className={classes.cardFooter}>
                      <h4 className={classes.h4}>Detalles de Pago</h4>
                      <PaymentIcon className={classes.icon} />
                    </CardFooter>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={6}>
                        <FormControl className={classes.formControl}>
                          <InputLabel
                            className={classes.labelRoot}
                            id="select-label"
                            select="true"
                          >
                            Distancia Inicial
                          </InputLabel>
                          <Select
                            labelId="select-label"
                            id="radio"
                            select="true"
                            value={values.radio}
                            onChange={handleChange("radio")}
                            className={classes.underline}
                          >
                            {km.map((option) => (
                              <MenuItem
                                select="true"
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Precio Inicial"
                          id="base_price"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "number",
                            value: values.base_price,
                            onChange: handleChange("base_price"),
                            endAdornment: (
                              <InputAdornment position="end">
                                <AttachMoneyIcon
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
                          labelText="Distancia Extra"
                          id="extra_distance"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "number",
                            name: "extra_distance",
                            value: values.extra_distance,
                            onChange: handleChange("extra_distance"),
                            endAdornment: (
                              <InputAdornment position="end">
                                Mts
                              </InputAdornment>
                            ),
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Precio Extra"
                          id="extra_price"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "number",
                            // name: "extra_price",
                            value: values.extra_price,
                            onChange: handleChange("extra_price"),
                            endAdornment: (
                              <InputAdornment position="end">
                                <AttachMoneyIcon
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
                      {/* <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Latitude"
                            id="latitude"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              disabled: true,
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
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Longitud"
                            id="longitude"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              disabled:  true,
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
                        </GridItem>
                      </GridContainer> */}
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Direccion"
                            id="address"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              disabled: true,
                              value: addresses.address,
                              name: "address",
                              onChange: handleChangeaddress("address"),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <RoomIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </div>
                  </CardBody>
                </form>
              </DialogContent>
              <DialogActions className={classes.modalFooter}>
                <Button
                  color="primary"
                  onClick={() => saveProfiles()}
                  disabled={showButton}
                >
                  Registrar
                </Button>
                <Button onClick={close} color="danger" simple>
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          </GridItem>
        </GridContainer>
      )}
    </>
  );
};

export default function Carriers({ messages = "transportistas" }) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [visible, setVisible] = React.useState(false);
  const show = () => setVisible(true);
  const hiden = () => setVisible(false);
  const { latitude, longitude, error } = usePosition({
    watch: true,
    enableHighAccuracy: true,
  });
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [digit, setDigit] = React.useState("");
  const [number, setNumber] = React.useState("");
  const handlechangedigit = (event) => {
    setDigit(event.target.value);
  };
  const handlechangeNumber = (event) => {
    setNumber(event.target.value);
  };
  const [values, setValues] = React.useState({
    name: "",
    phone: "",
    radio: "3",
    base_price: 2000,
    extra_price: 500,
    extra_distance: 500,
    carrier_addresses: {},
  });
  const [addresses, setAddresses] = React.useState({
    latitude: "",
    longitude: "",
    address: "",
    carrier_id: "",
  });
  const resetForm = () => {
    setValues({
      name: "",
      phone: "",
      radio: "3",
      base_price: 2000,
      extra_price: 500,
      extra_distance: 500,
      carrier_addresses: {},
    });
    setDigit("");
    setNumber("");
    setAddresses({
      latitude: "",
      longitude: "",
      address: "",
      carrier_id: "",
    });
  };
  const [data, setdata] = React.useState([]);
  const [message, setMessage] = React.useState(messages);
  const [classicModal, setClassicModal] = React.useState(false);
  const hidenclose = () => {
    setClassicModal(false);
    resetForm();
  };
  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]:
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1),
    });
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
      carrier_id: "",
    });
    hiden();
  };
  const [modal, setModal] = React.useState(false);
  const Modalclose = () => {
    setModal(false);
    resetForm();
  };
  const [delModal, setDelmodal] = React.useState(false);
  const deleteUser = () => {
    setDelmodal(false);
    resetForm();
  };
  const seletUser = (rowData, type) => {
    setValues(rowData);
    setDigit(Digit(rowData.phone).digit);
    setNumber(
      rowData.phone.slice(rowData.phone.indexOf("-") + 1, rowData.phone.lenght)
    );
    setAddresses(rowData.carrier_addresses[0]);
    localStorage.setItem("idAdrressCarrier", rowData.carrier_addresses[0].id);
    type === "edit" ? setModal(true) : setDelmodal(true);
  };
  useEffect(() => {
    const getRequest = async () => {
      const token = localStorage.getItem("token");
      await axios
        .get(url + "/carriers", { headers: { "x-access-token": token } })
        .then((response) => {
          // console.log(response);
          setdata(response.data);
          setMessage("Transportista Agregado");
        })
        .catch((error) => {
          console.log(error.response);
          // notify(error.response.data);
        });
    };
    getRequest();
  }, [message]);

  const saveProfiles = async () => {
    const token = localStorage.getItem("token");
    values.phone = digit + "-" + values.phone;
    await axios
      .post(url + "/carriers", values, { headers: { "x-access-token": token } })
      .then((response) => {
        notify(response.data.message, "success");
        carrierAddresses(response.data.id);
        setMessage("Transportista agregado");
        hidenclose();
        resetForm();
      })
      .catch((error) => notify(error.response.data.message));
  };
  const carrierAddresses = async (carrier_id) => {
    const token = localStorage.getItem("token");
    addresses.carrier_id = carrier_id;
    await axios
      .post(url + "/carrier-addresses", addresses, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {})
      .catch((error) => console.log(error.response));
  };
  const updatedUser = async () => {
    const token = localStorage.getItem("token");
    values.phone = digit + "-" + number;
    await axios
      .put(url + "/carriers/" + values.id, values, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        uptadeAddresses();
        notify("Transportista Actualizado con Exito ", "success");
        setMessage("Transportista Actualizado");
        resetForm();
        Modalclose();
      })
      .catch((error) => {
        notify("Ocurrio un error");
      });
  };
  const uptadeAddresses = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idAdrressCarrier");

    await axios
      .put(
        url + "/carrier-addresses/" + id,
        {
          latitude: addresses.latitude,
          longitude: addresses.longitude,
          address: addresses.address,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.response));
  };
  const deleteProfiles = async () => {
    const token = localStorage.getItem("token");
    await axios
      .delete(url + "/carriers/" + values.id, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        setMessage("Transportista Eliminado");
        deleteUser();
        notify(response.data.message, "success");
        resetForm();
      })
      .catch((error) => {
        notify(error.response.data.message);
      });
  };
  return visible ? (
    <Map
      latitude={latitude}
      longitude={longitude}
      addresses={addresses}
      error={error}
      handleChangeaddressMap={handleChangeaddressMap}
      hiden={hiden}
    />
  ) : (
    <Sidebar>
      <div className={classes.root}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes[cardAnimaton]}>
              <CardFooter className={classes.cardFooter}>
                <h2 className={classes.title}>Transportistas</h2>
                <Hidden xsDown smDown>
                  <Button
                    aria-label="add"
                    onClick={() => setClassicModal(true)}
                    color="primary"
                    style={{
                      position: "absolute",
                      marginTop: "30px",
                      left: "80%",
                    }}
                  >
                    Agregar
                  </Button>
                </Hidden>
              </CardFooter>
              <Hidden mdUp lgUp>
                <CardFooter className={classes.cardFooter}>
                  <Button
                    aria-label="add"
                    onClick={() => setClassicModal(true)}
                    color="primary"
                  >
                    Agregar
                  </Button>
                </CardFooter>
              </Hidden>
              <Divider variant="middle" />
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="caption table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Teléfono</TableCell>
                            <TableCell align="right">Radio</TableCell>
                            <TableCell align="right">Precio Base</TableCell>
                            <TableCell align="right">Precio Extra</TableCell>
                            <TableCell align="right">Distancia Extra</TableCell>
                            <TableCell align="center">Direccion</TableCell>
                            <TableCell align="right"> </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.phone}</TableCell>
                              <TableCell align="right">{row.radio}</TableCell>
                              <TableCell align="right">
                                {row.base_price}
                              </TableCell>
                              <TableCell align="right">
                                {row.extra_price}
                              </TableCell>
                              <TableCell align="right">
                                {row.extra_distance}
                              </TableCell>
                              <TableCell align="center">
                                {row.carrier_addresses.map(
                                  (item) => item.address
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => seletUser(row, "edit")}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => seletUser(row, "delete")}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <Modal
          open={classicModal}
          close={hidenclose}
          values={values}
          addresses={addresses}
          digit={digit}
          handlechangedigit={handlechangedigit}
          setAddresses={setAddresses}
          handleChange={handleChange}
          handleChangeaddress={handleChangeaddress}
          saveProfiles={saveProfiles}
          show={show}
          hiden={hiden}
          visible={visible}
        />
        <RModal
          open={modal}
          close={Modalclose}
          action={"Editar"}
          onClick={updatedUser}
        >
          <CardFooter className={classes.cardFooter}>
            <h2 className={classes.title}>Transportista</h2>
          </CardFooter>
          <CardBody>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Nombre"
                  id="nameEdit"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: values && values.name,
                    name: "name",
                    onChange: handleChange("name"),
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Teléfono"
                  id="phoneEdit"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: number,
                    name: "phone",
                    error:
                      number.length < 7 || number.length > 8 ? true : false,
                    onChange: handlechangeNumber,
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneIcon className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <FormControl className={classes.formControl2}>
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
                {number.length < 7 || number.length > 8 ? (
                  <FormHelperText error={true}>
                    {" "}
                    Numero de Teléfono no valido{" "}
                  </FormHelperText>
                ) : null}
              </GridItem>
            </GridContainer>
            <CardFooter className={classes.cardFooter}>
              <h4 className={classes.h4}>Detalles de Pago</h4>
              <PaymentIcon className={classes.icon} />
            </CardFooter>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    className={classes.labelRoot}
                    id="select-label"
                    select="true"
                  >
                    Radio
                  </InputLabel>
                  <Select
                    labelId="select-label"
                    id="radioEdit"
                    select="true"
                    value={values && values.radio}
                    onChange={handleChange("radio")}
                    className={classes.underline}
                  >
                    {km.map((option) => (
                      <MenuItem
                        select="true"
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Precio Base"
                  id="base_priceEdit"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "number",
                    name: "extra_price",
                    value: values && values.base_price,
                    onChange: handleChange("base_price"),
                    endAdornment: (
                      <InputAdornment position="end">
                        <AttachMoneyIcon className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Distancia Extra"
                  id="extra_distanceEdit"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "number",
                    name: "extra_distance",
                    value: values && values.extra_distance,
                    onChange: handleChange("extra_distance"),
                    endAdornment: (
                      <InputAdornment position="end">
                        <InputAdornment position="end">Mts</InputAdornment>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Precio Extra"
                  id="extra_priceEdit"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "number",
                    name: "extra_price",
                    value: values && values.extra_price,
                    onChange: handleChange("extra_price"),
                    endAdornment: (
                      <InputAdornment position="end">
                        <AttachMoneyIcon className={classes.inputIconsColor} />
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
                disabled={error ? true : false}
                color="primary"
              >
                Editar Dirección
              </Button>
            </CardFooter>

            <div>
              {/* <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Latitude"
                    id="latitudeedit"
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
                          <ExploreIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Longitud"
                    id="longitudeedit"
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
                          <ExploreIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Direccion"
                    id="addressedit"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: !error ? true : false,
                      value: addresses.address,
                      name: "address",
                      onChange: handleChangeaddress("address"),
                      endAdornment: (
                        <InputAdornment position="end">
                          <RoomIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </CardBody>
        </RModal>

        <RModal
          open={delModal}
          close={deleteUser}
          action={"Eliminar"}
          onClick={deleteProfiles}
        >
          <CardFooter className={classes.cardFooter}>
            <h2 className={classes.title}>Eliminar</h2>
          </CardFooter>

          <CardFooter className={classes.cardFooter}>
            <h3> Estas seguro que quiere eliminar al transportista:</h3>
          </CardFooter>

          <CardFooter className={classes.cardFooter}>
            <h4 className={classes.title}>{values.name}</h4>
          </CardFooter>
        </RModal>
      </div>
    </Sidebar>
  );
}
