import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ModalMovieRec from "./modalMovieRec";
// import ModalSongArtist from "./modalSongArtist";
export default function ModalMovie(props) {
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
//   const [genre, setGenre] = useState("");
//   const [artist, setShowArtist] = useState(false);

  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
    if (searchText !== "") {
      const xyz = data.filter((item) => {
        return item.toLowerCase().includes(searchText);
      });
      setFilteredInfo(xyz);
    } else {
      setFilteredInfo([]);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/movie/get_MovieName")
      .then((response) => {
        // setFilteredInfo(response.data.sort());
        setData(response.data.sort());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ModalMovieRec
        show={showModal}
        onHide={() => {
            setShowModal(false);
            setName("");
            props.setModalMovie(true);
        }}
        name={name}
        setName = {setName}
        email={props.email}
      />
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
            Search for any Movie: <input type="text" value={search} onChange={handleChange} />{" "}
            <br />
            {filteredInfo.map((item, index) => (
              <Button
                variant="light"
                style={{ margin: "2px"}}
                key={index}
                onClick={() => {
                    setShowModal(true);
                    setName(item);
                    props.setModalMovie(false);
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
