import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

const OperationItem = (props) => {

	// eslint-disable-next-line
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const confirmDelete = async () => {
		const getOperator = async () => {
			let responseData;
			try {
				responseData = await sendRequest(
					process.env.REACT_APP_ROOT_URL + '/operators/' + props.id
				);
				return responseData;
			} catch(err) {}
		}
	
		const getOperations = async (operator) => {
			let responseData;
			try {
				responseData = await sendRequest(
					process.env.REACT_APP_ROOT_URL + '/operations/operator/' + operator
				);
				return responseData;
			} catch(err) {}
		}

		const getField = async (operation) => {
			let responseData;
			try {
				responseData = await sendRequest(
					process.env.REACT_APP_ROOT_URL + '/fields/operation/' + operation
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

		const deleteOperation = async (operation, field) => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/operations/' + operation,
                    'DELETE',
                    JSON.stringify({field}),
                    {
                        'Content-Type': 'application/json'
                    }
                );
            } catch(err) {}
        }

		const deleteOperator = async () => {
			try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/operators/' + props.id,
                    'DELETE'
                );
            } catch(err) {}
		}

		if(window.confirm('Biztosan törlöd? nem vonható vissza!')) {
		
			const operatorObject = await getOperator();
			const operator = operatorObject.operator;

			const operationsObject = await getOperations(operator.id);
			const operations = operationsObject.operations;

			for (let i = 0; i < operations.length; i++) {
				for(let j = 0; j < operations[i].records.length; j++) {
					console.log(operations[i].records[j])
					await deleteRecord(operations[i].records[j], operations[i].id);
				}

				const fieldObject = await getField(operations[i].id);
				const field = fieldObject.field;
				
				await deleteOperation(operations[i].id, field.id);
			}

			await deleteOperator();


			window.alert('Bejegyzés törölve! OK gombbal visszaléphetsz.');
            window.location.reload();
		}

	}

	return (
		<>
			<tr>
				<td>{props.name}</td>
				<td>
					<Link
						to={{
							pathname: '/operator/edit',
							state: { ...props }
						}}	
					>
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

export default OperationItem;