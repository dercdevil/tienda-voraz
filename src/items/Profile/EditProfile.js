import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Digit } from "utils/Digit";
import { CodigArea } from "utils/CodigArea";

const useStyles = makeStyles(styles);

export const EditProfile = ({
  values,
  handleChange,
  updatedProfile,
  showButton,
  digit,
  handlechangedigit,
  handlechangeNumber,
  number,
  isLoading,
}) => {
  const classes = useStyles();

  return (
    <GridContainer justify="center">
      <h4 className={classes.h4}>Datos Personales </h4>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Nombre"
              id="name"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: values && values.name,
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
              labelText="Apellidos"
              id="last_name"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: values && values.last_name,
                onChange: handleChange("last_name"),
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Correo"
              id="email"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: values && values.email,
                onChange: handleChange("email"),
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon className={classes.inputIconsColor} />
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
                value: number,
                error:
                number.length < 7 || number.length > 8
                    ? true
                    : false,
                // helperText: values.phone.length > 9 ? "Numero no valido" : "",
                onChange: handlechangeNumber,
                name: "phone",
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneAndroidIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
                startAdornment: (
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="select-label"
                      id="radio"
                      value={digit || Digit(values.phone).digit}
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
      </GridItem>

      <div className={classes.top}>
        <Button
          color="primary"
          size="lg"
          disabled={showButton}
          onClick={() => updatedProfile()}
        >
          Actualizar Perfil
        </Button>
      </div>
    </GridContainer>
  );
};
