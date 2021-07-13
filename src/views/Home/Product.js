import React, { useEffect, lazy, useState } from "react";
import axios from "axios";
import { nameCategory } from "utils/nameCategory";
// import clsx from "clsx";
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
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { container } from "assets/jss/material-kit-react.js";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import AirplayIcon from "@material-ui/icons/Airplay";
import Slide from "@material-ui/core/Slide";
import YouTubeIcon from "@material-ui/icons/YouTube";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import Category from "@material-ui/icons/Category";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import FormControl from "@material-ui/core/FormControl";
import "moment/locale/es";
import { title } from "assets/jss/material-kit-react.js";
import SectionCarousel from "views/Components/Sections/SectionCarousel";
import RModal from "components/Modal/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import { notify } from "utils/notify";
import { EmptyInventary } from "utils/EmptyInventary";
import { api } from "constans";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EnhancedPagination from "components/Pagination/Pagination";
import EnhancedTable from "components/Table/Table";
import Loader from "components/Loader/Loader";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from "@material-ui/icons/Search";
// import { DataUsageOutlined } from "@material-ui/icons";

const Sidebar = lazy(() => import("components/Sidebar/Sidebar.js"));

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
  underline: {
    fontSize: "14px",
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: "#F15A22",
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
    marginTop: "-2px",
    position: "relative",
    color: "#AAAAAA",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057",
    },
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
  modal: {
    borderRadius: "6px",
    width: "1000px",
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px",
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143",
  },
  modalCloseButton: {
    color: "#999999",
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right",
  },
  modalClose: {
    width: "16px",
    height: "16px",
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0",
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));
const days = [
  {
    value: "LUNES",
    label: "Lunes",
  },
  {
    value: "MARTES",
    label: "Martes",
  },
  {
    value: "MIERCOLES",
    label: "Miercoles",
  },
  {
    value: "JUEVES",
    label: "Jueves",
  },
  {
    value: "VIERNES",
    label: "Viernes",
  },
  {
    value: "SABADO",
    label: "Sabado",
  },
  {
    value: "DOMINGO",
    label: "Domingo",
  },
];

const url = api;

