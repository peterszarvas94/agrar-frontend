import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const EntrieFormNew = props => {
    const goBack = () => {
        props.history.goBack();
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedCategories, setLoadedCategories] = useState();
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/categories'
            );
            setLoadedCategories(responseData.categories);
          } catch (err) {}
        };
        fetchCategories();
    }, [sendRequest]);

    const priceChanged = (event) => {
        setPrice(event.target.value);
    }

    const save = () => {

        const name = document.getElementById('nameSelector').value;
        
        const price = document.getElementById('priceSelector').value;
        
        const categorySelector = document.getElementById('categorySelector');
        const category = categorySelector.options[categorySelector.selectedIndex].getAttribute('id');
        
        const typeSelector = document.getElementById('typeSelector');
        const type = (typeSelector.selectedIndex === 0) ? false : true;

        const entrieObject = {
            name,
            price,
            category,
            type
        }

        const addEntrie = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/entries',
                    'POST',
                    JSON.stringify({...entrieObject}),
                    {
                        'Content-Type': 'application/json'
                    }
                );
            } catch(err) {}
        }

        addEntrie();

        window.alert('Művelet létrehozva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }

    return (
        <>
            <h3>
                Új művelet hozzáadása
            </h3>

            <Button onClick={goBack}>
                <div className='icon-left-big'>Vissza</div>
            </Button>

            <Form>
                <Form.Group controlId='categorySelector'>
                    <Form.Label>Kategória</Form.Label>
                    <Form.Control
                        as='select'
                    >
                        {isLoading && (
                            <option></option>
                        )}
                        {!isLoading && loadedCategories &&
                            <>
                                {loadedCategories.map(item => (
                                    <option
                                        id={item.id}
                                        key={item.id}
                                    >{item.name}</option>
                                ))}
                            </>
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='nameSelector'>
                    <Form.Label>Név</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group controlId='typeSelector'>
                    <Form.Label>Típus</Form.Label>
                    <Form.Control as='select'>
                        <>
                            <option id={0}>kiadás (-)</option>
                            <option id={1}>bevétel (+)</option>
                        </>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='priceSelector'>
                    <Form.Label>Egységár</Form.Label>
                    <Form.Control type='number' value={price} onChange={priceChanged}/>
                </Form.Group>
            </Form>

            <Button
                onClick={save}
                variant='success'
            >
                <div className='icon-floppy'>Mentés</div>
            </Button>
        </>
    );
}

export default EntrieFormNew;