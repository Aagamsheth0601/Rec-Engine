import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ModalRestaurantBasedOnCusine from "./modalRestaurantBasedOnCusine";

// import Cusine from './cusine'

export default function ModalRestaurant(props) {
  const [modalRestaurantBasedOnCusine, setModalRestaurantBasedOnCusine] =
    useState(false);
  const [cusineSelected, setCusineSelected] = useState(null);
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
    if (searchText !== "") {
      const xyz = data.filter((item) => {
        return item.toLowerCase().includes(searchText);
      });
      setFilteredInfo(xyz);
    } else {
      setFilteredInfo(data);
    }
  };

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/restaurant/all_cusine?longitude=" +
          props.longitude +
          "&latitude=" +
          props.latitude
      )
      .then((response) => {
        setData(response.data.sort());
        setFilteredInfo(response.data.sort());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.latitude, props.longitude, props.modalrestaurant]);

  return (
    <>
      <ModalRestaurantBasedOnCusine
        show={modalRestaurantBasedOnCusine}
        onHide={() => {
          setCusineSelected(null);
          props.setmodalrestaurant(true);
          setModalRestaurantBasedOnCusine(false);
        }}
        cusine={cusineSelected}
        setModalRestaurantBasedOnCusine={setModalRestaurantBasedOnCusine}
        longitude={props.longitude}
        latitude={props.latitude}
      />

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            All Cusines available near your location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" value={search} onChange={handleChange} />

            {filteredInfo.map((item, index) => (
              <Button
                variant="light"
                key={index}
                style={{ margin: "2px" }}
                onClick={() => {
                  props.setmodalrestaurant(false);
                  setCusineSelected(item);
                  setModalRestaurantBasedOnCusine(true);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
