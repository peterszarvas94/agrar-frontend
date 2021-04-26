import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';
import EntrieItem from './EntrieItem';

const RecordItem = props => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedRecord, setLoadedRecord] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/records/' + props.record
                );
                setLoadedRecord(responseData.record);
            } catch (err) {}
        };
        fetchRecords();

    }, [sendRequest, props.record]);

    const passPrice = (data) => setPrice(data);
    const passType = (data) => setType(data);

    const confirmDelete = () => {
        if(window.confirm('Biztosan törlöd? Nem vonható vissza!')) {
            const deleteRecord = async () =>  {
                try {
                    await sendRequest(
                        process.env.REACT_APP_ROOT_URL + '/records/' + props.record,
                        'DELETE',
                        JSON.stringify({operation: props.operation.id}),
                        {
                            'Content-Type': 'application/json'
                        },
                    );
                } catch(err) {}
            }
            deleteRecord();

            window.alert('Bejegyzés törölve! OK gombbal visszaléphetsz.');
            window.location.reload();
        }
    }

    return (
        <tr>
            {isLoading && (
                <>
                </>
            )}
            {!isLoading && loadedRecord && 
                <>
                    <td></td>
                    <td></td>
                    <EntrieItem
                        id='testparent'
                        entrie={loadedRecord.entrie}
                        recordPrice={loadedRecord.price}
                        price={passPrice}
                        type={passType}
                    />
                    <td>{ loadedRecord.quantity }</td>
                    <td>
                        { type && '+'}
                        { !type && '-'}
                        { price * loadedRecord.quantity }
                    </td>
                    <td className='rig'>
                        <Link to={{
                            pathname: '/record/edit',
                            state: {
                                id: loadedRecord.id,
                                operation: props.operation
                            }
                        }}>
                            <Button size='sm' variant='primary' title='Módosítás'>
                                <div className='icon-edit'></div>
                            </Button>
                        </Link>
                        <Button size='sm' variant='danger' onClick={confirmDelete}  title='Törlés'>
                            <div className='icon-trash-empty'></div>
                        </Button>
                    </td>
                </>
            }
        </tr>
    );
}

export default RecordItem;