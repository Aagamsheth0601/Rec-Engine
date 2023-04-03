import Spline from "@splinetool/react-spline";
import ModalTemplate from "./modalTemplate";
import ModalRestaurant from "./Restaurant/modalRestaurant";
import React, { useState, useEffect } from 'react';



export default function Interactive() {
  const [modalShow, setModalShow] = useState(false);
  const [modalRestaurant, setModalRestaurant] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });

    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  function onMouseDown(e) {
    console.log(e.target.name);
    if (e.target.name === 'CheckPointRestaurants') {
      setModalRestaurant(true);
    } else {
      setModalShow(true);
    }
  }
  return (
    <>

      <ModalTemplate
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <ModalRestaurant
        show={modalRestaurant}
        onHide={() => setModalRestaurant(false)}
        setModalRestaurant={setModalRestaurant}
        longitude={location['longitude']}
        latitude={location['latitude']}
      />

      <div
        style={{
          width: "100%",
          height: "800px",
        }}
      >
        <Spline scene="https://prod.spline.design/49Id9tLwIHZ-xsa3/scene.splinecode" onMouseDown={onMouseDown} />
      </div>
    </>
  );
};