import React, { useContext } from 'react';
import Query from '../query';
import { StyledImage, Wrapper } from './styled';
import * as GithubClient from '../log-in';

const gql = String.raw;
const query = gql`
	query {
		viewer {
			name
			avatarUrl
		}
	}
`;

const Header = () => (
	<Query query={query}>
		{({ data, loading, error }) =>
			!loading && (
				<Wrapper>
					<StyledImage src={data.viewer.avatarUrl} />
				</Wrapper>
			)
		}
	</Query>
);

export default Header;
