import React, { useEffect, useState } from 'react';

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

function Navigation() {
	const [commits] = useCommits();
	return (
		<div>
			This is a test
			{commits.map(commit => (
				<div> {commit.sha}</div>
			))}
		</div>
	);
}

export default Navigation;
