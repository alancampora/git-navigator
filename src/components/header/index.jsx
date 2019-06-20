import React, { useContext } from 'react';
import Query from '../query';
import { StyledImage, Wrapper } from './styled';
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
						<Wrapper>
							<StyledImage src={data.viewer.avatarUrl} />
						</Wrapper>
					)
				);
			}}
		</Query>
	);
}

export default Header;
