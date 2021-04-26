import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';
import '../style/FieldItem.css';

const FieldItem = props => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const remove = async () => {

        const deleteField = async (field) => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/fields/' + field,
                    'DELETE'
                );
            } catch(err) {}
        }

        const deleteOperation = async (operation, field) => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/operations/' + operation,
                    'DELETE',
                    JSON.stringify({field}),
                    {
                        'Content-Type': 'application/json'
                    },
                );
            } catch(err) {}
        }

        const deleteRecord = async (record, operation) => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/records/' + record,
                    'DELETE',
                    JSON.stringify({operation}),
                    {
                        'Content-Type': 'application/json'
                    },
                );
            } catch(err) {console.log(err)}
        }

        const getOperation = async (operation) => {
            let response;
            try {
                response = await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/operations/' + operation
                );
            } catch(err) {}
            return response;
        }

        if(window.confirm('Biztosan törlöd? nem vonható vissza!')) {
            for (let operation of props.operations) {
                const operationData = await getOperation(operation);
                const records = operationData.operation.records;
                
                for(let record of records) {
                    deleteRecord(record, operation);
                }
    
                deleteOperation(operation, props.id);
            }
    
            deleteField(props.id);
    
            window.alert('Bejegyzés törölve! OK gombbal visszaléphetsz.');
            window.location.reload();
        }
    }

    return (
        <tr>
            <td>{ props.name }</td>
            <td>{ props.area }</td>
            <td className='rig'>
                <Link to={{
                    pathname: '/field/edit',
                    state: { ...props }
                }}>
                    <Button size='sm'>
                        <div className='icon-edit '></div>
                    </Button>
                </Link> 
                <Button size='sm' variant='danger' onClick={remove}>
                    <div className='icon-trash-empty'></div>
                </Button>
                
                <Link to={{
                    pathname: '/field/more',
                    state: {
                        id: props.id,
                        name: props.name
                    }
                }}>
                    <Button size='sm' variant='info'>
                        <div className='icon-right-big'>Részletek</div>
                    </Button>
                </Link>

            </td>
        </tr>
    );
}

export default FieldItem;