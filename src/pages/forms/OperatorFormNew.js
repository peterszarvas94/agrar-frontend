import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const OperatorFormNew = props => {
	const goBack = () => {
		props.history.goBack();
	}

	// eslint-disable-next-line
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const save = () => {

		const name = document.getElementById('nameSelector').value;

		const operatorObject = {
			name
		}

		const addOperator = async () => {
			try {
				await sendRequest(
					process.env.REACT_APP_ROOT_URL + '/operators',
					'POST',
					JSON.stringify({...operatorObject}),
					{
						'Content-Type': 'application/json'
					}
				);
			} catch(err) {}
		}

		addOperator();

		window.alert('Kezelő létrehozva! OK gombbal visszaléphetsz.');
		props.history.goBack();
	}
		
	return (
		<>
			<h3>
				Új kezelő hozzáadása
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
				onClick={save}
				variant='success'
			>
				<div className='icon-floppy'>Mentés</div>
			</Button>
		</>
	);
}

export default OperatorFormNew;