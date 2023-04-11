import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
// import ModalSongArtist from "./modalSongArtist";
export default function ModalMovieRec(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/movie/get_allRecommendations?movieName=" + props.name);
        setData(response.data);
        console.error("Hello", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (props.showModal) {
      fetchData();
    } else {
      setData([]);
      setLoading(true);
    }
  }, [props.name, props.showModal]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Movies Recommended</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ?
            <div>Loading...</div>
            :
            <div>
              <b>{props.name}</b>
              <hr />
              <b>Similar Movies:</b>
              <br />
              {data.map((item, index) => (
                <Button
                  variant="light"
                  style={{ margin: "2px" }}
                  key={index}
                  onClick={() => {
                    props.setName(item);
                    setData([]);
                    setLoading(true);
                  }}
                >
                  {item}
                </Button>
              ))}
            </div>
          }

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
