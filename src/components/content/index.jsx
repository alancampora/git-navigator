import React, { useEffect, useState, useContext } from 'react';
import Query from '../query';
import * as GithubClient from '../log-in';

const gql = String.raw;
const query = gql`
	query {
		viewer {
			followers {
				totalCount
			}
			following {
				totalCount
			}
			repositories(
				privacy: PUBLIC
				first: 100
				isFork: false
				ownerAffiliations: [COLLABORATOR, OWNER]
				orderBy: { field: PUSHED_AT, direction: DESC }
			) {
				totalCount
				edges {
					node {
						id
						name
						description
						url
						pushedAt
						stargazers {
							totalCount
						}
						forkCount
						languages(first: 1) {
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

const Content = () => (
	<Query query={query}>
		{({ data, loading, error }) => {
			if (loading) return <div> loading data ... </div>;
			if (error) return <div> {error} </div>;
			return (
				<div>
					<div>
						<p>{`followers: ${data.viewer.followers.totalCount}`}</p>
						<p>{`following: ${data.viewer.following.totalCount}`}</p>
					</div>
					<div>
						{data.viewer.repositories.edges.map(item => (
							<div>{item.node.name}</div>
						))}
					</div>
				</div>
			);
		}}
	</Query>
);

export default Content;
