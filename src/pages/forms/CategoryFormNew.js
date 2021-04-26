import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const CategoryFormNew = props => {
    const goBack = () => {
        props.history.goBack();
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const save = () => {

        const name = document.getElementById('nameSelector').value;

        const categoryObject = {
            name
        }

        const addCategory = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/categories',
                    'POST',
                    JSON.stringify({...categoryObject}),
                    {
                        'Content-Type': 'application/json'
                    }
                );
            } catch(err) {}
        }

        addCategory();

        window.alert('Kategória létrehozva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }
    
    return (
        <>
            <h3>
                Új kategória hozzáadása
            </h3>

            <Button onClick={goBack}>
                <div className='icon-left-big'>Vissza</div>
            </Button>

            <Form>
                <Form.Group controlId='nameSelector'>
                    <Form.Label>Név</Form.Label>
                    <Form.Control></Form.Control>
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

export default CategoryFormNew;