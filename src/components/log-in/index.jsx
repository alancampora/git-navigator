import React, { useState, useEffect } from 'react';
import netlify from 'netlify-auth-providers';
import { GraphQLClient } from 'graphql-request';

const TOKEN_KEY = 'github-token';
function authenticate() {
	return new Promise(function(resolve, reject) {
		const authenticator = new netlify({
			site_id: '44adb0c5-3f01-497d-bac4-50f9b60100f9',
		});
		authenticator.authenticate({ provider: 'github' }, function(err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
}

function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				return JSON.parse(item);
			}
			return initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = value => {
		try {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setValue];
}

function useClient(token) {
	const [client, setClient] = useState(null);

	useEffect(
		() => {
			const headers = { Authorization: `bearer ${token}` };

			const newClient = new GraphQLClient('https://api.github.com/graphql', {
				headers,
			});

			setClient(newClient);
		},
		[token],
	);

	return [client];
}

const GithubClientContext = React.createContext();
const { Provider, Consumer } = GithubClientContext;

function GithubClientProvider({ children }) {
	const [currentToken, setToken] = useLocalStorage(TOKEN_KEY, null);
	const [client] = useClient(currentToken);

	const handleLoginClick = async () => {
		try {
			const data = await authenticate();
			setToken(data.token);
		} catch (error) {
			setToken(null);
		}
	};

	return client ? (
		<Provider value={client}>{children}</Provider>
	) : (
		<div>
			You have no client!
			<button onClick={handleLoginClick}>Sign In Here!</button>
		</div>
	);
}

export {
	GithubClientProvider as Provider,
	Consumer,
	GithubClientContext as Context,
};
