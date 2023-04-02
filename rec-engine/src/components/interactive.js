import Spline from "@splinetool/react-spline";
import ModalTemplate from "./modalTemplate";
import ModalRestaurant from "./Restaurant/modalRestaurant";
import React, { useState } from 'react';



export default function Interactive() {
  const [modalShow, setModalShow] = useState(false);
  const [modalRestaurant, setModalRestaurant] = useState(false);

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
        longitude={72.828059}
        latitude={18.942880}
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