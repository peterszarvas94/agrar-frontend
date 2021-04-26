import React, { useEffect, useState } from "react";
import { Nav } from 'react-bootstrap';

import { useHttpClient } from '../../hooks/http-hook';
import CategoryList from '../../entrie/components/CategoryList'

const Entries = () => {

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedCategories, setLoadedCategories] = useState();

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ROOT_URL + '/categories'
            );
    
            setLoadedCategories(responseData.categories);
          } catch (err) {}
        };
        fetchCategories();
    }, [sendRequest]);

    return(
        <>
            <h3>
                Műveletek
            </h3>

            <Nav variant='tabs' defaultActiveKey='/entries'>
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

            {isLoading && (
                <h1>loading</h1>
            )}
            {!isLoading && loadedCategories && 
                <CategoryList categories={loadedCategories}/>
            }
        </>
    );
}

export default Entries;