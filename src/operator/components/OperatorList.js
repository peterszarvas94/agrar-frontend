import React from 'react';
import { Button, Table, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import OperationItem from './OperationItem';

const OperatorList = (props) => {
    return (
        <>
            <h3>
                Kezelők
            </h3>

            <Nav variant='tabs' defaultActiveKey='/operators'>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(props.items.length > 0) && props.items.map(item => (
                            <OperationItem
                                id={item.id}
                                key={item.id}
                                name={item.name}
                            />
                        ))}
						<tr>
							<td colSpan='2'>
								<Link to='/operator/new'>
									<Button size='sm' variant='success'>
										<div className='icon-plus'>Új kezelő</div>
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

export default OperatorList;