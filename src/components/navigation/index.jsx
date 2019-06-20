import React, { useEffect, useState, useContext } from 'react';
import Query from '../query';
import * as GithubClient from '../log-in';

const gql = String.raw;
const query = gql`
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

const Navigation = () => (
	<Query query={query}>
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

export default Navigation;
