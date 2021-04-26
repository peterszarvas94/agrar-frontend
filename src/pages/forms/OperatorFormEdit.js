import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';

const OperatorFormEdit = (props) => {
    const goBack = () => {
		props.history.goBack();
	}

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(()=> {
        document.getElementById('nameSelector').value = props.history.location.state.name;
    }, [props.history.location.state.name]);

    const save = () => {
        const name = document.getElementById('nameSelector').value;
        
        const operatorObject = {
            name
        }

        const editOperator = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/operators/' + props.history.location.state.id,
                    'PATCH',
                    JSON.stringify({...operatorObject}),
                    {
                        'Content-Type': 'application/json'
                    },
                );
            } catch(err) {}
        }

        editOperator();

        window.alert('Kezelő módosítva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }

    return (
        <>
			<h3>
				Kezelő szerkesztése
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

export default OperatorFormEdit;