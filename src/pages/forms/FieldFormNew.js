import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const FieldFormNew = props => {

    const goBack = () => {
        props.history.goBack();
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const save = () => {
        const name = document.getElementById('nameSelector').value;
        const area = document.getElementById('areaSelector').value;

        const fieldObject = {
            name,
            area
        }

        const addField = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/fields',
                    'POST',
                    JSON.stringify({...fieldObject}),
                    {
                        'Content-Type': 'application/json'
                    }
                );
            } catch(err) {}
        }

        addField();

        window.alert('Bejegyzés létrehozva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }

    return (
        <>
            <h3>
                Új föld hozzáadása
            </h3>

            <Button onClick={goBack}>
                <div className='icon-left-big'>Vissza</div>
            </Button>

            <Form>
                <Form.Group controlId='nameSelector'>
                    <Form.Label>Név</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>
                <Form.Group controlId='areaSelector'>
                    <Form.Label>Terület (ha)</Form.Label>
                    <Form.Control type='number'></Form.Control>
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

export default FieldFormNew;