import React, { useEffect, useState, useContext } from 'react';
import Query from '../query';
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
const gql = String.raw;
const tstQuery = gql`
	query {
		repository(owner: "octocat", name: "Hello-World") {
			issues(last: 20, states: CLOSED) {
				edges {
					node {
						title
						url
						labels(first: 5) {
							edges {
								node {
									name
								}
							}
						}
					}
				}
			}
		}
	}
`;

function Navigation({ value }) {
	const client = useContext(GithubClient.Context);
	const username = 'alancampora';
	console.log(client);

	return (
		<Query query={tstQuery}>
			{({ data, loading, error }) =>
				!loading && (
					<div>
						{data.repository.issues.edges.map(item => (
							<div> {item.node.title} </div>
						))}
					</div>
				)
			}
		</Query>
	);
}

export default Navigation;
