import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function ModalArtistSongs(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/song/get_songs_by_artistId?artist_id=" +
          props.artistId
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.artistId]);

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
              <>
                <Row>
                  <Col xs={3}>
                    <img
                      style={{ height: "150px", width: "150px" }}
                      src={item.album.images[1].url}
                    />
                  </Col>
                  <Col>
                    <p>Name: {item.name}</p>
                    <p>
                      Link to song:{" "}
                      <a target="__blank" href={item.external_urls.spotify}>
                        Link
                      </a>
                    </p>
                    <p>
                      Preview:{" "}
                      <a target="__blank" href={item.preview_url}>
                        Link
                      </a>
                    </p>
                  </Col>
                </Row>
                <hr></hr>
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
