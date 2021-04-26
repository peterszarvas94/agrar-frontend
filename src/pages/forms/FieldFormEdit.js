import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const FieldFormEdit = props => {

    const goBack = () => {
        props.history.goBack();
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(()=> {
        document.getElementById('nameSelector').value = props.history.location.state.name;
        document.getElementById('areaSelector').value = props.history.location.state.area;
    }, [props.history.location.state.name, props.history.location.state.area]);

    const save = () => {
        const name = document.getElementById('nameSelector').value;
        const area = document.getElementById('areaSelector').value;
        
        const fieldObject = {
            name,
            area
        }

        const editField = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/fields/' + props.history.location.state.id,
                    'PATCH',
                    JSON.stringify({...fieldObject}),
                    {
                        'Content-Type': 'application/json'
                    },
                );
            } catch(err) {}
        }

        editField();

        window.alert('Bejegyzés módosítva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }

    return (
        <>
            <h3>
                Föld szerkesztése
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
                <div className='icon-floppy'>Módosítás</div>
            </Button>
        </>
    )
}

export default FieldFormEdit;