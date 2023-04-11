import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
// import ModalSongArtist from "./modalSongArtist";
export default function ModalMovieRec(props) {
  const [data, setData] = useState([]);


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/movie/get_allRecommendations?movieName=" + props.name)
      .then((response) => {
        setData(response.data.sort());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.name]);

  return (
    <>
      {/* <ModalSongArtist
        show={artist}
        onHide={() => {
        setGenre("");
        props.setModalSong(true);
        setShowArtist(false);
        }}
        genre={genre}
        setShowArtist={setShowArtist}
        email={props.email}
      /> */}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>{props.name}</b>
            <hr />
            <b>Similar Movies:</b>
            <br/>
            {data.map((item, index) => (
              <Button
                variant="light"
                style={{ margin: "2px"}}
                key={index}
                onClick={() => {
                //   setG(item);
                  props.setName(item);
                  setData([]);
                axios
                .get("http://127.0.0.1:8000/movie/get_allRecommendations?movieName=" + props.name)
                .then((response) => {
                setData(response.data.sort());
                })
                .catch((err) => {
                console.log(err);
      });
                //   setShowArtist(true);
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
