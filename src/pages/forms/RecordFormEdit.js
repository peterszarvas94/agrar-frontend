import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';
import CategorySelectorEdit from '../../record/components/CategorySelectorEdit';
import EntrieSelectorEdit from '../../record/components/EntrieSelectorEdit';

const RecordFormEdit = (props) => {

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
            const cat = document.getElementById('categorySelector');
            let optionToSelect;
            for (let op of cat.options) {
                if (op.id === event) {
                    optionToSelect = op;
                }
            }
            if(!!optionToSelect) {
                cat.value = optionToSelect.value;
            }
        }
    }

    /*
    
    const showProps = () => {
        console.log({
            props: props.history.location.state
        });
    }

    const showState = () => {
        const ca = document.getElementById('categorySelector');
        const en = document.getElementById('entrieSelector');
        const pr = document.getElementById('priceSelector');
        const qn = document.getElementById('quantitySelector');
        //const op = document.getElementById('operatorSelector');
        //const da = document.getElementById('dateSelector');
        console.log({
            state: {
                category: ca.options[ca.selectedIndex].getAttribute('id'),
                entrie: en.options[en.selectedIndex].getAttribute('id'),
                price: pr.value,
                quantity: qn.value
                //operator: op.options[op.selectedIndex].getAttribute('id'),
                //date: da.value
            }
        });
    }
    */

    const save = () => {
        const en = document.getElementById('entrieSelector');
        const pr = document.getElementById('priceSelector'); 
        const qn = document.getElementById('quantitySelector');

        const old_price = en.options[en.selectedIndex].getAttribute('price');
        const new_price = pr.value;

        let recordObj = {
            entrie: en.options[en.selectedIndex].getAttribute('id'),
            quantity: qn.value,
        }

        if (old_price !== new_price) {
            recordObj.price = new_price;
        }

        const updateRecord = async () => {
            try {
                await sendRequest(
                    process.env.REACT_APP_ROOT_URL + '/records/' + props.history.location.state.id,
                    'PATCH',
                    JSON.stringify({...recordObj}),
                    {
                        'Content-Type': 'application/json'
                    },
                );
            } catch(err) {}
        }
        updateRecord();

        window.alert('Bejegyzés módosítva! OK gombbal visszaléphetsz.');
        props.history.goBack();
    }

    return (
        <>
            <h3>
                Tétel szerkesztése
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
                        <CategorySelectorEdit onDefault={defaultCategory} record={props.history.location.state.id}/>
                    </Form.Control>
                </Form.Group>

                {!selectedCategory && <option></option>}
                {selectedCategory && <EntrieSelectorEdit category={selectedCategory} record={props.history.location.state.id}/>}
            </Form>
            {
                /*
                    <Button onClick={showState}>state</Button><br/><br/>
                    <Button onClick={showProps}>props</Button><br/><br/>   
                */
            }
            
            <Button
                onClick={save}
                variant='success'
            >
                <div className='icon-floppy'>Módosítás</div>
            </Button>
        </>
    );
}

export default RecordFormEdit;