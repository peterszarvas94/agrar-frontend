import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

const EntrieItem = (props) => {
		
	// eslint-disable-next-line
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const confirmDelete = async () => {
		if(window.confirm('Biztosan törlöd? Nem vonható vissza!')) {
			const getRecords = async () => {
				let responseData;
				try {
					responseData = await sendRequest(
						process.env.REACT_APP_ROOT_URL + '/records/entrie/' + props.id
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

			const deleteEntrie = async () => {
				try {
					await sendRequest(
						process.env.REACT_APP_ROOT_URL + '/entries/' + props.id,
						'DELETE'
					);

				} catch(err) {}
			}
			
			const recordsObject = await getRecords();
			const records = recordsObject.records;

			for (let j = 0; j < records.length; j++) {
				const operationObject = await getOperation(records[j].id);
				const operation = operationObject.operation;

				await deleteRecord(records[j].id, operation.id);
			}

			await deleteEntrie(props.id);

			window.alert('Bejegyzés törölve! OK gombbal visszaléphetsz.');
			window.location.reload();
		}
	}

	return (
		<>
			<tr>
				<td></td>
				<td>{props.name}</td>
				<td>
					{props.type && "+"}
					{!props.type && "-"}
					{props.price}
				</td>
				<td>
					<Link to={{
						pathname: '/entrie/edit',
						state: {
							id: props.id,
							category: props.category,
							name: props.name,
							price: props.price,
							type: props.type
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
		</>
	);
}

export default EntrieItem;