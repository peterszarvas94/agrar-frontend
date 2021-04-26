import React, { useEffect, useState } from "react";

import { useHttpClient } from '../../hooks/http-hook';
import OperatorList from '../../operator/components/OperatorList';

const Operators = () => {
	// eslint-disable-next-line
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedOperators, setloadedOperators] = useState();

	useEffect(() => {
		const fetchOperators = async () => {
		  try {
			const responseData = await sendRequest(
				process.env.REACT_APP_ROOT_URL + '/operators'
			);
		
			setloadedOperators(responseData.operators);
		  } catch (err) {}
		};
		fetchOperators();
	}, [sendRequest]);

	return (
		<>
			{isLoading && (
				<h1>loading</h1>
			)}
			{!isLoading && loadedOperators && 
				<OperatorList items={loadedOperators}/>
			}
		</>
	);
};

export default Operators;