import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { title, container } from "assets/jss/material-kit-react.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter.js";
import GridContainer from "components/Grid/GridContainer.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import CustomInput from "components/CustomInput/CustomInput.js";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "components/CustomButtons/Button.js";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { primaryColor } from "assets/jss/material-kit-react.js";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {api} from "constans";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  h4: {
    margin: "10px",
  },
  h4top: {
    marginTop: "40px",
  },
  top: {
    marginTop: "40px",
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    minHeight: "32px",
    textDecoration: "none",
  },
  title2: {
    fontWeight: "bold",
    marginLeft: "40px",
    marginRight: "10px",
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
    marginTop: "5px",
  },
  quantity: {
    fontSize: "12px",
    marginTop: "-5px",
  },
  price: {
    fontSize: "12px",
    marginTop: "-5px",
    "&,&:hover,&:focus": {
      color: "#000000",
    },
    fontWeight: "bold",
  },
  date: {
    fontSize: "10px",
    marginTop: "-5px",
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
    width: "25%",
    marginTop: "-8px",
    position: "relative",
    color: "#AAAAAA",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057",
    },
  },
  formControl1: {
    width: "100%",
    marginTop: "13px",
    marginLeft: "20px",
    position: "relative",
    color: "#AAAAAA",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057",
    },
  },
}));
const url = api;
export default function Invoice(props) {
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const [values, setValues] = React.useState({
    namebuyer: "",
    phone: "",
    address: "",
    base_price: "",
    extra_price: "",
    extra_distance: "",
    carrier: "",
  });
  const handleChangevalues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [producto, setProducto] = React.useState([
    {
      id: 0,
      name: "",
      stock: 0,
      value: 0,
      price: 0,
    },
  ]);
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
  const remove = (position) => {
    const newData = [
      ...producto.slice(0, position),
      ...producto.slice(position + 1),
    ];
    setProducto(newData);
  };
  const addproducto = () => {
    const newData = [
      ...producto,
      {
        id: 0,
        name: "",
        stock: 0,
        value: 0,
        price: 0,
      },
    ];
    setProducto(newData);
  };
  const register = async () =>{
    const token = localStorage.getItem("token");
    await axios.post(url,values,{ headers: { Authorization: `Bearer ${token}` }})
    .then(response => {
      console.log(response.data.message)
      // alert(response.data.message)
      // window.location.href= "/";
    })
    .catch(error=> {
      console.log(error.response.data.message)
    })
  }
  const handleChange = (index, props) => (event) => {
    producto[index][props] = event.target.value;
  };
  return (
    <div>
      <div className={classes.root}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes[cardAnimaton]}>
              <CardFooter className={classes.cardFooter}>
                <h2 className={classes.title}> Facturar Nuevo Pedido</h2>
                <h4 className={classes.h4top}>#000000</h4>
              </CardFooter>
              <Divider variant="middle" />
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <GridContainer>
                      <h4 className={classes.title2}>Nombre Local: </h4>
                      <h5> Store julio </h5>
                    </GridContainer>
                    <GridContainer>
                      <h4 className={classes.title2}> Dirección Local:</h4>
                      <h5>Chile cerca de tu casa </h5>
                    </GridContainer>
                    <GridContainer>
                      <h4 className={classes.title2}>Telefono Local: </h4>
                      <h5> 01478523698</h5>
                    </GridContainer>
                    <GridContainer>
                      <h4 className={classes.title2}> Correo</h4>
                      <h5>storejulito@store.com </h5>
                    </GridContainer>
                    <GridContainer>
                      <h4 className={classes.title2}> Transportista:</h4>
                      <FormControl className={classes.formControl}>
                        <InputLabel
                          className={classes.labelRoot}
                          id="select-label"
                        >
                          Transportista
                        </InputLabel>
                        <Select
                          labelId="select-label"
                          id="carrier"
                          //   value={values.status}
                          //   onChange={handleChangevalues("carrier")}
                          className={classes.underline}
                        >
                          <MenuItem value={"Ricardo"}>Ricardo</MenuItem>
                          <MenuItem value={"Jose Luis"}>Jose Luis</MenuItem>
                          <MenuItem value={"Cristian"}>Cristian</MenuItem>
                        </Select>
                      </FormControl>
                    </GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                    <FormControl className={classes.formControl1}>
                        <InputLabel
                          className={classes.labelRoot}
                          id="select-label-2"
                        >
                          Radio
                        </InputLabel>
                        <Select
                          labelId="select-label-2"
                          id="radio"
                          value={values.status}
                          onChange={handleChangevalues("radio")}
                          className={classes.underline}
                        >
                          {km.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                          labelText="Precio Base"
                          id="base_price"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            value: values.base_price,
                            onChange: handleChangevalues("base_price"),
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

                    <GridContainer>
                      <h4 className={classes.title2}> Status:</h4>
                      <FormControl className={classes.formControl}>
                        <InputLabel
                          className={classes.labelRoot}
                          id="select-label"
                        >
                          Status
                        </InputLabel>
                        <Select
                          labelId="select-label"
                          id="radio"
                          value={values.status}
                          onChange={handleChange("status")}
                          className={classes.underline}
                        >
                          <MenuItem value={1}>Pendiente</MenuItem>
                          <MenuItem value={2}>Confirmado</MenuItem>
                          <MenuItem value={3}>Anulado</MenuItem>
                        </Select>
                      </FormControl>
                    </GridContainer>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={12}>
                        <CardFooter className={classes.cardFooter}>
                          <h3 className={classes.title2}> Datos Comprador</h3>
                        </CardFooter>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Nombre"
                          id="namebuyer"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            value: values.name,
                            onChange: handleChangevalues("namebuyer"),
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
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Direccion"
                          id="address"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            value: values.last_name,
                            onChange: handleChangevalues("address"),
                            endAdornment: (
                              <InputAdornment position="end">
                                <LocationOnIcon
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Telefono"
                          id="phone"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            value: values.phone,
                            onChange: handleChangevalues("phone"),
                            endAdornment: (
                              <InputAdornment position="end">
                                <PhoneAndroidIcon
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Correo"
                          id="Email"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            value: values.last_name,
                            onChange: handleChangevalues("Email"),
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
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Divider variant="middle" />

                    <TableContainer className={classes.top} component={Paper}>
                      <Table
                        className={classes.table}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Valor Unidad</TableCell>
                            <TableCell>Valor Total</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          {producto.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {" "}
                                <CustomInput
                                  labelText="Id"
                                  id="id"
                                  //   formControlProps={{}}
                                  inputProps={{
                                    type: "number",
                                    value: index,
                                    // onChange: handleChange("last_name"),
                                  }}
                                />{" "}
                              </TableCell>
                              <TableCell>
                                <CustomInput
                                  labelText="name"
                                  id="name"
                                  formControlProps={{}}
                                  inputProps={{
                                    onChange: handleChange(index, "name"),
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <CustomInput
                                  labelText="cantidad"
                                  id="stock"
                                  formControlProps={{}}
                                  inputProps={{
                                    type: "number",
                                    onChange: handleChange(index, "stock"),
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <CustomInput
                                  labelText="Valor Unidad"
                                  id=""
                                  formControlProps={{}}
                                  inputProps={{
                                    type: "number",
                                    onChange: handleChange(index, "value"),
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <CustomInput
                                  labelText="Precio"
                                  id="price"
                                  inputProps={{
                                    type: "number",
                                    onChange: handleChange(index, "price"),
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  aria-label="add"
                                  onClick={() => remove(index)}
                                >
                                  <HighlightOffIcon fontSize="small" />
                                </IconButton>{" "}
                              </TableCell>
                            </TableRow>
                          ))}

                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={12}>
                              <Button
                                simple
                                color="primary"
                                onClick={() => addproducto()}
                              >
                                Añadir Nuevo producto
                              </Button>
                            </GridItem>
                          </GridContainer>
                          <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell></TableCell>
                            <TableCell colSpan={2}>SubTotal</TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell />
                            <TableCell>Delivery</TableCell>
                            <TableCell></TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                            <TableCell>0</TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>

                    <CardFooter className={classes.cardFooter}>
                      <Link className={classes.link} to="/home/Orders">
                        <Button simple color="danger">
                          <ArrowBackIcon />
                          Volver
                        </Button>
                      </Link>
                      <Button color="primary" onClick={register()}>
                        Crear Factura
                      </Button>
                    </CardFooter>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
