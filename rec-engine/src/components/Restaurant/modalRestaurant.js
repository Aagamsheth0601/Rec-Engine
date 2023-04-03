import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ModalRestaurantBasedOnCusine from "./modalRestaurantBasedOnCusine";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
    console.log(searchText);
    setSearch(searchText);
    if (searchText !== "") {
      const xyz = data.filter((item) => {
        if (item.includes(searchText)) {
          console.log(item);
          return item;
        }
      });
      console.log(xyz);
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
      })
      .catch((err) => {
        console.log(err);
      });
    setFilteredInfo(data);
  }, [props.latitude, props.longitude]);

  return (
    <>
      <ModalRestaurantBasedOnCusine
        show={modalRestaurantBasedOnCusine}
        onHide={() => {
          setCusineSelected(null);
          props.setModalRestaurant(true);
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
            <TextField
              value={search}
              placeholder="Search"
              onChange={(e) => {
                handleChange(e);
              }}
            />

            {filteredInfo.map((item) => (
              <>
                <Button
                  variant="light"
                  onClick={() => {
                    props.setModalRestaurant(false);
                    setCusineSelected(item);
                    setModalRestaurantBasedOnCusine(true);
                  }}
                >
                  {item}
                </Button>
              </>
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
