import Spline from "@splinetool/react-spline";
import ModalTemplate from "./modalTemplate";
import React, { useState, useEffect } from "react";
import ModalRestaurant from "./Restaurant/modalRestaurant";
import ModalSong from "./Songs/modalSong";
import ModalPastRecs from "./pastRecs";

export default function Interactive(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalRestaurant, setModalRestaurant] = useState(false);
  const [modalPastRecs, setModalPastRecs] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [modalSong, setModalSong] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  function onMouseDown(e) {
    console.log(e.target.name);
    if (e.target.name === "CheckPointRestaurants") {
      setModalRestaurant(true);
    } else if (e.target.name === "CheckPointMusic") {
      setModalSong(true);
    } else if (e.target.name === "CheckPointPR") {
      setModalPastRecs(true);
    } else {
      setModalShow(true);
    }
  }

  return (
    <>
      <ModalTemplate show={modalShow} onHide={() => setModalShow(false)} />

      <ModalPastRecs
        show={modalPastRecs}
        onHide={() => {
          setModalPastRecs(false);
        }}
        setModalPastRecs={setModalPastRecs}
        longitude={location["longitude"]}
        latitude={location["latitude"]}
        email={props.email}
      />

      <ModalRestaurant
        show={modalRestaurant}
        onHide={() => {
          setModalRestaurant(false);
        }}
        modalrestaurant={modalRestaurant}
        setmodalrestaurant={setModalRestaurant}
        longitude={location["longitude"]}
        latitude={location["latitude"]}
        email={props.email}
      />

      <ModalSong
        show={modalSong}
        onHide={() => {
          setModalSong(false);
        }}
        setModalSong={setModalSong}
        email={props.email}
      />

      <div
        style={{
          width: "100%",
          height: "800px",
        }}
      >
        <Spline
          scene="https://prod.spline.design/Orch76pE2WjIk5mI/scene.splinecode"
          onMouseDown={onMouseDown}
        />
      </div>
    </>
  );
}
