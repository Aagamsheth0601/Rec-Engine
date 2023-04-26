import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ModalRestaurantDetail from "./Restaurant/modalRestaurantDetail";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ModalPastRecs(props) {
  const [data, setData] = useState({});
  const [restId, setRestId] = useState(0);
  const [modalRestaurantDetail, setModalRestaurantDetail] = useState(false);
  const [dataSong, setDataSong] = useState({});
  const [dataMovie, setDataMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/restaurant/get_past_recs?email=" +
            props.email +
            "&longitude=" +
            props.longitude +
            "&latitude=" +
            props.latitude
        );
        setData(response.data);

        response = await axios.get(
          "http://127.0.0.1:8000/song/get_past_song?email=" + props.email
        );
        setDataSong(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (props.modalPastRecs) {
      fetchData();
    } else {
      setData({});
      setDataSong({});
      setLoading(true);
    }
  }, [props.modalPastRecs, props.email, props.latitude, props.longitude]);

  const renderPastRecs = () => {
    const ret = [];
    for (let key in data) {
      ret.push(
        <div>
          <hr />
          <div>
            Since you liked <b> {data[key].name}</b> you may also like{" "}
          </div>
          <div>
            <hr />
            {renderData(data[key].similar)}
          </div>
        </div>
      );
    }
    return ret;
  };

  const renderPastRecsSong = () => {
    const ret = [];
    for (let key in dataSong) {
      ret.push(
        <div>
          <hr />
          <div>
            Since you liked <b> {dataSong[key].name}</b> you may also like{" "}
          </div>
          <div>
            <hr />
            {renderDataSong(dataSong[key].similar)}
          </div>
        </div>
      );
    }
    return ret;
  };

  const renderDataSong = (data) => {
    const rows = [];
    for (let key in data) {
      rows.push(
        <>
          <Row>
            <Col xs={3}>
              <img
                style={{ height: "150px", width: "150px" }}
                src={data[key].album.images[1].url}
              />
            </Col>
            <Col>
              <p>Name: {data[key].name}</p>
              <p>
                Link to song:{" "}
                <a target="__blank" href={data[key].external_urls.spotify}>
                  Link
                </a>
              </p>
              <p>
                Preview:{" "}
                <a target="__blank" href={data[key].preview_url}>
                  Link
                </a>
              </p>
            </Col>
          </Row>
          <hr />
        </>
      );
    }

    return rows;
  };

  const renderData = (data) => {
    const rows = [];
    for (let key in data) {
      rows.push(
        <Button
          variant="light"
          key={key}
          onClick={() => {
            setRestId(key);
            props.setModalPastRecs(false);
            setModalRestaurantDetail(true);
          }}
        >
          {data[key].name}
        </Button>
      );
    }
    return rows;
  };

  return (
    <>
      <ModalRestaurantDetail
        show={modalRestaurantDetail}
        onHide={() => {
          setRestId(0);
          props.setModalPastRecs(true);
          setModalRestaurantDetail(false);
        }}
        email={props.email}
        restId={restId}
        modalRestaurantDetail={modalRestaurantDetail}
        setRestId={setRestId}
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
            Past Recommendations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div>
                <h3>Restaurants</h3>
                {renderPastRecs()}
              </div>
              <div>
                <h3>Songs</h3>
                {renderPastRecsSong()}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Back</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
