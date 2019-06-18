import { useContext, useState, useEffect } from 'react';
import * as GithubClient from '../log-in';

export default function Query({ query, children }) {
	const client = useContext(GithubClient.Context);
	const [data, setData] = useState(null);

	useEffect(
		() => {
			async function runQuery() {
				try {
					const result = await client.request(query);
					setData(result);
				} catch (error) {}
			}
      runQuery();
		},
		[query],
	);

	return children(data);
}
