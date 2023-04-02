import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function ModalRestaurantBasedOnCusine(props) {
    const [data, setData] = useState([]);
    const [rest, setRest] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/restaurant/similar?rest_id=' + props.restId + '&longitude=' + props.longitude + '&latitude=' + props.latitude)
            .then(res => {
                setData(res.data);
            }).catch(err => {
                console.log(err);
            });
        axios.get('http://127.0.0.1:8000/restaurant/get_rest?rest_id=' + props.restId)
            .then(res => {
                setRest(res.data);
            }).catch(err => {
                console.log(err);
            });
    }, [props.restId, props.latitude, props.longitude]);

    const renderData = () => {
        const rows = [];

        for (let key in data) {
            rows.push(
                <Button variant="light" key={key} onClick={() => { props.setRestId(key); }}>
                    {data[key].name}
                </Button>
            );
        }
        console.log('http://127.0.0.1:8000/restaurant/similar?rest_id=' + props.restId + '&longitude=' + props.longitude + '&latitude=' + props.latitude);
        return rows;
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details of Restaurant
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Name : {rest.name}</p>
                <p>Address: {rest.address}</p>
                <p>Cusine: {rest.cusine}</p>
                <p>Rating: {rest.rating}</p>
                <p>Famous Food: {rest.famous_food}</p>
                <h1> Similar Restaurants </h1>
                {renderData()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Back</Button>
            </Modal.Footer>
        </Modal>
    );
}