import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ModalRestaurantDetail from './modalRestaurantDetail';

export default function ModalRestaurantBasedOnCusine(props) {
    const [data, setData] = useState({});
    const [restId, setRestId] = useState(0);
    const [modalRestaurantDetail, setModalRestaurantDetail] = useState(false);

    useEffect(() => {
        if (props.cusine !== null) {
            axios.get('http://127.0.0.1:8000/restaurant/get_cusine?cusine=' + props.cusine + '&longitude=' + props.longitude + '&latitude=' + props.latitude)
                .then(res => {
                    setData(res.data);
                }).catch(err => {
                    console.log(err);
                });
        }
    }, [props.cusine, props.latitude, props.longitude]);

    const renderData = () => {
        const rows = [];

        for (let key in data) {
            rows.push(
                <Button variant="light" key={key} onClick={() => { setRestId(key); props.setModalRestaurantBasedOnCusine(false); setModalRestaurantDetail(true); }}>
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
                onHide={() => { setRestId(0); props.setModalRestaurantBasedOnCusine(true); setModalRestaurantDetail(false); }}
                restId={restId}
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
                        {props.cusine}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderData()}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Back</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}