import React, { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const EntrieSelectorEdit = props => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedEntries, setLoadedEntries] = useState();
    const [selectedRecord, setSelectedRecord] = useState(0);
    const [firstPrice, setFirstPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [sum, setSum] = useState(0);
    const [firstQuantity, setFirstQuantity] = useState(0);
    const [quantity, setQuantity] = useState(0);
    
    useEffect(() => {
        const fetchEntries = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/entries/category/' + props.category
            );
            setLoadedEntries(responseData.entries);
            if (firstPrice === 1) {
                setPrice(responseData.entries[0].price);
            }
          } catch (err) {}
        };
        fetchEntries();

        const fetchRecord = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/records/' + props.record
                );
                setSelectedRecord(responseData.record);
            } catch(err) {}
        }
        fetchRecord();
    // eslint-disable-next-line
    }, [sendRequest, props.category, props.record]);

    useEffect(() => {
        const setDefaultEntrie = () => {
            if(selectedRecord !== 0) {
                const ent = document.getElementById('entrieSelector');
                let optionToSelect;
                if(ent) {
                    for(let op of ent.options) {
                        if(op.id === selectedRecord.entrie) {
                            optionToSelect = op;
                        }
                    }
                    if(!!optionToSelect && firstPrice === 0 && !selectedRecord.price) {
                        ent.value = optionToSelect.value;
                        setFirstPrice(1);
                        setPrice(optionToSelect.getAttribute('price'));
                    }
                }
            }        
        }
        setDefaultEntrie();
    // eslint-disable-next-line
    }, [selectedRecord, props.category]);

    useEffect(() => {
        const setDefaultPrice = () => {
            if(selectedRecord !== 0 && selectedRecord.price && price !== selectedRecord.price && firstPrice === 0) {
                setFirstPrice(1);
                setPrice(selectedRecord.price);
            }
        }

        setDefaultPrice();
    });

    useEffect(() => {
        const setDefaultQuantity = () => {
            if(selectedRecord!== 0 && firstQuantity===0) {
                setFirstQuantity(1);
                setQuantity(selectedRecord.quantity);
            }
        }

        setDefaultQuantity();
    });

    useEffect(() => {
        setSum(price*quantity);
    }, [ price, quantity ]);

    const entrieChanged = (event) => {
        setSelectedRecord(event.target.options[event.target.selectedIndex]);
        setPrice(event.target.options[event.target.selectedIndex].getAttribute('price'));
    }

    const priceChanged = (event) => {
        setPrice(event.target.value);
    }

    const quantityChanged = (event) => {
        setQuantity(event.target.value);
    }

    return (
        <>
            <Form.Group controlId='entrieSelector'>
                <Form.Label>Művelet</Form.Label>
                <Form.Control as='select' defaultValue={selectedRecord.entrie} onChange={entrieChanged}>
                    {isLoading && 
                        <option></option>
                    }
                    {!isLoading && loadedEntries && !selectedRecord && 
                        <>
                        </>
                    }
                    {!isLoading && loadedEntries && selectedRecord &&
                        <>
                            {loadedEntries.map(item => (
                                <option
                                    key={item.id}
                                    id={item.id}
                                    price={item.price}
                                    type={item.type.toString()}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </>
                    }
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId='priceSelector'>
                <Form.Label>Egységár</Form.Label>
                <Form.Control type='number' value={price} onChange={priceChanged}/>
            </Form.Group>

            <Form.Group controlId='quantitySelector'>
                <Form.Label>Mennyiség</Form.Label>
                <Form.Control type='number' value={quantity} onChange={quantityChanged}/>
            </Form.Group>

            <Form.Group controlId='summary'>
                <Form.Label>Összesen</Form.Label>
                <Form.Control type='number' value={sum} disabled/>
            </Form.Group>
        </>
    );
}

export default EntrieSelectorEdit;