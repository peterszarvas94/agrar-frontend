import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

import '../style/OperationList.css';
import OperationRow from './OperationRow';

const OperationList = props => {

    const goBack = () => {
        props.history.goBack();
    }

    return (
        <>
            <h3>
                {props.field_name}
            </h3>

            <Button onClick={goBack}>
                <div className='icon-left-big'>Vissza</div>
            </Button>

            <div className='table_container'>
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>dátum</th>
                            <th>kezelő</th>
                            <th>művelet</th>
                            <th>kategória</th>
                            <th>egységár</th>
                            <th>mennyiség</th>
                            <th>összeg</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    {(props.operations.length > 0) &&   
                        props.operations.map(item => (
                            <OperationRow
                                id={item}
                                key={item}
                                field={props.field_id}
                            />
                        ))
                    }
                        <tr>
                            <td colSpan='8'>
                                <Link to={{
                                    pathname: '/operation/new',
                                    state: {
                                        field: props.field_id
                                    }
                                }}>
                                    <Button size='sm' variant='success'>
                                        <div className='icon-plus'>Új dátum</div>
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default OperationList;