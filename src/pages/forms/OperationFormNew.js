import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';
import DateSelectorNew from '../../record/components/DateSelectorNew';
import OperatorSelectorNew from '../../record/components/OperatorSelectorNew';

const OperationFormNew = (props) => {
    
    const goBack = () => {
        props.history.goBack();
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const save = () => {
        const date = document.getElementById('dateSelector').value;
        const operators = document.getElementById('operatorSelector').options;
        const selectedOperator = operators[operators.selectedIndex].getAttribute('id');
        const field = props.history.location.state.field;

        const operationObject = {
            date,
            operator: selectedOperator,
            field
        }

        const addOperation = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/operations/',
                    'POST',
                    JSON.stringify({...operationObject}),
                    {
                        'Content-Type': 'application/json'
                    }
                );
            } catch(err) {}
        }
        addOperation();

        window.alert('Bejegyzés létrehozva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }

    return (
        <>
            <h3>
                Új dátum
            </h3>

            <Button onClick={goBack}>
                <div className='icon-left-big'>Vissza</div>
            </Button>

            <Form>
                <Form.Group controlId='dateSelector'>
                    <Form.Label>Dátum</Form.Label>
                    <DateSelectorNew />
                </Form.Group>
                
                <Form.Group controlId='operatorSelector'>
                    <Form.Label>Kezelő</Form.Label>
                    <Form.Control as='select'>
                        <OperatorSelectorNew />
                    </Form.Control>
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

export default OperationFormNew;