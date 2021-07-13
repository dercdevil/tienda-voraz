import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(styles);

export const EditPassword = ({
  values,
  pass,
  auth,
  handleChangePass,
  handleChangeAuth,
  handleClickShowPassword,
  handleMouseDownPassword,
  resetPassword,
  updatedPassword,
  isLoading
}) => {
  const classes = useStyles();

  return (
    <GridContainer justify="center">
      <FormGroup color="primary">
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChangeAuth}
              value="checkedA"
              color="primary"
              classes={{
                switchBase: classes.switchBase,
                checked: classes.switchChecked,
                thumb: classes.switchIcon,
                track: classes.switchBar,
              }}
            />
          }
          classes={{
            label: classes.label,
          }}
          label="Presiona Para Editar"
        />
      </FormGroup>
      <GridItem xs={12} sm={12} md={12}>
        <CustomInput
          labelText="Contraseña"
          id="pass"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: pass.showPassword ? "text" : "password",
            value: pass.password,
            onChange: handleChangePass("password"),
            disabled: auth,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            autoComplete: "off",
          }}
        />
        <CustomInput
          labelText="Contraseña"
          id="pass2"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: pass.showPassword ? "text" : "password",
            value: pass.password_repeat,
            disabled: auth,
            onChange: handleChangePass("password_repeat"),
            autoComplete: "off",
          }}
        />
      </GridItem>
      <Button
        color="primary"
        size="lg"
        isLoading={isLoading}
        disabled={resetPassword || isLoading}
        onClick={() => updatedPassword()}
      >
        Guardar Nueva Contraseña
      </Button>
    </GridContainer>
  );
};
