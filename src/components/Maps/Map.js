import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import compas from "assets/img/brujula.png";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";
import axios from "axios";
import style from "./style";
import "@reach/combobox/styles.css";
import Hidden from "@material-ui/core/Hidden";
import Loader from "components/Loader/Loader";
import Logo from "assets/img/brand.png";

// import mapStyles from "./mapStyles";
const api = process.env.REACT_APP_API_KEY;

const useStyles = makeStyles(style);

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  // zoomControl: true,
};
const center = {
  lat: -33.4724228,
  lng: -70.7699137,
};
export const coordenadas = {
  latitude: "",
  longitude: "",
  address: "",
  city: "",
};
export function Map({
  latitude,
  longitude,
  error,
  hiden,
  handleChangeaddressMap,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: api,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [data, setData] = React.useState("");
  const [city, setCity] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const getRequest = async (latitude, longitude) => {
    if (latitude && longitude) {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api}`
        )
        // https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${HERE_API_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude}
        .then((response) => {
          setData(response.data.results[0].formatted_address);
          setCity(response.data.results[0].address_components[3].long_name);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };
  const onMapClick = React.useCallback((e) => {
    getRequest(e.latLng.lat(), e.latLng.lng());
    setMarkers([
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        // time: data.formatted_address,
      },
    ]);
    coordenadas.latitude = e.latLng.lat();
    coordenadas.longitude = e.latLng.lng();
  }, []);
  coordenadas.address = data;
  coordenadas.city = city;
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(
    ({ lat, lng }) => {
      if (lat && lng) {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
        getRequest(lat, lng);
        setMarkers([
          {
            lat: lat,
            lng: lng,
          },
        ]);
        coordenadas.latitude = lat;
        coordenadas.longitude = lng;
        coordenadas.address = data;
        coordenadas.city = city;
        setSelected({ lat, lng });
      }
    },
    [data, city]
  );

  if (loadError) return <Loader size={50} />;
  if (!isLoaded) return <Loader size={50} />;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Hidden xsDown smDown>
        <img
          src={Logo}
          alt="..."
          style={{
            position: "absolute",
            top: "-2rem",
            left: "1rem",
            zIndex: "10",
            margin: "0",
            padding: "0",
            width:"300px",
            height:"auto"
          }}
        />
        {!error ? (
          <Locate panTo={panTo} latitude={latitude} longitude={longitude} />
        ) : null}
      </Hidden>

      <Search panTo={panTo} latitude={latitude} longitude={longitude} />

      {coordenadas.address ? (
        <Close hiden={hiden} handleChangeaddressMap={handleChangeaddressMap} />
      ) : null}

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h6>
                <span role="img" aria-label="bear">
                  📍
                </span>{" "}
                Ubicacion
              </h6>
              <p>Latitud: {selected.lat}</p>
              <p>Longitud: {selected.lng} </p>
              <p>direccion: {data} </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
const Close = ({ handleChangeaddressMap }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        transform: "translateX(-50%)",
        zIndex: "10",
      }}
    >
      <Fab
        aria-label="ready"
        style={{ backgroundColor: "#F15A22" }}
        disabled={coordenadas.address ? false : true}
        onClick={() =>
          handleChangeaddressMap({
            latitude: coordenadas.latitude,
            longitude: coordenadas.longitude,
            address: coordenadas.address,
            city: coordenadas.city,
          })
        }
        color="primary"
      >
        <DoneIcon fontSize="large" />
      </Fab>
    </div>
  );
};
function Locate({ panTo, latitude, longitude }) {
  return (
    <button
      aria-label="ubicate"
      style={{
        position: "absolute",
        top: "1rem",
        right: "2.6rem",
        background: "none",
        border: "none",
        zIndex: "10",
        cursor: "pointer",
      }}
      onClick={() => {
        panTo({ lat: latitude, lng: longitude });
      }}
      color="primary"
    >
      <img
        src={compas}
        alt="Ubicate"
        style={{
          width: "55px",
          height: "auto",
        }}
      />
    </button>
  );
}

function Search({ panTo, latitude, longitude }) {
  const classes = useStyles();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => latitude, lng: () => longitude },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "22px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "425px",
        zIndex: "10",
      }}
    >
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          className={classes.input}
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Ingresa una ubicación"
          style={{
            padding: "0.5rem",
            fontSize: "1.5rem",
            borderRadius: "20px",
            border: "1px solid #F1F1F1",
          }}
        />
        <ComboboxPopover
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "20px",
            border: "1px solid #F1F1F1",
          }}
        >
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={description} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
