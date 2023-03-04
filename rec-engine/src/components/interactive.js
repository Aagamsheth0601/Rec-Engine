import Spline from "@splinetool/react-spline";
import ModalTemplate from "./modalTemplate";
import { useState } from 'react';


export default function Interactive() {
  const [modalShow, setModalShow] = useState(false)

  function onMouseDown(e) {
    console.log(e.target.name);
    setModalShow(true);
  }
  return (
    <>

      <ModalTemplate
        show={modalShow}
        onHide={() => setModalShow(false)}
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