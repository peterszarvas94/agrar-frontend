import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

import CategoryItem from './CategoryItem';

const CategoryRow = (props) => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const confirmDelete = async () => {
        if(window.confirm('Biztosan törlöd? Nem vonható vissza!')) {
            const getEntries = async () => {
                let responseData;
                try {
                    responseData = await sendRequest(
                        process.env.REACT_APP_ROOT_URL + '/entries/category/' + props.id
                    );
                    return responseData;
                } catch(err) {}
            }

            const getRecords = async (entrie) => {
                let responseData;
                try {
                    responseData = await sendRequest(
                        process.env.REACT_APP_ROOT_URL + '/records/entrie/' + entrie
                    );
                    return responseData;
                } catch(err) {}
            }

            const getOperation = async (record) => {
                let responseData;
                try {
                    responseData = await sendRequest(
                        process.env.REACT_APP_ROOT_URL + '/operations/record/' + record
                    );
                    return responseData;
                } catch(err) {}
            }

            const deleteRecord = async (record, operation) => {
                try {
                    await sendRequest(
                        process.env.REACT_APP_ROOT_URL + '/records/' + record,
                        'DELETE',
                        JSON.stringify({ operation }),
                        {
                            'Content-Type': 'application/json'
                        }
                    );

                } catch(err) {}
            }

            const deleteEntrie = async (entrie) => {
                try {
                    await sendRequest(
                        process.env.REACT_APP_ROOT_URL + '/entries/' + entrie,
                        'DELETE'
                    );

                } catch(err) {}
            }

            const deleteCategroy = async () => {
                try {
                    await sendRequest(
                        process.env.REACT_APP_ROOT_URL + '/categories/' + props.id,
                        'DELETE'
                    );

                } catch(err) {}
            }

            const entriesObject = await getEntries();
            const entries = entriesObject.entries;

            for (let i = 0; i < entries.length; i++) {
                const recordsObject = await getRecords(entries[i].id);
                const records = recordsObject.records;

                for (let j = 0; j < records.length; j++) {
                    const operationObject = await getOperation(records[j].id);
                    const operation = operationObject.operation;

                    await deleteRecord(records[j].id, operation.id);
                }

                await deleteEntrie(entries[i].id);
            }

            await deleteCategroy();

            window.alert('Bejegyzés törölve! OK gombbal visszaléphetsz.');
            window.location.reload();
        }
    }

    return (
        <>
            <tr>
                <td>{props.name}</td>
                <td colSpan='2'></td>
                <td>
                    <Link to={{
                        pathname: '/category/edit',
                        state: {
                            id: props.id,
                            name: props.name
                        }
                    }}>
                        <Button size='sm' variant='primary'>
                            <div className='icon-edit'></div>
                        </Button>
                    </Link>
                    <Button size='sm' variant='danger' onClick={confirmDelete}>
                        <div className='icon-trash-empty'></div>
                    </Button>
                </td>
            </tr>
            <CategoryItem category={props.id}/>
        </>
    );
}

export default CategoryRow;