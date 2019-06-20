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
	<Wrapper>
		<Query query={query}>
			{({ data, loading, error }) =>
				!loading && <StyledImage src={data.viewer.avatarUrl} />
			}
		</Query>
	</Wrapper>
);

export default Header;
