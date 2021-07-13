import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "components/TabPanel";
import { EditPassword, EditProfile, EditStore } from "items";
import Palette from "@material-ui/icons/Palette";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F15A22",
    },
  },
});
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}
const CustomTabs = ({
  values,
  handleChange,
  handleimg,
  addresses,
  handleChangeaddress,
  handlechangedigit,
  handlechangeNumber,
  number,
  digit,
  error,
  show,
  updatedProfile,
  showButton,
  pass,
  auth,
  handleChangePass,
  handleClickShowPassword,
  handleMouseDownPassword,
  resetPassword,
  handleChangeAuth,
  updatedPassword,
  isLoading,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChangev = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <ThemeProvider theme={theme}>
          <Tabs
            value={value}
            onChange={handleChangev}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Tienda" icon={<Palette />} {...a11yProps(0)} />
            <Tab label="Perfil" icon={<PersonIcon />} {...a11yProps(1)} />
            <Tab label="Contraseña" icon={<LockIcon />} {...a11yProps(2)} />
          </Tabs>
        </ThemeProvider>
      </AppBar>
      <TabPanel value={value} index={0}>
        <EditStore
          values={values}
          handleChange={handleChange}
          handleimg={handleimg}
          addresses={addresses}
          handleChangeaddress={handleChangeaddress}
          error={error}
          show={show}
          updatedProfile={updatedProfile}
          isLoading={isLoading}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditProfile
          values={values}
          handleChange={handleChange}
          updatedProfile={updatedProfile}
          handlechangedigit={handlechangedigit}
          digit={digit}
          handlechangeNumber={handlechangeNumber}
          number={number}
          showButton={showButton}
          isLoading={isLoading}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EditPassword
          values={values}
          pass={pass}
          auth={auth}
          handleChangePass={handleChangePass}
          handleChangeAuth={handleChangeAuth}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          resetPassword={resetPassword}
          isLoading={isLoading}
          updatedPassword={updatedPassword}
        />
      </TabPanel>
    </div>
  );
};

export default CustomTabs;
