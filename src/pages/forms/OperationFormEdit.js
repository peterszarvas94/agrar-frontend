import React from 'react';
import {Form , Button} from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';
import DateSelectorEdit from '../../record/components/DateSelectorEdit';
import OperatorSelectorEdit from '../../record/components/OperatorSelectorEdit'

const OperationFormEdit = (props) => {

    const goBack = () => {
        props.history.goBack();
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    /*const showProps = () => {
        console.log(props.history.location.state);
    }

    const showState = () => {
        const date = document.getElementById('dateSelector').value;
        const operators = document.getElementById('operatorSelector').options;
        const selectedOperator = operators[operators.selectedIndex].getAttribute('id');
        const state = {
            date,
            operator: selectedOperator
        }

        console.log(state);
    }*/


    const save = () => {
        const date = document.getElementById('dateSelector').value;
        const operators = document.getElementById('operatorSelector').options;
        const selectedOperator = operators[operators.selectedIndex].getAttribute('id');

        const recordObj = {
            date,
            operator: selectedOperator
        }

        const updateOperation = async () => {
            console.log(props)
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/operations/' + props.history.location.state.operation.id,
                    'PATCH',
                    JSON.stringify({...recordObj}),
                    {
                        'Content-Type': 'application/json'
                    },
                );
            } catch(err) {}
        }
        updateOperation();

        window.alert('Bejegyzés módosítva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }

    return (
        <>
            <h3>
                Dátum szerkesztése
            </h3>

            <Button onClick={goBack}>
                <div className='icon-left-big'>Vissza</div>
            </Button>

            <Form>
                <Form.Group controlId='dateSelector'>
                    <Form.Label>Dátum</Form.Label>
                    <DateSelectorEdit date={props.history.location.state.operation.date}/>
                </Form.Group>

                <Form.Group controlId='operatorSelector'>
                    <Form.Label>Kezelő</Form.Label>
                    <Form.Control as='select'>
                        <OperatorSelectorEdit operator={props.history.location.state.operation.operator}/>
                    </Form.Control>
                </Form.Group>
            </Form>
        {/*
            <Button
                onClick={showProps}
                variant='info'
            >
                props
            </Button><br/><br/>

            <Button
                onClick={showState}
                variant='info'
            >
                state
            </Button><br/><br/>
        */}
        
            <Button
                onClick={save}
                variant='success'
            >
                <div className='icon-floppy'>Módosítás</div>
            </Button>
        </>
    );
}

export default OperationFormEdit;