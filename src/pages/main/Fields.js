import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';
import FieldList from '../../field/components/FieldList';

const Fields = () => {
	// eslint-disable-next-line
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedFields, setLoadedFields] = useState();

	useEffect(() => {
		const fetchFields = async () => {
			try {
				console.log(process.env.REACT_APP_ROOT_URL);
				const responseData = await sendRequest(
				process.env.REACT_APP_ROOT_URL + '/fields'
			);
			
			setLoadedFields(responseData.fields);
			} catch (err) {}
		};
		fetchFields();
	}, [sendRequest]);

	return (
		<>
			{isLoading && (
				<h1>loading</h1>
			)}
			{!isLoading && loadedFields && 
				<>
					<FieldList items={loadedFields}/>
				</>
			}
		</>
	);
};

export default Fields;