const Modal = ({
  values,
  gallery,
  categories,
  category,
  inventary,
  open,
  close,
  handleChange,
  handleChangeCategory,
  handleChangeInventary,
  addInventary,
  addCategory,
  remove,
  registerProduct,
  handleimg,
}) => {
  const classes = useStyles();
  const showButton = false;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12}>
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
                  <h2 className={classes.title}>Nuevo Producto</h2>
                </CardFooter>

                <SectionCarousel gallery={gallery} />
                <CardFooter className={classes.cardFooter}>
                  <input
                    accept="image/*"
                    multiple
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    name="name"
                    onChange={handleimg("name")}
                  />

                  <label htmlFor="contained-button-file">
                    <Button
                      simple
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Agregar Imagenes del Producto
                    </Button>
                  </label>
                </CardFooter>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nombre del producto"
                      id="product"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.name,
                        onChange: handleChange("name"),
                        endAdornment: (
                          <InputAdornment position="end">
                            <AirplayIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Descripción"
                      id="description"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.description,
                        onChange: handleChange("description"),
                        endAdornment: (
                          <InputAdornment position="end">
                            <AirplayIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Link Youtube"
                      id="youtube"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: values.youtube_link,
                        onChange: handleChange("youtube_link"),
                        endAdornment: (
                          <InputAdornment position="end">
                            <YouTubeIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Precio"
                      id="value"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "number",
                        value: values.price,
                        onChange: handleChange("price"),
                        // inputComponent: TextMaskCustom,
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
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Tiempo de Preparación"
                      id="preparation_time"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "number",
                        value: values.time_for_preparation,
                        onChange: handleChange("time_for_preparation"),
                        endAdornment: (
                          <InputAdornment position="end">Min</InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        className={classes.labelRoot}
                        id="Status"
                        select="true"
                      >
                        Status
                      </InputLabel>
                      <Select
                        labelId="select-label"
                        id="status"
                        select="true"
                        value={values.status}
                        onChange={handleChange("status")}
                        className={classes.underline}
                      >
                        <MenuItem select="status" value={1}>
                          Disponible
                        </MenuItem>
                        <MenuItem select="status" value={0}>
                          No Disponible
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>

                <CardFooter className={classes.cardFooter}>
                  <h5 className={classes.title}>Categorias</h5>
                </CardFooter>

                <GridContainer>
                  {category.map((itemCategory, index) => (
                    <GridItem key={index} xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel
                          className={classes.labelRoot}
                          id="category"
                          select="true"
                        >
                          Categorias
                        </InputLabel>
                        <Select
                          labelId="select-label"
                          id="category"
                          select="true"
                          value={itemCategory}
                          onChange={handleChangeCategory(index)}
                          className={classes.underline}
                        >
                          {categories.map((item, index) => (
                            <MenuItem key={index} select="true" value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  ))}
                </GridContainer>
                <GridContainer justify="center">
                  <Button simple color="primary" onClick={() => addCategory()}>
                    Añadir Nuevo Categoria
                  </Button>
                </GridContainer>
                <CardFooter className={classes.cardFooter}>
                  <h5 className={classes.title}>Inventario</h5>
                </CardFooter>
                <TableContainer component={Paper}>
                  <Table style={{ width: 495 }} aria-label="caption table">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell></TableCell> */}
                        <TableCell style={{ width: 100 }}>Días</TableCell>
                        <TableCell style={{ width: 100 }}>Stock</TableCell>
                        <TableCell style={{ width: 100 }}>
                          Hora inicio
                        </TableCell>
                        <TableCell style={{ width: 100 }}>Hora Final</TableCell>
                        <TableCell style={{ width: 100 }}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {inventary.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ width: 100 }}>
                            <FormControl className={classes.formControl2}>
                              <InputLabel
                                className={classes.labelRoot}
                                id="select-label"
                                select="true"
                              >
                                Dias
                              </InputLabel>
                              <Select
                                labelId="select-label"
                                id="daysinventary"
                                select="true"
                                value={item.day}
                                onChange={handleChangeInventary(index, "day")}
                                className={classes.underline}
                              >
                                {days.map((option) => (
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
                          </TableCell>
                          <TableCell style={{ width: 100 }}>
                            <CustomInput
                              labelText="Stock"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                type: "number",
                                value: item.stock,
                                onChange: handleChangeInventary(index, "stock"),
                                // endAdornment: (
                                //   <InputAdornment position="end">
                                //     <ClassIcon
                                //       className={classes.inputIconsColor}
                                //     />
                                //   </InputAdornment>
                                // ),
                              }}
                            />
                          </TableCell>
                          <TableCell style={{ width: 100 }}>
                            <CustomInput
                              // labelText="Hora Inicial"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                type: "time",
                                value: item.time_init,
                                onChange: handleChangeInventary(
                                  index,
                                  "time_init"
                                ),
                              }}
                            />
                          </TableCell>
                          <TableCell style={{ width: 100 }}>
                            <CustomInput
                              // labelText="Hora Final"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                type: "time",
                                value: item.time_final,
                                onChange: handleChangeInventary(
                                  index,
                                  "time_final"
                                ),
                              }}
                            />
                          </TableCell>
                          <TableCell style={{ width: 100 }}>
                            <IconButton
                              aria-label="add"
                              onClick={() => remove(index)}
                            >
                              <HighlightOffIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <GridContainer justify="center">
                  <Button simple color="primary" onClick={() => addInventary()}>
                    Añadir Nuevo inventario
                  </Button>
                </GridContainer>
              </CardBody>
            </form>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button
              color="primary"
              onClick={() => registerProduct()}
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
  );
};
function useList(data, initPageSize) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize);
  const [currentListSection, setCurrentListSection] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const counter = Math.ceil(data.length / rowsPerPage);
    setPageCount(counter);
  }, [data, rowsPerPage]);

  useEffect(() => {
    const current = data.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setCurrentListSection(current);
  }, [rowsPerPage, page, data]);

  const gotoPage = (thePage) => setPage(thePage);
  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page - 1);
  const canNextPage = () => page < pageCount;
  const canPreviousPage = () => page > 0;

  return {
    setPageSize: setRowsPerPage,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    page: currentListSection,
    pageCount,
    pageIndex: page,
    pageSize: rowsPerPage,
  };
}
export default function Product({ messages = "Producto" }) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const classes = useStyles();
  const [data, setdata] = React.useState([]);
  const [message, setMessage] = React.useState(messages);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [idCategories, setIdCategories] = React.useState([]);
  const [category, setCategory] = React.useState([1]);
  const [modal, setModal] = React.useState(false);
  const [gallery, setGallery] = React.useState([]);
  const [file, setFile] = React.useState([]);
  const [select, setSelect] = useState(false);
  const [classicModal, setClassicModal] = React.useState(false);
  const [days_available, setDays_available] = React.useState({
    id: "",
    day: "",
  });
  const [values, setValues] = React.useState({
    name: "",
    description: "",
    price: "",
    youtube_link: "",
    time_for_preparation: "",
    is_premium: 0,
    status: "",
  });
  const [inventary, setInventary] = React.useState([
    {
      product_id: "",
      day: "",
      stock: 0,
      time_init: "",
      time_final: "",
    },
  ]);

  const handleChangeCategory = (index) => (event) => {
    const cate = category.map((item, key) => {
      if (key === index) {
        item = event.target.value;
        return item;
      }
      return item;
    });
    setCategory(cate);
  };
  const addCategory = () => {
    if (category.length === 2) {
      notify("Solamente se pueden agregar 2 Categorias por productos");
    } else {
      const newData = [...category, 0];
      setCategory(newData);
    }
  };

  const remove = (position) => {
    if (inventary.length === 1) {
      notify("No puedes eliminar este inventario");
    } else {
      const newData = [
        ...inventary.slice(0, position),
        ...inventary.slice(position + 1),
      ];
      setInventary(newData);
    }
  };
  const addInventary = () => {
    const newData = [
      ...inventary,
      {
        product_id: "",
        day: "",
        stock: 0,
        time_init: "",
        time_final: "",
      },
    ];
    setInventary(newData);
  };

  const resetForm = () => {
    setValues({
      name: "",
      description: "",
      price: 0,
      youtube_link: "",
      time_for_preparation: "",
      is_premium: 0,
      status: "",
    });
    setGallery([]);
    setInventary([
      {
        product_id: " ",
        day: " ",
        stock: 0,
        time_init: " ",
        time_final: " ",
      },
    ]);
    setCategory([1]);
    setFile([]);
  };
  const hidenclose = () => {
    setClassicModal(false);
    resetForm();
  };
  const Modalclose = () => {
    setModal(false);
    resetForm();
  };
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const handleChange = (prop) => (event) => {
    if (prop === "status") {
      setValues({ ...values, [prop]: event.target.value });
    } else {
      setValues({
        ...values,
        [prop]:
          event.target.value.charAt(0).toUpperCase() +
          event.target.value.slice(1),
      });
    }
    if (prop === "days")
      setDays_available({ ...days_available, [prop]: event.target.value });
  };

  const handleChangeInventary = (index, prop) => (event) => {
    const inv = inventary.map((item, key) => {
      if (key === index) {
        if (prop === "time_init" || prop === "time_final") {
          item[prop] = event.target.value;
        } else {
          item[prop] = event.target.value;
        }
        return item;
      }
      return item;
    });
    setInventary(inv);
  };
  const handleChangeDays_available = (prop) => (event) => {
    setDays_available({ ...days_available, [prop]: event.target.value });
  };

  const handlechanindex = (item) => {
    setValues(item);
    setInventary(item.inventories);
    setIdCategories(item.product_categories);
    setModal(true);
  };

  const handleimg = (prop) => (event) => {
    if (file.length >= 3) {
      setFile([]);
    }
    if (gallery.length > 2) {
      notify("Solamente se pueden agregar 3 imagenes");
    } else if (event.target.files.length > 3) {
      notify("Solamente se pueden agregar 3 imagenes");
    } else {
      const reader = new FileReader();
      const reader1 = new FileReader();
      const reader2 = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setGallery((gallery) => [...gallery, { [prop]: reader.result }]);
        }
      };
      reader1.onload = () => {
        if (reader1.readyState === 2) {
          setGallery((gallery) => [...gallery, { [prop]: reader1.result }]);
        }
      };
      reader2.onload = () => {
        if (reader2.readyState === 2) {
          setGallery((gallery) => [...gallery, { [prop]: reader2.result }]);
        }
      };
      setFile(event.target.files);
      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
      }
      if (event.target.files[1]) {
        reader1.readAsDataURL(event.target.files[1]);
      }
      if (event.target.files[2]) {
        reader2.readAsDataURL(event.target.files[2]);
      }
    }
  };

  useEffect(() => {
    const getRequest = async () => {
      const profileId = localStorage.getItem("profileId");
      const token = localStorage.getItem("token");
      await axios
        .get(url + "/products", {
          params: {
            profile_id: profileId,
            get_inventaries: true,
            not_paginate: true,
            get_categories: true,
          },
          headers: { "x-access-token": token },
        })
        .then((response) => {
          setLoading(false);
          setdata(response.data);
          setMessage("Producto Listado");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    const getCategoryRequest = () => {
      axios
        .get(url + "/categories")
        .then((response) => {
          setCategories(response.data.docs);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRequest();
    getCategoryRequest();
  }, [message]);

  const registerProduct = async () => {
    const token = localStorage.getItem("token");
    let pass = true;
    if (gallery.length === 0) {
      setGallery([]);
      pass = false;
      notify("Upps ocurrio un error, Verifica haber cargado 1 imagen");
    }
    if (gallery.length > 3) {
      setGallery([]);
      pass = false;
      notify(
        "Upps ocurrio un error, Verifica haber cargado no más de 3 imagenes"
      );
    }
    pass = EmptyInventary(inventary);
    if (category[0] === 0 || category[1] === 0) {
      pass = false;
      notify(
        "Upps ocurrio un error, Verifica haber llenado el campo de categoria"
      );
    }
    if (pass) {
      await axios
        .post(url + "/products", values, {
          headers: { "x-access-token": token },
        })
        .then((response) => {
          gallery.map((item, index) =>
            productGallery(file[index], response.data.id)
          );
          inventary.map((item) => productInventary(item, response.data.id));
          productCategories(response.data.id);
          notify("Producto Registrado con Exito", "success");
          setMessage("Producto agregado");
          hidenclose();
        })
        .catch((error) => notify(error.response.data));
    }
  };
  const productGallery = async (file, product_id) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("product_id", product_id);
    const token = localStorage.getItem("token");
    await axios
      .post(url + "/product-galleries", formData, {
        headers: {
          "x-access-token": token,
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => console.log(error.response));
  };
  const productInventary = async (inventary, product_id) => {
    const profileId = localStorage.getItem("profileId");
    inventary.product_id = product_id;
    inventary.profile_id = profileId;
    const token = localStorage.getItem("token");
    await axios
      .post(url + "/inventories", inventary, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.response));
  };
  const productCategories = async (id) => {
    const token = localStorage.getItem("token");
    await axios
      .post(
        url + "/product-categories",
        { product_id: id, categories: category },
        {
          headers: { "x-access-token": token },
        }
      )
      .then((response) => {})
      .catch((error) => console.log(error.response));
  };
  const updatedProduct = async () => {
    const token = localStorage.getItem("token");
    // values.inventary = new Array(inventary);
    await axios
      .put(url + "/products/" + values.id, values, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        if (file.length > 0) {
          values.gallery.map((item, index) =>
            updateGalleries(file[index], item.id)
          );
        }
        inventary.map((item, index) => updateInventary(item, item.id));

        notify("Producto Actualizado con Exito", "success");
        setMessage("Producto Actualizado");
        Modalclose();
      })
      .catch((error) => {
        notify("Ocurrio un error al actualizar el producto");
        Modalclose();
      });
  };

  const updateInventary = async (inventary, id) => {
    const token = localStorage.getItem("token");
    if (inventary.time_init && inventary.time_final) {
      await axios
        .put(url + "/inventories/" + id, inventary, {
          headers: { "x-access-token": token },
        })
        .then((response) => {})
        .catch((error) => {
          notify(error.response.data.message);
        });
    }
  };

  const updateGalleries = async (file, id) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);
    await axios
      .put(url + "/product-galleries/" + id, formData, {
        headers: { "x-access-token": token },
      })
      .then((response) => {})
      .catch((error) => {
        notify(error.response.data.message);
      });
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    await axios
      .delete(url + "/products/" + id, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        setMessage("Producto Eliminado");
        notify("Producto Eliminado Con Exito", "success");
        Modalclose();
      })
      .catch((error) => {
        notify(error.response.data.message);
      });
  };
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState("");
  const {
    setPageSize,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    page,
    pageCount,
    pageIndex,
    pageSize,
  } = useList(filteredDataSource || data, [null][0] || 8);

  const searchFilterFunction = (event) => {
    if (event) {
      const newData = data.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = event.target.value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(event.target.value);
    } else {
      setFilteredDataSource(data);
      setSearch(event.target.value);
    }
  };
  if (loading) {
    return (
      <h1>
        <Loader size={50} />
      </h1>
    );
  }
  return (
    <Sidebar>
      <div className={classes.root}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes[cardAnimaton]}>
              <CardFooter className={classes.cardFooter}>
                <h2 className={classes.title}>Productos</h2>
                <Hidden xsDown smDown>
                  <ButtonGroup
                    style={{
                      position: "absolute",
                      marginTop: "25px",
                      left: "60%",
                    }}
                  >
                    <Button
                      aria-label="add"
                      onClick={() => setSelect(false)}
                      simple={select ? true : false}
                      color={"primary"}
                    >
                      <ViewAgendaIcon fontSize="small" />
                      Card
                    </Button>
                    <Button
                      aria-label="add"
                      onClick={() => setSelect(true)}
                      simple={select ? false : true}
                      color="primary"
                    >
                      <ListIcon fontSize="small" />
                      Lista
                    </Button>
                  </ButtonGroup>
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
                  <ButtonGroup>
                    <Button
                      aria-label="add"
                      onClick={() => setSelect(false)}
                      simple={select ? true : false}
                      color={"primary"}
                    >
                      <ViewAgendaIcon fontSize="small" />
                      Card
                    </Button>
                    <Button
                      aria-label="add"
                      onClick={() => setSelect(true)}
                      simple={select ? false : true}
                      color="primary"
                    >
                      <ListIcon fontSize="small" />
                      Lista
                    </Button>
                  </ButtonGroup>
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
              <GridContainer justify="center">
                <GridItem xs={6} sm={6} md={4}>
                  <CustomInput
                    id="search"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "search",
                      value: search,
                      placeholder: "Buscar Productos",
                      onChange: searchFilterFunction,
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>

              <CardBody>
                {data.length === 0 ? (
                  <CardFooter className={classes.cardFooter}>
                    <h3>No hay productos registrados</h3>
                  </CardFooter>
                ) : (
                  <TableContainer>
                    <Table className={classes.table} aria-label="caption table">
                      {select ? (
                        <EnhancedTable
                          page={page}
                          handlechanindex={handlechanindex}
                          deleteProduct={deleteProduct}
                        />
                      ) : (
                        <GridContainer justify="center">
                          {page.length === 0 ? (
                            <CardFooter className={classes.cardFooter}>
                              <h3>No hay productos registrados</h3>
                            </CardFooter>
                          ) : (
                            page.map((item, index) => (
                              <Grid item key={index} style={{ margin: 5 }}>
                                <Card
                                  style={{
                                    padding: 10,
                                    margin: "auto",
                                    maxWidth: 360,
                                  }}
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12}>
                                      <ButtonBase
                                        onClick={() => handlechanindex(item)}
                                        style={{
                                          margin: "auto",
                                          display: "block",
                                          maxWidth: "100%",
                                          maxHeight: "100%",
                                          borderRadius: 20,
                                        }}
                                      >
                                        <img
                                          style={{
                                            width: 166,
                                            height: 128,
                                            borderRadius: 20,
                                          }}
                                          alt="complex"
                                          src={
                                            item.gallery[0]
                                              ? url +
                                                "/" +
                                                item.gallery[0].img_product
                                              : null
                                          }
                                        />
                                      </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                      <Grid
                                        item
                                        xs
                                        container
                                        direction="column"
                                        spacing={2}
                                      >
                                        <Grid item xs>
                                          <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                          >
                                            {item.name}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            gutterBottom
                                          >
                                            {item.description}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                          >
                                            Preparacion:{" "}
                                            {item.time_for_preparation} Min
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Typography variant="subtitle1">
                                          $ {item.price}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <div
                                    style={{
                                      position: "absolute",
                                      marginTop: 190,
                                      right: 0,
                                    }}
                                  >
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() => deleteProduct(item.id)}
                                    >
                                      <DeleteIcon
                                        fontSize="small"
                                        color={"error"}
                                      />
                                    </IconButton>
                                  </div>
                                </Card>
                              </Grid>
                            ))
                          )}
                        </GridContainer>
                      )}
                    </Table>
                  </TableContainer>
                )}
                <div style={{ paddingTop: "20px" }} />

                <EnhancedPagination
                  pageSizeOptions={[8]}
                  pageSize={pageSize}
                  canPreviousPage={canPreviousPage}
                  canNextPage={canNextPage}
                  pageCount={pageCount}
                  gotoPage={gotoPage}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  pageIndex={pageIndex}
                  setPageSize={setPageSize}
                />
                <div style={{ paddingTop: "20px" }} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <Modal
          values={values}
          gallery={gallery}
          categories={categories}
          category={category}
          inventary={inventary}
          days_available={days_available}
          open={classicModal}
          close={hidenclose}
          handleChangeCategory={handleChangeCategory}
          handleChange={handleChange}
          handleChangeInventary={handleChangeInventary}
          handleChangeDays_available={handleChangeDays_available}
          addInventary={addInventary}
          addCategory={addCategory}
          remove={remove}
          registerProduct={registerProduct}
          handleimg={handleimg}
        />
        <RModal
          values={values}
          open={modal}
          close={Modalclose}
          action={"Editar"}
          onClick={updatedProduct}
        >
          <CardFooter className={classes.cardFooter}>
            <h2 className={classes.title}>Detalles del Producto: </h2>
          </CardFooter>
          <SectionCarousel
            gallery={gallery.length > 0 ? gallery : values.gallery}
            url={gallery.length > 0 ? null : url + "/"}
          />
          <CardFooter className={classes.cardFooter}>
            <input
              accept="image/*"
              multiple
              className={classes.input}
              id="Modify-button-file"
              type="file"
              name="name"
              onChange={handleimg("name")}
            />

            <label htmlFor="Modify-button-file">
              <Button
                simple
                variant="contained"
                color="primary"
                component="span"
              >
                Modificar Imagenes
              </Button>
            </label>
            {gallery.length > 0 ? (
              <IconButton aria-label="delete" onClick={() => setGallery([])}>
                <HighlightOffIcon fontSize="small" color={"error"} />
              </IconButton>
            ) : null}
          </CardFooter>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Nombre del producto"
                id="editproduct"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.name,
                  onChange: handleChange("name"),
                  endAdornment: (
                    <InputAdornment position="end">
                      <AirplayIcon className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Descripción"
                id="editdescription"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.description,
                  onChange: handleChange("description"),
                  endAdornment: (
                    <InputAdornment position="end">
                      <AirplayIcon className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Link Youtube"
                id="edityoutube"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.youtube_link,
                  onChange: handleChange("youtube_link"),
                  endAdornment: (
                    <InputAdornment position="end">
                      <YouTubeIcon className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Precio"
                id="editvalue"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  value: values.price,
                  onChange: handleChange("price"),
                  // inputComponent: TextMaskCustom,
                  endAdornment: (
                    <InputAdornment position="end">
                      <AttachMoneyIcon className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Tiempo de Preparación"
                id="editpreparation_time"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: values.time_for_preparation,
                  onChange: handleChange("time_for_preparation"),
                  endAdornment: (
                    <InputAdornment position="end">
                      <TimerIcon className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Nivel"
                id="is_premium"
                formControlProps={{
                  fullWidth: true,
                  disabled: true,
                }}
                inputProps={{
                  value: values.is_premium ? "Premiun" : "Normal",
                  // inputComponent: TextMaskCustom,
                  endAdornment: (
                    <InputAdornment position="end">
                      <DonutLargeIcon className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
            </GridItem>
          </GridContainer>
          <CardFooter className={classes.cardFooter}>
            <h5 className={classes.title}>Categorias</h5>
          </CardFooter>
          <GridContainer justify="center">
            {idCategories.map((item, index) => (
              <GridItem key={index} xs={12} sm={12} md={6}>
                <CustomInput
                  labelText={"Categoria" + (index + 1)}
                  id={"Categoria" + (index + 1)}
                  formControlProps={{
                    fullWidth: true,
                    disabled: true,
                  }}
                  inputProps={{
                    value: nameCategory(categories, item.category_id),
                    // inputComponent: TextMaskCustom,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Category className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
            ))}
          </GridContainer>
          <CardFooter className={classes.cardFooter}>
            <h5 className={classes.title}>Inventario</h5>
          </CardFooter>
          <GridContainer justify="center">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell>Días</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Hora inicio</TableCell>
                    <TableCell>Hora Final</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventary.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <FormControl className={classes.formControl2}>
                          <InputLabel
                            className={classes.labelRoot}
                            id="select-label"
                            select="true"
                          >
                            Día
                          </InputLabel>
                          <Select
                            labelId="select-label"
                            id="daysinventary"
                            select="true"
                            value={item.day}
                            onChange={handleChangeInventary(index, "day")}
                            className={classes.underline}
                          >
                            {days.map((option) => (
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
                      </TableCell>
                      <TableCell>
                        <CustomInput
                          labelText={"Stock"}
                          inputProps={{
                            type: "number",
                            value: item.stock,
                            onChange: handleChangeInventary(index, "stock"),
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "time",
                            value: item.time_init
                              ? item.time_init
                              : item?.inventoriesHours
                              ? item?.inventoriesHours[0]?.hour
                              : item,
                            onChange: handleChangeInventary(index, "time_init"),
                            // endAdornment: (
                            //   <InputAdornment position="end">am</InputAdornment>
                            // ),
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "time",
                            value: item.time_final
                              ? item.time_final
                              : item?.inventoriesHours
                              ? item?.inventoriesHours[
                                  item?.inventoriesHours.length - 1
                                ]?.hour
                              : item,
                            onChange: handleChangeInventary(
                              index,
                              "time_final"
                            ),
                            // endAdornment: (
                            //   <InputAdornment position="end">pm</InputAdornment>
                            // ),
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </GridContainer>
        </RModal>
      </div>
    </Sidebar>
  );
}
