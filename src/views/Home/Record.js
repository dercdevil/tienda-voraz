import React, { useEffect, lazy } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DateTime } from "luxon";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import GridContainer from "components/Grid/GridContainer.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import CardFooter from "components/Card/CardFooter.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Badge from "components/Badge/Badge.js";
import { container } from "assets/jss/material-kit-react.js";
import Slide from "@material-ui/core/Slide";
import { title } from "assets/jss/material-kit-react.js";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { primaryColor } from "assets/jss/material-kit-react.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import { MapStatus } from "utils/MapStatus";
import { ColorStatus } from "utils/ColorStatus";
import { notify } from "utils/notify";

import { api } from "constans";
import { useProfile, useOrder } from "hoocks";
import Loader from "components/Loader/Loader";

const Sidebar = lazy(() => import("components/Sidebar/Sidebar.js"));

const baseUrl = api + `/orders`;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  h4: {
    margin: "10px",
  },
  h4bold: {
    margin: "10px",
    fontWeight: "bold",
  },
  h4top: {
    marginTop: "40px",
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
}));
const Modal = ({ values, open, close, ChangeStatus }) => {
  const classes = useStyles();
  const showButton = false;
  const [order, setOrder] = React.useState("");
  const handlechange = (event) => {
    setOrder(event.target.value);
  };
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
            <CardBody>
              <CardFooter className={classes.cardFooter}>
                <h2 className={classes.title}>Pedido</h2>
              </CardFooter>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <h4 className={classes.h4}>{values.reference}</h4>
              </GridItem>
              {/* <CardFooter>
                  <h4 className={classes.h4bold}>Tienda: </h4>
                  <h4 className={classes.h4}>
                   {nameProfile(stores, values?.profile_id)}
                   
                  </h4>
                </CardFooter>  */}
              <CardFooter>
                <h4 className={classes.h4bold}>Fecha: </h4>
                <h4 className={classes.h4}>
                  {DateTime.fromISO(values.createdAt).toLocaleString(
                    DateTime.DATE_FULL
                  )}
                </h4>
              </CardFooter>
              <CardFooter className={classes.cardFooter}>
                <h4 className={classes.h4bold}>Detalles: </h4>
              </CardFooter>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Producto</TableCell>
                          <TableCell align="right">Cant</TableCell>
                          <TableCell align="right">Precio</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values?.orderProducts?.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.products.name}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">
                              {row.products.price}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell rowSpan={2} />
                          <TableCell colSpan={1}>Total</TableCell>
                          <TableCell align="right">{values.total}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </GridItem>
              </GridContainer>

              <GridContainer justify="center">
                <CardFooter className={classes.cardFooter}>
                  <h4 className={classes.h4bold}>Status del Pedido</h4>
                </CardFooter>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel className={classes.labelRoot} id="select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="select-label"
                      id="radio"
                      value={order}
                      onChange={handlechange}
                      className={classes.underline}
                    >
                      <MenuItem value={"SUCCESS"}>Confirmar</MenuItem>
                      <MenuItem value={"Fail"}>Anular</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </CardBody>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button
              color="primary"
              onClick={() => ChangeStatus(values, order)}
              disabled={showButton}
            >
              Actualizar
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

export default function Record() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const { isLoading } = useProfile();
  const { order } = useOrder();
  const classes = useStyles();
  const [values, setValues] = React.useState({});
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const filter = () => {
  //   return data.filter((item) => item.status.includes("IN-PROGRESS"));
  // };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if (order) {
      setData(order);
    }
  }, [order]);

  const handlechanindex = (item) => {
    setValues(item);
    setClassicModal(true);
  };

  const ChangeStatus = (data, status) => {
    // setIsLoading(true);
    const token = localStorage.getItem("token");
    axios
      .put(
        baseUrl + "/" + data.id,
        { status: status },
        { headers: { "x-access-token": token } }
      )
      .then((result) => {
        notify("Status Cambiado Con Exito", "success");
        hidenclose();
      })
      .catch((err) => {
        // setIsLoading(false);
        // handleResponseApi(err, props.history);
      });
  };
  // const deleteOrder = (id) => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .delete(baseUrl + "/" + id, {
  //       headers: { "x-access-token": token },
  //     })
  //     .then((response) => {
  //       setMessage("Orden Eliminado");
  //       getRequest();
  //       notify("Orden Eliminada Con Exito", "success");
  //     })
  //     .catch((error) => {
  //       notify("Ocurrio un error al intentar eliminar la orden.");
  //     });
  // };
  const [classicModal, setClassicModal] = React.useState(false);
  const hidenclose = () => {
    setClassicModal(false);
  };
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  if (isLoading) {
    return <Loader size={50} />;
  }
  console.log(data);
  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };
  return (
    <Sidebar>
      <div className={classes.root}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes[cardAnimaton]}>
              <CardFooter className={classes.cardFooter}>
                <h2 className={classes.title}>Historial de Pedidos</h2>
              </CardFooter>
              <Divider variant="middle" />
              <CardBody>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="caption table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Número de Orden</TableCell>
                        <TableCell align="center">Método de Pago</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Orden de Flow</TableCell>
                        <TableCell align="center">Dirección</TableCell>
                        <TableCell align="center">Cupón</TableCell>
                        <TableCell align="center">Total Neto</TableCell>
                        <TableCell align="center">Total</TableCell>
                        {/* <TableCell align="right">Transportista</TableCell> */}
                        <TableCell align="center"> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? data.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data
                      ).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.reference}
                          </TableCell>
                          <TableCell align="center">{row.method}</TableCell>
                          <TableCell align="center">
                            <Badge color={ColorStatus(row.status)}>
                              {MapStatus(row.status)}
                            </Badge>
                          </TableCell>
                          <TableCell align="center">{row.flow_order}</TableCell>
                          <TableCell align="center">
                            {row.userAddress.address}
                          </TableCell>
                          <TableCell align="center">{row.orderCoupons[0]?.coupons?.name || "Sin cupón"} {row.orderCoupons[0]?.coupons?.discount ? " - " + row.orderCoupons[0]?.coupons?.discount/100 + "%" : ""}</TableCell>
                          <TableCell align="center">{row.total_neto}</TableCell>
                          <TableCell align="center">{row.total}</TableCell>

                          {/* <TableCell align="right">{row.carrier.name}</TableCell> */}

                          <TableCell align="right">
                            {row.status === "IN-PROGRESS" ? (
                              <IconButton
                                aria-label="edit"
                                onClick={() => handlechanindex(row)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            ) : null}

                            {/* <IconButton
                              aria-label="delete"
                              onClick={() => deleteOrder(row.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton> */}
                          </TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={10} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: "Todas", value: -1 },
                          ]}
                          colSpan={10}
                          labelRowsPerPage={"Filas por página:"}
                          labelDisplayedRows={({ from, to }) =>
                            `${from} a ${to}`
                          }
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </CardBody>

              <CardFooter className={classes.cardFooter}></CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <Modal
          values={values}
          open={classicModal}
          close={hidenclose}
          ChangeStatus={ChangeStatus}
        />
      </div>
    </Sidebar>
  );
}
