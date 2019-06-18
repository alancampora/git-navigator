import React, { useEffect, useState, useContext } from 'react';
import * as GithubClient from '../log-in';

function useCommits() {
	const [commits, setCommit] = useState([]);

	function getAllCommits(cursor, amount) {
		return fetch('https://api.github.com/repos/labs-js/turbo-git/commits', {
			params: {
				page: cursor,
				per_page: amount,
			},
		})
			.then(data => data.json())
			.then(data => {
				//if (!data || data.message) {
				//return [];
				//}
				//if (data) {
				setCommit(commits.push(data));
				//getAllCommits(cursor + 1);
				//}
			})
			.catch(error => {
				return [];
			});
	}

	useEffect(getAllCommits(0, 100), []);

	return [commits];
}

function Navigation({ value }) {
	const token = useContext(GithubClient.Context);
	return <div> logged in! {token} </div>;
}

export default Navigation;
