import React from 'react';
import { Button, Table, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../style/FieldList.css';
import FieldItem from './FieldItem';

const FieldList = props => {
    return (
        <>
            <h3>
                Földek
            </h3>

            <Nav variant='tabs' defaultActiveKey='/'>
                <Nav.Item>
                    <Nav.Link href='/'>Földek</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/entries'>Műveletek</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/operators'>Kezelők</Nav.Link>
                </Nav.Item>
            </Nav>

            <div className='table_container'>
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>név</th>
                            <th>terület</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(props.items.length > 0) && props.items.map(item => (
                            <FieldItem
                                id={item.id}
                                key={item.id}
                                name={item.name}
                                area={item.area}
                                operations={item.operations}
                            />
                        ))}
						<tr>
							<td colSpan='8'>
								<Link to='/field/new'>
									<Button size='sm' variant='success'>
										<div className='icon-plus'>Új földterület</div>
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

export default FieldList;