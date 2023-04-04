import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ModalSongArtist(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/song/get_artist_by_genre?genre=" + props.genre
      )
      .then((response) => {
        setData(response.data.sort());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.genre]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Artists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* <input type="text" value={search} onChange={handleChange} /> */}

            {data.map((item, index) => (
              <Button variant="light" key={index}>
                {item.name}
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
