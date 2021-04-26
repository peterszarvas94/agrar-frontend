import React, { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const EntrieSelectorNew = props => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedEntries, setLoadedEntries] = useState();
    const [selectedEntrie, setSelectedEntrie] = useState(0);
    const [price, setPrice] = useState(0);
    const [sum, setSum] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchEntries = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/entries/category/' + props.category
            );
            setLoadedEntries(responseData.entries);
            setSelectedEntrie(responseData.entries[0]);
            setPrice(responseData.entries[0].price)
          } catch (err) {}
        };
        fetchEntries();
    }, [sendRequest, props.category]);

    useEffect(() => {
        setSum(price*quantity);
    }, [ price, quantity ]);

    const entrieChanged = (event) => {
        setSelectedEntrie(event.target.options[event.target.selectedIndex]);
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
                <Form.Control as='select' defaultValue={selectedEntrie} onChange={entrieChanged}>
                    {isLoading && 
                        <option></option>
                    }
                    {!isLoading && loadedEntries &&
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

export default EntrieSelectorNew;