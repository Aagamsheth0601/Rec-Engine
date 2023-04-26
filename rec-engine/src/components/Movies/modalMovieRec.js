import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
// import ModalSongArtist from "./modalSongArtist";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  const fetchData = async (value) => {
    setLoading(true);
    props.setName(value);
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
              {data[0].map((item, index) => (
                <>
                  <Row>
                    <Col xs={3}>
                      <img
                        style={{ height: "150px", width: "150px" }}
                        src={data[1][index]}
                      />
                    </Col>
                    <Col>
                      <p>Name: {data[0][index]}</p>
                      <p>
                        Link to IMDB:{" "}
                        <a
                          target="__blank"
                          href={data[2][index]}
                        >
                          Link
                        </a>
                      </p>
                      <p>
                        Link to Recommendations:{" "}
                        <Button onClick={() => { fetchData(data[0][index]) }}>Here</Button>
                      </p>
                    </Col>
                  </Row>
                </>
                // <Button
                //   variant="light"
                //   style={{ margin: "2px" }}
                //   key={index}
                //   onClick={() => {
                //     props.setName(item);
                //     setData([]);
                //     setLoading(true);
                //   }}
                // >
                //   {item}
                // </Button>
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
