import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import RecordList from './RecordList';
import { useHttpClient } from '../../hooks/http-hook';

import '../style/OperationItem.css';

const OperationItem = props => {

    const convertDate = (str) => {
        const date = new Date(str);
        const y = date.getFullYear();
        const m = date.getMonth() + 1
        const M = (m < 10) ? ('0' + m) : m;
        const d = date.getDate();
        const D = (d < 10) ? ('0' + d) : d; 

        return y + '-' + M + '-' + D;
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedOpeartor, setLoadedOpeartor] = useState();

    useEffect(() => {
        const fetchOperator = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/operators/' + props.operation.operator
            );
            setLoadedOpeartor(responseData.operator);
          } catch (err) {}
        };
        fetchOperator();
    }, [sendRequest, props.operation.operator]);

    const confirmDelete = () => {
        if(window.confirm('Biztosan törlöd? Nem vonható vissza!')) {
            const deleteRecord = async (record) => {
                try {
                    await sendRequest(
                        process.env.REACT_APP_ROOT_URL + '/records/' + record,
                        'DELETE',
                        JSON.stringify({ operation: props.operation.id }),
                        {
                            'Content-Type': 'application/json'
                        }
                    );
    
                } catch(err) {}
            }
            const deleteOperation = async() => {
                try {
                    await sendRequest(
                        process.env.REACT_APP_ROOT_URL + '/operations/' + props.operation.id,
                        'DELETE',
                        JSON.stringify({ field: props.field }),
                        {
                            'Content-Type': 'application/json'
                        }
                    );
                } catch(err) {}
            }
    
            for (let record of props.operation.records) {
                deleteRecord(record);
            }
            deleteOperation();

            window.alert('Bejegyzés törölve! OK gombbal visszaléphetsz.');
            window.location.reload();
        }
    }

    return (
        <>
            {isLoading && (
                <tr>
                </tr>
            )}
            {!isLoading && loadedOpeartor && 
                <>
                    <tr>
                        <td>{ convertDate(props.operation.date) }</td>
                        <td>{ loadedOpeartor.name }</td>
                        
                        <td colSpan={6} className='rig'>
                            <Link to={{
                                pathname: '/operations/edit',
                                state: { operation: props.operation }
                            }}>
                                <Button size='sm' variant='primary' title='Módosítás'>
                                    <div className='icon-edit'></div>
                                </Button>
                            </Link>
                            <Button size='sm' variant='danger' title='Törlés' onClick={confirmDelete}>
                                <div className='icon-trash-empty'></div>
                            </Button>
                        </td>
                    </tr>
                    <RecordList
                        records={props.operation.records}
                        operation={props.operation}
                    />
                    <tr>
                        <td colSpan='2'></td>
                        <td colSpan='6'>
                            <Link to={{
                                pathname: '/record/new',
                                state: {operation: props.operation.id}
                            }}>
                                <Button size='sm' variant='success'>
                                    <div className='icon-plus'>Új tétel</div>
                                </Button>
                            </Link>
                        </td>
                    </tr>
                </>
            }
        </>
    );
}

export default OperationItem;