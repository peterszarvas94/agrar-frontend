import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';
import CategorySelectorNew from '../../record/components/CategorySelectorNew';
import EntrieSelectorNew from '../../record/components/EntrieSelectorNew';

const RecordFormNew = props => {

    const goBack = () => {
        props.history.goBack();
    }

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [selectedCategory, setSelectedCategory] = useState();
    const [firstRunCategory, setFirstRunCategory] = useState(0);    

    const categoryChanged = (event) => {
        const target = event.target;
        setSelectedCategory(target.options[target.selectedIndex].getAttribute('id'));
    }

    const defaultCategory = (event) => {
        if (firstRunCategory === 0) {
            setSelectedCategory(event);
            setFirstRunCategory(1);
        }
    }

    const save = () => {
        const en = document.getElementById('entrieSelector');
        const pr = document.getElementById('priceSelector'); 
        const qn = document.getElementById('quantitySelector');
        
        const old_price = en.options[en.selectedIndex].getAttribute('price');
        const new_price = pr.value;

        let recordObj = {
            operation: props.history.location.state.operation,
            entrie: en.options[en.selectedIndex].getAttribute('id'),
            quantity: qn.value,
        }

        if (old_price !== new_price) {
            recordObj.price = new_price;
        }

        const addRecord = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/records',
                    'POST',
                    JSON.stringify({...recordObj}),
                    {
                        'Content-Type': 'application/json'
                    },
                );
            } catch(err) {}
        }
        addRecord();

        window.alert('Bejegyzés létrehozva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }

    return (
        <>
            <h3>
                Új tétel
            </h3>

            <Button onClick={goBack}>
                <div className='icon-left-big'>Vissza</div>
            </Button>

            <Form>
                <Form.Group controlId='categorySelector'>
                    <Form.Label>Kategória</Form.Label>
                    <Form.Control
                        as='select'
                        onChange={categoryChanged}
                    >
                        <CategorySelectorNew onDefault={defaultCategory}/>
                    </Form.Control>
                </Form.Group>

                {!selectedCategory && <option></option>}
                {selectedCategory && <EntrieSelectorNew category={selectedCategory}/>}
                
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

export default RecordFormNew;