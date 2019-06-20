import React, { useEffect, useState, useContext } from 'react';
import Query from '../query';
import * as GithubClient from '../log-in';

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
