import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import CategoryRow from './CategoryRow';

const CategoryList = (props) => {
    return(
        <>
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Kategória</th>
                        <th>Művelet</th>
                        <th>Egységár</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(props.categories.length > 0) && props.categories.map(item => (
                        <CategoryRow
                            id={item.id}
                            key={item.id}
                            name={item.name}
                        />
                    ))}
                    <tr>
                        <td>
                            <Link to={{
                                pathname: '/category/new'
                            }}>
                                <Button size='sm' variant='success'>
                                    <div className='icon-plus'>Új kategória</div>
                                </Button>
                            </Link>
                        </td>
                        <td colSpan='2'>
                            <Link to={{
                                pathname: '/entrie/new'
                            }}>
                                <Button size='sm' variant='success'>
                                    <div className='icon-plus'>Új művelet</div>
                                </Button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default CategoryList;