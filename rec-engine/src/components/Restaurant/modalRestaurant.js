import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ModalRestaurantBasedOnCusine from './modalRestaurantBasedOnCusine'
// import Cusine from './cusine'


export default function ModalRestaurant(props) {
    const [modalRestaurantBasedOnCusine, setModalRestaurantBasedOnCusine] = useState(false);
    const [cusineSelected, setCusineSelected] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/restaurant/all_cusine?longitude=' + props.longitude + '&latitude=' + props.latitude).then(response => {
            setData(response.data);
        }).catch(err => {
            console.log(err);
        });
    }, [props.latitude, props.longitude]);

    return (
        <>

            <ModalRestaurantBasedOnCusine
                show={modalRestaurantBasedOnCusine}
                onHide={() => { setCusineSelected(null); props.setModalRestaurant(true); setModalRestaurantBasedOnCusine(false) }}
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
                        {data.map(item => (
                            <Button variant="light" onClick={() => { props.setModalRestaurant(false); setCusineSelected(item); setModalRestaurantBasedOnCusine(true); }}>
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