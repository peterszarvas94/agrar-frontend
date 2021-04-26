import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const EntrieFormEdit = props => {
    const goBack = () => {
        props.history.goBack();
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedCategories, setLoadedCategories] = useState();
    const [category, setCategory] = useState();
    const [name, setName] = useState(props.history.location.state.name);
    const [price, setPrice] = useState(props.history.location.state.price);
    const [type, setType] = useState();

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

    useEffect(() => {
        const categorySelector = document.getElementById('categorySelector');
        if (categorySelector) {
            for(let i = 0; i < categorySelector.options.length; i++) {
                if (props.history.location.state.category === categorySelector.options[i].getAttribute('id')) {
                    setCategory(categorySelector.options[i].value);
                }
            }
        }
    }, [loadedCategories, props.history.location.state.category]);

    useEffect(() => {
        const typeSelector = document.getElementById('typeSelector');
        if (typeSelector) {
            for(let i = 0; i < typeSelector.options.length; i++) {
                if (props.history.location.state.type === !!i) {
                    setType(typeSelector.options[i].value);
                }
            }
        }
    }, [loadedCategories, props.history.location.state.type]);

    const changedCategory = (event) => {
        setCategory(event.target.value);
    }

    const changedName = (event) => {
        setName(event.target.value);
    }

    const changedPrice = (event) => {
        setPrice(event.target.value);
    }

    const changedType = (event) => {
        setType(event.target.value)
    }

    const save = () => {

        const categorySelector = document.getElementById('categorySelector');
        const category = categorySelector.options[categorySelector.selectedIndex].getAttribute('id');

        const name = document.getElementById('nameSelector').value;
        
        const price = document.getElementById('priceSelector').value;
        
        const type = !!document.getElementById('typeSelector').selectedIndex;

        const entrieObject = {
            name,
            price,
            category,
            type
        }

        const editEntrie = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/entries/' + props.history.location.state.id,
                    'PATCH',
                    JSON.stringify({...entrieObject}),
                    {
                        'Content-Type': 'application/json'
                    },
                );
            } catch(err) {}
        }

        editEntrie();

        window.alert('Kategória módosítva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }

    return (
        <>
            <h3>
                Művelet szekesztése
            </h3>

            <Button onClick={goBack}>
                <div className='icon-left-big'>Vissza</div>
            </Button>

            <Form>
                <Form.Group controlId='categorySelector'>
                    <Form.Label>Kategória</Form.Label>
                    <Form.Control
                        as='select'
                        value={category}
                        onChange={changedCategory}
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
                    <Form.Control value={name} onChange={changedName}/>
                </Form.Group>

                <Form.Group controlId='typeSelector'>
                    <Form.Label>Típus</Form.Label>
                    <Form.Control as='select' value={type} onChange={changedType}>
                        <>
                            <option id={0}>kiadás (-)</option>
                            <option id={1}>bevétel (+)</option>
                        </>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='priceSelector'>
                    <Form.Label>Egységár</Form.Label>
                    <Form.Control type='number' value={price} onChange={changedPrice}/>
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

export default EntrieFormEdit;