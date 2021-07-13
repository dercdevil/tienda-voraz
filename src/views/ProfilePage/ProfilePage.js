import React, { useEffect, lazy } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import { api } from "constans";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { usePosition } from "use-position";
import { Map } from "components/Maps/Map";
import Tabs from "components/Tabs";
import { useUser } from "hoocks";
import { notify } from "utils/notify";
import Loader from "components/Loader/Loader";

const Sidebar = lazy(() => import("components/Sidebar/Sidebar.js"));

const url = api;

const useStyles = makeStyles(styles);

export default function ProfilePage() {
  const { isLoading, user } = useUser();
  const { latitude, longitude, error } = usePosition({
    watch: true,
    enableHighAccuracy: true,
  });
  const [data, setData] = React.useState([]);
  const [digit, setDigit] = React.useState("");
  const [number, setNumber] = React.useState("");
  const handlechangedigit = (event) => {
    setDigit(event.target.value);
  };
  const handlechangeNumber = (event) =>{
    setNumber(event.target.value)
  }
  const [values, setValues] = React.useState({
    name: "",
    name_store: "",
    last_name: "",
    img_profile: "",
    email: "",
    phone: "",
    address: "",
    api_key: "",
    secret_key: "",
  });
  const [adres, setAdres] = React.useState([]);
  const [addresses, setAddresses] = React.useState({
    latitude: "",
    longitude: "",
    description: "",
    address: "",
    city: "",
  });
  const [pass, setPass] = React.useState({
    rut: "",
    showPassword: false,
    password: "",
    password_repeat: "",
  });
  const [file, setFile] = React.useState(null);
  const resetPassword =
    pass.password.length > 5 &&
    pass.password_repeat.length > 5 &&
    pass.password === pass.password_repeat
      ? false
      : true;
  const showButton =
    number.length < 7 || number.length > 8 ? true : false;
  const classes = useStyles();
  const resetForm = () => {
    setPass({
      showPassword: false,
      password: "",
      password_repeat: "",
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
      city: obj.city,
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
  const handleChangePass = (prop) => (event) => {
    setPass({ ...pass, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setPass({ ...pass, showPassword: !values.showPassword });
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
  const [character, setCharacter] = React.useState("");
  const [auth, setAuth] = React.useState(true);
  const [id, setId] = React.useState("");
  const handleChangeAuth = (event) => {
    setAuth(event.target.checked);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlechangelocation = async (token) => {
    await axios
      .put(url + "/user-addresses/" + id, addresses, {
        headers: { "x-access-token": token },
      })
      .then((response) => {})
      .catch((error) => {
        notify(error.response.data.message);
      });
  };
  useEffect(() => {
    if (user.profile) {
      setData(user.profile);
      localStorage.setItem("profileId", user.profile.id);
      setId(user.user_address[0]?.id);
      setValues(user.profile);
      setCharacter(String(user.profile.name_store).charAt(0));
      setNumber(user.profile.phone.slice(user.profile.phone.indexOf("-")+1, user.profile.phone.lenght))
      setAdres(user.user_address[0]);
      setAddresses(user.user_address[0]);
    }
  }, [user]);

  const updatedProfile = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", values.name);
    formData.append("name_store", values.name_store);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("phone", digit+"-"+number);
    formData.append("api_key", values.api_key);
    formData.append("secret_key", values.secret_key);
    const token = localStorage.getItem("token");
    await axios
      .put(url + "/profile", formData, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        handlechangelocation(token);
        notify("Perfil Actualizado", "success");
      })
      .catch((error) => {
        notify(error.response.data.message);
      });
  };

  const updatedPassword = async () => {
    const token = localStorage.getItem("token");
    await axios
      .put(url + "/users", pass, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        notify("Contaseña Actualizada con Exito", "success");
        resetForm();
      })
      .catch((error) => {
        notify("ha ocurrido un error al actualizar la contraseña");
      });
  };
  const [visible, setVisible] = React.useState(false);
  const show = () => setVisible(true);
  const hiden = () => setVisible(false);

  if (isLoading) {
    return <Loader size={50} />;
  }
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
          <div style={{ textAlign: "center" }}>
            <h2 className={classes.title}>Mi Perfil </h2>
          </div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardAvatar profile>
                  <img
                    src={data.img_profile ? url + "/" + data.img_profile : ""}
                    alt={character}
                    style={{ backgroundColor: "white" }}
                  />
                </CardAvatar>
                <CardBody profile>
                  <h6 style={{ fontSize: "20px" }}>{data.name_store}</h6>
                  <p>
                    {adres.address}
                    <i className={"fas fa-map-marker-alt"} />
                  </p>
                  <p>
                    {data.email} <i className="fas fa-envelope" />
                  </p>
                  <p>{adres.description}</p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <Tabs
                      values={values}
                      handleChange={handleChange}
                      handleimg={handleimg}
                      addresses={addresses}
                      handleChangeaddress={handleChangeaddress}
                      handlechangedigit={handlechangedigit}
                      handlechangeNumber={handlechangeNumber}
                      number={number}
                      digit={digit}
                      error={error}
                      show={show}
                      showButton={showButton}
                      updatedProfile={updatedProfile}
                      pass={pass}
                      auth={auth}
                      handleChangePass={handleChangePass}
                      handleChangeAuth={handleChangeAuth}
                      handleClickShowPassword={handleClickShowPassword}
                      handleMouseDownPassword={handleMouseDownPassword}
                      resetPassword={resetPassword}
                      updatedPassword={updatedPassword}
                      isLoading={isLoading}
                    />
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </Sidebar>
  );
}
