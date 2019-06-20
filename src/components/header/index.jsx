import React, { useContext } from 'react';
import Query from '../query';
import * as GithubClient from '../log-in';

const gql = String.raw;
const viewer = gql`
	query {
		viewer {
			name
			avatarUrl
		}
	}
`;

function Header({ value }) {
	const client = useContext(GithubClient.Context);

	return (
		<Query query={viewer}>
			{data => {
				return (
					data && (
						<div>
							<p> {data.viewer.name} </p>
							<img src={data.viewer.avatarUrl} />
						</div>
					)
				);
			}}
		</Query>
	);
}

export default Header;
