import { useContext, useState, useEffect } from 'react';
import * as GithubClient from '../log-in';

export default function Query({ query, children }) {
	const client = useContext(GithubClient.Context);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(
		() => {
			async function runQuery() {
				try {
					const result = await client.request(query);
					setData(result);
					setLoading(false);
				} catch (e) {
					setError(e);
				}
			}
			runQuery();
		},
		[query],
	);

	return children({ data, loading, error });
}
