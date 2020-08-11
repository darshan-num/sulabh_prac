import React, { useState } from "react";
import ReactMapGl, { Marker, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import logo from "../images/map-pins.png";
import logo2 from "../images/map-pin.png";
import "./search-maps.css";
import { Button, Spinner } from "reactstrap";

// const geolocateStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   margin: 10,
// };

export default function SearchMaps(props) {
  const [viewport, setViewport] = useState({
    latitude: parseFloat(props.lat),
    longitude: parseFloat(props.long),
    width: "90vw",
    height: "50vh",
    zoom: 11,
  });
  console.log("sad", viewport.latitude, viewport.longitude);
  const [state, setState] = useState({
    location: "",
    HelperLat: 45.42,
    HelperLong: 73.6971,
  });

  ////directions
  //   const directions = new MapboxDirections({
  //     accessToken:
  //       "pk.eyJ1IjoiZGFzaC1udW0iLCJhIjoiY2tkNXN2eHNiMDQ4bTJzbjVrd2t1NHF0YiJ9.gpHYb8AFLhhFukCO1_435w",
  //     unit: "metric",
  //     profile: "mapbox/driving",
  //   });
  //   viewport.addControl(directions, "top-left");

  ///
  const getPlace = (lat, long) => {
    // setViewport({
    //   latitude: lat,
    //   longitude: long,
    // });
    axios
      .get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          long +
          "," +
          lat +
          ".json?access_token=pk.eyJ1IjoiZGFzaC1udW0iLCJhIjoiY2tkNXNtMDduMGF2djJ0cmE1MjJ0aHNpOSJ9.4FgclywHobtPkxbpi_c-DQ"
      )
      .then((res) => {
        console.log("response", res.data.features[1].text);
        setState({ location: res.data.features[1].text });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCoordinates = (place) => {
    //get reachers coordinates
    axios
      .get(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          place +
          ".json?access_token=pk.eyJ1IjoiZGFzaC1udW0iLCJhIjoiY2tkNXNtMDduMGF2djJ0cmE1MjJ0aHNpOSJ9.4FgclywHobtPkxbpi_c-DQ"
      )
      .then((response) => {
        console.log("response", response.data.features[1].center);
        setState({
          HelperLat: response.data.features[1].center[1],
          HelperLong: response.data.features[1].center[0],
        });
        // getPlace(
        //   response.data.features[1].center[1],
        //   response.data.features[1].center[0]
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //getOnce();

  return (
    <div>
      {/* <h1>maps</h1> */}
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiZGFzaC1udW0iLCJhIjoiY2tkNXN2eHNiMDQ4bTJzbjVrd2t1NHF0YiJ9.gpHYb8AFLhhFukCO1_435w"
        mapStyle="mapbox://styles/dash-num/ckd5tiooj03lq1in0lo04rytm"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker
          latitude={parseFloat(localStorage.getItem("reacherLat"))}
          longitude={parseFloat(localStorage.getItem("reacherLong"))}
        >
          <img className="marker2" src={logo2}></img>
        </Marker>

        <Marker
          latitude={parseFloat(localStorage.getItem("reacherLat"))}
          longitude={parseFloat(localStorage.getItem("reacherLong"))}
        >
          {parseInt(localStorage.getItem("helperCoords")) ? (
            <img className="marker2" src={logo2}></img>
          ) : (
            <Spinner
              className="loading-circle"
              style={{ width: "12rem", height: "12rem" }}
              type="grow"
            ></Spinner>
          )}
        </Marker>

        {parseInt(localStorage.getItem("helperCoords")) ? (
          <Marker
            latitude={parseFloat(localStorage.getItem("helperLat"))}
            longitude={parseFloat(localStorage.getItem("helperLong"))}
          >
            <img className="marker" src={logo}></img>
            <h5>{localStorage.getItem("tempHelper")}</h5>
          </Marker>
        ) : (
          <></>
        )}

        {/* <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        /> */}

        {/* <h5> latitude{viewport.latitude}</h5>
        <h5> longitude{viewport.longitude}</h5>
        <h5> Location {state.location}</h5> */}
        {/* <Button onClick={() => getCoordinates("Svnit")}>
          Get coordinates of Svnit
        </Button> */}
      </ReactMapGl>
    </div>
  );
}
