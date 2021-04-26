import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const CategoryFormNew = props => {

    const goBack = () => {
        props.history.goBack();
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(()=> {
        document.getElementById('nameSelector').value = props.history.location.state.name;
    }, [props.history.location.state.name]);

    const save = () => {
        const name = document.getElementById('nameSelector').value;
        
        const categoryObject = {
            name
        }

        const editCategory = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/categories/' + props.history.location.state.id,
                    'PATCH',
                    JSON.stringify({...categoryObject}),
                    {
                        'Content-Type': 'application/json'
                    },
                );
            } catch(err) {}
        }

        editCategory();

        window.alert('Kategória módosítva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }
    
    return (
        <>
            <h3>
                Kategória szerkesztése
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
                onClick={ save }
                variant='success'
            >
                <div className='icon-floppy'>Mentés</div>
            </Button>
        </>
    );
}

export default CategoryFormNew;